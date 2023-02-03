import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import getConfig from '../../utils/getConfig';
import { setIsLoading } from './isLoading.slice';

export const cartSlice = createSlice({
    name: 'cart',
    initialState: [],
    reducers: {
        setCart: (state, action) => {
            const cart = action.payload
            return cart
        }
    }
})

export const getCartThunk = () => (dispatch) => {
    dispatch(setIsLoading(true));
    return axios.get('https://e-commerce-api-v2.academlo.tech/api/v1/cart', getConfig())
        .then(res => dispatch(setCart(res.data)))
        .finally(() => dispatch(setIsLoading(false)));
}

export const postCartThunk = (data) => (dispatch) => {
    return axios.post('https://e-commerce-api-v2.academlo.tech/api/v1/cart', data, getConfig())
        .then(() => dispatch(getCartThunk()))
        .catch(error => console.log(error.response))
}

export const putCartThunk = (id, data) => (dispatch) => {
    return axios.put(`https://e-commerce-api-v2.academlo.tech/api/v1/cart/${id}`, data, getConfig())
        .then(() => dispatch(getCartThunk()))
        .catch(error => console.log(error.response))
}

export const deleteCartThunk = (id) => (dispatch) => {
    dispatch(setIsLoading(true));
    return axios.delete(`https://e-commerce-api-v2.academlo.tech/api/v1/cart/${id}`, getConfig())
        .then(() => dispatch(getCartThunk()))
}

export const { setCart } = cartSlice.actions;

export default cartSlice.reducer;
