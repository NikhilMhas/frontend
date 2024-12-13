import React, { useState, useEffect } from "react";
import EmployeeForm from "./EmployeeForm";
import EmployeeList from "./EmployeeList";
import { API_URL } from "../config";
import "./styles.css"; 

const App = () => {
    const [employees, setEmployees] = useState([]);
    const [selectedEmployee, setSelectedEmployee] = useState(null);

    const fetchEmployees = async () => {
        try {
            const response = await fetch(`${API_URL}/getAll`);
            const data = await response.json();
            if (response.ok) {
                setEmployees(data);
            } else {
                alert(data.error || "Failed to fetch employees.");
            }
        } catch (error) {
            console.error("Error fetching employees:", error);
        }
    };

    useEffect(() => {
        fetchEmployees();
    }, []);

    const clearSelection = () => {
        setSelectedEmployee(null);
    };

    return (
        <div>
            <h1>Employee Management</h1>
            <EmployeeForm
                fetchEmployees={fetchEmployees}
                selectedEmployee={selectedEmployee}
                clearSelection={clearSelection}
            />
            <EmployeeList
                employees={employees}
                setSelectedEmployee={setSelectedEmployee}
                fetchEmployees={fetchEmployees}
            />
        </div>
    );
};

export default App;
