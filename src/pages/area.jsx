import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import MUIDataTable from "mui-datatables";
import axios from "axios";
import api from "../components/api";


export const Area = () => {
    const [modal, setModal] = useState(false)
    const [Area, setArea] = useState([]);


    useEffect(() => {
        listarArea();
    }, []);

    const columns = [
        "id_area",
        "nombre"
    ];

    const options =
    {
        filterType:
            'checkbox',
    };


    const listarArea = () => {
        api.get('Area/Listar')
            .then(res => {
                setArea(res.data)
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
                title={"area"}

                data={Area}

                columns={columns}

                options={options}
                
                />
            </div>
        </>
    )
}