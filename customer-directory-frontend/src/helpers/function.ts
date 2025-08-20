import { getCustomerInfo, getCustomers } from "../api/customersAPI";
import { getEvents } from "../api/eventsAPI";
import { setEvents, setCustomers, setCustomer } from "../redux/actions";
import type { User } from "../types/appState";


export default async function configureHomePage (user: User, dispatch: any, navigate: any) {

    const responseEvent = await getEvents();
    dispatch(setEvents(responseEvent.data));
  
    if (user.role === 'customer') {
      console.log("I am here")
      const response = await getCustomerInfo(user.id);
      dispatch(setCustomer(response.data));
      navigate('/events');
    } else {
      const response = await getCustomers();
      dispatch(setCustomers(response.data));
      navigate('/customers');
    }
  }