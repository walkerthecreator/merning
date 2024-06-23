import { useEffect } from "react"
import axios from "axios"
import Login from "./components/Login.jsx"
import { Route , Routes } from "react-router-dom"

const App = () => {


  return (
      <Routes>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/" element={<h1>welcome to homepage</h1>}></Route>
      </Routes>
  )
}

export default App