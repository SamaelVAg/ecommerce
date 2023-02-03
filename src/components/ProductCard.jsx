import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { postCartThunk } from '../store/slices/cart.slice';

const ProductCard = ( {product} ) => {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { id, title, price, images } = product

    const addCart = () => {
        const body = {
            quantity: 1,
            productId: id
        }
        dispatch(postCartThunk(body))
    }

    return (
        <div>
            <Card>
                <div onClick={() => navigate(`/product/${id}`)} style={{cursor:'pointer'}}>
                    <div className='img-holder'>
                        <Card.Img className='product-img' variant="top" src={images?.[0].url} />
                    </div>
                    <Card.Body>
                        <Card.Title className='product-title'>{title}</Card.Title>
                        <Card.Subtitle className="mt-3 text-muted">Price</Card.Subtitle>
                        <Card.Text className='fw-bold'>
                            {`$ ${price}`}
                        </Card.Text>
                    </Card.Body>
                </div>
                    <Button variant="primary" onClick={() => addCart()}><i className='bx bx-plus'></i> Add to Cart</Button>
            </Card>
        </div>
    );
};

export default ProductCard;