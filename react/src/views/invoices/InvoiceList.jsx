import React, { useEffect, useState } from 'react';
import axiosClient from '../../axios-client';
import Swal from 'sweetalert2';
import { toast, ToastContainer } from 'react-toastify';

export default function InvoiceList() {
    const [invoices, setInvoices] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchInvoices(currentPage);
    }, [currentPage]);

    const fetchInvoices = (page) => {
        axiosClient
            .get(`/invoices?page=${page}`)
            .then((response) => {
                console.log(response.data.data); // Add this line
                setInvoices(response.data.data);
                setTotalPages(response.data.meta.last_page);
            })
            .catch((error) => {
                console.error('Error fetching invoices:', error);
            });


    };

    const handleDelete = (invoiceId) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You will not be able to recover this invoice!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!',
        }).then((result) => {
            if (result.isConfirmed) {
                axiosClient
                    .delete(`/invoices/${invoiceId}`)
                    .then((response) => {
                        if (response.status === 200) {
                            setInvoices((prevInvoices) =>
                                prevInvoices.filter((invoice) => invoice.id !== invoiceId)
                            );

                            toast.success('Invoice deleted successfully');
                        } else {
                            toast.error('Failed to delete invoice');
                        }
                    })
                    .catch((error) => {
                        toast.error('Failed to delete invoice');
                    });
            }
        });
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <div className="container-fluid">
            <ToastContainer />
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title fw-semibold mb-4">Invoice List</h5>
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
                            <th>Full Name</th>
                            <th>Website</th>
                            <th>Deduction</th>
                            <th>Amount</th>
                            <th>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {invoices.map((invoice) => (


                            <tr key={invoice.id}>
                                <td>{invoice.id}</td>
                                <td>{invoice.user ? invoice.user.name.replace(/\b\w/g, (char) => char.toUpperCase()) : 'N/A'}</td>
                                <td>{invoice.customer?.domain || 'N/A'}</td>
                                <td>${invoice.deduction}</td>
                                <td>${invoice.amount}</td>
                                <td>
                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() => handleDelete(invoice.id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                    <div className="pagination">
                        {Array.from({ length: totalPages }, (_, index) => (
                            <button
                                key={index + 1}
                                className={`btn btn-outline-primary me-2 ${
                                    currentPage === index + 1 && 'active'
                                }`}
                                onClick={() => handlePageChange(index + 1)}
                            >
                                {index + 1}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
