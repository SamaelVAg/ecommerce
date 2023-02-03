import React, { useState } from 'react';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deleteCartThunk, putCartThunk } from '../store/slices/cart.slice';


const CartCard = ({ element, handleClose }) => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { id: cartId, quantity, product } = element
    const { id: productId, price, title, images: [{ url }] } = product

    const [quant, setQuant] = useState(Number(quantity))

    const link = () => {
        handleClose()
        navigate(`/product/${productId}`)
    }

    const modQuant = (btn) => {
        const act = Number(quant)
        if (btn === 'add') {
            updateQuant(act + 1)
            setQuant(act + 1)
        } else if (btn === 'remove' && quant > 1) {
            updateQuant(act - 1)
            setQuant(act - 1)
        }
        
    }

    const updateQuant = (value) => {
        const body = {
            quantity: value
        }
        dispatch(putCartThunk(cartId, body))
    }

    return (
        <div className='mb-3'>
            <Row style={{ height: '100px' }}>
                <Col sm={3} style={{ height: '100px' }}>
                    <Image src={url} className='product-img'></Image>
                </Col>
                <Col sm={7}>
                    <Row className='h-75'>
                        <small onClick={() => link()}>
                            <strong>
                                {title}
                            </strong>
                        </small>
                    </Row>
                    <Row className='h-25 px-4'>
                        <InputGroup>
                            <Button variant="outline-secondary" id="button-addon21" onClick={() => modQuant('remove')}>
                                <i className='bx bx-minus'></i>
                            </Button>
                            <Form.Control className='text-center'
                                value={quant}
                                onChange={e => setQuant(e.target.value)}
                                onKeyDown={e => {if(e.key === 'Enter'){
                                    updateQuant(quant)
                                }
                            }}
                                aria-label="Text input with 2 buttons" />
                            <Button variant="outline-secondary" id="button-addon22"
                                align="end" onClick={() => modQuant('add')}>
                                <i className='bx bx-plus'></i>
                            </Button>
                        </InputGroup>
                    </Row>
                </Col>
                <Col sm={2}>
                    <i onClick={() => dispatch(deleteCartThunk(cartId))} style={{color:'red'}} className='bx bx-trash bx-sm'></i>
                </Col>
            </Row>
            <Row className='pt-4'>
                <Col sm={8} align='end'>
                    <strong className='text-muted'>Total:</strong>
                </Col>
                <Col sm={4} align='center'>
                    <strong>{`$ ${(quantity * price).toFixed(2)}`}</strong>
                </Col>
            </Row>
        </div>
    );
};
<Row>

</Row>
export default CartCard;