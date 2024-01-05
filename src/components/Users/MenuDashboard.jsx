import React,{ useRef, useState, useEffect } from "react"
import axios from "axios"
import jwt_decode from "jwt-decode"
import { useNavigate, Link } from "react-router-dom"
// import moment from 'moment'
import "./Sidebar.css"
// const dateTime = new Date()

const MenuDashboard = () => {
    // variabel sistem utama
    const [panggilan, setPanggilan] = useState("")
    const [, setToken] = useState("")
    const [expire, setExpire] = useState("")
    const [dataResponse1, setDataResponse1] = useState([])
    const [dataResponse2, setDataResponse2] = useState([])
    const [dataResponse3, setDataResponse3] = useState([])
    const [dataResponse4, setDataResponse4] = useState([])
    const [dataResponse5, setDataResponse5] = useState([])
    const [dataResponse6, setDataResponse6] = useState([])
    const [display, setDisplay] = useState("show")
    const [displayPendidikan, setDisplayPendidikan] = useState("")
    const [displayPekerjaan, setDisplayPekerjaan] = useState("")
    const [displayKehidupan, setDisplayKehidupan] = useState("")
    const [displayPercintaan, setDisplayPercintaan] = useState("")
    const [displayEmosional, setDisplayEmosional] = useState("")
    const navigate = useNavigate()
    // Sistem utama
    useEffect(()=>{
        refreshToken()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    useEffect(()=>{
        selectDataMotivasi()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    const refreshToken = async() => {
        try {
            const response = await axios.get("http://localhost:5000/tokenBE")
            setToken(response.data.accessToken)
            const decoded = jwt_decode(response.data.accessToken)
            setPanggilan(decoded.panggilan)
            setExpire(decoded.exp)
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
    const selectDataMotivasi = async() =>{
        try{
            const response1 = await axios.get('http://localhost:5000/selectAllMotivasiBE')
            const response2 = await axios.get('http://localhost:5000/selectMotivasiByJenisMotivasiBE/MotivasiPendidikan')
            const response3 = await axios.get('http://localhost:5000/selectMotivasiByJenisMotivasiBE/MotivasiPekerjaan')
            const response4 = await axios.get('http://localhost:5000/selectMotivasiByJenisMotivasiBE/MotivasiKehidupan')
            const response5 = await axios.get('http://localhost:5000/selectMotivasiByJenisMotivasiBE/MotivasiPercintaan')
            const response6 = await axios.get('http://localhost:5000/selectMotivasiByJenisMotivasiBE/MotivasiEmosional')
            setDataResponse1(response1.data)
            setDataResponse2(response2.data)
            setDataResponse3(response3.data)
            setDataResponse4(response4.data)
            setDataResponse5(response5.data)
            setDataResponse6(response6.data)
        }catch(error){
            console.log(error)
        }
    }
    const btnMotivasi = () => {
        setDisplay("show")
        setDisplayPendidikan("")
        setDisplayPekerjaan("")
        setDisplayKehidupan("")
        setDisplayPercintaan("")
        setDisplayEmosional("")
    }
    const btnMotivasiPendidikan = () => {
        setDisplayPendidikan("show")
        setDisplay("")
        setDisplayPekerjaan("")
        setDisplayKehidupan("")
        setDisplayPercintaan("")
        setDisplayEmosional("")
    }
    const btnMotivasiPekerjaan = () => {
        setDisplayPekerjaan("show")
        setDisplay("")
        setDisplayPendidikan("")
        setDisplayKehidupan("")
        setDisplayPercintaan("")
        setDisplayEmosional("")
    }
    const btnMotivasiKehidupan = () => {
        setDisplayKehidupan("show")
        setDisplay("")
        setDisplayPendidikan("")
        setDisplayPekerjaan("")
        setDisplayPercintaan("")
        setDisplayEmosional("")
    }
    const btnMotivasiPercintaan = () => {
        setDisplayPercintaan("show")
        setDisplay("")
        setDisplayPendidikan("")
        setDisplayPekerjaan("")
        setDisplayKehidupan("")
        setDisplayEmosional("")
    }
    const btnMotivasiEmosional = () => {
        setDisplayEmosional("show")
        setDisplay("")
        setDisplayPendidikan("")
        setDisplayPekerjaan("")
        setDisplayKehidupan("")
        setDisplayPercintaan("")
    }
    // Halaman
    return (
        <div id="wrapper">
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
                        <div className="dropdown-center ml-2">
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
                    <h5 className="text-center mt-4" style={{fontWeight:"700"}}>Motivasi Untuk Kamu</h5>
                    <div className="row justify-content-center">
                        <div className="col-12 col-md-7 mt-4 mb-5">
                            <div className="dropdown-center mb-4">
                                <button className="btn btn-webew-product" type="button" data-bs-toggle="dropdown" aria-expanded="false" style={{padding:"7px 0 7px 0"}}><i className="bi bi-filter" style={{color:"white"}}></i> Sortir</button>
                                <ul className="dropdown-menu text-center mt-3">
                                    <li><button onClick={btnMotivasi} className="dropdown-item" aria-label="Motivasi" style={{fontSize:"13pt"}}>Tampilkan Semua Motivasi</button></li>
                                    <li><button onClick={btnMotivasiPendidikan} className="dropdown-item" aria-label="Motivasi" style={{fontSize:"13pt"}}>Tampilkan Motivasi Pendidikan</button></li>
                                    <li><button onClick={btnMotivasiPekerjaan} className="dropdown-item" aria-label="Motivasi" style={{fontSize:"13pt"}}>Tampilkan Motivasi Pekerjaan</button></li>
                                    <li><button onClick={btnMotivasiKehidupan} className="dropdown-item" aria-label="Motivasi" style={{fontSize:"13pt"}}>Tampilkan Motivasi Kehidupan</button></li>
                                    <li><button onClick={btnMotivasiPercintaan} className="dropdown-item" aria-label="Motivasi" style={{fontSize:"13pt"}}>Tampilkan Motivasi Percintaan</button></li>
                                    <li><button onClick={btnMotivasiEmosional} className="dropdown-item" aria-label="Motivasi" style={{fontSize:"13pt"}}>Tampilkan Motivasi Emosional</button></li>
                                </ul>
                            </div>
                            <table className="my-5" style={{display:display}}>
                                { display === "show"
                                    ?<tbody>
                                        {dataResponse1.map((user,index)=>(
                                            <tr key={dataResponse1.id}>
                                                <td style={{width:"100%"}}>
                                                    <div className="box p-3 mb-4">
                                                        { user.urlFoto === null
                                                            ? <img src="/img/profil/default.jpg" className="mx-auto d-block" alt="foto" style={{minWidth:"30px",maxWidth:"30px",borderRadius:"30px"}}/>
                                                            : <img src={user.urlFoto} className="mx-auto d-block" alt="foto" style={{minWidth:"30px",maxWidth:"30px",borderRadius:"30px"}}/>
                                                        }
                                                        <p style={{backgroundColor:"white",textAlign:"center",borderRadius:"20px",padding:"5px 7px 5px 7px",fontSize:"13px",fontWeight:"700"}}>{user.name}</p>
                                                        <p style={{backgroundColor:"white",textAlign:"left",borderRadius:"20px",padding:"0px 10px 0px 10px",fontSize:"13px",fontWeight:"600"}}>{user.kata}</p>
                                                        <p style={{backgroundColor:"white",textAlign:"left",borderRadius:"20px",padding:"0px 10px 0px 10px",fontSize:"13px",fontWeight:"700"}}>#{user.jenisMotivasi}</p>
                                                        <p style={{backgroundColor:"white",textAlign:"left",borderRadius:"20px",padding:"0px 10px 0px 10px",fontSize:"13px",fontWeight:"600"}}>{user.createdAt.substring(0,10)}</p>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                    :""
                                }
                                { displayPendidikan === "show"
                                    ?<tbody>
                                        {dataResponse2.map((user,index)=>(
                                            <tr key={dataResponse2.id}>
                                                <td style={{width:"100%"}}>
                                                    <div className="box p-3 mb-4">
                                                        { user.urlFoto === null
                                                            ? <img src="/img/profil/default.jpg" className="mx-auto d-block" alt="foto" style={{minWidth:"30px",maxWidth:"30px",borderRadius:"30px"}}/>
                                                            : <img src={user.urlFoto} className="mx-auto d-block" alt="foto" style={{minWidth:"30px",maxWidth:"30px",borderRadius:"30px"}}/>
                                                        }
                                                        <p style={{backgroundColor:"white",textAlign:"center",borderRadius:"20px",padding:"5px 7px 5px 7px",fontSize:"13px",fontWeight:"700"}}>{user.name}</p>
                                                        <p style={{backgroundColor:"white",textAlign:"left",borderRadius:"20px",padding:"0px 10px 0px 10px",fontSize:"13px",fontWeight:"600"}}>{user.kata}</p>
                                                        <p style={{backgroundColor:"white",textAlign:"left",borderRadius:"20px",padding:"0px 10px 0px 10px",fontSize:"13px",fontWeight:"700"}}>#{user.jenisMotivasi}</p>
                                                        <p style={{backgroundColor:"white",textAlign:"left",borderRadius:"20px",padding:"0px 10px 0px 10px",fontSize:"13px",fontWeight:"600"}}>{user.createdAt.substring(0,10)}</p>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                    :""
                                }
                                { displayPekerjaan === "show"
                                    ?<tbody>
                                        {dataResponse3.map((user,index)=>(
                                            <tr key={dataResponse3.id}>
                                                <td style={{width:"100%"}}>
                                                    <div className="box p-3 mb-4">
                                                        { user.urlFoto === null
                                                            ? <img src="/img/profil/default.jpg" className="mx-auto d-block" alt="foto" style={{minWidth:"30px",maxWidth:"30px",borderRadius:"30px"}}/>
                                                            : <img src={user.urlFoto} className="mx-auto d-block" alt="foto" style={{minWidth:"30px",maxWidth:"30px",borderRadius:"30px"}}/>
                                                        }
                                                        <p style={{backgroundColor:"white",textAlign:"center",borderRadius:"20px",padding:"5px 7px 5px 7px",fontSize:"13px",fontWeight:"700"}}>{user.name}</p>
                                                        <p style={{backgroundColor:"white",textAlign:"left",borderRadius:"20px",padding:"0px 10px 0px 10px",fontSize:"13px",fontWeight:"600"}}>{user.kata}</p>
                                                        <p style={{backgroundColor:"white",textAlign:"left",borderRadius:"20px",padding:"0px 10px 0px 10px",fontSize:"13px",fontWeight:"700"}}>#{user.jenisMotivasi}</p>
                                                        <p style={{backgroundColor:"white",textAlign:"left",borderRadius:"20px",padding:"0px 10px 0px 10px",fontSize:"13px",fontWeight:"600"}}>{user.createdAt.substring(0,10)}</p>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                    :""
                                }
                                { displayKehidupan === "show"
                                    ?<tbody>
                                        {dataResponse4.map((user,index)=>(
                                            <tr key={dataResponse4.id}>
                                                <td style={{width:"100%"}}>
                                                    <div className="box p-3 mb-4">
                                                        { user.urlFoto === null
                                                            ? <img src="/img/profil/default.jpg" className="mx-auto d-block" alt="foto" style={{minWidth:"30px",maxWidth:"30px",borderRadius:"30px"}}/>
                                                            : <img src={user.urlFoto} className="mx-auto d-block" alt="foto" style={{minWidth:"30px",maxWidth:"30px",borderRadius:"30px"}}/>
                                                        }
                                                        <p style={{backgroundColor:"white",textAlign:"center",borderRadius:"20px",padding:"5px 7px 5px 7px",fontSize:"13px",fontWeight:"700"}}>{user.name}</p>
                                                        <p style={{backgroundColor:"white",textAlign:"left",borderRadius:"20px",padding:"0px 10px 0px 10px",fontSize:"13px",fontWeight:"600"}}>{user.kata}</p>
                                                        <p style={{backgroundColor:"white",textAlign:"left",borderRadius:"20px",padding:"0px 10px 0px 10px",fontSize:"13px",fontWeight:"700"}}>#{user.jenisMotivasi}</p>
                                                        <p style={{backgroundColor:"white",textAlign:"left",borderRadius:"20px",padding:"0px 10px 0px 10px",fontSize:"13px",fontWeight:"600"}}>{user.createdAt.substring(0,10)}</p>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                    :""
                                }
                                { displayPercintaan === "show"
                                    ?<tbody>
                                        {dataResponse5.map((user,index)=>(
                                            <tr key={dataResponse5.id}>
                                                <td style={{width:"100%"}}>
                                                    <div className="box p-3 mb-4">
                                                        { user.urlFoto === null
                                                            ? <img src="/img/profil/default.jpg" className="mx-auto d-block" alt="foto" style={{minWidth:"30px",maxWidth:"30px",borderRadius:"30px"}}/>
                                                            : <img src={user.urlFoto} className="mx-auto d-block" alt="foto" style={{minWidth:"30px",maxWidth:"30px",borderRadius:"30px"}}/>
                                                        }
                                                        <p style={{backgroundColor:"white",textAlign:"center",borderRadius:"20px",padding:"5px 7px 5px 7px",fontSize:"13px",fontWeight:"700"}}>{user.name}</p>
                                                        <p style={{backgroundColor:"white",textAlign:"left",borderRadius:"20px",padding:"0px 10px 0px 10px",fontSize:"13px",fontWeight:"600"}}>{user.kata}</p>
                                                        <p style={{backgroundColor:"white",textAlign:"left",borderRadius:"20px",padding:"0px 10px 0px 10px",fontSize:"13px",fontWeight:"700"}}>#{user.jenisMotivasi}</p>
                                                        <p style={{backgroundColor:"white",textAlign:"left",borderRadius:"20px",padding:"0px 10px 0px 10px",fontSize:"13px",fontWeight:"600"}}>{user.createdAt.substring(0,10)}</p>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                    :""
                                }
                                { displayEmosional === "show"
                                    ?<tbody>
                                        {dataResponse6.map((user,index)=>(
                                            <tr key={dataResponse6.id}>
                                                <td style={{width:"100%"}}>
                                                    <div className="box p-3 mb-4">
                                                        { user.urlFoto === null
                                                            ? <img src="/img/profil/default.jpg" className="mx-auto d-block" alt="foto" style={{minWidth:"30px",maxWidth:"30px",borderRadius:"30px"}}/>
                                                            : <img src={user.urlFoto} className="mx-auto d-block" alt="foto" style={{minWidth:"30px",maxWidth:"30px",borderRadius:"30px"}}/>
                                                        }
                                                        <p style={{backgroundColor:"white",textAlign:"center",borderRadius:"20px",padding:"5px 7px 5px 7px",fontSize:"13px",fontWeight:"700"}}>{user.name}</p>
                                                        <p style={{backgroundColor:"white",textAlign:"left",borderRadius:"20px",padding:"0px 10px 0px 10px",fontSize:"13px",fontWeight:"600"}}>{user.kata}</p>
                                                        <p style={{backgroundColor:"white",textAlign:"left",borderRadius:"20px",padding:"0px 10px 0px 10px",fontSize:"13px",fontWeight:"700"}}>#{user.jenisMotivasi}</p>
                                                        <p style={{backgroundColor:"white",textAlign:"left",borderRadius:"20px",padding:"0px 10px 0px 10px",fontSize:"13px",fontWeight:"600"}}>{user.createdAt.substring(0,10)}</p>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                    :""
                                }
                            </table>
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
                                            <li><Link to={`/menu-dashboard/${panggilan}`} className="dropdown-item" aria-label="Dashboard" style={{fontSize:"13pt"}}>Dahsboard</Link></li>
                                            <li><Link to={`/menu-profil/${panggilan}`} className="dropdown-item" aria-label="Profil" style={{fontSize:"13pt"}}>Profil</Link></li>
                                            <li><Link to={`/menu-motivasi/${panggilan}`} className="dropdown-item" aria-label="Motivasi" style={{fontSize:"13pt"}}>Motivasi</Link></li>
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