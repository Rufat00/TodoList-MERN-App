import { useCallback, useEffect, useState } from "react"


export const useAuth = () =>{
    const [id, setId] = useState(null)
    const [isReady, setIsReady] = useState(false)
    
    const login = useCallback((userId) => {
        setId(userId)
        localStorage.setItem('user', JSON.stringify({
            _id: userId
        }))
    },[]) 
    const logout = () => {
        setId(null)
        localStorage.removeItem('user')
    }

    useEffect(()=>{
        const data = JSON.parse(localStorage.getItem('user'))
        if(data && data._id){
            login(data._id)
        }
        setIsReady(true)
    },[login])

    return {login, logout, id, isReady}
}