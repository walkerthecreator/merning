import { createContext , useState } from "react";


const init = {
    token : null ,
    isAuth : false ,
    username : null ,
}

const Store = createContext()

export const StoreProvider = ({children}) => {
    
    const [ user , setUser] = useState(init)

    function setUserValue(token , username){
        localStorage.setItem("token" , token)
        setUser({ token : token , username : username , isAuth : true })
    }

    function removeUser(){
        localStorage.removeItem('token')
        setUser(init)
    }

    return <Store.Provider value={{ user , setUser : setUserValue , removeUser  }}>
        {children}
    </Store.Provider> 
}

export default Store
