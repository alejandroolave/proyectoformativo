import { Route, Routes, useLocation } from "react-router-dom"
import { Login } from "./pages/login"
import { Home } from "./pages/home"
import { Page } from "./pages/page"
import { Xd } from "./pages/Xd"
import { Maquinas } from "./pages/Maquinas"
import { Principalhome } from "./pages/principalhome"
import { Usuarios } from "./pages/usuarios"
import { Mantenimientos } from "./pages/mantenimientos"
import { Hambiente } from "./pages/hambiente"
import { Area } from "./pages/area"
import { Notificaciones } from "./pages/notificaciones"
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



          <Route path="/dashboard" element={<Page />}>
            <Route path="" element={<Principalhome />} />
            <Route path="maquinas" element={<Maquinas />} />
            <Route path="Usuarios" element={<Usuarios />} />
            <Route path="Mantenimientos" element={<Mantenimientos />} />
            <Route path="Hambiente" element={<Hambiente/>}/>
            <Route path="Area" element={<Area/>}/>
            <Route path="Notificaciones" element={<Notificaciones/>}/>

          </Route>
        </Route>

      </Routes>
    </>
  )
}

export default App
