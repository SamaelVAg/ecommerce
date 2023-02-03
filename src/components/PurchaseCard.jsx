import React from 'react';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import Image from 'react-bootstrap/Image';
import { useNavigate } from 'react-router-dom';

const PurchaseCard = ( {purchase} ) => {

    const navigate = useNavigate()

    const {createdAt, productId, quantity, product} = purchase
    const {title, price, images:[ , , {url}] } = product

    console.log(purchase)

    return (
        <div>
            <Card className='mb-4'onClick={() => navigate(`/product/${purchase.product.id}`)}>
                <Card.Header>Purchased: {createdAt.substr(0,10)}</Card.Header>
                <Card.Body>
                    <Row>
                        <Col sm={2} style={{ height: '100px' }}>
                            <Image src={url} className='product-img'></Image>
                        </Col>
                        <Col sm={5}>
                            <Card.Title>{title}</Card.Title>
                        </Col>
                        <Col sm={5} >
                            <Row style={{height:'100px'}}>
                                <Col align="center">
                                    <strong className='text-muted'>{quantity}</strong>
                                </Col>
                                <Col align="center">
                                    <strong>{`$ ${(quantity * price).toFixed(2)}`}</strong>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        </div>
    );
};

export default PurchaseCard;