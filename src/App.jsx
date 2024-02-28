import { Route, Routes, useLocation } from "react-router-dom"
import { Login } from "./pages/login"
import { Home } from "./pages/home"
import { Page } from "./pages/page"
import { Xd } from "./pages/Xd"
import { Maquinas } from "./pages/Maquinas"
import { Principalhome } from "./pages/principalhome"
import { Usuarios } from "./pages/usuarios"
import { Mantenimientos } from "./pages/mantenimientos"
import { Ambiente } from "./pages/Ambiente"
import { Area } from "./pages/area"
import { Recuperar } from "./pages/recuperar"
import { useEffect } from "react"
import { Loader } from "./pages/loader"
import 'Bootstrap/dist/css/bootstrap.min.css';
import DataTable from "react-data-table-component"







function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Loader />}>
          <Route path='/' element={<Home />} />
          <Route path='*' element={<Xd />} />
          <Route path="/login" element={<Login />} />
          <Route path="/Recuperar" element={<Recuperar />} />



          <Route path="/dashboard" element={<Page />}>
            <Route path="" element={<Principalhome />} />
            <Route path="maquinas" element={<Maquinas />} />
            <Route path="Usuarios" element={<Usuarios />} />
            <Route path="Mantenimientos" element={<Mantenimientos />} />
            <Route path="Ambiente" element={<Ambiente/>}/>
            <Route path="Area" element={<Area/>}/>

          </Route>
        </Route>

      </Routes>
    </>
  )
}

export default App
