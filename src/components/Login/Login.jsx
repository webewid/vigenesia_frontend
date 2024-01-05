import React,{ useState, useEffect } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [msg, setMsg] = useState("")
    const [displayLoader, setDisplayLoader] = useState("")
    const navigate = useNavigate()

    useEffect(()=>{
        setDisplayLoader("none")
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    const Auth = async(e)=>{
        e.preventDefault()
        try {
            setDisplayLoader("")
            await axios.post("http://localhost:5000/loginBE",{
                email: email,
                password: password
            })
            navigate("/menu-loading", { replace: true })
            // setMsg("Maaf dalam Pemeliharaan")
        } catch (error) {
            if(error.response){
                setDisplayLoader("none")
                setMsg(error.response.data.msg)
            }
        }
    }
    // Halaman
    return (
        <div>
            <div className="loader-page-bg" style={{display:displayLoader}}>
                <div className="loader-page"></div>
            </div>
            <div className="container mb-4" style={{marginTop:"48px"}}>
                <div className="row justify-content-center">
                    <div className="col-11 col-sm-8 col-md-6 col-lg-5 col-xl-4">
                        <div className="box-login">
                            <h4 className="text-center" style={{fontWeight:"700"}}>Login Vigenesia</h4>
                            <form onSubmit={Auth}>
                                <h6 style={{textAlign:"center",marginTop:"15px",marginBottom:"-10px",color:"red"}}>{msg}</h6>
                                <label htmlFor="email" className="mx-2"></label>
                                <input type="email" id="email" className="form-control form mb-2" placeholder="Masukan email" value={email} onChange={(e) => setEmail(e.target.value)} required autoFocus/>
                                <label htmlFor="password" className="mx-2"></label>
                                <input type="password" id="password" className="form-control form mb-4" placeholder="Masukan password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
                                <input type="submit" className="btn btn-webew-login mb-4 mt-3" value="Login"/>
                                <a href="/menu-register" style={{color:"rgb(0, 86, 247)", margin:"auto", display:"block", textAlign:"center", fontSize:"11pt"}}>Belum punya akun ? daftar disini</a>
                                <a href="/menu-lupa-password" style={{color:"rgb(0, 86, 247)", margin:"auto", display:"block", textAlign:"center", fontSize:"11pt"}}>Lupa Password ? klik disini</a>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <div className="navbot">
                <div className="container fixed-bottom" style={{width:"100%",height:"auto",background:"white", padding:"10px 15px 10px 15px",borderRadius:"50px",boxShadow: "0 0 20px 7px #dddddd53"}}>
                    <div className="row">
                        <div className="col-4"><a className="btn btn-webew-product"  href="https://webew.id" aria-label="Produk webew.id" style={{padding:"4px 0 4px 0",marginTop:"3px"}}><i className="bi bi-caret-left-fill" style={{color:"white"}}></i></a></div>
                        <div className="col-4">
                            <div className="dropdown-center">
                                <button className="btn btn-webew-product" type="button" data-bs-toggle="dropdown" aria-expanded="false" style={{padding:"7px 0 7px 0"}}><i className="bi bi-grid-fill" style={{color:"white"}}></i></button>
                                <ul className="dropdown-menu text-center mb-3">
                                    <li><a className="dropdown-item" href="https://webew.id" aria-label="Home" style={{fontSize:"13pt"}}>Home</a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-4"><a className="btn btn-webew-product" href='https://webew.id' aria-label="Produk webew.id" style={{padding:"4px 0 4px 0",marginTop:"3px"}}><i className="bi bi-x-circle-fill" style={{color:"white"}}></i></a></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login