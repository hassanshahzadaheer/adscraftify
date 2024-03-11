import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axiosClient from "../../axios-client.js";
import { toast, ToastContainer } from "react-toastify";

export default function Invoice() {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const [users, setUsers] = useState([]);
    const [domains, setDomains] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [selectedDomain, setSelectedDomain] = useState("");
    // Fetch users and domains from API
    useEffect(() => {
        axiosClient.get("/customers")
            .then(response => {
                console.log("API Response:", response.data);
                // Extract the users and domains from the API response
                const users = response.data.data.map(customer => ({
                    id: customer.user.id,
                    name: customer.user.name,
                    domain: customer.domain
                }));
                const domains = response.data.data.map(customer => customer.domain);
                console.log("Users:", users);
                console.log("Domains:", domains);
                setUsers(users);
                setDomains(domains);
            })
            .catch(error => {
                console.error("Error fetching customers:", error);
                toast.error("Failed to fetch customers. Please try again later.");
            });
    }, []);


    const handleUserChange = (event) => {
        const selectedUserId = parseInt(event.target.value);
        const selectedUser = users.find(user => user.id === selectedUserId);
        if (selectedUser) {
            setSelectedUser(selectedUser);
            setSelectedDomain(selectedUser.domain);
        }
    };


    const onSubmit = async (data) => {

        try {
            // Add the selected user's ID and website ID to the data
            const invoiceData = {
                user_id: parseInt(data.userId),
                customer_id: parseInt(data.userId),
                deduction: parseFloat(data.deduction),
                amount: parseFloat(data.amount)
            };

            // Make the API request
            const response = await axiosClient.post("/invoices", invoiceData);

            // Check if the request was successful
            if (response.status === 200 || response.status === 201) {
                // Show success message using toast
                toast.success("Invoice added successfully");
            } else {
                // Show error message using toast
                toast.error("Failed to add invoice. Please try again.");
            }
        } catch (error) {
            // Show error message using toast
            console.error("Error creating invoice:", error);
            toast.error(`Failed to add invoice: ${error.message}`);
        }
    };

    return (
        <div className="container-fluid">
            <ToastContainer />
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title fw-semibold mb-4">Invoice Page</h5>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="mb-3">
                            <label htmlFor="userId" className="form-label">User</label>
                            <select
                                id="userId"
                                name="userId"
                                {...register("userId", { required: true })} // Register userId field with validation
                                onChange={handleUserChange} // Call handleUserChange on selection change
                                className={`form-select ${errors.userId ? "is-invalid" : ""}`}
                            >                                <option value="">Select User</option>
                                {users.map(user => (
                                    <option key={user.id} value={user.id}>{user.name}</option>
                                ))}
                            </select>
                            {errors.userId && <div className="invalid-feedback">Please select a user</div>}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="deduction" className="form-label">Deduction</label>
                            <input type="number" id="deduction" {...register("deduction", { required: true })} className={`form-control ${errors.deduction ? "is-invalid" : ""}`} />
                            {errors.deduction && <div className="invalid-feedback">Deduction is required</div>}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="websiteId" className="form-label">Website</label>
                            <input
                                type="text"
                                id="websiteId"
                                name="websiteId"
                                value={selectedDomain} // Value is set to the selected website domain
                                readOnly // Read-only input field
                                className="form-control"
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="amount" className="form-label">Amount</label>
                            <input type="number" id="amount" {...register("amount", { required: true })} className={`form-control ${errors.amount ? "is-invalid" : ""}`} />
                            {errors.amount && <div className="invalid-feedback">Amount is required</div>}
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>

                </div>
            </div>
        </div>
    );
}
