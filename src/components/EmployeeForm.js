import React, { useState, useEffect } from "react";
import { API_URL } from "../config";

const EmployeeForm = ({ fetchEmployees, selectedEmployee, clearSelection }) => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        designation: "",
        empId: "",
    });

    const [editMode, setEditMode] = useState(false);

    useEffect(() => {
        if (selectedEmployee) {
            setFormData(selectedEmployee);
            setEditMode(true);
        } else {
            clearForm();
        }
    }, [selectedEmployee]);

    const clearForm = () => {
        setFormData({ name: "", email: "", designation: "", empId: "" });
        setEditMode(false);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const addEmployee = async () => {
        try {
            const response = await fetch(`${API_URL}/addEmp`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });
            const data = await response.json();
            if (response.ok) {
                alert(data.message);
            } else {
                alert(data.error || "Failed to add employee.");
            }
        } catch (error) {
            console.error("Error adding employee:", error);
        }
    };

    const updateEmployee = async () => {
        try {
            const response = await fetch(`${API_URL}/updateEmp/${formData.empId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });
            const data = await response.json();
            if (response.ok) {
                alert(data.message);
            } else {
                alert(data.error || "Failed to update employee.");
            }
        } catch (error) {
            console.error("Error updating employee:", error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (editMode) {
            await updateEmployee();
        } else {
            await addEmployee();
        }
        clearForm();
        fetchEmployees(); // Refresh the employee list
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Name"
                required
            />
            <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                required
            />
            <input
                type="text"
                name="designation"
                value={formData.designation}
                onChange={handleChange}
                placeholder="Designation"
                required
            />
            <input
                type="text"
                name="empId"
                value={formData.empId}
                onChange={handleChange}
                placeholder="Employee ID"
                required
                disabled={editMode} // Prevent changing empId in edit mode
            />
            <button type="submit">{editMode ? "Update" : "Add"} Employee</button>
            {editMode && <button type="button" onClick={clearSelection}>Cancel</button>}
        </form>
    );
};

export default EmployeeForm;
