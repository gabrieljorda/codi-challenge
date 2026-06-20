import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useProducts } from '../hooks/useProducts';

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { useGetProduct, useUpdateProduct, useDeleteProduct } = useProducts();
  const { data: product, isLoading, refetch } = useGetProduct(id);
  const updateMutation = useUpdateProduct();
  const deleteMutation = useDeleteProduct();
  const [quantity, setQuantity] = useState(1);

  const updateStock = (change) => {
    if (!product) return;
    const newStock = Math.max(0, product.stock + change);
    updateMutation.mutate(
      { id, ...product, stock: newStock },
      { onSuccess: () => refetch() }
    );
  };

  const handleManualUpdate = () => {
    if (quantity <= 0) return;
    updateStock(quantity);
    setQuantity(1);
  };

  const handleDelete = () => {
    if (!window.confirm(`Tem certeza que deseja deletar "${product?.name}"?`)) return;
    deleteMutation.mutate(id, { onSuccess: () => navigate('/') });
  };

  if (isLoading) {
    return (
      <div className="container">
        <div className="loading">🔄 Carregando detalhes...</div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container">
        <div className="card" style={{ background: '#fee2e2', color: '#991b1b' }}>
          ❌ Produto não encontrado.
        </div>
        <Link to="/" className="btn btn-secondary mt-3">Voltar</Link>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="product-details">
        <div className="card-header">
          <div>
            <h1>{product.name}</h1>
            <p className="description">{product.description || 'Sem descrição'}</p>
          </div>
          <div className="flex gap-2">
            <Link to={`/edit/${product.id}`} className="btn btn-primary">
              ✏️ Editar
            </Link>
            <button onClick={handleDelete} className="btn btn-danger" disabled={deleteMutation.isPending}>
              {deleteMutation.isPending ? 'Deletando...' : '🗑️ Deletar'}
            </button>
          </div>
        </div>

        <div className="detail-row">
          <span className="detail-label">💰 Preço</span>
          <span className="detail-value">R$ {product.price.toFixed(2)}</span>
        </div>
        <div className="detail-row">
          <span className="detail-label">📦 Estoque</span>
          <span className="detail-value">{product.stock} unidades</span>
        </div>

        <div className="stock-control">
          <div className="stock-control-header">🎯 Controle de Estoque</div>
          <div className="stock-control-buttons">
            <button 
              onClick={() => updateStock(-1)} 
              disabled={product.stock <= 0 || updateMutation.isPending}
              className="btn btn-danger btn-sm"
            >
              −
            </button>
            <span className="stock-number">{product.stock}</span>
            <button 
              onClick={() => updateStock(1)} 
              disabled={updateMutation.isPending}
              className="btn btn-success btn-sm"
            >
              +
            </button>
            <div className="stock-input-group">
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value) || 0)}
                className="stock-input"
              />
              <button 
                onClick={handleManualUpdate}
                disabled={quantity <= 0 || updateMutation.isPending}
                className="btn btn-primary btn-sm"
              >
                Adicionar
              </button>
            </div>
          </div>
          {updateMutation.isPending && (
            <div style={{ marginTop: '0.5rem', fontSize: '0.875rem', color: '#6b7280' }}>
              Atualizando...
            </div>
          )}
        </div>

        <div style={{ marginTop: '1.5rem' }}>
          <Link to="/" className="btn btn-secondary">⬅️ Voltar</Link>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;