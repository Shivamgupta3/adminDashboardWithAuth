import React, { useState, useEffect } from 'react'
import { useOutletContext } from 'react-router-dom';
import '../Settings/Settings.css'

const Settings = () => {
    const { isOpen } = useOutletContext();

    const [theme, setTheme] = useState(
        localStorage.getItem("theme") || "Light"
    );

    useEffect(() => {
        document.body.className = ""; 
        if (theme === "Dark") {
            document.body.classList.add("bg-dark", "text-white");
        } else if (theme === "Light") {
            document.body.classList.add("bg-light", "text-dark");
        }
        localStorage.setItem("theme", theme);
    }, [theme]);

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
                    <h2>Settings</h2>
                    <div className="mb-3">
                        <label htmlFor="theme" className="form-label mt-3">
                            Change Theme
                        </label>
                        <select
                            id="theme"
                            className="form-select"
                            style={{width: '300px'}}
                            value={theme}
                            onChange={(e) => setTheme(e.target.value)}
                        >
                            <option>Light</option>
                            <option>Dark</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Settings
