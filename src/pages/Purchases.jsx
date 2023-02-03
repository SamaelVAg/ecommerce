import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import PurchaseCard from '../components/PurchaseCard';
import { getPurchasesThunk } from '../store/slices/purchases.Slice';

const Purchases = () => {

    
    const dispatch = useDispatch()
    const purchases = useSelector(state => state.purchases)
    
    useEffect(() => {
        dispatch(getPurchasesThunk())
    }, [])


    return (
        <div>
            <h1 className='mb-5'>Purchases</h1>
            <ul>
                {
                    purchases.map(purchase => (
                        <PurchaseCard key={purchase.id} purchase={purchase}></PurchaseCard>
                    ))
                }
            </ul>
        </div>
    );
};

export default Purchases;