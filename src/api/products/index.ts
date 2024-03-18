import { supabase } from "@/src/lib/supabase";
import { useQuery, useMutation, QueryClient, useQueryClient, Mutation } from "@tanstack/react-query";
import { ActivityIndicator, Text } from "react-native";

export const useProductList = () => {

    return useQuery({
        queryKey: ['products'],
        queryFn: async () => {
            const { data, error } = await supabase.from('products').select('*')
            if (error) {
                throw new Error(error.message)
            }
            return data;
        }
    })


}


export const useProduct = (id: number) => {
    return useQuery({
        queryKey: ['products', id],

        queryFn: async () => {
            const { data, error } = await supabase.from('products').select('*').eq('id', id).single();

            if (error) {
                throw new Error(error.message)
            }
            return data;
        }
    })
}


export const useInsertProduct = () => {
    const QueryClient = useQueryClient()
    return useMutation({
        async mutationFn(data: any) {
            const { error, data: newProduct } = await supabase.from('products').insert({
                name: data.name,
                image: data.image,
                price: data.price,
            }).single();

            if (error) {
                throw new Error(error.message)
            }
            return newProduct;
        },
        async onSuccess() {
            await QueryClient.invalidateQueries(['products']);
        },
        // onError(error){
        //     console.log(error)
        // }

    })
}


export const useUpadteProduct = () => {
    const QueryClient = useQueryClient()
    return useMutation({
        async mutationFn(data: any) {
            const { error, data: updateProduct } = await supabase.from('products').update({
                name: data.name,
                image: data.image,
                price: data.price,
            }).eq('id', data.id).select().single();

            if (error) {
                throw new Error(error.message)
            }
            return updateProduct;
        },
        async onSuccess(_, data) {
            await QueryClient.invalidateQueries(['products']);
            await QueryClient.invalidateQueries(['products', data.id]);
        },
        onError(error){
            console.log(error)
        }

    })
}

export const useDeleteProduct=()=>{
    const QueryClient = useQueryClient()

        return useMutation({
            async mutationFn(id:number){
               const{error}= await supabase.from('products').delete().eq('id', id);
                if (error) {
                    throw new Error(error.message)
                }
            },
            async onSuccess(_, data) {
                await QueryClient.invalidateQueries(['products']);
            },
        })
}