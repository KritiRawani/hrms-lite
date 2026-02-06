import { useEffect, useState } from "react";
import {
    fetchEmployees,
    createEmployee,
    deleteEmployee,
} from "../api/employees";

function Employees() {
    const [employees, setEmployees] = useState([]);
    const [form, setForm] = useState({
        employee_id: "",
        full_name: "",
        email: "",
        department: "",
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const loadEmployees = async () => {
        setLoading(true);
        try {
            const res = await fetchEmployees();
            setEmployees(res.data);
            setError("");
        } catch (err) {
            setError("Failed to load employees");
        }
        setLoading(false);
    };

    useEffect(() => {
        loadEmployees();
    }, []);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createEmployee(form);
            setForm({
                employee_id: "",
                full_name: "",
                email: "",
                department: "",
            });
            loadEmployees();
        } catch (err) {
            setError(err.response?.data?.detail || "Error adding employee");
        }
    };

    const handleDelete = async (id) => {
        if (!confirm("Delete this employee?")) return;
        await deleteEmployee(id);
        loadEmployees();
    };

    return (
        <div>
            <h2>👥 Employees</h2>

            {/* Add Employee Form */}
            <form onSubmit={handleSubmit} className="employee-form">
                <input
                    name="employee_id"
                    placeholder="Employee ID"
                    value={form.employee_id}
                    onChange={handleChange}
                    required
                />

                <input
                    name="full_name"
                    placeholder="Full Name"
                    value={form.full_name}
                    onChange={handleChange}
                    required
                />

                <input
                    name="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={handleChange}
                    required
                />

                <input
                    name="department"
                    placeholder="Department"
                    value={form.department}
                    onChange={handleChange}
                    required
                />

                {/* BUTTON INSIDE FORM */}
                <div className="form-actions">
                    <button type="submit" className="primary-btn">
                        Add Employee
                    </button>
                </div>
            </form>

            {loading && <p>Loading...</p>}
            {error && <p className="error">{error}</p>}

            {!loading && employees.length === 0 && <p>No employees found.</p>}

            {/* Employee List */}
            <ul>
                {employees.map((emp) => (
                    <li key={emp.id} className="card">
                        <strong>{emp.full_name}</strong> ({emp.department})
                        <br />
                        {emp.email}
                        <br />
                        <button onClick={() => handleDelete(emp.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Employees;
