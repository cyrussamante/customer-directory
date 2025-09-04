import type { User } from '../types/appState';
import { useParams } from 'react-router';
import "./EmployeeDetails.css"
import DeleteConfirmationModal from '../components/DeleteConfirmationModal';
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../redux/store';
import { editUser, removeUser } from '../api/usersAPI';
import { deleteEmployee, updateEmployee } from '../redux/actions';
import EmployeeModal from '../components/EmployeeModal';

export default function EmployeeDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [showDeleteModal, setDeleteModal] = useState(false);
    const [showEditModal, setEditModal] = useState(false);
    const state = useSelector((state: RootState) => state.app);
    const user = state.user;
    const users = state.users;
    const employee = users.find((employee: User) => employee.id === id);
    const dispatch = useDispatch();

    const handleDeleteClick = () => setDeleteModal(true);

    const handleCloseDeleteModal = () => setDeleteModal(false);

    const handleDeleteEmployee = async (e: any) => {
        e.preventDefault()
        if (employee) {
            const response = await removeUser(employee.id);
            if (response.status !== 204) {
                throw new Error('Failed to delete employee');
            }
            dispatch(deleteEmployee(employee.id));
            setDeleteModal(false);
            navigate(-1);
        }
    }

    const handleEditClick = () => setEditModal(true);

    const handleCloseEditModal = () => setEditModal(false);

    const handleEditEmployee = async (updatedEmployee: User) => {
        const response = await editUser(updatedEmployee.id, updatedEmployee);
        if (response.status < 200 || response.status >= 300) {
            throw new Error('Failed to update employee');
        }
        dispatch(updateEmployee(updatedEmployee));
        setEditModal(false);
    }

    const handleCloseProfileClick = () => navigate('/employees');

    return (
        <div className="detailsPage">
            <div className="employeeDetails">
                {employee ? (
                    <>
                        <div className="detailsHead">
                            <h2>{employee.name}</h2>
                            <div className="detailsButtons">
                                {user.role === 'ADMIN' && <button className="edit" onClick={handleEditClick} >Edit Details </button>}
                                {user.role === 'ADMIN' && <button className="delete" onClick={handleDeleteClick} >Delete</button>}
                                <button onClick={handleCloseProfileClick} >Close Profile</button>
                            </div>
                        </div>
                        <div className="detailsBody">
                            <div className="imageContainer">
                                <img src="/images/default-profile.png" alt={employee?.name} />
                            </div>
                            <div className="detailsGrid">
                                <p className="classifier">Email </p> <p>{employee.email}</p>
                                <p className="classifier">Password </p> <p>********</p>
                                <p className="classifier">Role </p> <p>{employee.role}</p>
                            </div>
                        </div>
                        {showEditModal && (<EmployeeModal
                           mode={'edit'}
                            employee={employee}
                            onClose={handleCloseEditModal}
                            onSave={handleEditEmployee} />)}

                        {showDeleteModal && (<DeleteConfirmationModal
                            onClose={handleCloseDeleteModal}
                            onConfirm={handleDeleteEmployee} />)}
                    </>
                ) : (
                    <div>No employee data available.</div>
                )}
            </div>
        </div>
    )
}