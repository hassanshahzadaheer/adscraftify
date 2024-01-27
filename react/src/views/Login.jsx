import React from "react";
import { Link } from "react-router-dom";
import axiosClient from "../axios-client.js";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
import { useForm } from "react-hook-form";
import { useStateContext } from "../contexts/ContextProvider.jsx";

export default function Login() {
    const { setUser, setToken } = useStateContext();
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = async (formData) => {
        try {
            // Send a POST request to log in the user
            const response = await axiosClient.post("/login", formData);
            const data = response.data;

            // Handle successful login here
            setUser(data.user);
            setToken(data.token);

            // Show success toast for successful login
            toast.success("Login Successful", {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        } catch (error) {
            // Handle different types of errors and show appropriate toasts
            if (error.response && error.response.status === 422) {
                const validationErrors = error.response.data.errors;

                // Show error toast for validation errors or invalid credentials
                toast.error(validationErrors.message, {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
            } else {
                // Show a generic error toast for other errors
                toast.error(`Failed: ${error.message}`, {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
            }
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <ToastContainer />
            <div className="mb-3">
                <label htmlFor="exampleInputEmail" className="form-label">
                    Email
                </label>
                <input
                    type="email"
                    className={`form-control ${errors.email ? "is-invalid" : ""}`}
                    id="exampleInputEmail"
                    aria-describedby="emailHelp"
                    {...register("email", { required: "Email is required" })}
                />
                {/* Display error message under the field */}
                {errors.email && (
                    <div className="invalid-feedback">{errors.email.message}</div>
                )}
            </div>
            <div className="mb-4">
                <label htmlFor="exampleInputPassword" className="form-label">
                    Password
                </label>
                <input
                    type="password"
                    className={`form-control ${errors.password ? "is-invalid" : ""}`}
                    id="exampleInputPassword"
                    {...register("password", { required: "Password is required" })}
                />
                {/* Display error message under the field */}
                {errors.password && (
                    <div className="invalid-feedback">{errors.password.message}</div>
                )}
            </div>
            <div className="d-flex align-items-center justify-content-between mb-4">
                <div className="form-check">
                    <input
                        className="form-check-input primary"
                        type="checkbox"
                        id="flexCheckChecked"
                        {...register("rememberDevice")}
                    />
                    <label
                        className="form-check-label text-dark"
                        htmlFor="flexCheckChecked"
                    >
                        Remember this Device
                    </label>
                </div>
                <Link to="#" className="text-primary fw-bold">
                    Forgot Password?
                </Link>
            </div>
            <button
                type="submit"
                className="btn btn-primary w-100 py-8 fs-4 mb-4 rounded-2"
            >
                Sign In
            </button>
            <div className="d-flex align-items-center justify-content-center">
                <p className="fs-4 mb-0 fw-bold">New to Air Crafity?</p>
                <Link
                    to="/signup"
                    className="text-primary fw-bold ms-2"
                    aria-expanded="false"
                >
                    Create an account
                </Link>
            </div>
        </form>
    );
}
