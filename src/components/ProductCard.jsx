import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const ProductCard = ( {product} ) => {

    const navigate = useNavigate()

    const { id, title, price, images } = product

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
                    <Button variant="primary" onClick={() => alert('Added')}><i className='bx bx-plus'></i> Add to Cart</Button>
            </Card>
        </div>
    );
};

export default ProductCard;