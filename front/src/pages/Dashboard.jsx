import { Link } from 'react-router-dom';
import { useProducts } from '../hooks/useProducts';

function Dashboard() {
  const { useGetProducts } = useProducts();
  const { data: products, isLoading, error } = useGetProducts();

  if (isLoading) {
    return (
      <div className="container">
        <div className="loading">🔄 Carregando produtos...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container">
        <div className="card" style={{ background: '#fee2e2', color: '#991b1b' }}>
          ❌ Erro ao carregar produtos. Tente novamente.
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="card-header">
        <h1>📦 Produtos</h1>
        <span style={{ color: '#6b7280' }}>{products?.length || 0} produtos</span>
      </div>

      {!products || products.length === 0 ? (
        <div className="card text-center">
          <p style={{ fontSize: '1.125rem', color: '#6b7280' }}>Nenhum produto cadastrado.</p>
          <Link to="/create" className="btn btn-primary mt-3">Criar Primeiro Produto</Link>
        </div>
      ) : (
        <div className="product-grid">
          {products.map(product => (
            <Link key={product.id} to={`/product/${product.id}`} className="product-card">
              <h3>{product.name}</h3>
              <p className="product-price">R$ {product.price.toFixed(2)}</p>
              <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                {product.description || 'Sem descrição'}
              </p>
              <span className={`product-stock ${
                product.stock > 10 ? 'stock-high' :
                product.stock > 0 ? 'stock-medium' : 'stock-low'
              }`}>
                {product.stock} unidades
              </span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default Dashboard;