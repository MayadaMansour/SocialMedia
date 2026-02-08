import Navbar from '../componant/Navbar'
import { Outlet } from 'react-router-dom'

export default function MainLayout() {
  return (
    <>
    <Navbar/>
     <Outlet/>
    </>
  )
}
