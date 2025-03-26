import React, { useEffect } from 'react'
import Header from '../../Shared/Header'
import { Footer } from '../../Shared/Footer'
import { ROUTH_PATHS } from '../../../Router/RouthPath'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
const Layout = () => {
    const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if(location.pathname === "/"){
      navigate(ROUTH_PATHS.LANDING_PAGE)
    }
  },[location.pathname,navigate])
  return (
    <div>
        <Header/>
        <Outlet/>
        <Footer/>
    </div>
  )
}

export default Layout