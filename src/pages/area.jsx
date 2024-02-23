import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import MUIDataTable from "mui-datatables";


export const Area = () => {
    const [modal, setModal] = useState(false)
    const [usuarios, setArea] = useState([]);


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
        axios.get('http://localhost:4000/listar/Area')
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