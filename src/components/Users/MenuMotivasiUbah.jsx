import React,{ useRef, useState, useEffect } from "react"
import axios from "axios"
import jwt_decode from "jwt-decode"
import { useParams, useNavigate, Link } from "react-router-dom"
// import moment from 'moment'
import "./Sidebar.css"
// const dateTime = new Date()

const MenuDashboard = () => {
    // variabel sistem utama
    const [id, setId] = useState("")
    const [kata, setKata] = useState("")
    const [jenisMotivasi, setJenisMotivasi] = useState("")
    const [panggilan, setPanggilan] = useState("")
    const [, setToken] = useState("")
    const [expire, setExpire] = useState("")
    const [displayLoader, setDisplayLoader] = useState('')
    const [msg, setMsg] = useState("")
    const navigate = useNavigate()
    const { panggilanParams } = useParams();
    // Sistem utama
    useEffect(()=>{
        refreshToken()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    useEffect(()=>{
        selectMotivasiByid()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    const refreshToken = async() => {
        try {
            const response = await axios.get("http://localhost:5000/tokenBE")
            setToken(response.data.accessToken)
            const decoded = jwt_decode(response.data.accessToken)
            setPanggilan(decoded.panggilan)
            setExpire(decoded.exp)
            setDisplayLoader("none")
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
            setPanggilan(decoded.panggilan)
            setExpire(decoded.exp)
        }
        return config
    }, (error)=>{
        return Promise.reject(error)
    })
    const Logout = async() =>{
        try {
            await axios.delete("http://localhost:5000/logoutBE")
            navigate("/", { replace: true })
        } catch (error) {
            console.log(error)
        }
    }
    const selectMotivasiByid = async() =>{
        try{
            const response = await axios.get(`http://localhost:5000/selectMotivasiByIdBE/${panggilanParams}`)
            setId(response.data.id)
            setKata(response.data.kata)
            setJenisMotivasi(response.data.jenisMotivasi)
        }catch(error){
            console.log(error)
        }
    }
    const updateMotivasi = async (e) => {
        e.preventDefault()
        try {
            setDisplayLoader("")
            await axios.patch('http://localhost:5000/updateMotivasiBE',{
                id: id,
                kata: kata,
                jenisMotivasi: jenisMotivasi,
            })
            navigate(`/menu-motivasi/${panggilan}`, { replace: true })
        } catch (error) {
            if(error.response){
                setDisplayLoader("none")
                setMsg(error.response.data.msg)
            }
        }
    }
    // Halaman
    return (
        <div id="wrapper">
            {/* LOADER */}
            <div className="loader-page-bg" style={{display:displayLoader}}>
                <div className="loader-page"></div>
            </div>
            {/* SIDEBAR*/}
            <nav className="navbar-expand-sm bg-navbar">
                <div className="dropdown ml-2"></div>
                <div className="collapse navbar-collapse" id="sidebar">
                    <ul className="navbar-nav sidebar" id="accordionSidebar">
                        <div className="navbar-brand d-flex align-items-center justify-content-center">
                            <h5 className=" mt-4" style={{fontWeight:"700"}}>Vigenesia</h5>
                        </div>
                        <div className="sidebar-heading">Menu Utama</div>
                        <li className="nav-item nav-itemm">
                            <Link className="nav-link nav-linkk" to={`/menu-dashboard/${panggilan}`}><i className="bi bi-columns-gap"></i><span>Dashboard</span></Link>
                        </li>
                        <div className="sidebar-heading">Menu Vigenesia</div>
                        <li className="nav-item nav-itemm">
                            <Link className="nav-link nav-linkk" to={`/menu-profil/${panggilan}`}><i className="bi bi-person-circle"></i><span>Profil</span></Link>
                            <Link className="nav-link nav-linkk" to={`/menu-motivasi/${panggilan}`}><i className="bi bi-chat-square-quote"></i><span>Motivasi</span></Link>
                        </li>
                    </ul>
                </div>
            </nav>
            {/* KONTEN WRAP */}
            <div id="content-wrapper">
                {/* NAVBAR */}
                <nav className="navbar navbar-expand-sm sticky-top nav-bar py-3">
                    <div className="container">
                        <div className="dropdown ml-2">
                            <button className="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#sidebar" aria-controls="sidebar" aria-expanded="false" aria-label="Toggle navigation" style={{border:"none"}}>
                                <i className="bi bi-grid-fill" style={{fontSize:"22px"}}></i>
                            </button>
                        </div>
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0"></ul>
                        <div className="d-flex" role="search">
                            <button onClick={Logout} className="btn btn-logout"><i className="bi bi-power" style={{color:"white",fontSize:"22px"}}></i></button>
                        </div>
                    </div>
                </nav>
                {/* KONTEN */}
                <div className="container-fluid" style={{overflow:"auto",display:"block",width:"100%",height:"88vh"}}>
                    <div className="row justify-content-center mt-5">
                        <div className="col-12 col-md-8 my-4 px-5">
                            <h5 className="text-center mb-5" style={{fontWeight:"700"}}>Ubah Motivasi</h5>
                            <form onSubmit={updateMotivasi}>
                                <div className="col-12 mb-3">
                                    <label htmlFor="kata">Kata Motivasi {kata}</label>
                                    <input type="text" id="kata" className="form-control form" value={kata} onChange={(e)=>setKata(e.target.value)} required/>
                                </div>
                                <div className="col-12 mb-3">
                                    <label htmlFor="jenisMotivasi">Jenis Motivasi</label>
                                    <select className="form-select form" id="jenisMotivasi" aria-label="jenisMotivasi" value={jenisMotivasi} onChange={(e)=>setJenisMotivasi(e.target.value)} required>
                                        <option value="MotivasiPendidikan">Pilih</option>
                                        <option value="MotivasiPendidikan">Motivasi Pendidikan</option>
                                        <option value="MotivasiPekerjaan">Motivasi Pekerjaan</option>
                                        <option value="MotivasiKehidupan">Motivasi Kehidupan</option>
                                        <option value="MotivasiPercintaan">Motivasi Percintaan</option>
                                        <option value="MotivasiEmosional">Motivasi Emosional</option>
                                    </select>
                                    <input type="text" id="id" className="form-disable" value={id} readOnly/>
                                </div>
                                <h6 style={{textAlign:"center",color:"red", margin:"0 0 -10px 0"}}>{msg}</h6>
                                <input type="submit" className="btn btn-webew-login mt-4" value="Ubah Motivasi"/>
                            </form>
                        </div>
                    </div>
                    <div className="navbot">
                        <div className="container fixed-bottom" style={{width:"100%",height:"auto",background:"white", padding:"10px 15px 10px 15px",borderRadius:"50px",boxShadow: "0 0 20px 7px #dddddd53"}}>
                            <div className="row">
                                <div className="col-4"><Link to={`/menu-dashboard/${panggilan}`} className="btn btn-webew-product" style={{padding:"4px 0 4px 0",marginTop:"3px"}} aria-label="dashboard vigenesia"><i className="bi bi-caret-left-fill" style={{color:"white"}}></i></Link></div>
                                <div className="col-4">
                                    <div className="dropdown-center">
                                        <button className="btn btn-webew-product" type="button" data-bs-toggle="dropdown" aria-expanded="false" style={{padding:"7px 0 7px 0"}}><i className="bi bi-grid-fill" style={{color:"white"}}></i></button>
                                        <ul className="dropdown-menu text-center mb-3">
                                            <li><Link to={`/menu-dashboard/${panggilan}`} className="dropdown-item" aria-label="menu dashboard" style={{fontSize:"13pt"}}>Dahsboard</Link></li>
                                            <li><Link to={`/menu-profil/${panggilan}`} className="dropdown-item" aria-label="menu profil" style={{fontSize:"13pt"}}>Profil</Link></li>
                                            <li><Link to={`/menu-motivasi/${panggilan}`} className="dropdown-item" aria-label="menu motivasi" style={{fontSize:"13pt"}}>Motivasi</Link></li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="col-4"><button onClick={Logout} className="btn btn-webew-product" style={{padding:"4px 0 4px 0",marginTop:"3px"}} aria-label="logout vigenesia"><i className="bi bi-power" style={{color:"white"}}></i></button></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MenuDashboard