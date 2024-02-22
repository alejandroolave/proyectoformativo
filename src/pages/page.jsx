import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";

export const Page = () => {
    const [menu, setMenu] = useState(false);
    return (
        <>

            <link rel="stylesheet" href="/public/css/pag.css" />
            <div className="container">
                <div className="navbar">

                    <div className="user-avatar" onClick={() => { setMenu(!menu) }}>
                        <img
                            className="foto"
                            src="https://img.freepik.com/vector-gratis/hacker-que-opera-ilustracion-icono-historieta-ordenador-portatil-concepto-icono-tecnologia-aislado-estilo-dibujos-animados-plana_138676-2387.jpg"
                            alt="User Avatar"
                        />
                    </div>
                    <form action="/buscar" method="get">
                        <label htmlFor="busqueda" />
                        <input
                            type="text"
                            id="busqueda"
                            name="q"
                            placeholder=""
                        />
                        <input type="submit" defaultValue="Buscar" />
                    </form>
                    {menu ?
                        <div className="user-options" id="userOptions">
                            <Link to={"Usuarios"}>
                                Usuarios
                            </Link>
                            <hr />
                            <Link to={"Mantenimientos"}>
                                mantenimientos
                            </Link>
                            <hr />
                            <Link to={"Maquinas"}>
                                maquinas
                            </Link>
                            <hr />
                            <Link to={"/"}>
                                cerrar seccion
                            </Link>
                            
                        </div>
                        : ''}
                </div>

               


            </div>
            <Outlet>
            </Outlet>

        </>
    )
}