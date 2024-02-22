import React, { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";


export const Loader = () => {
    const location = useLocation()
    const [loader, setLoader] = useState(true)
    const [pathLocation, setPathLocation] = useState(location)
    const [template, setTemplate] = useState(location)



    useEffect(() => {
        const loader = document.getElementById("loader")

        if (loader) {
            const template = loader.cloneNode(true)
            setTemplate(template)
            setTimeout(() => {
                loader.remove()
            }, 500);

        } else {
            document.body.appendChild(template)
            setTimeout(() => {
                const loader = document.getElementById("loader")
                loader.remove()
            }, 700);
        }
    }, [location])

    return (
        <>
          <link rel="stylesheet" href="/public/css/loader.css" />
            <div id="loader" style={{ display: "flex", alignItems: "center", justifyContent: "center", left: "0", top: "0", height: "100%", width: "100%", backgroundColor: "white", position: "fixed", fontSize: "190px", zIndex: "999" }}>
                <div className="typing-indicator">
                    <div className="typing-circle" />
                    <div className="typing-circle" />
                    <div className="typing-circle" />
                    <div className="typing-shadow" />
                    <div className="typing-shadow" />
                    <div className="typing-shadow" />
                </div>
                <style>
                    
                </style>


            </div>

            <Outlet></Outlet>
        </>
    )
}