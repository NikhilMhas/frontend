import React from "react";
import { API_URL } from "../config";

const EmployeeList = ({ employees, setSelectedEmployee, fetchEmployees }) => {
    const handleDelete = async (empId) => {
        try {
            const response = await fetch(`${API_URL}/deleteEmp/${empId}`, {
                method: "DELETE",
            });
            const data = await response.json();
            if (response.ok) {
                alert(data.message);
                fetchEmployees(); // Refresh the employee list after deletion
            } else {
                alert(data.error || "Failed to delete employee.");
            }
        } catch (error) {
            console.error("Error deleting employee:", error);
        }
    };

    return (
        <div>
            <h2>Employee List</h2>
            {employees.length === 0 ? (
                <p>No employees found.</p>
            ) : (
                <ul>
                    {employees.map((employee) => (
                        <li key={employee.empId}>
                            <span>{employee.name} - {employee.designation}</span>
                            <button onClick={() => setSelectedEmployee(employee)}>Edit</button>
                            <button onClick={() => handleDelete(employee.empId)}>Delete</button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default EmployeeList;
