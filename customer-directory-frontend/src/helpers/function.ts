import { getCustomers } from "../api/customersAPI";
import { getUsers } from "../api/accountAPI";
import { getEvents } from "../api/eventsAPI";
import { getRegistrations } from "../api/registrationsAPI";
import { setEvents, setCustomers, setRegistrations, setEmployees } from "../redux/actions";
import type { Registration, User } from "../types/appState";

export default async function configureHomePage(user: User, dispatch: any, navigate: any, token: string) {

  const responseEvent = await getEvents(token);
  dispatch(setEvents(responseEvent.data));

  if (user.role === 'CUSTOMER') {

    const responseRegistrations = await getRegistrations(token);
    const userRegistrations = responseRegistrations.data.filter((reg: Registration) => reg.customerId === user.id);
    dispatch(setRegistrations(userRegistrations));
    navigate('/events');

  } else {

    const response = await getCustomers(token);
    dispatch(setCustomers(response.data));

    const responseRegistrations = await getRegistrations(token);
    dispatch(setRegistrations(responseRegistrations.data));

    if (user.role === 'ADMIN') {
      const responseUsers = await getUsers(token);
      const employees = responseUsers.data.filter((employee: User) => employee.role !== 'CUSTOMER' && employee.id !== user.id);
      dispatch(setEmployees(employees));
    }

    navigate('/customers');
  }

}