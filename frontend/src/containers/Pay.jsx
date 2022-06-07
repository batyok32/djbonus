import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router";
import { Link } from "react-router-dom";
import ErrorModal from "../components/Modals/ErrorModal";
import SuccessModal from "../components/Modals/SuccessModal";
import { payQr } from "../redux/actions/main";

function Pay() {
    const { feature_id } = useParams();
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });
    const history = useHistory();
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);
    const errorRef = React.createRef();
    const successRef = React.createRef();
    // const [messageModel, setMessageModel] = useState("none");

    const submitFn = (e) => {
        e.preventDefault();

        if (formData.username && formData.password) {
            dispatch(
                payQr(feature_id, formData.username, formData.password)
            ).then((res) => {
                if (res === 200) {
                    console.log("SUCCESS");
                    successRef.current.click();
                    setTimeout(() => {
                        history.push("/");
                    }, 5000);
                    // setMessageModel("success");
                } else {
                    errorRef.current.click();
                    // setMessageModel("failure");
                }

                console.log("NOOOO");
            });
        }
    };

    return (
        <>
            {/* {messageModel === "success" && ( */}
            {/* <> */}
            <button
                ref={successRef}
                type="button"
                class="d-none"
                data-bs-toggle="modal"
                data-bs-target="#successmodal"
            ></button>
            <SuccessModal message="Töleg doly amala aşyryldy" />
            {/* </> */}
            {/* )} */}
            {/* {messageModel === "failure" && (
                <> */}
            <button
                ref={errorRef}
                type="button"
                class="d-none"
                data-bs-toggle="modal"
                data-bs-target="#errormodal"
            ></button>
            <ErrorModal message="Töleg doly amala aşyrylmady" />
            {/* </>
            )} */}
            {/* <div
                class="modal fade"
                id="staticBackdrop"
                data-bs-backdrop="static"
                data-bs-keyboard="false"
                tabindex="-1"
                aria-labelledby="staticBackdropLabel"
                aria-hidden="true"
            >
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="staticBackdropLabel">
                                Modal title
                            </h5>
                            <button
                                type="button"
                                class="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            ></button>
                        </div>
                        <div class="modal-body">...</div>
                        <div class="modal-footer">
                            <button
                                type="button"
                                class="btn btn-secondary"
                                data-bs-dismiss="modal"
                            >
                                Close
                            </button>
                            <button type="button" class="btn btn-primary">
                                Understood
                            </button>
                        </div>
                    </div>
                </div>
            </div> */}

            <div
                style={{
                    backgroundColor: "#C8DFFF",
                    minHeight: "100vh",
                }}
            >
                <div
                    className="bg-white d-flex align-items-center justify-content-center border-bottom shadow-sm"
                    style={{ width: "100vw" }}
                >
                    <Link to="/" className="mt-2 mb-3 ">
                        <img
                            style={{ width: "190px", height: "40px" }}
                            src={process.env.PUBLIC_URL + "/images/logo.svg"}
                            alt="Logo"
                        />
                    </Link>
                </div>
                <div className="container">
                    <div
                        className="text-ocean h2 py-2 pt-4 text-center"
                        style={{ fontWeight: 500, fontSize: "32px" }}
                    >
                        Töleg
                    </div>
                    <div className="fw-light text-center">Aňsat ýaşaň!</div>{" "}
                    <div className="row justify-content-center">
                        <form
                            className="bg-white col-10 p-4 col-md-9 col-lg-5 my-4"
                            style={{ borderRadius: "10px" }}
                            onSubmit={(e) => submitFn(e)}
                        >
                            {/* Username */}
                            <div className="mb-4 position-relative">
                                <label
                                    htmlFor="username"
                                    className="form-label text-gray py-0 fw-bold"
                                >
                                    <i className="bi bi-person-circle fs-5 me-2"></i>
                                    Giriş adyňyz <small>(login)</small>
                                </label>
                                <input
                                    type="text"
                                    name="username"
                                    id="username"
                                    placeholder="Meselem: batyr, diyar0707"
                                    value={formData.username}
                                    onChange={(e) => {
                                        setFormData({
                                            ...formData,
                                            username: e.target.value,
                                        });
                                    }}
                                    className={`form-control sm-placeholder px-3 `}
                                    style={{ borderRadius: "7px" }}
                                    aria-describedby="inputName"
                                    required
                                />
                            </div>
                            {/* Password 1 */}
                            <div className="mb-3 has-validation">
                                <label
                                    htmlFor="inputPassword1"
                                    className="form-label text-gray fw-bold py-0 "
                                >
                                    <i className="bi bi-unlock me-2 fs-5"></i>
                                    Kodyňyz
                                </label>
                                <input
                                    type="password"
                                    className={`form-control `}
                                    style={{ borderRadius: "7px" }}
                                    name="password"
                                    value={formData.password}
                                    id="inputPassword1"
                                    onChange={(e) => {
                                        setFormData({
                                            ...formData,
                                            password: e.target.value,
                                        });
                                    }}
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                className="btn blue-btn my-2 text-center w-100 "
                            >
                                {isLoading ? (
                                    <div
                                        className="spinner-border text-white"
                                        role="status"
                                    >
                                        <span className="visually-hidden">
                                            Loading...
                                        </span>
                                    </div>
                                ) : (
                                    <>Töleg etmek</>
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Pay;
