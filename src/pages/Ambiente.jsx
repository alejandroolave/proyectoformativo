import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import MUIDataTable from "mui-datatables";
import api from "../components/api";

export const Ambiente = () => {
    const [modal, setModal] = useState(false)
    const [Ambiente, setAmbiente]= useState([]);

    useEffect(() => {
        listarAmbiente();
    }, []);

    const columns = [
        "id_ambiente",
        "nombre"
    ];

    const options = {
        filterType: 'checkbox',
    };

    const listarAmbiente = () => {
        api.get('Ambiente/listar')
            .then(res => {
                setAmbiente(res.data);
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
                
                title={"Ambiente"}
                data={Ambiente}
                columns={columns}
                options={options}
                />
            </div>
        </>
    )
}