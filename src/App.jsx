import react,{ useState } from 'react'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Home from './Pages/Home/Home'
import Login from './Pages/Login/Login'
import Register from './Pages/Register/Register'
import ProtectedPages from './Components/ProtectedPages'
import Loader from './Components/Loader/Loader'
import { useSelector } from 'react-redux'
import Profile from './Pages/Profile/Profile'



function App() {
  const {loading} = useSelector((state)=>state.loader);


return (
  <> {loading&&<Loader/>}
  <BrowserRouter>

<Routes>
  <Route path="/" element={
    <ProtectedPages>
    <Home/>
    </ProtectedPages>
    }/>
  <Route path="/profile" element={
    <ProtectedPages>
    <Profile/>
    </ProtectedPages>
    }/>
 
  <Route path="/login" element={<Login/>}/>
  <Route path="/register" element={<Register/>}/>
</Routes>

</BrowserRouter></>

  )
}

export default App
