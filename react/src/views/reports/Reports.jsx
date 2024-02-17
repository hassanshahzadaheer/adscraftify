import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axiosClient from "../../axios-client.js";
import { toast, ToastContainer } from "react-toastify";

export default function Reports() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [users, setUsers] = useState([]);
    const [websites, setWebsites] = useState([]);
    const [isWebsiteDropdownDisabled, setIsWebsiteDropdownDisabled] = useState(true);

    useEffect(() => {
        // Fetch users and websites data from the API
        fetchUsers();
        fetchWebsites();
    }, []);

    const fetchUsers = () => {
        axiosClient.get("/customers")
            .then(response => {
                const userNames = response.data.data.map(user => ({
                    id: user.user.id,
                    name: user.user.name
                }));

                setUsers(userNames);
            })
            .catch(error => {
                console.error("Error fetching users:", error);
            });
    };

    const fetchWebsites = (userId) => {
        // Fetch reports data from the API
        axiosClient.get("/reports")
            .then(response => {
                const reports = response.data.data;
                const userIdInt = parseInt(userId, 10);
                // Filter reports based on user_id
                const userReports = reports.filter(report => report.user_id === userIdInt);
                const websiteData = userReports.map(report => ({
                    id: report.website.id,
                    url: report.website.url
                }));
                setWebsites(websiteData);
            })
            .catch(error => {
                console.error("Error fetching reports:", error);
            });
    };




    const onUserChange = (e) => {
        // When the user selection changes, fetch related websites and enable the dropdown
        const customerId = e.target.value;

        console.log("Selected User ID:", customerId); // Add this console log
        setIsWebsiteDropdownDisabled(!customerId); // Disable if customerId is falsy
        // setValue("website", ""); // Reset the website value when the user changes
        fetchWebsites(customerId);
    };


    const onSubmit = (data) => {
        // Handle form submission
        console.log(data);

         axiosClient.post("/reports", data)
           .then(response => {
             toast.success("Report submitted successfully");
           })
           .catch(error => {
             toast.error("Error submitting report");
           });
    };

    return (
        <div className="container-fluid">
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title fw-semibold mb-4">Reports Page</h5>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="mb-3">
                            <label htmlFor="user" className="form-label">Select Customer</label>
                            <select className="form-select" id="user" {...register("user", { required: true })} onChange={onUserChange}>
                                <option value="">Select User</option>
                                {users.map(user => (
                                    <option key={user.id} value={user.id}>{user.name}</option>
                                ))}
                            </select>
                                                        {errors.user && <div className="text-danger">Please select a customer</div>}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="website" className="form-label">Select Website</label>
                            <select
                                className="form-select"
                                id="website"
                                {...register("website", { required: true })}
                                disabled={isWebsiteDropdownDisabled}
                            >

                                <option value="">Select Website</option>
                                {websites.map(website => (
                                    <option key={website.id} value={website.id}>{website.url}</option>
                                ))}


                            </select>
                            {errors.website && <div className="text-danger">Please select a website</div>}
                        </div>


                        <div>
                            <div className="mb-3">
                                <label htmlFor="date" className="form-label">Date</label>
                                <input
                                    type="text"
                                    id="date"
                                    {...register("date", { required: true })}
                                    className={`form-control ${errors.date ? "is-invalid" : ""}`}
                                />
                                {errors.date && <div className="invalid-feedback">Date is required</div>}
                            </div>

                            <div className="mb-3">
                                <label htmlFor="adRequests" className="form-label">Ad Requests</label>
                                <input
                                    type="text"
                                    id="adRequests"
                                    {...register("adRequests", { required: true })}
                                    className={`form-control ${errors.adRequests ? "is-invalid" : ""}`}
                                />
                                {errors.adRequests && <div className="invalid-feedback">Ad Requests is required</div>}
                            </div>

                            <div className="mb-3">
                                <label htmlFor="fillRate" className="form-label">Fill Rate</label>
                                <input
                                    type="text"
                                    id="fillRate"
                                    {...register("fillRate", { required: true })}
                                    className={`form-control ${errors.fillRate ? "is-invalid" : ""}`}
                                />
                                {errors.fillRate && <div className="invalid-feedback">Fill Rate is required</div>}
                            </div>

                            <div className="mb-3">
                                <label htmlFor="adImpressions" className="form-label">Ad Impressions</label>
                                <input
                                    type="text"
                                    id="adImpressions"
                                    {...register("adImpressions", { required: true })}
                                    className={`form-control ${errors.adImpressions ? "is-invalid" : ""}`}
                                />
                                {errors.adImpressions && <div className="invalid-feedback">Ad Impressions is required</div>}
                            </div>

                            <div className="mb-3">
                                <label htmlFor="clicks" className="form-label">Clicks</label>
                                <input
                                    type="text"
                                    id="clicks"
                                    {...register("clicks", { required: true })}
                                    className={`form-control ${errors.clicks ? "is-invalid" : ""}`}
                                />
                                {errors.clicks && <div className="invalid-feedback">Clicks is required</div>}
                            </div>

                            <div className="mb-3">
                                <label htmlFor="ctr" className="form-label">CTR</label>
                                <input
                                    type="text"
                                    id="ctr"
                                    {...register("ctr", { required: true })}
                                    className={`form-control ${errors.ctr ? "is-invalid" : ""}`}
                                />
                                {errors.ctr && <div className="invalid-feedback">CTR is required</div>}
                            </div>

                            <div className="mb-3">
                                <label htmlFor="ecpm" className="form-label">eCPM</label>
                                <input
                                    type="text"
                                    id="ecpm"
                                    {...register("ecpm", { required: true })}
                                    className={`form-control ${errors.ecpm ? "is-invalid" : ""}`}
                                />
                                {errors.ecpm && <div className="invalid-feedback">eCPM is required</div>}
                            </div>

                            <div className="mb-3">
                                <label htmlFor="revenue" className="form-label">Revenue</label>
                                <input
                                    type="text"
                                    id="revenue"
                                    {...register("revenue", { required: true })}
                                    className={`form-control ${errors.revenue ? "is-invalid" : ""}`}
                                />
                                {errors.revenue && <div className="invalid-feedback">Revenue is required</div>}
                            </div>
                        </div>



                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
}
