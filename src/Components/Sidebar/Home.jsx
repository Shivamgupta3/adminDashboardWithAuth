import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "../Sidebar/Home.css";
import logo from '../../assets/logo.png'
import { Link, Outlet } from "react-router-dom";

function Home() {
    const [isOpen, setIsOpen] = useState(true);

    return (
        <div className="d-flex">
            <div className={`sidebar bg-dark text-white vh-100 position-fixed top-0 start-0 ${isOpen ? "sidebar-expanded" : "sidebar-collapsed"}`}>
                {isOpen ? (
                    <div className="d-flex justify-content-between align-items-center p-3">
                        <img src={logo} alt="Logo" className="sidebar-logo me-2" />
                        <button
                            className={`btn toggle-btn ${isOpen ? "rotated" : ""}`}
                            onClick={() => setIsOpen(!isOpen)}
                        >
                            <i className={`bi ${isOpen ? "bi-chevron-left" : "bi-list"}`}></i>
                        </button>
                    </div>
                ) : (
                    <div className="d-flex justify-content-center p-3">
                        <button
                            className="btn toggle-btn"
                            onClick={() => setIsOpen(!isOpen)}
                        >
                            <i className={`bi ${isOpen ? "bi-chevron-left" : "bi-list"}`}></i>
                        </button>
                    </div>
                )}

                {isOpen && (
                    <ul className="nav flex-column p-2 sidebar-links fade-in">
                        <li className="nav-item">
                            <Link to="dashboard" className="nav-link sidebar-link">
                                <i className="bi bi-house-door me-2"></i> Home
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="profile" className="nav-link sidebar-link">
                                <i className="bi bi-person me-2"></i> Profile
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="settings" className="nav-link sidebar-link">
                                <i className="bi bi-gear me-2"></i> Settings
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/" className="nav-link sidebar-link">
                                <i className="bi bi-box-arrow-right me-2"></i> Logout
                            </Link>
                        </li>
                    </ul>
                )}
            </div>

            <div className={`content flex-grow-1 ${isOpen ? "content-expanded" : ""}`}>
                <Outlet context={{ isOpen }} />
            </div>
        </div>
    );
}

export default Home;
