import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import MUIDataTable from "mui-datatables";
import axios from "axios";


export const Mantenimientos = () => {
    const [modal, setModal] = useState(false)
    const [Mantenimientos, setMantenimientos] = useState([]);


    useEffect(() => {
        listarMantenimientos();
    }, []);

    const columns = [

        "fecha_mantenimiento",
        "hora_mantenimiento",
        "descripcion",
        "tipo_mantenimiento",
        "id_maquina",
        "id_usuario"
    ];


    const options =
    {
        filterType:
            'checkbox',
    };

    const listarMantenimientos = () => {
        axios.get('http://localhost:4000/Mantenimiento/listar')
            .then(res => {
                setMantenimientos(res.data)
                
            })
            .catch(err => {
                console.error(err);
            });
    }

    return (
        <>
            <link rel="stylesheet" href="/public/css/Mantenimientos.css" /><br />
            <div>
                <MUIDataTable
                title={"mante"}
                data={Mantenimientos}

                columns={columns}

                options={options}

                />

            </div>

        </>


    )
}