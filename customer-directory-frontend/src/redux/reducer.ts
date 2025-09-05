import type { AppState } from "../types/appState";
import {
    ADD_CUSTOMER,
    ADD_EVENT,
    ADD_REGISTRATION,
    ADD_EMPLOYEE,
    DELETE_CUSTOMER,
    DELETE_EVENT,
    DELETE_REGISTRATION,
    DELETE_EMPLOYEE,
    LOGOUT,
    SET_CUSTOMERS,
    SET_EVENTS,
    SET_REGISTRATIONS,
    SET_EMPLOYEES,
    LOGIN,
    UPDATE_CUSTOMER,
    UPDATE_EVENT,
    UPDATE_REGISTRATION,
    UPDATE_EMPLOYEE,
    SET_USER,
    ADD_BULK_REGISTRATION,
    REMOVE_BULK_REGISTRATION
} from "./actions";

const initialState: AppState = {
    isLoggedIn: false,
    user: null,
    customers: [],
    users: [],
    events: [],
}

const appReducer = (state = initialState, action: any) => {
    switch (action.type) {

        case LOGIN:
            return {
                ...state,
                isLoggedIn: true,
                user: action.payload.user,
            };

        case LOGOUT:
            return state = initialState;

        case SET_CUSTOMERS:
            return {
                ...state,
                customers: action.payload.customers,
            };

        case ADD_CUSTOMER:
            return {
                ...state,
                customers: [...state.customers, action.payload.customer],
            };

        case UPDATE_CUSTOMER:
            return {
                ...state,
                customers: state.customers.map(customer =>
                    customer.id === action.payload.customer.id
                        ? action.payload.customer
                        : customer
                ),
            };

        case DELETE_CUSTOMER:
            return {
                ...state,
                customers: state.customers.filter(
                    customer => customer.id !== action.payload.customerId
                ),
            };

        case SET_EMPLOYEES:
            return {
                ...state,
                users: action.payload.employees,
            };

        case ADD_EMPLOYEE:
            return {
                ...state,
                users: [...state.users, action.payload.employee],
            };

        case UPDATE_EMPLOYEE:
            return {
                ...state,
                users: state.users.map(employee =>
                    employee.id === action.payload.employee.id
                        ? action.payload.employee
                        : employee
                ),
            };

        case DELETE_EMPLOYEE:
            return {
                ...state,
                users: state.users.filter(
                    employee => employee.id !== action.payload.employeeId
                )
            };

        case SET_USER:
            return {
                ...state,
                user: action.payload.user
            };

        case SET_EVENTS:
            return {
                ...state,
                events: action.payload.events,
            };

        case ADD_EVENT:
            return {
                ...state,
                events: [...state.events, action.payload.event],
            };

        case UPDATE_EVENT:
            return {
                ...state,
                events: state.events.map(event =>
                    event.id === action.payload.event.id
                        ? action.payload.event
                        : event
                )
            };

        case DELETE_EVENT:
            return {
                ...state,
                events: state.events.filter(
                    event => event.id !== action.payload.eventId
                )
            };

        case SET_REGISTRATIONS:
            return {
                ...state,
                registrations: action.payload.registrations,
            };

        case ADD_REGISTRATION:
            return {
                ...state,
                registrations: [...state.registrations || [], action.payload.registration],
            };

        case UPDATE_REGISTRATION:
            return {
                ...state,
                registrations: (state.registrations || []).map(registration =>
                    registration.id === action.payload.registration.id
                        ? action.payload.registration
                        : registration
                ),
            };

        case DELETE_REGISTRATION:
            return {
                ...state,
                registrations: (state.registrations || []).filter(
                    registration => registration.id !== action.payload.registrationId
                ),
            };

        case ADD_BULK_REGISTRATION:
            return {
                ...state,
                registrations: [...(state.registrations || []), ...action.payload.registrations],
            };

        case REMOVE_BULK_REGISTRATION:
            return {
                ...state,
                registrations: (state.registrations || []).filter(
                    registration => !action.payload.registrationIds.includes(registration.id)
                ),
            };

        default:
            return state;
    }
};

export default appReducer;