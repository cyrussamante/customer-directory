import type { User } from '../types/appState';
import EmployeeCard from '../components/EmployeeCard';
import { useState } from "react";
import "./List.css";
import EmployeeModal from '../components/EmployeeModal';
import ListIcon from '@mui/icons-material/List';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../redux/store';
import { register } from '../api/accountAPI';
import { addEmployee } from '../redux/actions';

export default function EmployeeList() {

    const [searchTerm, setSearchTerm] = useState("");
    const [showAddModal, setShowAddModal] = useState(false);
    const users: User[] = useSelector((state: RootState) => state.app.users);
    const user = useSelector((state: RootState) => state.app.user);

    const employees = users.filter((employee) => employee.role !== 'CUSTOMER' && employee.id !== user?.id);
    const dispatch = useDispatch();


    const userRole = user?.role;

    if (!user) {
        return <div>No employee data available.</div>;
    }

    const filteredEmployees = employees.filter((employee) =>
        employee.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleAddClick = () => setShowAddModal(true);

    const handleCloseModal = () => setShowAddModal(false);

    const handleAddEmployee = async (employee: any) => {
        const response = await register(employee)
        dispatch(addEmployee(response.data))
        setShowAddModal(false)
    }

    return (
        <div className="employees">
            <div className="employeesHeader">
                <ListIcon />
                <h2>Employee List</h2>
            </div>
            <div className="search">
                <input
                    type="text"
                    className="searchInput"
                    placeholder="Search employees"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                {userRole === 'ADMIN' && (
                    <button onClick={handleAddClick}>
                        Add Employee
                    </button>
                )}
            </div>

            {filteredEmployees.length === 0 ? (
                <div className="noEmployees">
                    <SentimentDissatisfiedIcon />
                    <p>No employees found.</p>
                </div>
            ) : (
                <div className="employeeGrid">
                    {filteredEmployees.map((employee: User) => (
                        <EmployeeCard key={employee.id} employee={employee} />
                    ))}
                </div>
            )}

            {showAddModal && (<EmployeeModal
                mode={'add'}
                onClose={handleCloseModal}
                onSave={handleAddEmployee} />)}
        </ div>
    )
}