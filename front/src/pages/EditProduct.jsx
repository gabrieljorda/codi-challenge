import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { useProducts } from '../hooks/useProducts';

function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { useGetProduct, useUpdateProduct } = useProducts();
  const { data: product, isLoading } = useGetProduct(id);
  const updateMutation = useUpdateProduct();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: '',
      price: '',
      stock: '',
      description: '',
    },
  });

  useEffect(() => {
    if (product) {
      reset({
        name: product.name || '',
        price: product.price || '',
        stock: product.stock || '',
        description: product.description || '',
      });
    }
  }, [product, reset]);

  const onSubmit = (data) => {
    updateMutation.mutate({
      id,
      name: data.name.trim(),
      price: parseFloat(data.price),
      stock: parseInt(data.stock),
      description: data.description?.trim() || '',
    }, {
      onSuccess: () => navigate(`/product/${id}`),
    });
  };

  if (isLoading) {
    return (
      <div className="container">
        <div className="loading">🔄 Carregando dados do produto...</div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="form-container">
        <h1>✏️ Editar Produto</h1>
        <div className="card">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
              <label className="form-label">Nome do Produto *</label>
              <input
                className="form-control"
                {...register('name', { 
                  required: 'Nome é obrigatório',
                  minLength: { value: 2, message: 'Mínimo 2 caracteres' }
                })}
              />
              {errors.name && <div className="form-error">{errors.name.message}</div>}
            </div>

            <div className="form-group">
              <label className="form-label">Preço (R$) *</label>
              <input
                type="number"
                step="0.01"
                className="form-control"
                {...register('price', {
                  required: 'Preço é obrigatório',
                  min: { value: 0.01, message: 'Preço deve ser maior que zero' },
                })}
              />
              {errors.price && <div className="form-error">{errors.price.message}</div>}
            </div>

            <div className="form-group">
              <label className="form-label">Quantidade em Estoque *</label>
              <input
                type="number"
                className="form-control"
                {...register('stock', {
                  required: 'Quantidade é obrigatória',
                  min: { value: 0, message: 'Quantidade deve ser maior ou igual a zero' },
                })}
              />
              {errors.stock && <div className="form-error">{errors.stock.message}</div>}
            </div>

            <div className="form-group">
              <label className="form-label">Descrição</label>
              <textarea
                rows="4"
                className="form-control"
                {...register('description')}
              />
            </div>

            <div className="flex gap-2" style={{ marginTop: '1.5rem' }}>
              <button 
                type="submit" 
                className="btn btn-primary" 
                disabled={updateMutation.isPending}
              >
                {updateMutation.isPending ? 'Atualizando...' : '💾 Atualizar Produto'}
              </button>
              <button 
                type="button" 
                className="btn btn-secondary" 
                onClick={() => navigate(`/product/${id}`)}
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditProduct;