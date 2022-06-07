import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../../redux/actions/auth";
import Sidebar from "../Sidebar/Sidebar";
import useWindowSize from "../WindowSize/WindowSize";
import "./Header.css";

export default function Header() {
    const [width] = useWindowSize();
    const auth = useSelector((state) => state.auth);
    console.log("AUTH", auth);
    const dispatch = useDispatch();
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const userType = useSelector((state) => state.auth.user?.type);

    return (
        <div className="position-fixed header border-bottom p-2 px-3 px-md-5 row align-items-center">
            <div className="col-6 col-md-6 col-lg-3  ">
                <Link to="/" className="text-decoration-none text-black">
                    <h3>
                        u<h1 className="d-inline">MM</h1>ansyz
                    </h3>
                </Link>
                {/* <img src="/images/logo.svg" role="button" alt="" /> */}
            </div>
            <div className="d-none d-lg-flex col-lg-6  pt-1 my-lg-0  align-items-center justify-content-between">
                <a
                    className="header-link text-decoration-none "
                    href="#bukjalar"
                >
                    Bukjalar
                </a>
                <div className="header-link">Kadalar</div>
                <div className="header-link">Goşulmak</div>
                <a className="header-link text-decoration-none" href="#contact">
                    Habarlaşmak
                </a>
                <Link to="/reklam" className="header-link text-decoration-none">
                    Reklamalar
                </Link>
            </div>
            <div className="col-6 col-lg-3 d-flex align-items-center justify-content-end ">
                {isAuthenticated ? (
                    <>
                        <div className="dropdown ms-3">
                            <div
                                id="dropdownMenuButton1"
                                role="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                                className="btn blue-outline-btn d-none d-sm-inline-flex align-items-center "
                            >
                                <i class="bi bi-person-circle fs-3 "></i>
                                {/* Akaunt */}
                            </div>

                            <ul
                                className="dropdown-menu "
                                aria-labelledby="dropdownMenuButton1"
                            >
                                <li className="btn fw-bold  w-100 ">
                                    {auth?.user?.username}
                                </li>

                                {userType === "CLIENT" && (
                                    <>
                                        <li className="d-flex fs-6 text-black justify-content-between dropdown-header">
                                            <span>Balans:</span>
                                            <span>{auth?.profile?.balans}</span>
                                        </li>
                                        <li
                                            className="dropdown-item"
                                            role="button"
                                        >
                                            <Link
                                                to="/client-profile"
                                                className="text-decoration-none text-black d-flex  justify-content-between"
                                            >
                                                Профиль{" "}
                                                <i class="bi bi-person-video2 "></i>
                                            </Link>
                                        </li>
                                    </>
                                )}
                                {userType === "COMPANY" && (
                                    <>
                                        <li
                                            className="dropdown-item"
                                            role="button"
                                        >
                                            <a
                                                rel="noreferrer"
                                                target="_blank"
                                                href={auth?.profile?.qrcode}
                                                className="text-black text-decoration-none"
                                            >
                                                QR Kod{" "}
                                                <i class="bi bi-qr-code ms-2"></i>
                                            </a>
                                        </li>
                                        <li
                                            className="dropdown-item"
                                            role="button"
                                        >
                                            <Link
                                                to="/company-profile"
                                                className="text-decoration-none text-black"
                                            >
                                                Профиль{" "}
                                                <i class="bi bi-person-video2 ms-2"></i>
                                            </Link>
                                        </li>
                                    </>
                                )}
                                <li
                                    className="dropdown-item text-black d-flex justify-content-between"
                                    role="button"
                                    onClick={() => dispatch(logout())}
                                >
                                    Выйти{" "}
                                    <i class="bi bi-box-arrow-right ms-2"></i>
                                </li>
                            </ul>
                        </div>
                    </>
                ) : (
                    <>
                        <Link
                            to="/login"
                            className="btn blue-outline-btn d-none d-sm-block me-2 text-decoration-none"
                        >
                            Giriş
                        </Link>
                        <Link
                            to="/signup"
                            className="btn blue-btn text-white  d-none d-sm-block text-decoration-none"
                        >
                            Agza bolmak
                        </Link>
                    </>
                )}
                {/* <div className="d-block d-lg-none btn fs-3"> */}
                {width < 992 && (
                    <>
                        <button
                            aria-label="Show Menu"
                            type="button"
                            data-bs-toggle="offcanvas"
                            data-bs-target="#offcanvasWithBackdrop"
                            aria-controls="offcanvasWithBackdrop"
                            className="d-inline d-lg-none btn  "
                            style={{ borderRadius: "30px" }}
                        >
                            <i class="bi bi-list h2"></i>
                        </button>
                        <Sidebar />
                    </>
                )}
                {/* <i class="bi bi-list"></i> */}
                {/* </div> */}
            </div>
        </div>
    );
}
