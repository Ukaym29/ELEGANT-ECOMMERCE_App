import React, { Children, createContext, useReducer, useState } from "react";
import { DUMMY_PRODUCTS } from "../dummy-products";

export const CartContext = createContext({
    items: [],
    addToCart: () => { },
    onUpdateItemQuantity: () => { }
})

function shoppingCartReducer(state, action) {
    if (action.type === 'ADD_ITEM') {
        const updatedItems = [...state.items]

        const existingItemIndex = updatedItems.findIndex((item) => {
            return item.id === action.payload.id
        })
        const existingItem = updatedItems[existingItemIndex];
        if (existingItem) {
            const newItem = {
                ...existingItem,
                quantity: existingItem.quantity + 1,
            }
            //  REplaces the existing item in the updatedItems arrray with the newItem
            updatedItems[existingItemIndex] = newItem
        } else {
            const product = DUMMY_PRODUCTS.find((product) => {
                return product.id === action.payload.id
            })

            updatedItems.push({
                id: action.payload.id,
                name: product.title,
                price: product.price,
                quantity: 1,
            })

            
        }
        return {
            items: updatedItems
        }
    }

    if (action.type === 'UPDATE_ITEM_QUANTITY') {
        const updatedItems = [...state.items];
        const updatedItemIndex = updatedItems.findIndex((item) => item.id === action.payload.productId);

        const newUpdatedItem = {
            ...updatedItems[updatedItemIndex],
        };

        newUpdatedItem.quantity += action.payload.amount;
        if (newUpdatedItem.quantity <= 0) {
            updatedItems.splice(updatedItemIndex, 1);

        } else {
            updatedItems[updatedItemIndex] = newUpdatedItem;
        }

        return {
            items: updatedItems,
        };
    }
}


const CartContextProvider = ({ children }) => {
    const [shoppingCartState, shoppingCartDispatch] = useReducer(shoppingCartReducer, { items: [] })


    function handleAddToCart(id) {
        // setShoppingCart((prevShoppingCart) => {
        //     const updatedItems = [...prevShoppingCart.items]

        //     const existingItemIndex = updatedItems.findIndex((item) => {
        //         return item.id === id
        //     })
        //     const existingItem = updatedItems[existingItemIndex];

        //     if (existingItem) {
        //         const newItem = {
        //             ...existingItem,
        //             quantity: existingItem.quantity + 1,
        //         }
        //         //  REplaces the existing item in the updatedItems arrray with the newItem
        //         updatedItems[existingItemIndex] = newItem
        //     } else {
        //         const product = DUMMY_PRODUCTS.find((product) => {
        //             return product.id === id
        //         })

        //         updatedItems.push({
        //             id: id,
        //             name: product.title,
        //             price: product.price,
        //             quantity: 1,
        //         })
        //     }
        //     return {
        //         items: updatedItems
        //     }
        // })
        shoppingCartDispatch({
            type: 'ADD_ITEM',
            payload: {id}
        })
    }
    function onUpdateItemQuantity(productId, amount) {
        //  Implement logic to update item quantities in the shopping cart
        // setShoppingCart((prevShoppingCart) => {
        //     const updatedItems = [...prevShoppingCart.items];
        //     const updatedItemIndex = updatedItems.findIndex((item) => item.id === productId);

        //     const newUpdatedItem = {
        //         ...updatedItems[updatedItemIndex],
        //     };

        //     newUpdatedItem.quantity += amount;

        //     if (newUpdatedItem.quantity <= 0) {
        //         updatedItems.splice(updatedItemIndex, 1);

        //     } else {
        //         updatedItems[updatedItemIndex] = newUpdatedItem;
        //     }

        //     return {
        //         items: updatedItems,
        //     };
        // });
            shoppingCartDispatch({
                type: 'UPDATE_ITEM_QUANTITY',
                payload: { productId, amount}

            })
    }

    //  The use of context here to avoid re-rendering
    const ctxValue = {
        items: shoppingCartState.items,
        // what's important is for you too have the context name equated to the function in question
        addToCart: handleAddToCart,
        onUpdateItemQuantity: onUpdateItemQuantity
        //  Note theat if you have a fucntion and a prop with the same name it will automatically understand
    }

    return (
        <CartContext.Provider value={ctxValue}>
            {children}
        </CartContext.Provider>
    )
}

export default CartContextProvider;