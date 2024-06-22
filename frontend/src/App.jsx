import { useEffect } from "react"
import axios from "axios"
import Login from "./components/Login.jsx"

const App = () => {

    useEffect(()=>{
        async function callServer(){
            const response = await axios.get('http://localhost:3000/blogs')
            const data = response.data
            console.log(data)
        }

        // callServer()
    } , [])


  return (
    <div>
      <Login></Login>
    </div>
  )
}

export default App