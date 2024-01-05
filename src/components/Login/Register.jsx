import React,{ useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Register = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confPassword, setConfPassword] = useState('')
    const [pertanyaan, setPertanyaan] = useState('')
    const [jawaban, setJawaban] = useState('')
    const [msg, setMsg] = useState('')
    const [displayLoader, setDisplayLoader] = useState("")
    const navigate = useNavigate()
    useEffect(()=>{
        setDisplayLoader("none")
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    const Register = async(e)=>{
        e.preventDefault()
        try {
            setDisplayLoader("")
            await axios.post('http://localhost:5000/usersBE',{
                name: name,
                email: email,
                password: password,
                confPassword: confPassword,
                pertanyaan: pertanyaan,
                jawaban: jawaban
            })
            navigate('/', { replace: true })
            window.location.reload()
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
            <div className='container mb-4' style={{marginTop:"10px"}}>
                {/* MODAL */}
                <div className="modal fade" id="staticBackdropDaftar" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="btn btn-logout mx-auto py-1 px-3" data-bs-dismiss="modal" aria-label="Kembali">Kembali</button>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={Register}>
                                    <h6 style={{textAlign:"center",marginTop:"-8px",marginBottom:"0px",color:"red"}}>{msg}</h6>
                                    <div className='row justify-content-center'>
                                        <input type='email' id='emailModal' className='form-disable' placeholder='Masukan email' value={email} onChange={(e) => setEmail(e.target.value)} required autoFocus/>
                                        <input type='text' id='namaModal' className='form-disable' placeholder='Masukan Nama' value={name} onChange={(e) => setName(e.target.value)} required/>
                                        <input type='password' id='passwordModal' className='form-disable' placeholder='Buat password baru' value={password} onChange={(e) => setPassword(e.target.value)} required/>
                                        <input type='password' id='confPasswordModal' className='form-disable' placeholder='Ulangi password' value={confPassword} onChange={(e) => setConfPassword(e.target.value)} required/>
                                        <p className="text-center mt-3">Isi pertanyaan dan jawaban dibawah ini, ini akan digunakan jika lupa password, jadi jangan sampe lupa yaa</p>
                                        <div className="row">
                                            <div className='col-12 col-sm-6 mb-4'>
                                                <select className="form-select form" id="pertanyaanModal" aria-label="pertanyaan" value={pertanyaan} onChange={(e)=>setPertanyaan(e.target.value)} required>
                                                    <option defaultValue="Lainnya">Pilih Pertanyaan</option>
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
                                                <input type='jawaban' id='jawabanModal' className='form-control form mb-4' placeholder='Jawaban kamu' value={jawaban} onChange={(e) => setJawaban(e.target.value)} required/>
                                            </div>
                                        </div>
                                    </div>
                                    <input type='submit' className='btn btn-webew-login mb-4 mt-2' value='Daftar'/>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                {/* MODAL */}
                <div className='row justify-content-center'>
                    <div className='col-11 col-sm-10 col-md-8 col-lg-7 col-xl-6'>
                        <div className='box-login'>
                            <h4 className='text-center mb-4' style={{fontWeight:'700'}}>Silahkan Daftar</h4>
                            <h6 style={{textAlign:"center",marginTop:"-8px",marginBottom:"0px",color:"red"}}>{msg}</h6>
                            <div className='row justify-content-center'>
                                <div className='col-12 col-sm-6'>
                                    <input type='email' id='email' className='form-control form mb-3 mt-4' placeholder='Masukan email' value={email} onChange={(e) => setEmail(e.target.value)} required autoFocus/>
                                </div>
                                <div className='col-12 col-sm-6'>
                                    <input type='text' id='nama' className='form-control form mb-3 mt-4' placeholder='Masukan Nama' value={name} onChange={(e) => setName(e.target.value)} required/>
                                </div>
                                <div className='col-12 col-sm-6'>
                                    <input type='password' id='password' className='form-control form mb-3 mt-4' placeholder='Buat password baru' value={password} onChange={(e) => setPassword(e.target.value)} required/>
                                    { password.length === 0 ? <p></p> : password.length >= 8 ? <p></p> : <p style={{marginLeft:"10px",marginTop:"-15px",marginBottom:"-16px",color:"red",fontSize:"10pt"}}>Password minimal 8 karakter</p>}
                                    { password.length >= 8 ? <p style={{marginLeft:"10px",marginTop:"-15px",marginBottom:"0px",color:"blue",fontSize:"10pt"}}>Password sudah 8 karakter</p> : <p></p>}
                                </div>
                                <div className='col-12 col-sm-6'>
                                    <input type='password' id='confPassword' className='form-control form mb-3 mt-4' placeholder='Ulangi password' value={confPassword} onChange={(e) => setConfPassword(e.target.value)} required/>
                                </div>
                            </div>
                            {password.length <= 7 ?<button type='button' className='btn btn-webew-login mb-4 mt-4'>Lanjut</button>:<button type='button' className='btn btn-webew-login mb-4 mt-4' data-bs-toggle="modal" data-bs-target="#staticBackdropDaftar">Lanjut</button>}
                            <a href='/menu-login' style={{color:'rgb(0, 86, 247)', margin:'auto', display:'block', textAlign:'center', fontSize:'11pt'}}>Sudah punya akun ? login disini</a>
                            <a href="/menu-lupa-password" style={{color:"rgb(0, 86, 247)", margin:"auto", display:"block", textAlign:"center", fontSize:"11pt"}}>Lupa Password ? klik disini</a>
                        </div>
                    </div>
                </div>
            </div>
            <div className="navbot">
                <div className="container fixed-bottom" style={{width:"100%",height:"auto",background:"white", padding:"10px 15px 10px 15px",borderRadius:"50px",boxShadow: "0 0 20px 7px #dddddd53"}}>
                    <div className="row">
                        <div className="col-4"><a className="btn btn-webew-product"  href="/" aria-label="Produk webew.id" style={{padding:"4px 0 4px 0",marginTop:"3px"}}><i className="bi bi-caret-left-fill" style={{color:"white"}}></i></a></div>
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

export default Register