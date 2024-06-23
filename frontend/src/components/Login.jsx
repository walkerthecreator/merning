import axios from "axios"
import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import Store from "../hooks/context"

function Login(){

    const { user , setUser } = useContext(Store)

    const [ formData , setFormData ] = useState({ username : "" , password : "" })
    const [isLoading , setIsLoading ] = useState(false)
    const navigate = useNavigate()

    function handleChange(e){
        const { name , value } = e.target
        setFormData( (prev) => ({ ...prev , [name] : value }) )
    }

    async function handleSubmit(e){
        try{
            setIsLoading(true)
            e.preventDefault()
            console.log(formData)    
            const response = await axios.post('http://localhost:3000/user/login' , formData )
            console.log(response)
            if(response.data.token){
                    setUser(response.data.token , "nitin" )
                    navigate('/')
            }
        }
        catch(err){
            console.log("oops" , err.message)
        }
        finally{
            setIsLoading(false)
        }
    }

    return <section className="bg-gray-50 dark:bg-gray-900">
    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
            <img className="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo" />
            Flowbite    
        </a>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                    Sign in to your account
                </h1>
                <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Username</label>
                        <input onChange={(e)=>{ handleChange(e) }} type="text" name="username" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="username" required="" />
                    </div>
                    <div>
                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                        <input onChange={(e)=>{ handleChange(e) }} type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="flex items-start">
                            <div className="flex items-center h-5">
                              <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800" required="" />
                            </div>
                            <div className="ml-3 text-sm">
                              <label htmlFor="remember" className="text-gray-500 dark:text-gray-300">Remember me</label>
                            </div>
                        </div>
                        <a href="#" className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500">Forgot password?</a>
                    </div>
                    <button disabled={isLoading ? true : false} className="w-full text-white bg-blue-600 disabled:bg-blue-400 disabled:cursor-wait hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        { isLoading ?  "Loading..." : "Sign In" }
                    </button>
                    <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                        Don’t have an account yet? <a href="#" className="font-medium text-blue-600 hover:underline dark:text-blue-500">Sign up</a>
                    </p>
                </form>
            </div>
        </div>


    </div>
  </section>
}

export default Login