import { PropsWithChildren, createContext, useContext, useState } from "react";
import { CartItem, Product } from "../types";
import { randomUUID } from "expo-crypto"
import { useInsertProduct } from "../api/products";
import { useInsertOrder } from "../api/orders";
import { useRouter } from "expo-router";
import { useInsertOrderItems } from "../api/orderItems";

type CartType = {
    cartItems: CartItem[];
    // addItem: (product: Product, size: CartItem['size']) => void;
    updateQuantity: (itemId: string, amount: -1 | 1) => void;
    total: number;
    checkout: () => void;
};


export const CartContext = createContext<CartType>({

    cartItems: [],
    //   addItem: () => {},
    updateQuantity: () => {

    },
    total: 0,
    checkout: () => { },


})

const CartProvider = ({ children }: PropsWithChildren) => {
    const [cartItems, setCartItems] = useState<CartItem[]>([])

    const router = useRouter()
    const { mutate: insertOrder,  } = useInsertOrder()
    const { mutate: insertOrderItems,error } = useInsertOrderItems()

    if (error) {
        console.log(error)
    }

    const addItem = (product: Product, size: CartItem['size']) => {


        const existingItem = cartItems.find(item => item.product === product && item.size === size);

        if (existingItem) {
            updateQuantity(existingItem.id, 1);
            return
        }
        const newCartItem = {
            id: randomUUID(),
            product_id: product.id,
            product, size, quantity: 1

        }
        setCartItems([newCartItem, ...cartItems])
        // console.log(cartItems)
    }

    const updateQuantity = (itemId: string, amount: -1 | 1) => {

        const updatedItems = cartItems.map((item) => item.id !== itemId ? item : { ...item, quantity: item.quantity + amount }).filter((item) => item.quantity > 0)
        // !
        setCartItems(updatedItems)
        // console.log(updatedItems)
    }

    // ! total bill
    const total = cartItems.reduce((sum, item) => (sum += item.product.price * item.quantity), 0)

    const clearCart = () => {
        setCartItems([]);
    };

    const checkout = () => {
        insertOrder({ total }, 
            {
            onSuccess: saveOrderItems,
        });

    };


    const saveOrderItems = (order: { id: any; }) => {
        const orderItems = cartItems?.map((cartItem) => ({
            order_id: order.id,
            product_id: cartItem.product_id,
            quantity: cartItem.quantity,
            size: cartItem.size,
        }));
        
        // Pass the array of order items directly to insertOrderItems
        insertOrderItems(orderItems, {
            onSuccess() {
                clearCart();
                router.push(`/(user)/orders/${order.id}`);
            },
        });
    };


    return (
        <CartContext.Provider value={{ cartItems, addItem, updateQuantity, total, checkout }}>
            {children}
        </CartContext.Provider>
    );
}


export default CartProvider;


export const useCartContext = () => useContext(CartContext)


// ! sabse pehle + - handle kiya tha than product <0 remove wala scene