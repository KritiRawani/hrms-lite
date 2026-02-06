import api from "./api";

// Get all employees
export const fetchEmployees = () => api.get("/employees");

// Add employee
export const createEmployee = (data) => api.post("/employees", data);

// Delete employee
export const deleteEmployee = (id) => api.delete(`/employees/${id}`);
