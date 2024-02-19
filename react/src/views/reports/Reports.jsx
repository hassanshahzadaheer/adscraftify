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


    const onSubmit = async (data) => {
        console.log(data);
        try {
            // Parse the selected user's ID and website ID
            const userId = parseInt(data.user);
            const websiteId = parseInt(data.website);

            // Make sure both IDs are valid integers
            if (isNaN(userId) || isNaN(websiteId)) {
                throw new Error("Invalid user or website ID");
            }
            // Add the parsed IDs to the report data
            const reportData = { ...data, user_id: userId, website_id: websiteId };

            // Make the API request to submit the report
            const response = await axiosClient.post("/reports", reportData);

            // Check if the request was successful
            if (response.status === 200 || response.status === 201) {
                // Show success message using toast
                toast.success("Report submitted successfully", {
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
                // Show error message using toast
                toast.error("Failed to submit report. Please try again.", {
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
            // Show error message using toast
            toast.error(`Failed to submit report: ${error.message}`, {
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
                                    type="date"
                                    id="date"
                                    {...register("date", { required: true })}
                                    className={`form-control ${errors.date ? "is-invalid" : ""}`}
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="adRequests" className="form-label">Ad Requests</label>
                                <input
                                    type="number" // Use type "number" for numeric input
                                    id="adRequests" // Use camelCase for consistency with backend field names
                                    {...register("ad_requests", { required: true })} // Register with correct field name
                                    className={`form-control ${errors.ad_requests ? "is-invalid" : ""}`}
                                />
                                {errors.ad_requests && <div className="invalid-feedback">Ad Requests is required</div>}
                            </div>

                            <div className="mb-3">
                                <label htmlFor="fillRate" className="form-label">Fill Rate</label>
                                <input
                                    type="number" // Use type "number" for numeric input
                                    id="fillRate" // Use camelCase for consistency with backend field names
                                    {...register("fill_rate", { required: true })} // Register with correct field name
                                    className={`form-control ${errors.fill_rate ? "is-invalid" : ""}`}
                                />
                                {errors.fill_rate && <div className="invalid-feedback">Fill Rate is required</div>}
                            </div>

                            <div className="mb-3">
                                <label htmlFor="adImpressions" className="form-label">Ad Impressions</label>
                                <input
                                    type="number" // Use type "number" for numeric input
                                    id="adImpressions" // Use camelCase for consistency with backend field names
                                    {...register("ad_impressions", { required: true })} // Register with correct field name
                                    className={`form-control ${errors.ad_impressions ? "is-invalid" : ""}`}
                                />
                                {errors.ad_impressions && <div className="invalid-feedback">Ad Impressions is required</div>}
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
