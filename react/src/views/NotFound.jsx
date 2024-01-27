import React from "react";

export default function NotFound() {
    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 mx-auto text-center">
                    <div className="error-template">
                        <h1>Oops!</h1>
                        <h2>404 - Not Found</h2>
                        <div className="error-details">
                            Sorry, an error occurred. The requested page was not found!
                        </div>
                        <div className="error-actions mt-4">
                            <a href="/" className="btn btn-primary btn-lg">
                                Take Me Home
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
