// eslint-disable-next-line no-unused-vars
import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { deleteEmployee } from '../store/employeeSlice';
import { toast } from 'react-toastify';

function EmployeeList() {
    const employees = useSelector(state => state.employees);
    const dispatch = useDispatch();

    // Handle employee deletion
    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this employee?")) {
            dispatch(deleteEmployee(id));
            toast.success('Employee deleted successfully!');
        }
    }

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">Employee Management Application</h2>
            <table className="table table-bordered table-striped">
                <thead className="table-dark">
                    <tr>
                        <th scope="col">Full Name</th>
                        <th scope="col">Birthdate</th>
                        <th scope="col">Department</th>
                        <th scope="col">Experience (years)</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.length > 0 ? (
                        employees.map((employee) => (
                            <tr key={employee.id}>
                                <td>{employee.FullName}</td>
                                <td>{employee.birthdate}</td>
                                <td>{employee.Department}</td>
                                <td>{employee.Experience}</td>
                                <td>
                                    <Link to={`/edit/${employee.id}`} className="btn btn-outline-primary me-2">Edit</Link>
                                    <button className="btn btn-outline-danger" onClick={() => handleDelete(employee.id)}>Delete</button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5" className="text-center">No employees found.</td>
                        </tr>
                    )}
                    <tr>
                        <td colSpan="5" className="text-center">
                            <Link to="/add" className="btn btn-primary">Add Employee</Link>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default EmployeeList;