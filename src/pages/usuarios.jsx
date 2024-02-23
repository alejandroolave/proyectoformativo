import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import MUIDataTable from "mui-datatables";


export const Usuarios = () => {
    const [modal, setModal] = useState(false)

    return (
        <>
            <link rel="stylesheet" href="/public/css/usuarios.css" />
            <h1 className="titulo1">Usuarios</h1>

            <title>Usuarios</title>
            <div>
                <button onClick={() => { setModal(true) }}> Añadir</button>
            </div>
            <div>

                <MUIDataTable/>

            </div>
        </>
    )
}