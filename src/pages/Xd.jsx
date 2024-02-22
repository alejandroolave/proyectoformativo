import React, { useEffect } from "react";
import { Link } from "react-router-dom";

export const Xd = () => {
    useEffect(() => {
        const script = document.createElement('script');
        script.src = '/public/js/home.js';
        script.async = true;
        document.body.appendChild(script);
    }, [])

    return (
        <>
            <h1>
                <img
                    className="todo"
                    src="https://th.bing.com/th/id/OIG3.HezUAXglQRXG9bJaEa3g?pid=ImgGn"
                    alt=""
                    style={{
                        marginLeft:'500px',
                        width: '800px',
                        height: '860px',  // This ensures the image takes up the full height of the viewport
                    }}
                />
            </h1>
        </>
    );
}
