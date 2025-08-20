import { getCustomers } from "../api/customersAPI";
import { getEvents } from "../api/eventsAPI";
import { setEvents, setCustomers } from "../redux/actions";


export default async function configureHomePage (role: string, dispatch: any, navigate: any) {

    const responseEvent = await getEvents();
    dispatch(setEvents(responseEvent.data));
    
    if (role === 'customer') {
      navigate('/events');

    } else {
      const response = await getCustomers();
      dispatch(setCustomers(response.data));
      navigate('/customers');
      
    }
  }