import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { inputChange } from "../components/utils/formChange";
import isEmpty from "../components/utils/isEmpty";
import { validateRegisterInfo } from "../components/utils/validate";
import { check_user, signUpClient } from "../redux/actions/auth";

export default function SignUp() {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        password2: "",
        full_name: "",
        phoneNumber: 993,
        email: "",
    });
    const [startedWriting, setStartedWriting] = useState({
        username: false,
        password: false,
        password2: false,
        full_name: false,
        phoneNumber: false,
        email: false,
    });
    const [formErrors, setFormErrors] = useState(null);

    let inputArray = { setFormData, formData };
    useEffect(() => {
        setFormErrors(validateRegisterInfo(formData));
        return () => {
            setFormErrors(null);
        };
    }, [formData, startedWriting]);
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);
    const submitHandler = (e) => {
        e.preventDefault();
        setIsLoading(true);
        setFormErrors(validateRegisterInfo(formData));
        setStartedWriting({
            username: true,
            password: true,
            password2: true,
            full_name: true,
            phoneNumber: true,
            email: true,
        });
        if (isEmpty(formErrors)) {
            dispatch(check_user(formData.username)).then((res) => {
                if (res === true) {
                    // console.log("Такой пользователь уже существует");
                    setFormErrors({
                        ...formErrors,
                        username: "Такой пользователь уже существует",
                    });
                } else if (res === false) {
                    // console.log("Такой пользователь не существует");
                    dispatch(signUpClient(formData)).then((res) => {
                        //     setIsLoading(false);
                        console.log("Ok client", res);
                    });
                }
            });
        }
        setIsLoading(false);
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
                <div className=" d-flex align-items-center flex-column">
                    <div
                        className="text-ocean h2 py-2 pt-4"
                        style={{ fontWeight: 500, fontSize: "32px" }}
                    >
                        Registrasiýa
                    </div>
                    <div className="fw-light">Aňsat ýaşaň!</div>

                    <form
                        className="bg-white col-12 p-4 col-md-9 col-lg-5 my-4"
                        style={{ borderRadius: "10px" }}
                    >
                        {/* Username */}
                        <div className="mb-4 position-relative">
                            <label
                                htmlFor="username"
                                className="form-label text-gray py-0 fw-bold"
                            >
                                {/* <i className="bi bi-person-circle fs-5 me-2"></i> */}
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
                            />
                            <div className="invalid-feedback">
                                {formErrors?.password}
                            </div>
                        </div>
                        {/* Password2 */}
                        <div className="mb-3 has-validation">
                            <label
                                htmlFor="inputPassword2"
                                className="form-label text-gray fw-bold py-0 "
                            >
                                <i className="bi bi-lock me-2 fs-5"></i>
                                Kodyňyzy gaýtalaň
                            </label>
                            <input
                                type="password"
                                className={`form-control ${
                                    startedWriting.password2 === true &&
                                    (formErrors?.password2
                                        ? "is-invalid"
                                        : "is-valid")
                                }`}
                                style={{ borderRadius: "7px" }}
                                name="password2"
                                value={formData.password2}
                                id="inputPassword2"
                                onChange={(e) => {
                                    inputChange(inputArray, e);
                                    setStartedWriting({
                                        ...startedWriting,
                                        password2: true,
                                    });
                                }}
                                required
                            />
                            <div className="invalid-feedback">
                                {formErrors?.password2}
                            </div>
                        </div>
                        {/* Full name */}
                        <div className="mb-4 position-relative">
                            <label
                                htmlFor="full_name"
                                className="form-label text-gray py-0 fw-bold"
                            >
                                Doly adyňyz
                            </label>
                            <input
                                type="text"
                                name="full_name"
                                id="full_name"
                                placeholder="Meselem: Diyar Abdyrahamnow"
                                value={formData.full_name}
                                onChange={(e) => {
                                    inputChange(inputArray, e);
                                    setStartedWriting({
                                        ...startedWriting,
                                        full_name: true,
                                    });
                                }}
                                className={`form-control sm-placeholder px-3 ${
                                    startedWriting.full_name === true &&
                                    (formErrors?.full_name
                                        ? "is-invalid"
                                        : "is-valid")
                                } `}
                                style={{ borderRadius: "7px" }}
                                aria-describedby="inputName"
                                required
                            />

                            <div className="invalid-feedback">
                                {formErrors?.full_name}
                            </div>
                        </div>
                        {/* Phone */}
                        <div className="mb-4 position-relative">
                            <label
                                htmlFor="phoneNumber"
                                className="form-label text-gray py-0 fw-bold"
                            >
                                <i className="bi bi-telephone fs-5 me-2"></i>
                                Telefon belginiz
                            </label>
                            <input
                                type="number"
                                name="phoneNumber"
                                id="phoneNumber"
                                placeholder="Meselem: 99365555555"
                                value={formData.phoneNumber}
                                onChange={(e) => {
                                    inputChange(inputArray, e);
                                    setStartedWriting({
                                        ...startedWriting,
                                        phoneNumber: true,
                                    });
                                }}
                                className={`form-control sm-placeholder px-3 ${
                                    startedWriting.phoneNumber === true &&
                                    (formErrors?.phoneNumber
                                        ? "is-invalid"
                                        : "is-valid")
                                } `}
                                style={{ borderRadius: "7px" }}
                                aria-describedby="inputName"
                                required
                            />

                            <div className="invalid-feedback">
                                {formErrors?.phoneNumber}
                            </div>
                        </div>
                        {/* Email */}
                        <div className="mb-4 position-relative">
                            <label
                                htmlFor="email"
                                className="form-label text-gray py-0 fw-bold"
                            >
                                <i class="bi bi-mailbox2 fs-5 me-2"></i>
                                Elektron poçtaňyz
                            </label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                placeholder="Meselem: cookgoc@gmail.com"
                                value={formData.email}
                                onChange={(e) => {
                                    inputChange(inputArray, e);
                                    setStartedWriting({
                                        ...startedWriting,
                                        email: true,
                                    });
                                }}
                                className={`form-control sm-placeholder px-3 ${
                                    startedWriting.email === true &&
                                    (formErrors?.email
                                        ? "is-invalid"
                                        : "is-valid")
                                } `}
                                style={{ borderRadius: "7px" }}
                                aria-describedby="email"
                                required
                            />

                            <div className="invalid-feedback">
                                {formErrors?.email}
                            </div>
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
                                <>Registrasiýa</>
                            )}
                        </button>
                        <div className="p my-3 text-center">
                            Ulanyjymy?{" "}
                            <Link
                                to="/login"
                                className="text-decoration-none fw-bold"
                            >
                                Girmek
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
