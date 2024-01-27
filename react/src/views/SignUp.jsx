import React from "react";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axiosClient from "../axios-client.js";
import { useStateContext } from "../contexts/ContextProvider.jsx";
import { useForm } from "react-hook-form";

export default function SignUp() {
    const { setUser, setToken } = useStateContext();
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = async (formData) => {
        try {
            // Send a POST request to register the user
            const response = await axiosClient.post("/signup", formData);
            setUser(data.user);
            setToken(data.token);

            // Show success toast for successful signup
            toast.success("Signup Successful", {
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

                // Show error toast for validation errors
                toast.error(`Validation Error: ${error.response.data.message}`, {
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
        <div>
            <ToastContainer />
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-3">
                    <label htmlFor="exampleInputtext1" className="form-label">
                        Name
                    </label>
                    <input
                        type="text"
                        className={`form-control ${errors.name ? "is-invalid" : ""}`}
                        id="exampleInputtext1"
                        {...register("name", { required: "Name is required" })}
                    />
                    {/* Display error message under the field */}
                    {errors.name && (
                        <div className="invalid-feedback">{errors.name.message}</div>
                    )}
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">
                        Email Address
                    </label>
                    <input
                        type="email"
                        className={`form-control ${errors.email ? "is-invalid" : ""}`}
                        id="exampleInputEmail1"
                        {...register("email", {
                            required: "Email is required",
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                message: "Invalid email address",
                            },
                        })}
                    />
                    {/* Display error message under the field */}
                    {errors.email && (
                        <div className="invalid-feedback">{errors.email.message}</div>
                    )}
                </div>
                <div className="mb-4">
                    <label htmlFor="exampleInputPassword1" className="form-label">
                        Password
                    </label>
                    <input
                        type="password"
                        className={`form-control ${errors.password ? "is-invalid" : ""}`}
                        id="exampleInputPassword1"
                        {...register("password", {
                            required: "Password is required",
                            minLength: {
                                value: 6,
                                message: "Password must have at least 6 characters",
                            },
                        })}
                    />
                    {/* Display error message under the field */}
                    {errors.password && (
                        <div className="invalid-feedback">{errors.password.message}</div>
                    )}
                </div>
                <button
                    type="submit"
                    className="btn btn-primary w-100 py-8 fs-4 mb-4 rounded-2"
                >
                    Sign Up
                </button>
                <div className="d-flex align-items-center justify-content-center">
                    <p className="fs-4 mb-0 fw-bold">Already have an Account?</p>
                    <Link className="text-primary fw-bold ms-2" to="/login">
                        Sign In
                    </Link>
                </div>
            </form>
        </div>
    );
}
