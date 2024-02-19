import React, { useState, useEffect } from 'react';
import axiosClient from "../../axios-client.js";
import { useForm } from "react-hook-form";
import Swal from 'sweetalert2';
import { toast, ToastContainer } from 'react-toastify';
import { calculateTotals, renderTableFooter } from './ReportUtils';

export default function ListReports() {

    const { register, handleSubmit, formState: { errors } } = useForm();

    // State variables
    const [websites, setWebsites] = useState([]);
    const [isWebsiteDropdownDisabled, setIsWebsiteDropdownDisabled] = useState(true);
    const [selectedWebsite, setSelectedWebsite] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [reports, setReports] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    // Fetch websites based on selected user
    useEffect(() => {
        fetchWebsites();
    }, []);

    // Fetch reports based on selected website and date range
    useEffect(() => {
        if (selectedWebsite && startDate && endDate) {
            fetchReports();
        }
    }, [selectedWebsite, startDate, endDate, currentPage]);

    const fetchWebsites = async () => {
        try {
            const response = await axiosClient.get("/websites");
            const websiteData = response.data.data.map(website => ({
                id: website.id,
                url: website.url
            }));
            setWebsites(websiteData);
            setIsWebsiteDropdownDisabled(false);
        } catch (error) {
            toast.error('Failed to fetch websites');
        }
    };

    const fetchReports = async () => {
        try {
            const response = await axiosClient.get('/reports');
            const { data } = response.data;
            const filteredReports = data.filter(report => {
                const reportDate = new Date(report.date);
                const startDateObj = new Date(startDate);
                const endDateObj = new Date(endDate);
                return reportDate >= startDateObj && reportDate <= endDateObj;
            });
            setReports(filteredReports);
        } catch (error) {
            toast.error('Failed to fetch reports');
        }
    };

    // Handle website selection change
    const handleWebsiteChange = (e) => {
        setSelectedWebsite(e.target.value);
    };

    // Handle start date change
    const handleStartDateChange = (e) => {
        setStartDate(e.target.value);
    };

    // Handle end date change
    const handleEndDateChange = (e) => {
        setEndDate(e.target.value);
    };

    // Handle form submission
    const onSubmit = (data) => {
        if (selectedWebsite && startDate && endDate) {
            fetchReports();
        } else {
            toast.error('Please select a website and provide a date range');
        }
    };

    // Handle page change for pagination
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-6 mb-3">
                    {/* Website selection dropdown */}
                    <label htmlFor="website" className="form-label">Select Website</label>
                    <select
                        className="form-select"
                        id="website"
                        {...register("website", { required: true })}
                        disabled={isWebsiteDropdownDisabled}
                        onChange={handleWebsiteChange}
                    >
                        <option value="">Select Website</option>
                        {websites.map(website => (
                            <option key={website.id} value={website.id}>{website.url}</option>
                        ))}
                    </select>
                    {errors.website && <div className="text-danger">Please select a website</div>}
                </div>
                <div className="col-md-3 mb-3">
                    {/* Start date selection */}
                    <label className="form-label">Start Date</label>
                    <input
                        type="date"
                        className="form-control"
                        value={startDate}
                        onChange={handleStartDateChange}
                    />
                </div>
                <div className="col-md-3 mb-3">
                    {/* End date selection */}
                    <label className="form-label">End Date</label>
                    <input
                        type="date"
                        className="form-control"
                        value={endDate}
                        onChange={handleEndDateChange}
                    />
                </div>
                <div className="col-md-12 mb-3">
                    {/* Submit button */}
                    <button className="btn btn-primary" onClick={handleSubmit(onSubmit)}>Show Reports</button>
                </div>
            </div>

            {/* Report table */}
            {reports.length > 0 && (
                <table className="table table-bordered">
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Date</th>
                        <th>Ad Requests</th>
                        <th>Fill Rate</th>
                        <th>Ad Impressions</th>
                        <th>Clicks</th>
                        <th>CTR</th>
                        <th>eCPM</th>
                        <th>Revenue</th>
                    </tr>
                    </thead>
                    <tbody>
                    {reports.map(report => (
                        <tr key={report.id}>
                            <td>{report.id}</td>
                            <td>{report.date}</td>
                            <td>{report.ad_requests}</td>
                            <td>{report.fill_rate}</td>
                            <td>{report.ad_impressions}</td>
                            <td>{report.clicks}</td>
                            <td>{report.ctr}</td>
                            <td>{report.ecpm}</td>
                            <td>{report.revenue}</td>
                        </tr>
                    ))}
                    </tbody>
                    {reports.length > 0 && renderTableFooter(reports)}

                </table>
            )}

            {/* Pagination */}
            <div className="d-flex justify-content-center">
                <nav aria-label="Page navigation">
                    <ul className="pagination">
                        {Array.from({length: totalPages}, (_, index) => (
                            <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                                <button className="page-link" onClick={() => handlePageChange(index + 1)}>
                                    {index + 1}
                                </button>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
            <ToastContainer/>
        </div>
    );
}
