import react,{ useState } from 'react'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Home from './Pages/Home/Home'
import Login from './Pages/Login/Login'
import Register from './Pages/Register/Register'
import ProtectedPages from './Components/ProtectedPages'
import {  Flex, Spin } from 'antd';

function App() {



return (
<BrowserRouter>
<Routes>
  <Route path="/" element={
    <ProtectedPages>
    <Home/>
    </ProtectedPages>
    }/>
  <Route path="/login" element={<Login/>}/>
  <Route path="/register" element={<Register/>}/>
</Routes>
</BrowserRouter>
  )
}

export default App
