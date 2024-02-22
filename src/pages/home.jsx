import React from "react";
import { Link } from "react-router-dom";
import { useEffect } from "react";

export const Home = () => {
    useEffect(() => {
        const script = document.createElement('script');
        script.src = '/public/js/home.js';
        script.async = true;

        document.body.appendChild(script);

    }, [])
    
    return (
        <>
            <link rel="stylesheet" href="../../public/css/prin.css" />
            <div className="container">
                <div className="barra">
                    <img className="f2" src="/public/img/logos/logooriginal.jpeg" alt="" />
                    <Link to={"login"}>
                        <button className="titulo">Inicio sesión</button>
                    </Link>

                </div>
                <div className="slideshow">
                    <img className="slide" src="/public/img/cafeeeeeee.avif" alt="" />

                    <img
                        className="slide"
                        src="/public/img/granos-cafe-monton-granos-cafe_1340-24031.jpg"
                        alt=""
                    />

                    <img className="slide" src="/public/img/viejito.avif" alt="" />

                    <img className="slide" src="/public/img/cafeeeeeee.avif" alt="" />
                    
                    <img
                        className="slide"
                        src="https://img.freepik.com/foto-gratis/barista-preparando-cafe-leche-cafeteria_1303-31375.jpg?w=826&t=st=1695937274~exp=1695937874~hmac=9f9c894b9adbaf01c7556cade786042def52b698df6d3dd7e988a022f3841b92"
                        alt=""
                    />
                    <img className="slide" src="/public/img/viejito.avif" alt="" />

                </div>
            </div>
        </>
    )
}