import type { User, Customer, Event, Registration } from "../types/appState";

export const LOGIN = "LOGIN";
export const LOGOUT = 'LOGOUT';

export const SET_CUSTOMERS = "SET_CUSTOMERS";
export const ADD_CUSTOMER = "ADD_CUSTOMER";
export const UPDATE_CUSTOMER = "UPDATE_CUSTOMER";
export const DELETE_CUSTOMER = "DELETE_CUSTOMER";
export const SET_USER = "SET_USER";

export const SET_EVENTS = "SET_EVENTS";
export const ADD_EVENT = "ADD_EVENT";
export const UPDATE_EVENT = "UPDATE_EVENT";
export const DELETE_EVENT = "DELETE_EVENT";

export const SET_REGISTRATIONS = "SET_REGISTRATIONS";
export const ADD_REGISTRATION = "ADD_REGISTRATION";
export const UPDATE_REGISTRATION = "UPDATE_REGISTRATION";
export const DELETE_REGISTRATION = "DELETE_REGISTRATION";

export const setLogin = (user: User, token: string) => ({
  type: LOGIN,
  payload: { user, token },
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

export const setUser = (user: Customer) => ({
  type: SET_USER,
  payload: { user },
});

export const setEvents = (events: Event[]) => ({
  type: SET_EVENTS,
  payload: { events },
});

export const addEvent = (event: Event) => ({
  type: ADD_EVENT,
  payload: { event },
});

export const updateEvent = (event: Event) => ({
  type: UPDATE_EVENT,
  payload: { event },
});

export const deleteEvent = (eventId: string) => ({
  type: DELETE_EVENT,
  payload: { eventId },
});

export const setRegistrations = (registrations: Registration[]) => ({
  type: SET_REGISTRATIONS,
  payload: { registrations },
});

export const addRegistration = (registration: Registration) => ({
  type: ADD_REGISTRATION,
  payload: { registration },
});

export const updateRegistration = (registration: Registration) => ({
  type: UPDATE_REGISTRATION,
  payload: { registration },
});

export const deleteRegistration = (registrationId: string) => ({
  type: DELETE_REGISTRATION,
  payload: { registrationId },
});