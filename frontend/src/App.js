import React, { useEffect } from "react";
import "./App.css";
// Router
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// Redux
import { useDispatch } from "react-redux";
import {
    authRoutes,
    clientRoutes,
    companyRoutes,
    mainRoutes,
    noLayout,
} from "./routes";
import Layout from "./components/Layouts/Layout";
import AuthLayout from "./components/Layouts/AuthLayout";
import WithLoged from "./components/Layouts/hocs/withLoged";
import { checkAuthenticated, load_user } from "./redux/actions/auth";
import WithCompany from "./components/Layouts/hocs/company/withCompany";
import WithClient from "./components/Layouts/hocs/client/withClient";

function App() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(checkAuthenticated()).then((res) => {
            if (res === 200) {
                dispatch(load_user());
            }
        });
    }, []);
    return (
        <Router>
            <Switch>
                {noLayout.map((route) => (
                    <Route key={route.path} {...route}>
                        {route.comp}
                    </Route>
                ))}
                {companyRoutes.map((route) => (
                    <Route key={route.path} {...route}>
                        <WithCompany>
                            <Layout>{route.comp}</Layout>
                        </WithCompany>
                    </Route>
                ))}
                {clientRoutes.map((route) => (
                    <Route key={route.path} {...route}>
                        <WithClient>
                            <Layout>{route.comp}</Layout>
                        </WithClient>
                    </Route>
                ))}
                {authRoutes.map((route) => (
                    <Route key={route.path} {...route}>
                        <WithLoged>
                            <AuthLayout>{route.comp}</AuthLayout>
                        </WithLoged>
                    </Route>
                ))}
                {mainRoutes.map((route) => (
                    <Route key={route.path} {...route}>
                        <Layout>{route.comp}</Layout>
                    </Route>
                ))}
            </Switch>
        </Router>
    );
}

export default App;
