import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addEmployee, updateEmployee } from '../store/employeeSlice';
import { toast } from 'react-toastify';

function EmployeeForm() {
    const { register, handleSubmit, formState: { errors }, setValue } = useForm();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { id } = useParams();
    const employees = useSelector(state => state.employees);

    React.useEffect(() => {
        // If editing, populate form with employee data
        if (id) {
            const employee = employees.find(emp => emp.id === parseInt(id));
            if (employee) {
                setValue('FullName', employee.FullName);
                setValue('birthdate', employee.birthdate);
                setValue('Department', employee.Department);
                setValue('Experience', employee.Experience);
            }
        }
    }, [id, employees, setValue]);

    // Handle form submission
    const onSubmit = (data) => {
        if (id) {
            // Update existing employee
            dispatch(updateEmployee({ ...data, id: parseInt(id) }));
            toast.success('Employee updated successfully!');
        } else {
            // Add new employee
            dispatch(addEmployee(data));
            toast.success('Employee added successfully!');
        }
        navigate('/list');
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card">
                        <h4 className="card-header">{id ? 'Edit Employee' : 'Add Employee'}</h4>
                        <div className="card-body">
                            <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="mb-3">
                                <label htmlFor="FullName" className="form-label">Full Name:</label>
                                <input type="text" className={`form-control ${errors.FullName ? 'is-invalid' : ''}`}
                                    id="FullName"
                                    {...register("FullName", { 
                                    required: "Full Name is required",
                                    pattern: {
                                    value: /^[A-Za-z\s]+$/,
                                    message: "Full Name must contain only letters A-Z"
                                        }
                                    })}
                                />
                                    {errors.FullName && <div className="invalid-feedback">{errors.FullName.message}</div>}
                            </div>
                                <div className="mb-3">
                                    <label htmlFor="birthdate" className="form-label">Birthdate:</label>
                                    <input
                                        type="date"
                                        className={`form-control ${errors.birthdate ? 'is-invalid' : ''}`}
                                        id="birthdate"
                                        {...register("birthdate", { required: "Birthdate is required" })}
                                    />
                                    {errors.birthdate && <div className="invalid-feedback">{errors.birthdate.message}</div>}
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="Department" className="form-label">Department:</label>
                                    <input
                                        type="text"
                                        className={`form-control ${errors.Department ? 'is-invalid' : ''}`}
                                        id="Department"
                                        {...register("Department", { required: "Department is required" })}
                                    />
                                    {errors.Department && <div className="invalid-feedback">{errors.Department.message}</div>}
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="Experience" className="form-label">Experience (in years):</label>
                                    <input
                                        type="number"
                                        className={`form-control ${errors.Experience ? 'is-invalid' : ''}`}
                                        id="Experience"
                                        {...register("Experience", { 
                                            required: "Experience is required",
                                            min: { value: 0, message: "Experience cannot be negative" }
                                        })}
                                    />
                                    {errors.Experience && <div className="invalid-feedback">{errors.Experience.message}</div>}
                                </div>
                                <div className="d-flex justify-content-center">
                                    <button type="submit" className="btn btn-primary">
                                        {id ? 'Update Employee' : 'Add Employee'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EmployeeForm;