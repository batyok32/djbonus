import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { inputChange } from "../components/utils/formChange";
import isEmpty from "../components/utils/isEmpty";
import { validateLoginInfo } from "../components/utils/validate";
import { login } from "../redux/actions/auth";
import errors from "../redux/messages/errors.json";

export default function Login() {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });
    const [startedWriting, setStartedWriting] = useState({
        username: false,
        password: false,
    });
    const [formErrors, setFormErrors] = useState(null);
    const [resErrors, setErrors] = useState(null);

    let inputArray = { setFormData, formData };
    useEffect(() => {
        setFormErrors(validateLoginInfo(formData));
        return () => {
            setFormErrors(null);
        };
    }, [formData, startedWriting]);
    // redux
    const dispatch = useDispatch();

    const [isLoading, setIsLoading] = useState(false);
    const submitHandler = (e) => {
        e.preventDefault();
        if (isEmpty(formErrors)) {
            setIsLoading(true);
            dispatch(login(formData.username, formData.password)).then(
                (res) => {
                    console.log("RESULT", res);
                    setIsLoading(false);
                    if (res === errors.error4) {
                        // setErrors(res);
                        console.log("ERROR");
                        setErrors(errors.error4);
                    } else {
                        setErrors(null);
                    }
                }
            );
        }
    };

    return (
        <div className="">
            <div
                className="bg-white d-flex align-items-center justify-content-center border-bottom shadow-sm"
                style={{ width: "100vw" }}
            >
                <Link to="/" className="mx-md-0 mt-2 mb-3 ps-4 ps-md-0">
                    <img
                        style={{ width: "190px", height: "40px" }}
                        src={process.env.PUBLIC_URL + "/images/logo.svg"}
                        alt="Logo"
                    />
                </Link>
            </div>
            <div className="container">
                <div className="d-flex flex-column  align-items-start justify-content-md-center align-items-md-center">
                    <div
                        className="text-ocean h2 py-3 pt-4 ps-4 ps-md-0"
                        style={{ fontWeight: 500, fontSize: "32px" }}
                    >
                        Girmek
                    </div>
                    <div className="p ps-4 ps-md-0 fw-light">Hoş geldiňiz!</div>

                    <form
                        className="bg-white col-12 p-4 col-md-9 col-lg-5 my-4"
                        style={{ borderRadius: "10px" }}
                    >
                        {resErrors && (
                            <div className="mb-4 text-danger text-center">
                                <strong>{resErrors} !</strong>
                            </div>
                        )}
                        {/* Username */}
                        <div className="mb-4 position-relative">
                            <label
                                htmlFor="username"
                                className="form-label text-gray py-0 fw-bold"
                            >
                                {/* <i className="bi bi-info-lg fs-5 me-2"></i> */}
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
                                    inputChange(inputArray, e);
                                    setStartedWriting({
                                        ...startedWriting,
                                        username: true,
                                    });
                                }}
                                className={`form-control sm-placeholder px-3 ${
                                    startedWriting.username === true &&
                                    (formErrors?.username
                                        ? "is-invalid"
                                        : "is-valid")
                                } `}
                                style={{ borderRadius: "7px" }}
                                aria-describedby="inputName"
                                required
                            />

                            <div className="invalid-feedback">
                                {formErrors?.username}
                            </div>
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
                                className={`form-control ${
                                    startedWriting.password === true &&
                                    (formErrors?.password
                                        ? "is-invalid"
                                        : "is-valid")
                                }`}
                                style={{ borderRadius: "7px" }}
                                name="password"
                                value={formData.password}
                                id="inputPassword1"
                                onChange={(e) => {
                                    inputChange(inputArray, e);
                                    setStartedWriting({
                                        ...startedWriting,
                                        password: true,
                                    });
                                }}
                                required
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        submitHandler(e);
                                    }
                                }}
                            />
                            <div className="invalid-feedback">
                                {formErrors?.password}
                            </div>
                        </div>
                        <div className="my-2">
                            <Link
                                to="/"
                                className="text-decoration-none"
                                style={{ fontWeight: 500 }}
                            >
                                Parol ýatdan çykdymy?
                            </Link>
                        </div>
                        <button
                            type="button"
                            disabled={!isEmpty(formErrors)}
                            onClick={(e) => submitHandler(e)}
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
                                <>Girmek</>
                            )}
                        </button>
                        <div className="p my-3 text-center">
                            Entäk ulanyjy dälmi?{" "}
                            <Link
                                to="/signup"
                                className="text-decoration-none fw-bold"
                            >
                                Registrasiýa
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
