import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import MUIDataTable from "mui-datatables";
import axios from "axios";
import api from "../components/api";

export const Maquinas = () => {
    const [modal, setModal] = useState(false)
    const [Maquina, setMaquina] = useState([]);

    useEffect(() => {
        listarMaquinas();
    }, []);

    const columns = [
        "nombre",
        "marca",
        "placa",
        "modelo",
        "cantidad",
        "manual",
        "serial",
        "imagen",
        "descripcion",
        "estado",
        "id_usuario",
        "id_area",
        "id_ambiente"
    ];

    const options = {
        filterType: 'checkbox',
    };


    const listarMaquinas = () => {
        api.get('Maquina/listar')
            .then(res => {
                setMaquina(res.data);
            })
            .catch(err => {
                console.error(err);
            });
    }


    return (
        <>
            <link rel="stylesheet" href="/public/css/maquinas.css" /><br />
            <div>
                <MUIDataTable
                title={"maquinas"}
                data={Maquina}
                columns={columns}
                options={options}
                />
            </div>
        </>
    )
}