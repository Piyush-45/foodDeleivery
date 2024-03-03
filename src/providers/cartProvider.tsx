import { PropsWithChildren, createContext, useContext, useState } from "react";
import { CartItem, Product } from "../types";
import { randomUUID } from "expo-crypto"

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

    const addItem = (product: Product, size: CartItem['size']) => {
        
        const existingItem = cartItems.find(item=>item.product === product && item.size === size);

        if(existingItem){
            updateQuantity(existingItem.id, 1);
            return
        }
        const newCartItem = {
            id: randomUUID(),
            product_id: product.id,
            product, size, quantity: 1

        }
        setCartItems([newCartItem, ...cartItems])
        console.log(cartItems)
    }

    const updateQuantity = (itemId:string, amount:-1|1)=>{
        
        const updatedItems= cartItems.map((item)=>item.id!== itemId ? item:{...item, quantity:item.quantity + amount}).filter((item)=> item.quantity>0)
        // !
        setCartItems(updatedItems)
        console.log(updatedItems)
    }
    
    // ! total bill
    const total  = cartItems.reduce((sum, item)=>(sum += item.product.price * item.quantity),0)

    return (
        <CartContext.Provider value={{ cartItems, addItem ,updateQuantity,total}}>
            {children}
        </CartContext.Provider>
    );
}


export default CartProvider;


export const useCartContext = () => useContext(CartContext)


// ! sabse pehle + - handle kiya tha than product <0 remove wala scene