import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Error from "./components/WebProduct/Error.jsx"
import Navbar from "./components/Layout/Navbar.jsx"
/* USER */
import Login from "./components/Login/Login.jsx"
import Register from "./components/Login/Register.jsx"
import LupaPassword from "./components/Login/LupaPassword.jsx"
import MenuDashboard from "./components/Users/MenuDashboard.jsx"
import MenuProfil from "./components/Users/MenuProfil.jsx"
import MenuMotivasi from "./components/Users/MenuMotivasi.jsx"
import MenuMotivasiUbah from "./components/Users/MenuMotivasiUbah.jsx"
import MenuLoading from "./components/Users/MenuLoading.jsx"
import Footer from "./components/Layout/Footer.jsx"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="*"element={<><Navbar /><Error/></>}/>
        {/* USER */}
        <Route path="/"element={<><Navbar /><Login /><Footer/></>}/>
        <Route path="/menu-register" element={<><Navbar /><Register /><Footer/></>}/>
        <Route path="/menu-lupa-password" element={<><Navbar /><LupaPassword /><Footer/></>}/>
        <Route path="/menu-dashboard/:panggilanParams" element={<MenuDashboard />}/>
        <Route path="/menu-profil/:panggilanParams" element={<MenuProfil />}/>
        <Route path="/menu-motivasi/:panggilanParams" element={<MenuMotivasi />}/>
        <Route path="/menu-motivasi-ubah/:panggilanParams" element={<MenuMotivasiUbah />}/>
        <Route path="/menu-loading" element={<MenuLoading />}/>
        </Routes>
    </Router>
  )
}

export default App;
