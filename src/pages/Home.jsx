import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import ListGroup from 'react-bootstrap/ListGroup';
import Accordion from 'react-bootstrap/Accordion';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { useDispatch, useSelector } from 'react-redux';
import { getProductsThunk, productsCategoryThunk, productsNameThunk } from '../store/slices/products.slice';

import ProductCard from '../components/ProductCard';
import axios from 'axios';

const Home = () => {

    const dispatch = useDispatch()
    const productLists = useSelector(state => state.products)

    const [apiCategory, setApiCategory] = useState([])
    const [productSearch, setProductSearch] = useState('')
    const [priceMax, setPriceMax] = useState(100)

    const priceUpdate = (e) => {
        const max = e.target.value
        if(max > 100){
            setPriceMax(max - 100)
        }else{
            setPriceMax(100)
        }
    }

    const apiRequest = () => {
        axios.get('https://e-commerce-api-v2.academlo.tech/api/v1/categories')
            .then(res => setApiCategory(res.data))
    }

    useEffect(() => {
        dispatch(getProductsThunk())
        apiRequest()
    }, [])

    return (
        <div>
            <Row>
                {/* Filter zone */}
                <Col lg={3}>
                    <p className='text-primary'><strong>Filter:</strong></p>
                    <Accordion>
                        <Accordion.Item eventKey="0">
                            <Accordion.Header>Categories</Accordion.Header>
                            <Accordion.Body>
                                <ListGroup variant='flush' >
                                    <ListGroup.Item action onClick={() => {
                                        dispatch(getProductsThunk())
                                        setProductSearch('')
                                    }}>
                                        All products
                                    </ListGroup.Item>
                                    {
                                        apiCategory.map(category => (
                                            <ListGroup.Item action
                                                key={category.id}
                                                onClick={() => dispatch(productsCategoryThunk(category.id))}>
                                                {category.name}
                                            </ListGroup.Item>
                                        ))
                                    }
                                </ListGroup>
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="1">
                            <Accordion.Header>Price range</Accordion.Header>
                            <Accordion.Body>
                                <form>
                                    <fieldset>
                                        <Row>
                                            <input type="range" className="form-range" min="100" max="10100" step="1000" id="priceRange" 
                                            onChange={e => priceUpdate(e)}/>
                                            <Col sm={6} className='text-start align-top'>
                                                <small className='text-muted p-0'>100</small>
                                            </Col>
                                            <Col sm={6} className='text-end align-top'>
                                                <small className='text-muted  p-0 '>10,000</small>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Button className='mt-2 px-5'
                                                variant="outline-primary"
                                                id="button-addon2" onClick={() => alert(`max: ${priceMax}`)}>
                                                Filter
                                            </Button>
                                        </Row>
                                    </fieldset>

                                </form>
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                </Col>
                {/* Product zone */}
                <Col>
                    <InputGroup size='lg' className="mb-4">
                        <Form.Control
                            placeholder="Search"
                            aria-label="Search"
                            aria-describedby="basic-addon2"
                            value={productSearch}
                            onChange={e => setProductSearch(e.target.value)}
                        />
                        <Button className='px-5'
                            variant="outline-primary"
                            id="button-addon2" onClick={() => dispatch(productsNameThunk(productSearch))}>
                            <i className='bx bx-search'></i>
                        </Button>
                    </InputGroup>

                    <Row xs={1} md={2} lg={3} className='g-4'>
                        {
                            productLists.map(product => (
                                <Col key={product.id} >
                                    <ProductCard product={product} />
                                </Col>
                            ))
                        }
                    </Row>
                </Col>
            </Row>



        </div>
    );
};

export default Home;