import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import api from "../components/api";


export const Principalhome = () => {
    const [menu, setMenu] = useState(false);
    const [usuarios, setUsuarios] = useState([]);
    const [Maquina, setMaquina] = useState([]);

    const listarUsuarios = () => {
        api.get('usuario/listar')
          .then(res => {
            setUsuarios(res.data);
            {console.log(res)}
          })
          .catch(err => {
            console.error(err);
          });
      };




      const listarMaquinas = () => {
        api.get('Maquina/listar')
            .then(res => {
                setMaquina(res.data);
                {console.log(res)}
            })
            .catch(err => {
                console.error(err);
            });
    }


      useEffect(()=>{
        listarUsuarios()
        listarMaquinas()
      },[])


    return (
        <>

            <link rel="stylesheet" href="/public/css/principalhome.css" />
            <div className="principal">
                <div className="cuadro1">
                    <h1>Usuarios    : {usuarios.length}</h1>
                </div>

                <div className="cuadro2">
                    <h1>Maquinas     : {Maquina.length}</h1>
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