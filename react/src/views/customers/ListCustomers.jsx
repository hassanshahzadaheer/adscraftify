import React, {useEffect, useState} from 'react';
import axiosClient from '../../axios-client';
import Swal from 'sweetalert2';
import EditCustomer from './EditCustomer.jsx';
import {toast, ToastContainer} from 'react-toastify';

export default function ListCustomers() {
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [customers, setCustomers] = useState(null);
    const [filteredCustomers, setFilteredCustomers] = useState(null);
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        // Fetch the list of customers with related user information
        fetchCustomers(currentPage);
    }, [currentPage]);

    useEffect(() => {
        if (!searchTerm) {
            setFilteredCustomers(customers);
        } else {
            const filtered = customers?.filter(
                (customer) =>
                    customer.user.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredCustomers(filtered);
        }
    }, [searchTerm, customers]);

    const fetchCustomers = (page) => {
        axiosClient
            .get(`customers/?page=${page}`)
            .then((response) => {
                setCustomers(response.data.data);
                setFilteredCustomers(response.data.data);
                setTotalPages(response.data.meta.last_page);
            })
            .catch((error) => {
                console.error('Error fetching customers:', error);
            });
    };

    const handleEdit = (customerId) => {
        const customerToEdit = customers?.find((customer) => customer.id === customerId);
        setSelectedCustomer(customerToEdit);
        setIsEditModalOpen(true);
    };

    const handleCloseEditModal = () => {
        setIsEditModalOpen(false);
        setSelectedCustomer(null);
    };

    const handleSaveEditModal = async (editedData) => {
        try {
            const response = await axiosClient.put(`customers/${selectedCustomer.id}`, editedData);

            if (response.status === 200) {
                setCustomers((prevCustomers) =>
                    prevCustomers.map((customer) =>
                        customer.id === selectedCustomer.id
                            ? {...customer, ...editedData, user: {...customer.user, ...editedData.user}}
                            : customer
                    )
                );

                toast.success('Customer updated successfully');
            } else {
                toast.error('Failed to update customer');
            }
        } catch (error) {
            toast.error('Failed to update customer');
        } finally {
            onClose();
        }
    };

    const handleDelete = (customerId) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You will not be able to recover this customer!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!',
        }).then((result) => {
            if (result.isConfirmed) {
                axiosClient
                    .delete(`customers/${customerId}`)
                    .then((response) => {
                        if (response.status === 200) {
                            setCustomers((prevCustomers) =>
                                prevCustomers.filter((customer) => customer.id !== customerId)
                            );

                            Swal.fire('Deleted!', 'The customer has been deleted.', 'success');
                        } else {
                            Swal.fire('Error!', 'Failed to delete the customer.', 'error');
                        }
                    })
                    .catch((error) => {
                        Swal.fire('Error!', 'Failed to delete the customer.', 'error');
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
                    <h5 className="card-title fw-semibold mb-4">Customer List</h5>
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
                            <th>Page Views</th>
                            <th>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {filteredCustomers?.map((customer) => (
                            <tr key={customer.id}>
                                <td>{customer.id}</td>
                                <td>{customer.user.name}</td>
                                <td>{customer.user.email}</td>
                                <td>{customer.contact}</td>
                                <td>{customer.pageViewsPerDay}</td>
                                <td>
                                    <button
                                        className="btn btn-primary btn-sm"
                                        onClick={() => handleEdit(customer.id)}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="btn btn-danger btn-sm ms-2"
                                        onClick={() => handleDelete(customer.id)}
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
                <EditCustomer
                    customer={selectedCustomer}
                    onClose={handleCloseEditModal}
                    onSave={handleSaveEditModal}
                />
            )}
        </div>
    );
}
