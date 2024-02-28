import React, { useState, useEffect } from "react";
import MUIDataTable from "mui-datatables";
import axios from "axios";
import { Link } from "react-router-dom";
import api from "../components/api";

export const Mantenimientos = () => {
    const [modal, setModal] = useState(false);
    const [mantenimientos, setMantenimientos] = useState([]);

    useEffect(() => {
        listarMantenimiento();
    }, []);

    const columns = [
        "fecha_mantenimiento",
        "hora_mantenimiento",
        "descripcion",
        "tipo_mantenimiento",
        "id_maquina",
        "id_usuario",
        "id_mantenimiento"
    ];

    const options = {
        filterType: 'checkbox',
    };

    const listarMantenimiento = () => {
        api.get('Mantenimiento/listar')
            .then(res => {
                setMantenimientos(res.data);
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
                    data={mantenimientos}
                    columns={columns}
                    options={options}
                />
            </div>
        </>
    );
}
