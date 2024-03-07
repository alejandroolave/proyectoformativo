import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { useEffect } from "react";

export const Principalhome = () => {
    const [menu, setMenu] = useState(false);
    return (
        <>

            <link rel="stylesheet" href="/public/css/principalhome.css" />
            <div className="principal">
                <div className="cuadro1">
                    <h1>Usuarios    : 0</h1>
                </div>

                <div className="cuadro2">
                    <h1>Maquinas     : 0</h1>
                </div>

                <div className="cuadro4">
                    <h1>Mantenimientos  : 0</h1>
                </div>

                <div className="cuadro5">
                    <h1>Ambiente  : 0</h1>
                </div>

                <div className="cuadro6">
                    <h1>Area  : 0</h1>
                </div>
            </div>

            <Outlet>
            </Outlet>

        </>
    )
}