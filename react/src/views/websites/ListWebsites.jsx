import React, { useState, useEffect } from 'react';
import axiosClient from '../../axios-client';
import Swal from 'sweetalert2';
import EditWebsite from './EditWebsites.jsx';
import { toast, ToastContainer } from 'react-toastify';

export default function ListWebsites() {
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [websites, setWebsites] = useState(null);
    const [filteredWebsites, setFilteredWebsites] = useState(null);
    const [selectedWebsite, setSelectedWebsite] = useState(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        // Fetch the list of websites
        fetchWebsites(currentPage);
    }, [currentPage]);

    useEffect(() => {
        if (!searchTerm) {
            setFilteredWebsites(websites);
        } else {
            const filtered = websites?.filter(
                (website) =>
                    website.customer.user.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredWebsites(filtered);
        }
    }, [searchTerm, websites]);

    const fetchWebsites = (page) => {
        axiosClient
            .get(`websites?page=${page}`)
            .then((response) => {
                setWebsites(response.data.data);
                setFilteredWebsites(response.data.data);
                setTotalPages(response.data.meta.last_page);
            })
            .catch((error) => {
                console.error('Error fetching websites:', error);
            });
    };

    const handleEdit = (websiteId) => {
        const websiteToEdit = websites?.find((website) => website.id === websiteId);
        setSelectedWebsite(websiteToEdit);
        setIsEditModalOpen(true);
    };

    const handleCloseEditModal = () => {
        setIsEditModalOpen(false);
        setSelectedWebsite(null);
    };

    const handleSaveEditModal = async (editedData) => {
        try {
            const response = await axiosClient.put(`websites/${selectedWebsite.id}`, editedData);

            if (response.status === 200) {
                setWebsites((prevWebsites) =>
                    prevWebsites.map((website) =>
                        website.id === selectedWebsite.id
                            ? {...website, ...editedData, customer: {...website.customer, ...editedData.customer}}
                            : website
                    )
                );

                toast.success('Website updated successfully');
            } else {
                toast.error('Failed to update website');
            }
        } catch (error) {
            toast.error('Failed to update website');
        } finally {
            onClose();
        }
    };

    const handleDelete = (websiteId) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You will not be able to recover this website!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!',
        }).then((result) => {
            if (result.isConfirmed) {
                axiosClient
                    .delete(`websites/${websiteId}`)
                    .then((response) => {
                        if (response.status === 200) {
                            setWebsites((prevWebsites) =>
                                prevWebsites.filter((website) => website.id !== websiteId)
                            );

                            Swal.fire('Deleted!', 'The website has been deleted.', 'success');
                        } else {
                            Swal.fire('Error!', 'Failed to delete the website.', 'error');
                        }
                    })
                    .catch((error) => {
                        Swal.fire('Error!', 'Failed to delete the website.', 'error');
                    });
            }
        });
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <div className="container-fluid">
            <div className="card">
                <ToastContainer/>
                <div className="card-body">
                    <h5 className="card-title fw-semibold mb-4">Website List</h5>
                    <div className="mb-3">
                        <label htmlFor="search" className="form-label">
                            Search:
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="search"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <table className="table table-bordered">
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>User Name</th>
                            <th>User Email</th>
                            <th>Contact</th>
                            <th>Alex Rank</th>
                            <th>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {filteredWebsites?.map((website) => (
                            <tr key={website.id}>
                                <td>{website.id}</td>
                                <td>{website.customer.user.name}</td>
                                <td>{website.customer.user.email}</td>
                                <td> <a href={website.url} target="_blank" rel="noopener noreferrer">
                                    {website.url}
                                </a></td>
                                <td>{website.alexa_rank}</td>
                                <td>
                                    <button
                                        className="btn btn-primary btn-sm"
                                        onClick={() => handleEdit(website.id)}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="btn btn-danger btn-sm ms-2"
                                        onClick={() => handleDelete(website.id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                    <div className="pagination">
                        {Array.from({length: totalPages}, (_, index) => (
                            <button
                                key={index + 1}
                                className={`btn btn-outline-primary me-2 ${currentPage === index + 1 && 'active'}`}
                                onClick={() => handlePageChange(index + 1)}
                            >
                                {index + 1}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {isEditModalOpen && (
                <EditWebsite
                    website={selectedWebsite}
                    onClose={handleCloseEditModal}
                    onSave={handleSaveEditModal}
                />
            )}
        </div>
    );
}
