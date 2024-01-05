import React,{ useState, useEffect } from "react"
import axios from "axios"
import jwt_decode from "jwt-decode"
import { useNavigate } from "react-router-dom"

const MenuDashboard = () => {
    // variabel sistem utama
    const [, setToken] = useState("")
    const [expire, setExpire] = useState("")
    const navigate = useNavigate()
    // Sistem utama
    useEffect(()=>{
        refreshToken()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    const refreshToken = async() => {
        try {
            const response = await axios.get("http://localhost:5000/tokenBE")
            setToken(response.data.accessToken)
            const decoded = jwt_decode(response.data.accessToken)
            setExpire(decoded.exp)
            navigate(`/menu-dashboard/${decoded.panggilan}`, { replace: true })
        } catch (error) {
            if(error.response){
                navigate("/", { replace: true })
            }   
        }
    }
    const axiosJWT = axios.create()
    axiosJWT.interceptors.request.use(async(config) => {
        const currentDate = new Date()
        if(expire * 1000 < currentDate.getTime()){
            const response = await axios.get("http://localhost:5000/tokenBE")
            config.headers.Authorization = `Bearer ${response.data.accessToken}`
            setToken(response.data.accessToken)
            const decoded = jwt_decode(response.data.accessToken)
            setExpire(decoded.exp)
        }
        return config
    }, (error)=>{
        return Promise.reject(error)
    })
    // Halaman
    return (
        <div id="background-home">
        </div>
    )
}

export default MenuDashboard