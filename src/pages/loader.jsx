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
            }, 1000);

        } else {
            document.body.appendChild(template)
            setTimeout(() => {
                const loader = document.getElementById("loader")
                loader.remove()
            }, 1500);
        }
        
    }, [location])

    return (
        <>
            <link rel="stylesheet" href="/public/css/loader.css" />
            <div id="loader" style={{ display: "flex", alignItems: "center", justifyContent: "center", left: "0", top: "0", height: "100%", width: "100%", backgroundColor: "white", position: "fixed", fontSize: "100px", zIndex: "999" }}>
                <div className="wrapper">
                    <svg>
                        <text x="50%" y="50%" dy=".35em" textAnchor="middle">
                            the_machines
                        </text>
                    </svg>
                </div>
                <style>

                </style>


            </div>

            <Outlet></Outlet>
        </>
    )
}