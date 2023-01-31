import {HashRouter, Route, Routes} from 'react-router-dom'
import { useSelector } from 'react-redux'
import Container from 'react-bootstrap/Container';

import AppNavbar from './components/AppNavbar'
import LoadingScreen from './components/LoadingScreen'
import Home from './pages/Home'
import Product from './pages/Product'
import Purchases from './pages/Purchases'
import Login from './pages/Login'

import './App.css'

function App() {

  const isLoading = useSelector(state => state.isLoading)

  return (
    <HashRouter>
      <AppNavbar />
      { isLoading && <LoadingScreen /> }
      <Container className='my-5'>
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/product/:id' element={<Product />}></Route>
          <Route path='/purchases' element={<Purchases />}></Route>
          <Route path='/login' element={<Login />}></Route>
        </Routes>
      </Container>
    </HashRouter>
  )
}

export default App
