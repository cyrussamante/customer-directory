import type { User, Customer, Event, Registration } from "../types/appState";

export const LOGIN = "LOGIN";
export const LOGOUT = 'LOGOUT';

export const SET_CUSTOMERS = "SET_CUSTOMERS";
export const ADD_CUSTOMER = "ADD_CUSTOMER";
export const UPDATE_CUSTOMER = "UPDATE_CUSTOMER";
export const DELETE_CUSTOMER = "DELETE_CUSTOMER";

export const setLogin = (user: User) => ({
  type: LOGIN,
  payload: { user },
});

export const setLogout = () => ({
  type: LOGOUT,
})

export const setCustomers = (customers: Customer[]) => ({
  type: SET_CUSTOMERS,
  payload: { customers },
});

export const addCustomer = (customer: Customer) => ({
  type: ADD_CUSTOMER,
  payload: { customer },
});

export const updateCustomer = (customer: Customer) => ({
  type: UPDATE_CUSTOMER,
  payload: { customer },
});

export const deleteCustomer = (customerId: string) => ({
  type: DELETE_CUSTOMER,
  payload: { customerId },
});
