import { getCustomers } from "../api/customersAPI";
import { getUsers } from "../api/usersAPI";
import { getEvents } from "../api/eventsAPI";
import { getRegistrations } from "../api/registrationsAPI";
import { setEvents, setCustomers, setRegistrations, setEmployees } from "../redux/actions";
import type { Registration, User, Event } from "../types/appState";
import { createEvent, type DateArray } from 'ics';


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

export const handleExportToICS = (event : Event) => {
        const startDate = new Date(event.startDateTime);
        const endDate = new Date(event.endDateTime);
        const icsEvent = {
            title: event.title,
            description: event.description,
            location: event.location,
            start: [ startDate.getFullYear(), startDate.getMonth() + 1, startDate.getDate(), startDate.getHours(), startDate.getMinutes() ] as DateArray,
            end: [endDate.getFullYear(),endDate.getMonth() + 1,endDate.getDate(),endDate.getHours(),endDate.getMinutes()] as DateArray,
        };
        createEvent(icsEvent, (error, value) => {
            if (error) {
                console.log(error);
                return;
            }
            const blob = new Blob([value], { type: 'text/calendar' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `${event.title}.ics`;
            a.click();
            URL.revokeObjectURL(url);
        });
    }

export function authHeader() {
    const token = localStorage.getItem('token');
    console.log(token);
    return token ? { Authorization: `Bearer ${token}` } : {};
}
