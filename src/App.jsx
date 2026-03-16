import './App.css'
import { Header, Footer } from './componenets'
import { Outlet } from 'react-router-dom'

function App() {

  return (
    <>
     <Header/>
     <Outlet/>
     <Footer/>
    </>
  )
}

export default App
