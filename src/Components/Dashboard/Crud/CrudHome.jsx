import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { useOutletContext } from 'react-router-dom'

const CrudHome = () => {
    const [allData, setAllData] = useState([])   // 🔹 store all users
    const [page, setPage] = useState(1)
    const [limit] = useState(7)
    const [search, setSearch] = useState("")
    const [filter, setFilter] = useState("all")
    const [sortField, setSortField] = useState("id")   // 🔹 default sort by id
    const [sortOrder, setSortOrder] = useState("asc")  // 🔹 asc or desc

    const { isOpen } = useOutletContext();

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        const res = await axios.get('https://dummyjson.com/users?limit=200')
        setAllData(res.data.users)
    }

    const handleDelete = (id) => {
        const confirm = window.confirm("Would you like to Delete")
        if (confirm) {
            axios.delete(`https://dummyjson.com/users/${id}`).then(() => {
                setAllData(allData.filter(user => user.id !== id))
            })
        }
    }

    // 🔹 1. Filter by gender
    let filteredData = allData.filter(user => {
        if (filter !== "all" && user.gender !== filter) return false
        return true
    })

    // 🔹 2. Apply search (on name + email)
    if (search.trim() !== "") {
        filteredData = filteredData.filter(user =>
        (`${user.firstName} ${user.lastName}`.toLowerCase().includes(search.toLowerCase()) ||
            user.email.toLowerCase().includes(search.toLowerCase()))
        )
    }

    // 🔹 3. Sorting
    filteredData.sort((a, b) => {
        let fieldA, fieldB

        if (sortField === "name") {
            fieldA = `${a.firstName} ${a.lastName}`.toLowerCase()
            fieldB = `${b.firstName} ${b.lastName}`.toLowerCase()
        } else {
            fieldA = a[sortField]
            fieldB = b[sortField]
        }

        if (fieldA < fieldB) return sortOrder === "asc" ? -1 : 1
        if (fieldA > fieldB) return sortOrder === "asc" ? 1 : -1
        return 0
    })

    // 🔹 4. Pagination AFTER filtering + sorting
    const totalPages = Math.ceil(filteredData.length / limit)
    const paginatedData = filteredData.slice((page - 1) * limit, page * limit)

    return (
        <div
            className="flex-grow-1 p-4 d-flex flex-column justify-content-center align-items-center bg-light"
            style={{
                marginLeft: isOpen ? "250px" : "60px",
                transition: "margin 0.4s ease",
            }}
        >
            <h1>List of Users</h1>

            {/* Search + Filter + Sort */}
            <div className="mb-3 w-75 d-flex gap-2">
                <input
                    type="text"
                    placeholder="Search by name or email..."
                    className="form-control"
                    value={search}
                    onChange={(e) => {
                        setPage(1)
                        setSearch(e.target.value)
                    }}
                />
                <select
                    className="form-select"
                    value={filter}
                    onChange={(e) => {
                        setPage(1)
                        setFilter(e.target.value)
                    }}
                >
                    <option value="all">All</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                </select>

                {/* Sorting Dropdown */}
                <select
                    className="form-select"
                    value={sortField}
                    onChange={(e) => setSortField(e.target.value)}
                >
                    <option value="id">Sort by ID</option>
                    <option value="name">Sort by Name</option>
                    <option value="email">Sort by Email</option>
                </select>

                <select
                    className="form-select"
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value)}
                >
                    <option value="asc">Ascending</option>
                    <option value="desc">Descending</option>
                </select>
            </div>

            {paginatedData.length > 0 ? (
                <div className="w-80 rounded bg-light border shadow p-4" style={{ overflowY: "auto" }}>
                    <div className='d-flex justify-content-end'>
                        <Link to="/home/dashboard/create" className='btn btn-success'>Add+</Link>
                    </div>
                    <table className='table table-striped'>
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginatedData.map((item) => (
                                <tr key={item.id}>
                                    <td>{item.id}</td>
                                    <td>{item.firstName} {item.lastName}</td>
                                    <td>{item.email}</td>
                                    <td>{item.phone}</td>
                                    <td>
                                        <Link to={`/home/dashboard/read/${item.id}`} className='btn btn-sm btn-success me-2'>Read</Link>
                                        <Link to={`/home/dashboard/update/${item.id}`} className='btn btn-sm btn-primary me-2'>Edit</Link>
                                        <button onClick={() => handleDelete(item.id)} className='btn btn-sm btn-danger'>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {/* Pagination controls */}
                    <div className="d-flex justify-content-center align-items-center">
                        <button
                            disabled={page === 1}
                            onClick={() => setPage(page - 1)}
                            className='btn btn-dark me-2'>Prev</button>
                        <span>Page {page} of {totalPages}</span>
                        <button
                            disabled={page === totalPages}
                            onClick={() => setPage(page + 1)}
                            className='btn btn-dark ms-2'>Next</button>
                    </div>
                </div>
            ) : (
                <div className="d-flex justify-content-center align-items-center text-center text-danger fw-bold" style={{ minHeight: "300px" }}>
                    <h4>No Data Available</h4>
                </div>
            )}
        </div>
    )
}

export default CrudHome
