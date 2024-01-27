import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axiosClient from "../../axios-client.js";
import {toast, ToastContainer} from "react-toastify";
import {Outlet} from "react-router-dom";

export default function Users() {
    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
    } = useForm();

    const onSubmit = async (data) => {
        try {

            // Make the API request
            const response = await axiosClient.post("/customers", data);

            // Check if the request was successful
            if (response.status === 201) {
                console.log("Request successful:", response.data);

                // Show success message using toastr
                toast.success("Customer created successfully", {
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
                // If the request was not successful, log the response and show an error message
                console.error("Request failed:", response);

                toast.error(`Something went wrong. Please try again.`, {
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
        } catch (error) {
            // Handle network errors or other exceptions
            console.error("Error:", error);

            toast.error(`Something went wrong: ${error.message}`, {
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
    };

    return (
        <div className="container-fluid">
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title fw-semibold mb-4">Customers</h5>
                    <ToastContainer />
                    <form onSubmit={handleSubmit(onSubmit)} className="row g-3">
                        <div className="col-md-6 mb-3">
                            <label htmlFor="username" className="form-label">
                                Username
                            </label>
                            <input
                                type="text"
                                className={`form-control ${
                                    errors.username ? "is-invalid" : ""
                                }`}
                                id="username"
                                name="username"
                                {...register("username", { required: "Username is required" })}
                            />
                            {errors.username && (
                                <div className="invalid-feedback">{errors.username.message}</div>
                            )}
                        </div>
                        <div className="col-md-6 mb-3">
                            <label htmlFor="email" className="form-label">
                                Email
                            </label>
                            <input
                                type="email"
                                className={`form-control ${
                                    errors.email ? "is-invalid" : ""
                                }`}
                                id="email"
                                name="email"
                                {...register("email", { required: "Email is required" })}
                            />
                            {errors.email && (
                                <div className="invalid-feedback">{errors.email.message}</div>
                            )}
                        </div>
                        <div className="col-md-6 mb-3">
                            <label htmlFor="contact" className="form-label">
                                Contact
                            </label>
                            <input
                                type="text"
                                className={`form-control ${
                                    errors.contact ? "is-invalid" : ""
                                }`}
                                id="contact"
                                name="contact"
                                {...register("contact", { required: "Contact is required" })}
                            />
                            {errors.contact && (
                                <div className="invalid-feedback">{errors.contact.message}</div>
                            )}
                        </div>
                        {/* Add other fields similarly */}
                        <div className="col-md-6 mb-3">
                            <label htmlFor="password" className="form-label">
                                Password
                            </label>
                            <input
                                type="password"
                                className={`form-control ${
                                    errors.password ? "is-invalid" : ""
                                }`}
                                id="password"
                                name="password"
                                {...register("password", {
                                    required: "Password is required",
                                })}
                            />
                            {errors.password && (
                                <div className="invalid-feedback">
                                    {errors.password.message}
                                </div>
                            )}
                        </div>
                        <div className="col-md-6 mb-3">
                            <label htmlFor="confirmPassword" className="form-label">
                                Confirm Password
                            </label>
                            <input
                                type="password"
                                className={`form-control ${
                                    errors.confirmPassword ? "is-invalid" : ""
                                }`}
                                id="confirmPassword"
                                name="confirmPassword"
                                {...register("confirmPassword", {
                                    required: "Confirm Password is required",
                                    validate: (value) =>
                                        value === watch("password") || "Passwords do not match",
                                })}
                            />
                            {errors.confirmPassword && (
                                <div className="invalid-feedback">
                                    {errors.confirmPassword.message}
                                </div>
                            )}
                        </div>
                        <div className="col-md-6 mb-3">
                            <label htmlFor="skypeWhatsApp" className="form-label">
                                Skype/WhatsApp
                            </label>
                            <input
                                type="text"
                                className={`form-control ${errors.skypeWhatsApp ? "is-invalid" : ""}`}
                                id="skypeWhatsApp"
                                name="skypeWhatsApp"
                                {...register("skypeWhatsApp", {
                                    required: "Please Enter Skype / WhatsApp"
                                })}
                            />
                            {errors.skypeWhatsApp && (
                                <div className="invalid-feedback">
                                    {errors.skypeWhatsApp.message}
                                </div>
                            )}
                        </div>

                        <div className="col-md-6 mb-3">
                            <label htmlFor="domain" className="form-label">
                                Domain
                            </label>
                            <input
                                type="text"
                                className={`form-control ${errors.domain ? "is-invalid" : ""}`}
                                id="domain"
                                name="domain"
                                {...register("domain" , {
                                    required : "Please Enter your Domain"
                                })}
                            />
                            {errors.domain && (
                                <div className="invalid-feedback">
                                    {errors.domain.message}
                                </div>
                            )}
                        </div>
                        <div className="col-md-6 mb-3">
                            <label htmlFor="pageViewsPerDay" className="form-label">
                                Page Views Per Day
                            </label>
                            <input
                                type="text"
                                className={`form-control ${errors.pageViewsPerDay ? "is-invalid" : ""} ${
                                    watch("pageViewsPerDay") && !errors.pageViewsPerDay ? "is-valid" : ""
                                }`}
                                id="pageViewsPerDay"
                                name="pageViewsPerDay"
                                {...register("pageViewsPerDay", {
                                    required: "Please Enter Pages Views Per day"
                                })}
                            />

                            {errors.pageViewsPerDay && (
                                <div className="invalid-feedback">
                                    {errors.pageViewsPerDay.message}
                                </div>
                            )}
                        </div>

                        <div className="col-md-6 mb-3">
                            {/* Add other fields similarly */}
                        </div>

                        <button type="submit" className="btn btn-primary">
                            Create New Customer
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
