import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import api from "../components/api";


export const Principalhome = () => {
    const [menu, setMenu] = useState(false);
    const [usuarios, setUsuarios] = useState([]);
    const [Maquina, setMaquina] = useState([]);
    const [mantenimientos, setMantenimientos] = useState([]);
    const [Ambiente, setAmbiente] = useState([]);
    const [areas, setAreas] = useState([]);

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

    const listarMantenimiento = () => {
        api.get('Mantenimiento/listar')
            .then(res => {
                setMantenimientos(res.data);
            })
            .catch(err => {
                console.error(err);
            });
    }


    const listarAmbiente = () => {
        api.get('ambiente/listar')
            .then(res => {
                setAmbiente(res.data);
            })
            .catch(err => {
                console.error(err);
            });
    };



    const listarArea = () => {
        api.get('Area/Listar')
            .then(res => {
                setAreas(res.data);
            })
            .catch(err => {
                console.error(err);
            });
    };


      useEffect(()=>{
        listarUsuarios()
        listarMaquinas()
        listarMantenimiento();
        listarAmbiente();
        listarArea();
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
                    <h1>Mantenimientos  : {mantenimientos.length}</h1>
                </div>

                <div className="cuadro5">
                    <h1>Ambiente  : {Ambiente.length}</h1>
                </div>

                <div className="cuadro6">
                    <h1>Area  : {areas.length}</h1>
                </div>
            </div>
            <Outlet>
            </Outlet>

        </>
    )
}