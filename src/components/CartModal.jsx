import React, { forwardRef, useRef } from 'react'
import { createPortal } from 'react-dom'
import Cart from './Cart'

const CartModal = forwardRef(function CartModal({ title, actions }, ref) {
    const dialog = useRef()
    return createPortal(
        <dialog
            id='modal'
            ref={ref}>
            <h2>{title}</h2>
            <Cart />
            <form 
            method="dialog" 
            id='modal-actions'>
            {actions}
            </form>
        </dialog>,
        document.getElementById('modal')
    )
}
)

export default CartModal