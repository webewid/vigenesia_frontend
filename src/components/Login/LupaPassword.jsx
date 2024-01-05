import React,{ useState, useEffect } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

const LupaPassword = () => {
    const [email, setEmail] = useState("")
    const [pertanyaan, setPertanyaan] = useState("")
    const [jawaban, setJawaban] = useState("")
    const [password, setPassword] = useState('')
    const [confPassword, setConfPassword] = useState('')
    const [msg, setMsg] = useState("")
    const [displayLoader, setDisplayLoader] = useState("")
    const navigate = useNavigate()
    useEffect(()=>{
        setDisplayLoader("none")
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    const lupaPassword = async(e)=>{
        e.preventDefault()
        try {
            setDisplayLoader("")
            await axios.post("http://localhost:5000/lupaPasswordBE",{
                email: email,
                pertanyaan: pertanyaan,
                jawaban: jawaban,
                password: password,
                confPassword: confPassword
            })
            navigate("/menu-login", { replace: true })
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
            <div className="container mb-3" style={{marginTop:"45px"}}>
                <div className="row justify-content-center">
                    <div className="col-11 col-sm-10 col-md-8 col-lg-7 col-xl-6">
                        <div className="box-login" style={{marginTop:"35px"}}> 
                            <h4 className="text-center" style={{fontWeight:"700"}}>Silahkan Jawab</h4>
                            <form onSubmit={lupaPassword}>
                                <h6 style={{textAlign:"center",marginTop:"15px",marginBottom:"-10px",color:"red"}}>{msg}</h6>
                                <label htmlFor="email" className="mx-2"></label>
                                <input type="email" id="email" className="form-control form mb-3" placeholder="Masukan email" value={email} onChange={(e) => setEmail(e.target.value)} autoFocus required/>
                                <div className="row justify-content-center">
                                    <div className='col-12 col-sm-6'>
                                        <select className="form-select form mb-3 mt-4" name="pertanyaan" id="pertanyaan" aria-label="pertanyaan" value={pertanyaan} onChange={(e)=>setPertanyaan(e.target.value)} required>
                                            <option defaultValue={"Lainnya"}>Pilih Pertanyaan</option>
                                            <option defaultValue="Nama ibu kandung kamu ?">Nama ibu kandung kamu ?</option>
                                            <option defaultValue="Nama peliharaan kamu ?">Nama peliharaan kamu ?</option>
                                            <option defaultValue="Makanan favorit kamu ?">Makanan favorit kamu ?</option>
                                            <option defaultValue="Minuman favorit kamu ?">Minuman favorit kamu ?</option>
                                            <option defaultValue="Tempat favorit kamu ?">Tempat favorit kamu ?</option>
                                            <option defaultValue="Apa hobi kamu ?">Apa hobi kamu ?</option>
                                            <option defaultValue="Lainnya">Lainnya</option>
                                        </select>
                                    </div>
                                    <div className='col-12 col-sm-6'>
                                        <input type="text" id="jawaban" className="form-control form mb-3 mt-4" placeholder="Masukan jawaban" value={jawaban} onChange={(e) => setJawaban(e.target.value)} required/>
                                    </div>
                                    <div className='col-12 col-sm-6'>
                                        <input type='password' id='password' className='form-control form mb-3 mt-4' placeholder='Buat password baru' value={password} onChange={(e) => setPassword(e.target.value)} required/>
                                    </div>
                                    <div className='col-12 col-sm-6'>
                                        <input type='password' id='confPassword' className='form-control form mb-3 mt-4' placeholder='Ulangi password' value={confPassword} onChange={(e) => setConfPassword(e.target.value)} required/>
                                    </div>
                                </div>
                                <input type="submit" className="btn btn-webew-login mb-4 mt-3" value="Proses"/>
                                <a href="/menu-login" style={{color:"rgb(0, 86, 247)", margin:"auto", display:"block", textAlign:"center", fontSize:"11pt"}}>Sudah ingat Password ?</a>
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

export default LupaPassword