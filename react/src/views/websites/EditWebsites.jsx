import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const EditWebsite = ({ website, onClose, onSave }) => {
    const [editedData, setEditedData] = useState({
        // Initialize with existing website data
        url: website.url || '',
        alexa_rank: website.alexa_rank || '',
        country: website.country || '',
    });

    const [validationErrors, setValidationErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedData(prevData => ({ ...prevData, [name]: value }));

        setValidationErrors(prevErrors => ({ ...prevErrors, [name]: null }));
    };

    const handleSave = () => {
        const errors = {};

        // Basic required field validation
        Object.keys(editedData).forEach(key => {
            if (!editedData[key]) {
                errors[key] = 'This field is required';
            }
        });

        if (Object.keys(errors).length > 0) {
            // If there are validation errors, update the state and prevent saving
            console.log('Validation errors:', errors);
            setValidationErrors(errors);
            return;
        }

        // Save the edited data and close the modal
        onSave(editedData);
        onClose();
    };

    return (
        <Modal show={true} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>Edit Website</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form>
                    <div className="mb-3">
                        <label htmlFor="url" className="form-label">URL:</label>
                        <input
                            type="text"
                            className={`form-control ${validationErrors.url ? 'is-invalid' : ''}`}
                            id="url"
                            name="url"
                            value={editedData.url}
                            onChange={handleChange}
                        />
                        {validationErrors.url && (
                            <div className="invalid-feedback">{validationErrors.url}</div>
                        )}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="alexa_rank" className="form-label">Alexa Rank:</label>
                        <input
                            type="text"
                            className={`form-control ${validationErrors.alexa_rank ? 'is-invalid' : ''}`}
                            id="alexa_rank"
                            name="alexa_rank"
                            value={editedData.alexa_rank}
                            onChange={handleChange}
                        />
                        {validationErrors.alexa_rank && (
                            <div className="invalid-feedback">{validationErrors.alexa_rank}</div>
                        )}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="country" className="form-label">Country:</label>
                        <input
                            type="text"
                            className={`form-control ${validationErrors.country ? 'is-invalid' : ''}`}
                            id="country"
                            name="country"
                            value={editedData.country}
                            onChange={handleChange}
                        />
                        {validationErrors.country && (
                            <div className="invalid-feedback">{validationErrors.country}</div>
                        )}
                    </div>
                </form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleSave}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default EditWebsite;
