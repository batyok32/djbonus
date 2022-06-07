import React, { useState } from "react";
import { useDispatch } from "react-redux";
import ClientDashboard from "../components/ClientProfile/ClientDashboard";
import { logout } from "../redux/actions/auth";

function ClientProfile() {
    const [page, setPage] = useState("dash");
    const dispatch = useDispatch();
    return (
        <div className="container">
            <div className="row my-5">
                <div className="col-3">
                    <div className="d-flex justify-content-center mb-4">
                        <div
                            className="circle-bg mb-2"
                            style={{
                                backgroundImage:
                                    "url('https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cmFuZG9tJTIwcGVyc29ufGVufDB8fDB8fA%3D%3D&w=1000&q=80')",
                                backgroundPosition: "center",
                                backgroundRepeat: "no-repeat",
                                backgroundSize: "cover",
                                height: "100px",
                                width: "100px",
                                borderRadius: "50%",
                            }}
                        ></div>
                    </div>
                    <ul class="list-group list-group-flush">
                        <li
                            role="button"
                            onClick={() => setPage("dash")}
                            class="list-group-item"
                        >
                            Tariflarym
                        </li>
                        <li
                            role="button"
                            onClick={() => setPage("ak")}
                            class="list-group-item"
                        >
                            Akaunt maglumatlarym
                        </li>
                        <li
                            role="button"
                            onClick={() => setPage("res")}
                            class="list-group-item"
                        >
                            Kody çalyşmak
                        </li>
                        <li
                            role="button"
                            onClick={() => dispatch(logout())}
                            class="list-group-item"
                        >
                            Çykmak
                        </li>
                    </ul>
                </div>
                <div className="col-9">
                    {page === "dash" ? <ClientDashboard /> : ""}
                </div>
            </div>
        </div>
    );
}

export default ClientProfile;
