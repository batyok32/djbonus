import React from "react";

// Css
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";
import "bootstrap-icons/font/bootstrap-icons.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

function Layout(props) {
    return (
        <>
            <Header />
            <div style={{ paddingTop: "60px" }}></div>
            <div>{props.children}</div>
            <Footer />
        </>
    );
}

export default Layout;

// const dispatch = useDispatch();
// useEffect(() => {
//     dispatch(checkAuthenticated());
//     dispatch(load_user());
//     // eslint-disable-next-line react-hooks/exhaustive-deps
// }, []);
