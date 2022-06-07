import React, { useEffect } from "react";
import { useLocation } from "react-router";

function AuthLayout(props) {
    const location = useLocation();

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    }, [location]);
    console.log(`${process.env.PUBLIC_URL}/images/loginbg.png`);
    return (
        <div
            style={{
                backgroundImage: `url(${process.env.PUBLIC_URL}/images/loginbg.png)`,
                // backgroundPosition: "right right",
                backgroundColor: "rgb(245, 249, 255)",
                backgroundSize: "cover",
                minHeight: "100vh",
            }}
        >
            {props.children}
        </div>
    );
}

export default AuthLayout;
