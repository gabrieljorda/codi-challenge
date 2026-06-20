import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../api/axios';
import toast from 'react-hot-toast';

export const useProducts = () => {
  const queryClient = useQueryClient();

  // Buscar todos os produtos
  const useGetProducts = () => {
    return useQuery({
      queryKey: ['products'],
      queryFn: async () => {
        const response = await api.get('/products');
        return response.data;
      },
    });
  };

  // Buscar produto por ID
  const useGetProduct = (id) => {
    return useQuery({
      queryKey: ['product', id],
      queryFn: async () => {
        const response = await api.get(`/products/${id}`);
        return response.data;
      },
      enabled: !!id,
    });
  };

  // Criar produto
  const useCreateProduct = () => {
    return useMutation({
      mutationFn: async (data) => {
        const response = await api.post('/products', data);
        return response.data;
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['products'] });
        toast.success('✅ Produto criado com sucesso!');
      },
      onError: (error) => {
        const errors = error.response?.data?.errors;
        if (errors && Array.isArray(errors)) {
          errors.forEach(err => toast.error(err));
        } else {
          toast.error('❌ Erro ao criar produto');
        }
      },
    });
  };

  // Atualizar produto
  const useUpdateProduct = () => {
    return useMutation({
      mutationFn: async ({ id, ...data }) => {
        const response = await api.put(`/products/${id}`, data);
        return response.data;
      },
      onSuccess: (data, variables) => {
        queryClient.invalidateQueries({ queryKey: ['products'] });
        queryClient.invalidateQueries({ queryKey: ['product', variables.id] });
        toast.success('✅ Produto atualizado com sucesso!');
      },
      onError: (error) => {
        const errors = error.response?.data?.errors;
        if (errors && Array.isArray(errors)) {
          errors.forEach(err => toast.error(err));
        } else {
          toast.error('❌ Erro ao atualizar produto');
        }
      },
    });
  };

  // Deletar produto
  const useDeleteProduct = () => {
    return useMutation({
      mutationFn: async (id) => {
        await api.delete(`/products/${id}`);
        return id;
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['products'] });
        toast.success('✅ Produto deletado com sucesso!');
      },
      onError: () => {
        toast.error('❌ Erro ao deletar produto');
      },
    });
  };

  return {
    useGetProducts,
    useGetProduct,
    useCreateProduct,
    useUpdateProduct,
    useDeleteProduct,
  };
};