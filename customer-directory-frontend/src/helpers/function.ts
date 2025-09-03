import { getCustomers } from "../api/customersAPI";
import { getUsers } from "../api/accountAPI";
import { getEvents } from "../api/eventsAPI";
import { getRegistrations } from "../api/registrationsAPI";
import { setEvents, setCustomers, setRegistrations, setEmployees } from "../redux/actions";
import type { Registration, User } from "../types/appState";

export default async function configureHomePage(user: User, dispatch: any) {
  const responseEvent = await getEvents();
  dispatch(setEvents(responseEvent.data));

  if (user.role === 'CUSTOMER') {
    const responseRegistrations = await getRegistrations();
    const userRegistrations = responseRegistrations.data.filter((reg: Registration) => reg.customerId === user.id);
    dispatch(setRegistrations(userRegistrations));
  } else {
    const response = await getCustomers();
    dispatch(setCustomers(response.data));
    const responseRegistrations = await getRegistrations();
    dispatch(setRegistrations(responseRegistrations.data));
    if (user.role === 'ADMIN') {
      const responseUsers = await getUsers();
      const employees = responseUsers.data.filter((employee: User) => employee.role !== 'CUSTOMER' && employee.id !== user.id);
      dispatch(setEmployees(employees));
    }
  }
}