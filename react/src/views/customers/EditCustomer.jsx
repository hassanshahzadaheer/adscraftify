import React, {useState} from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const EditCustomer = ({customer, onClose, onSave}) => {
    const [editedData, setEditedData] = useState({
        // Initialize with existing customer data
        username: customer.user.name || '',
        email: customer.user.email || '',
        skypeWhatsApp: customer.skypeWhatsApp || '',
        domain: customer.domain || '',
        contact: customer.contact || '',
        pageViewsPerDay: customer.pageViewsPerDay || '',
    });

    const [validationErrors, setValidationErrors] = useState({});

    const handleChange = (e) => {
        const {name, value} = e.target;
        setEditedData(prevData => ({...prevData, [name]: value}));


        setValidationErrors(prevErrors => ({...prevErrors, [name]: null}));
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
                <Modal.Title>Edit Customer</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form>
                    <div className="mb-3">
                        <label htmlFor="username" className="form-label">Username:</label>
                        <input
                            type="text"
                            className={`form-control ${validationErrors.username ? 'is-invalid' : ''}`}
                            id="username"
                            name="username"
                            value={editedData.username}
                            onChange={handleChange}
                        />
                        {validationErrors.username && (
                            <div className="invalid-feedback">{validationErrors.username}</div>
                        )}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email:</label>
                        <input
                            type="text"
                            className={`form-control ${validationErrors.email ? 'is-invalid' : ''}`}
                            id="email"
                            name="email"
                            value={editedData.email}
                            onChange={handleChange}
                        />
                        {validationErrors.email && (
                            <div className="invalid-feedback">{validationErrors.email}</div>
                        )}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="skypeWhatsApp" className="form-label">Skype/WhatsApp:</label>
                        <input
                            type="text"
                            className="form-control"
                            id="skypeWhatsApp"
                            name="skypeWhatsApp"
                            value={editedData.skypeWhatsApp}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="domain" className="form-label">Domain:</label>
                        <input
                            type="text"
                            className="form-control"
                            id="domain"
                            name="domain"
                            value={editedData.domain}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="contact" className="form-label">Contact:</label>
                        <input
                            type="text"
                            className="form-control"
                            id="contact"
                            name="contact"
                            value={editedData.contact}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="pageViewsPerDay" className="form-label">Page Views Per Day:</label>
                        <input
                            type="text"
                            className="form-control"
                            id="pageViewsPerDay"
                            name="pageViewsPerDay"
                            value={editedData.pageViewsPerDay}
                            onChange={handleChange}
                        />
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

export default EditCustomer;
