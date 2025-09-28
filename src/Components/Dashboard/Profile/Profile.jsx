import React from 'react'
import { useOutletContext } from 'react-router-dom';
import "../Profile/Profile.css"
import profile from '../../../assets/profile.jpg'

const Profile = () => {
    const { isOpen } = useOutletContext();
    return (
        <div>
            <div
                className="flex-grow-1 p-4"
                style={{
                    marginLeft: isOpen ? "250px" : "60px",
                    transition: "margin 0.4s ease",
                }}
            >
                <div>
                    <h2 >User Profile</h2>
                    <div className="container py-4">
                        <div className="card shadow-sm border-0 rounded-3">
                            <div className="card-body">
                                <div className="d-flex align-items-center mb-3">
                                    <img
                                        src={profile}
                                        alt="User Avatar"
                                        className="rounded-circle me-3 border"
                                    />
                                    <div>
                                        <h5 className="mb-0">Shivam Gupta</h5>
                                        <small className="text-muted">Frontend Developer</small>
                                    </div>
                                </div>
                                
                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item">
                                        <strong>Email:</strong> shivam@example.com
                                    </li>
                                    <li className="list-group-item">
                                        <strong>Phone:</strong> +91 9876543210
                                    </li>
                                    <li className="list-group-item">
                                        <strong>Location:</strong> New Delhi, India
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile