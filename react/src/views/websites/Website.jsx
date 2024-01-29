import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axiosClient from "../../axios-client.js";
import { toast, ToastContainer } from "react-toastify";

export default function Website() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [users, setUsers] = useState([]);

    // Fetch users from API
    useEffect(() => {
        axiosClient.get("/customers")
            .then(response => {
              const userNames = response.data.data.map(user => ({
                    id: user.user.id,
                    name: user.user.name
                }));

                // Log the extracted usernames

                setUsers(userNames);
            })
            .catch(error => {
                swal({
                    title: "Error",
                    text: "Failed to fetch users. Please try again later.",
                    icon: "error",
                });
            });
    }, []);

    const onSubmit = (data) => {
        axiosClient.post("/websites", data)
            .then(response => {
                // Handle success
                toast.success("Website added successfully");
            })
            .catch(error => {
                // Handle error
                console.error("Error adding website:", error);
                toast.error("Failed to add website");
            });
    };

    return (
        <div className="container-fluid">
            <ToastContainer />
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title fw-semibold mb-4">Website Page</h5>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="mb-3">
                            <label htmlFor="userId" className="form-label">User</label>
                            <select id="userId" {...register("userId", { required: true })} className={`form-select ${errors.userId ? "is-invalid" : ""}`}>
                                <option value="">Select User</option>
                                {users.map(user => (
                                    <option key={user.id} value={user.id}>{user.name}</option>
                                ))}
                            </select>
                            {errors.userId && <div className="invalid-feedback">Please select a user</div>}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="fullName" className="form-label">Full Name</label>
                            <input type="text" id="fullName" {...register("fullName", { required: true })} className={`form-control ${errors.fullName ? "is-invalid" : ""}`} />
                            {errors.fullName && <div className="invalid-feedback">Full Name is required</div>}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="url" className="form-label">URL</label>
                            <input type="text" id="url" {...register("url", { required: true })} className={`form-control ${errors.url ? "is-invalid" : ""}`} />
                            {errors.url && <div className="invalid-feedback">URL is required</div>}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="alexaRank" className="form-label">Alexa Rank</label>
                            <input type="number" id="alexaRank" {...register("alexaRank")} className="form-control" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="country" className="form-label">Country</label>
                            <input type="text" id="country" {...register("country")} className="form-control" />
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    );
}
