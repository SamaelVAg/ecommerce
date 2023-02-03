import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { productsCategoryThunk } from '../store/slices/products.slice';
import Carousel from 'react-bootstrap/Carousel';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import ProductCard from '../components/ProductCard';
import { postCartThunk } from '../store/slices/cart.slice';

const Product = () => {

    const { id } = useParams()
    const relatedList = useSelector(state => state.products)

    const dispatch = useDispatch()

    const [apiResponse, setApiResponse] = useState({})
    const [index, setIndex] = useState(0);
    const [quant, setQuant] = useState(1)

    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
    }

    const modQuant = (btn) => {
        const act = Number(quant)
        if(btn === 'add'){
            setQuant(act + 1)
        }else if(btn === 'remove' && quant > 1){
            setQuant(act - 1)
        }
    }

    const addCart = () => {
        const body = {
            quantity: quant,
            productId: id
        }
        dispatch(postCartThunk(body))
    }

    const apiRequest = () => {
        axios.get(`https://e-commerce-api-v2.academlo.tech/api/v1/products/${id}`)
            .then(res => {
                setApiResponse(res.data)
                dispatch(productsCategoryThunk(res.data.category.id))
            })
    }

    useEffect(() => {
        apiRequest()
        setQuant(1)
    }, [id])

    return (
        <div>
            <Row className='mb-4'>
                <Col lg={5}>
                    <Carousel variant='dark' activeIndex={index} onSelect={handleSelect} >
                        <Carousel.Item>
                            <div className='img-holder detail'>
                                <img
                                    className="product-img d-block w-100"
                                    src={apiResponse.images?.[0].url}
                                />
                            </div>
                        </Carousel.Item>
                        <Carousel.Item>
                            <div className='img-holder detail'>
                                <img
                                    className="product-img d-block w-100"
                                    src={apiResponse.images?.[1].url}
                                />
                            </div>
                        </Carousel.Item>
                        <Carousel.Item>
                            <div className='img-holder detail   '>
                                <img
                                    className="product-img d-block w-100"
                                    src={apiResponse.images?.[2].url}
                                />
                            </div>
                        </Carousel.Item>
                    </Carousel>
                </Col>
                <Col lg={7} className='ps-5'>
                    <h1 className='ps-3 h-25'>{apiResponse.title}</h1>
                    <p className='h-50'>{apiResponse.description}</p>
                    <Row className='h-25'>
                        <Col>
                            <small className='text-muted'>Price:</small>
                            <p><strong>{`$ ${apiResponse.price}`}</strong></p>
                        </Col>
                        <Col sm={3}>
                            <small className='text-muted'>Quantity:</small>
                            <InputGroup>
                                <Button variant="outline-secondary" id="button-addon21" onClick={() => modQuant('remove')}>
                                    <i className='bx bx-minus'></i>
                                </Button>
                                <Form.Control className='text-center'
                                    value={quant}
                                    onChange={e => setQuant(e.target.value)}
                                    aria-label="Text input with 2 buttons" />
                                <Button variant="outline-secondary" id="button-addon22"
                                align="end" onClick={() => modQuant('add')}>
                                    <i className='bx bx-plus'></i>
                                </Button>
                            </InputGroup>
                        </Col>
                        <Button variant="primary" size="lg"
                        onClick={() => addCart()}>
                            <div className='cart-btn'>
                                <span>Add to Cart</span>
                                <i className='bx bx-cart bx-sm' ></i>
                            </div>
                        </Button>
                    </Row>
                </Col>
            </Row>
            <Row className='pt-5 overflow-auto'>
                    {
                        relatedList.map(product => {
                            if (product.id !== Number(id)) {
                                return (
                                    <Col key={product.id}>
                                        <ProductCard product={product} />
                                    </Col>
                                )
                            }
                        })
                    }
            </Row>
        </div>
    );
};

export default Product;