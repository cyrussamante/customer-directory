import { getCustomers } from "../api/customersAPI";
import { getEvents } from "../api/eventsAPI";
import { setEvents, setCustomers } from "../redux/actions";
import type { User } from "../types/appState";


export default async function configureHomePage (user: User, dispatch: any, navigate: any, token: string) {

    const responseEvent = await getEvents(token);
    dispatch(setEvents(responseEvent.data));
  
    if (user.role === 'CUSTOMER') {
      console.log("I am here")
      navigate('/events');
    } else{
      const response = await getCustomers(token);
      dispatch(setCustomers(response.data));
      navigate('/customers');
    }
  }