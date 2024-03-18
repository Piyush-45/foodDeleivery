import { supabase } from "@/src/lib/supabase";
import { AuthContext } from "@/src/providers/AuthProvider";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";

export const useAdminOrderList = ({ archived = false }) => {

  const statuses = archived ? ['Delivered'] : ['New', 'Cooking', 'Delivering']

  return useQuery({
    queryKey: ['orders', statuses],
    queryFn: async () => {
      const { data, error } = await supabase.from('orders').select('*').in('status', statuses)
      if (error) {
        throw new Error(error.message)
      }
      return data;
    }
  })

}

export const useMyOrderList = () => {
  const { session } = useContext(AuthContext)

  const id = session?.user.id;

  return useQuery({
    queryKey: ['orders', { userId: id }],
    queryFn: async () => {
      if (!id) {
        return null
      }
      const { data, error } = await supabase.from('orders').select('*').eq('user_id', id).order('created_at', { ascending: false })
      if (error) {
        throw new Error(error.message)
      }
      return data;
    }
  })

}


export const useOrderDetails = (id: number) => {
  return useQuery({
    queryKey: ['orders', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('orders')
        .select('*, order_items(*, products(*))')
        .eq('id', id)
        .single();

      if (error) {
        throw new Error(error.message);
      }
      return data;
    },
  });
};


export const useInsertOrder = () => {
  const queryClient = useQueryClient();
  const { session } = useContext(AuthContext);

  const userId = session?.user.id;

  return useMutation({
    async mutationFn(data: any) {
      const { error, data: newProduct } = await supabase
        .from('orders')
        .insert({ ...data, user_id: userId })
        .select()
        .single();

      if (error) {
        throw new Error(error.message);
      }
      return newProduct;
    },
    async onSuccess() {
      await queryClient.invalidateQueries(['orders'])
      // alert('Success')
    },
  });
};



export const useUpdateOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    async mutationFn({
      id,
      updatedFields,
    }) {
      const { error, data: updatedOrder } = await supabase
        .from('orders')
        .update(updatedFields)
        .eq('id', id)
        .select()
        .single();

      if (error) {
        throw new Error(error.message);
      }
      return updatedOrder;
    },
    async onSuccess(_, { id }) {
      await queryClient.invalidateQueries(['orders']);
      await queryClient.invalidateQueries(['orders', id]);
    },
  });
};
