import api from "./api";

// Mark attendance
export const markAttendance = (data) =>
  api.post("/attendance", data);

// Get attendance by employee
export const fetchAttendance = (employeeId) =>
  api.get(`/attendance/${employeeId}`);
