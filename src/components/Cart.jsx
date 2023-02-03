import React, { useEffect } from 'react';
import Button from 'react-bootstrap/esm/Button';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { useDispatch, useSelector } from 'react-redux';
import { getCartThunk } from '../store/slices/cart.slice';
import { postPurchasesThunk } from '../store/slices/purchases.Slice';
import CartCard from './CartCard';

const Cart = ({ show, handleClose }) => {

    const cartList = useSelector(state => state.cart)
    const dispatch = useDispatch()

    const cartTotal = (array) => {
        let total = 0
        array.map(element => total += (Number(element.product?.price) * Number(element.quantity)))
        return total 
    }

    useEffect(() => {
        dispatch(getCartThunk())
    },[])

    return (
        <div>
            <Offcanvas show={show} onHide={handleClose} placement='end'>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title><strong>My Cart</strong></Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body style={{height:'100%'}} className='position-relative'>
                    <Row style={{height:'85%'}} className='overflow-auto'>
                        {
                            cartList.map(element => (
                                <CartCard element={element} handleClose={handleClose} key={element.id}/>
                            ))
                        }
                    </Row>
                    <Row style={{height:'15%'}}>
                        <div>
                            <Row className='mb-3'>
                                <Col>
                                    <strong className='text-muted'>Total</  strong>
                                </Col>
                                <Col className='text-end'>
                                    <strong>
                                        {`$ ${cartTotal(cartList).toFixed(2)}`}
                                    </strong>
                                </Col>
                            </Row>
                            <Button style={{width:'100%'}} size='lg' variant="primary"  onClick={() => {
                                dispatch(postPurchasesThunk())
                                handleClose()
                                }}>Purchase</Button>
                        </div>
                    </Row>
                </Offcanvas.Body>
            </Offcanvas>
        </div>
    );
};

export default Cart;