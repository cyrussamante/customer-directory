import { useSelector } from "react-redux";
import { getCustomerInfo, getCustomers } from "../api/customersAPI";
import { getEvents } from "../api/eventsAPI";
import { setEvents, setCustomers, setCustomer } from "../redux/actions";
import type { RootState } from "../redux/store";


export default async function configureHomePage (role: string, dispatch: any, navigate: any) {

    const responseEvent = await getEvents();
    dispatch(setEvents(responseEvent.data));
    const id = useSelector((state: RootState) => state.app.user.id);
    
    if (role === 'customer') {
      const response = await getCustomerInfo(id);
      dispatch(setCustomer([response.data]));

      navigate('/events');

    } else {
      const response = await getCustomers();
      dispatch(setCustomers(response.data));
      navigate('/customers');
      
    }
  }