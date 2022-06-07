import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { buy_tarif, load_tarifs } from "../redux/actions/main";
import { selectTarifs } from "../redux/selectors/main";
import { Link, useHistory } from "react-router-dom";

const mapState = (state) => ({
    tarifs: selectTarifs(state),
    auth: state.auth,
});

function Cart() {
    const dispatch = useDispatch();
    const { tarifs, auth } = useSelector(mapState);
    const history = useHistory();
    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
        if (!Array.isArray(tarifs)) {
            dispatch(load_tarifs());
        }
    }, []);

    const [formProduct, setFormProduct] = useState("none");
    const [product, setProduct] = useState(null);
    const submitFn = () => {
        if (!product || auth?.profile?.balans - product?.price <= 0) {
            return;
        }
        dispatch(buy_tarif(product.id)).then((status) => {
            if (status === 200) {
                history.push("/client-profile");
            }
        });
    };
    return (
        <>
            <div className="container">
                {auth && auth?.profile?.tarif ? (
                    <div
                        class="alert mt-4 alert-warning alert-dismissible fade show"
                        role="alert"
                    >
                        <strong>Hey Dude!</strong> You already have tarif.
                        <strong className="ms-2">
                            '{auth?.profile?.tarif}'
                        </strong>
                        <button
                            type="button"
                            class="btn-close"
                            data-bs-dismiss="alert"
                            aria-label="Close"
                        ></button>
                    </div>
                ) : (
                    ""
                )}
                <h2 className="mb-4 mt-5 text-center text-ocean">
                    Tarif almak
                </h2>
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div style={{ marginBottom: "3rem" }}>
                            <label
                                htmlFor="product"
                                className="form-label text-gray py-0 fw-bold fs-6 d-flex align-items-center"
                            >
                                Tarif
                            </label>
                            <select
                                onChange={(e) => {
                                    console.log("CHANGED", e.target.value);
                                    setFormProduct(e.target.value);
                                    let found = tarifs.filter(
                                        (tarif) => tarif.name === e.target.value
                                    );
                                    console.log("Found", found);
                                    setProduct(found[0]);
                                }}
                                className="form-select"
                                name="product"
                                role="button"
                                required
                                id="product"
                                value={formProduct}
                                style={{ borderRadius: "7px" }}
                                aria-label="Default select example"
                            >
                                {product ? (
                                    ""
                                ) : (
                                    <option value="none">
                                        ----------------------------------------
                                    </option>
                                )}
                                {Array.isArray(tarifs) &&
                                    tarifs.map((option) => (
                                        <option value={option.name}>
                                            {option.name}
                                        </option>
                                    ))}
                            </select>
                            <p className="mt-2 small text-center">
                                <Link to="/#bukjalar">
                                    See tarif's features{" "}
                                </Link>{" "}
                            </p>
                        </div>

                        <h3 className="text-ocean fw-bolder mb-4 text-center">
                            Sowda
                        </h3>
                        <div className="d-flex justify-content-between align-items-center mb-2">
                            <div>Tarifyň ady:</div>{" "}
                            <h6>{product ? product?.name : "Tarif saýlaň"} </h6>
                        </div>
                        <div className="d-flex justify-content-between align-items-center mb-2">
                            <div>Tarifyň bahasy:</div>{" "}
                            <h6 className="text-danger">
                                {product
                                    ? `${product?.price} manat`
                                    : "Tarif saýlaň"}{" "}
                            </h6>
                        </div>
                        <div className="d-flex justify-content-between align-items-center mb-2">
                            <div>Siziň balansyňyz:</div>{" "}
                            <h6>
                                {auth?.profile
                                    ? `${auth?.profile?.balans} manat`
                                    : "Balans ýok"}{" "}
                            </h6>
                        </div>

                        <hr />

                        <div className="d-flex justify-content-between align-items-center mb-1">
                            <h6 className="fw-bolder">Jemi:</h6>{" "}
                            <h6>{product ? product?.price : 0} manat</h6>
                        </div>
                        <div className="d-flex justify-content-between align-items-center">
                            <h6 className="fw-bolder">Galan pulyňyz:</h6>{" "}
                            <h6 className="text-danger">
                                {auth?.profile && product
                                    ? `${
                                          auth?.profile?.balans - product?.price
                                      } manat`
                                    : auth?.profile
                                    ? `${auth?.profile?.balans} manat`
                                    : 0}
                            </h6>
                        </div>
                        <p className="my-3 small">
                            Pulyňyz ýetenokmy?{" "}
                            <Link to="/">Hasabyňyzy doldurmak</Link>
                        </p>

                        <div className="d-flex justify-content-center my-4">
                            <button
                                className="btn blue-btn"
                                onClick={() => submitFn()}
                                disabled={
                                    !product ||
                                    auth?.profile?.balans - product?.price <= 0
                                }
                            >
                                Almak
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Cart;
