import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import MUIDataTable from "mui-datatables";
import axios from 'axios'
import api from "../components/api";

export const Usuarios = () => {
    const [modal, setModal] = useState(false);
    const [usuarios, setUsuarios] = useState([]);


    useEffect(() => {
        listarUsuarios();
    }, []);

    const columns = [
        "id_usuario",
        "identificacion",
        "nombres",
        "apellidos",
        "telefono",
        "correo",
        "estado",
        "contraseña",
        "rol"
    ];

    const options =
    {
        filterType:
            'checkbox',
    };

    const listarUsuarios = () => {
        api.get('usuario/listar')
            .then(res => {
                setUsuarios(res.data)
            })
            .catch(err => {
                console.error(err);
            });
    }

    return (
        <>
            <link rel="stylesheet" href="/public/css/usuarios.css" /><br />
            <div>

                <h1>Tabla
                    para el reporte</h1>

                <MUIDataTable

                    title={"Reporte en React"}

                    data={usuarios}

                    columns={columns}

                    options={options}
                />
                <Link to="/ruta-de-destino" className="nuevo-boton">
                    Nuevo Botón
                </Link>

            </div>
        </>
    )
}