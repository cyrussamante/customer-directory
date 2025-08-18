import type AppState from "../types/appState";
import { ADD_CUSTOMER, DELETE_CUSTOMER, LOGOUT, SET_CUSTOMERS, LOGIN, UPDATE_CUSTOMER} from "./actions";

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
                user: action.payload.user,
            };

        case LOGOUT:
            return {
                ...state,
                isLoggedIn: false,
                user: null,
            };

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

        
        default:
            return state;
    }
};

export default appReducer;