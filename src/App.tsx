import './styles/global.scss'

import { BrowserRouter, Routes, Route, } from 'react-router-dom'
import { useState } from 'react'
import { decodeToken } from "react-jwt" //deploy

import IndexPage from './Pages/IndexPage/IndexPage.tsx'
import SignupPage from './Pages/SignupPage/SignupPage.tsx'
import LoginPage from './Pages/LoginPage/LoginPage.tsx'
import ProfilePage from './Pages/ProfilePage/ProfilePage.tsx'
import EditProfilePage from './Pages/EditProfilePage/EditProfilePage.tsx'
import MapPage from './Pages/MapPage/MapPage.tsx'
import axios from 'axios'




function App() { 

  const [coords, setCoords] = useState({})
  const [decodedToken, setDecodedToken] = useState<string | null>('')
  const [serverLoading, setServerLoading] = useState<string>('')

  function giveCoords(): void{
    navigator.geolocation.getCurrentPosition(success)
    function success (pos: GeolocationPosition){
      setCoords({
            lat : pos.coords.latitude,
            lng: pos.coords.longitude
        })
        }
        // setCoords({
        //     lat : 49.2827,
        //     lng: -123.1207
        // })
  }

  async function loading():Promise<void> {
    const {data} = await axios.get(import.meta.env.VITE_BASE_URL)
    setServerLoading(data)
  }
  
  loading()

  function getLoginId(): void {
    const token: string | null = sessionStorage.getItem("authToken")
    if(token){
      const decodedToken: string | null = decodeToken(token)
      setDecodedToken(decodedToken)
    }
  }

  return (
    <>

    {!serverLoading ? <h1 className='loading'>THE SERVER IS BOOTING UP TO LOAD ASSETS, PLEASE WAIT...</h1> : null}

    <BrowserRouter>
      <Routes>
        <Route path='/' element={<IndexPage/>}/>
        <Route path='/login' element={<LoginPage decodedToken={decodedToken} getLoginId={getLoginId}/>}/>
        <Route path='/signup' element={<SignupPage/>}/>
        <Route path='/profile/:id' element={<ProfilePage giveCoords={giveCoords} coords={coords} decodedToken={decodedToken} getLoginId={getLoginId}/>}/>
        <Route path='/map' element={<MapPage giveCoords={giveCoords} coords={coords} decodedToken={decodedToken} getLoginId={getLoginId}/>}/>
        <Route path='/edit' element={<EditProfilePage decodedToken={decodedToken} getLoginId={getLoginId}/>}/>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
