import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import MUIDataTable from "mui-datatables";


export const Recuperar = () => {
    const [modal, setModal] = useState(false)

    return (
        <>
            <link rel="stylesheet" href="/public/css/recuperar.css" /><br />
            <div>
                <>
                    <meta charSet="UTF-8" />
                    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                    <link rel="stylesheet" href="css/recu.css" />
                    <title>Document</title>
                    <form className="form">
                        <p className="title">RECUPERAR CONTRASEÑA</p>
                        <p className="message">
                            recupere su contraseña para que acceda a nuestra aplicación.{" "}
                        </p>
                        <div className="flex">
                            <label>
                                <input className="input" type="text" placeholder="" required="" />
                                <span>CONTRASEÑA</span>
                            </label>
                        </div>
                        <label>
                            <input className="input" type="text" placeholder="" required="" />
                            <span>CONFIRMAR CONTRASEÑA</span>
                        </label>
                        <button className="submit">CAMBIAR</button>
                        <p className="signin">
                            ¿Ya tienes una cuenta? Iniciar sesión <a href="index.html">Signin</a>{" "}
                        </p>
                    </form>
                </>

            </div>

        </>


    )
}