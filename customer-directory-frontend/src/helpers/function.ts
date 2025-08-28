import { getCustomers } from "../api/customersAPI";
import { getEvents } from "../api/eventsAPI";
import { getRegistrations } from "../api/registrationsAPI";
import { setEvents, setCustomers, setRegistrations } from "../redux/actions";
import type { User } from "../types/appState";


export default async function configureHomePage (user: User, dispatch: any, navigate: any, token: string) {

    const responseEvent = await getEvents(token);
    dispatch(setEvents(responseEvent.data));

    const responseRegistrations = await getRegistrations(token);
    dispatch(setRegistrations(responseRegistrations.data));
  
    if (user.role === 'CUSTOMER') {
      navigate('/events');
    } else{
      const response = await getCustomers(token);
      dispatch(setCustomers(response.data));
      navigate('/customers');
    }
  }