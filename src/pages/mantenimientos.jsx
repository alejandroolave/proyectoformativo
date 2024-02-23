import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import MUIDataTable from "mui-datatables";


export const Mantenimientos = () => {
    const [modal, setModal] = useState(false)

    return (
        <>
            <link rel="stylesheet" href="/public/css/Mantenimientos.css" /><br />
            <div>
                <MUIDataTable />
            </div>

        </>


    )
}