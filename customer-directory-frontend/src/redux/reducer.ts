import type { AppState } from "../types/appState";
import { ADD_CUSTOMER, ADD_EVENT, ADD_REGISTRATION, DELETE_CUSTOMER, DELETE_EVENT, DELETE_REGISTRATION, LOGOUT, SET_CUSTOMERS, SET_EVENTS, SET_REGISTRATIONS, LOGIN, UPDATE_CUSTOMER, UPDATE_EVENT, UPDATE_REGISTRATION, SET_CUSTOMER } from "./actions";

const initialState: AppState = {
    isLoggedIn: false,
    user: null,
    customers: [],
    events: [],
}

const appReducer = (state = initialState, action: any) => {
    switch (action.type) {

        case LOGIN:
            return {
                ...state,
                isLoggedIn: true,
                token: action.payload.token,
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

        case SET_CUSTOMER:
            return {
                ...state,
                customers: [...state.customers, action.payload.customer]
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
                ),
            };

        case DELETE_EVENT:
            return {
                ...state,
                events: state.events.filter(
                    event => event.id !== action.payload.eventId
                ),
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

        default:
            return state;
    }
};

export default appReducer;