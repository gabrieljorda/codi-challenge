import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useProducts } from '../hooks/useProducts';

function CreateProduct() {
  const navigate = useNavigate();
  const { useCreateProduct } = useProducts();
  const createMutation = useCreateProduct();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: '',
      price: '',
      stock: '',
      description: '',
    },
  });

  const onSubmit = (data) => {
    createMutation.mutate({
      name: data.name.trim(),
      price: parseFloat(data.price),
      stock: parseInt(data.stock),
      description: data.description?.trim() || '',
    }, {
      onSuccess: () => navigate('/'),
    });
  };

  return (
    <div className="container">
      <div className="form-container">
        <h1>➕ Criar Novo Produto</h1>
        <div className="card">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
              <label className="form-label">Nome do Produto *</label>
              <input
                className="form-control"
                placeholder="Digite o nome"
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
                placeholder="0,00"
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
                placeholder="0"
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
                placeholder="Descrição opcional"
                {...register('description')}
              />
            </div>

            <div className="flex gap-2" style={{ marginTop: '1.5rem' }}>
              <button 
                type="submit" 
                className="btn btn-primary" 
                disabled={createMutation.isPending}
              >
                {createMutation.isPending ? 'Salvando...' : '💾 Salvar Produto'}
              </button>
              <button 
                type="button" 
                className="btn btn-secondary" 
                onClick={() => navigate('/')}
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

export default CreateProduct;