import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Sidebar.css";

function Sidebar() {
    const closeModalRef = React.createRef();
    const location = useLocation();

    useEffect(() => {
        if (location) {
            closeModalRef?.current?.click();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location]);
    return (
        <div
            class="offcanvas offcanvas-end"
            tabIndex="-1"
            id="offcanvasWithBackdrop"
            aria-labelledby="offcanvasWithBackdropLabel"
        >
            <div class="offcanvas-header border-0 mt-1 mb-0 bg-white h2 text-decoration-none text-dark">
                <Link to="/" className="text-decoration-none text-black">
                    <h3>
                        u<h1 className="d-inline">MM</h1>ansyz
                    </h3>
                </Link>
                {/* <span>
                    <img src="/images/logo.svg" role="button" alt="" />
                </span> */}

                <button
                    type="button"
                    class="close-btn btn text-reset p-2"
                    data-bs-dismiss="offcanvas"
                    aria-label="Close"
                    ref={closeModalRef}
                >
                    <i class="bi bi-x-lg"></i>
                </button>
            </div>
            <div class="offcanvas-body">
                <div class="flex-shrink-0  ">
                    <ul class="list-unstyled ps-0">
                        {/* Home */}
                        <li class="mb-1">
                            <button
                                class="btn btn-toggle align-items-center rounded collapsed "
                                data-bs-toggle="collapse"
                                data-bs-target="#home-collapse"
                                aria-expanded="true"
                                style={{ fontSize: "18px" }}
                            >
                                <strong>Giriş sahypa</strong>
                            </button>
                            <div class="collapse show" id="home-collapse">
                                <ul
                                    class="btn-toggle-nav list-unstyled fw-normal mt-2 pb-1 small ps-2"
                                    style={{ fontSize: "16px" }}
                                >
                                    <li>
                                        <Link
                                            to="/contact"
                                            class="link-dark rounded"
                                        >
                                            Bukjalar
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            to="/about"
                                            class="link-dark rounded"
                                        >
                                            Kadalar
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            to="/wishlist"
                                            class="link-dark rounded"
                                        >
                                            Kinolar
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            to="/wishlist"
                                            class="link-dark rounded"
                                        >
                                            Habarlaşmak
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            to="/wishlist"
                                            class="link-dark rounded"
                                        >
                                            Reklamalar
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </li>
                        {/* Categories */}
                        <li class="mb-1">
                            <button
                                class="btn btn-toggle align-items-center rounded collapsed"
                                data-bs-toggle="collapse"
                                data-bs-target="#dashboard-collapse"
                                aria-expanded="false"
                                style={{ fontSize: "18px" }}
                            >
                                <strong>Bölümler</strong>
                            </button>
                            <div class="collapse" id="dashboard-collapse">
                                <ul
                                    class="btn-toggle-nav list-unstyled fw-normal pb-1 small mt-2"
                                    style={{ fontSize: "16px" }}
                                >
                                    <li>
                                        <Link
                                            to={`/category/`}
                                            class="link-dark rounded"
                                        >
                                            Telefon magazyn
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            to={`/category/`}
                                            class="link-dark rounded"
                                        >
                                            Eşik magazyn
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            to={`/category/`}
                                            class="link-dark rounded"
                                        >
                                            Parfýumeriýa
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </li>
                        {/* Orders */}
                        <li class="mb-1">
                            <button
                                class="btn btn-toggle align-items-center rounded collapsed"
                                data-bs-toggle="collapse"
                                data-bs-target="#orders-collapse"
                                aria-expanded="false"
                                style={{ fontSize: "18px" }}
                            >
                                <strong>Bukjalar</strong>
                            </button>
                            <div class="collapse" id="orders-collapse">
                                <ul
                                    class="btn-toggle-nav list-unstyled fw-normal pb-1 small mt-1 ps-2"
                                    style={{ fontSize: "16px " }}
                                >
                                    <li>
                                        <Link
                                            to="/filter/newproducts"
                                            class="link-dark rounded"
                                        >
                                            Täze bukjalar
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            to="/filter/discountProducts"
                                            class="link-dark rounded"
                                        >
                                            Siz üçin bukja
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </li>
                        <li class="mb-1">
                            <button
                                class="btn btn-toggle align-items-center rounded collapsed"
                                data-bs-toggle="collapse"
                                data-bs-target="#account-collapse"
                                aria-expanded="false"
                                style={{ fontSize: "18px" }}
                            >
                                <strong>Akaunt</strong>
                            </button>
                            <div class="collapse" id="account-collapse">
                                <ul
                                    class="btn-toggle-nav list-unstyled fw-normal pb-1 small mt-1 ps-2"
                                    style={{ fontSize: "16px " }}
                                >
                                    <li>
                                        <Link
                                            to="/filter/newproducts"
                                            class="link-dark rounded"
                                        >
                                            Profil
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            to="/login"
                                            class="link-dark rounded"
                                        >
                                            Giriş
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            to="/signup"
                                            class="link-dark rounded"
                                        >
                                            Agza bolmak
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </li>
                        {/* Divider */}
                        <li class="border-top my-3"></li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Sidebar;
