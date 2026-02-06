import { useEffect, useState } from "react";
import { fetchEmployees } from "../api/employees";
import { markAttendance, fetchAttendance } from "../api/attendance";

function Attendance() {
    const [employees, setEmployees] = useState([]);
    const [selectedEmployee, setSelectedEmployee] = useState("");
    const [records, setRecords] = useState([]);
    const [form, setForm] = useState({
        date: "",
        status: "Present",
    });
    const [error, setError] = useState("");

    useEffect(() => {
        fetchEmployees().then((res) => setEmployees(res.data));
    }, []);

    const loadAttendance = async (id) => {
        if (!id) {
            setRecords([]);
            setError("");
            return;
        }

        try {
            const res = await fetchAttendance(id);
            setRecords(res.data);
            setError("");
        } catch {
            setError("Unable to fetch attendance records.");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await markAttendance({
                employee_id: Number(selectedEmployee),
                date: form.date,
                status: form.status,
            });
            loadAttendance(selectedEmployee);
        } catch {
            setError("Failed to mark attendance");
        }
    };

    return (
        <div>
            <h2>📅 Attendance</h2>

            <select
                value={selectedEmployee}
                onChange={(e) => {
                    setSelectedEmployee(e.target.value);
                    loadAttendance(e.target.value);
                }}
            >
                <option value="">Select Employee</option>
                {employees.map((e) => (
                    <option key={e.id} value={e.id}>
                        {e.full_name}
                    </option>
                ))}
            </select>

            {selectedEmployee && (
                <form onSubmit={handleSubmit} className="card">
                    <input
                        type="date"
                        required
                        value={form.date}
                        onChange={(e) =>
                            setForm({ ...form, date: e.target.value })
                        }
                    />

                    <select
                        value={form.status}
                        onChange={(e) =>
                            setForm({ ...form, status: e.target.value })
                        }
                    >
                        <option>Present</option>
                        <option>Absent</option>
                    </select>

                    <button>Mark Attendance</button>
                </form>
            )}

            {error && <p className="error">{error}</p>}

            {!error && records.length === 0 && selectedEmployee && (
                <p>No attendance records found.</p>
            )}

            <ul>
                {records.map((r) => (
                    <li key={r.id} className="card">
                        <span>{r.date}</span>
                        <span className="status present">{r.status}</span>
                    </li>
                ))}
            </ul>

        </div>
    );
}

export default Attendance;
