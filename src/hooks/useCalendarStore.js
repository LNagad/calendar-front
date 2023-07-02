import { useDispatch, useSelector } from 'react-redux';
import { onAddNewEvent, onDeleteEvent, onLoadEvents, onSetActiveEvent, onUpdateEvent, unSelectActiveEvent } from '../store';
import { calendarApi } from '../api';
import { convertDateEvents } from '../helpers';
import Swal from 'sweetalert2';

export const useCalendarStore = () => {
   const dispatch = useDispatch();
   const { user } = useSelector( state => state.auth );
   const { events, activeEvent, isLoadingEvents } = useSelector( state => state.calendar );
   
   const setActiveEvent = ( calendarEvent ) => {
      dispatch( onSetActiveEvent( calendarEvent ) );
   };

   const onUnSelectActiveEvent = () => {
      dispatch( unSelectActiveEvent() );
   };

   const startLoadingEvents = async() => {
      try {
      
         const { data } = await calendarApi.get('/events');
         const events = convertDateEvents( data.events );
         dispatch( onLoadEvents(events) );
         
      } catch (error) {
         console.log('Error fetching events');
         console.log(error);
      }  
   };

   const startSavingEvent = async( calendarEvent ) => {

      try {
         if (calendarEvent.id){
            //* Updating
            await calendarApi.put(`/events/${ calendarEvent.id }`, calendarEvent);
            dispatch( onUpdateEvent({ ...calendarEvent, user }));
            return;
         } 
   
         //* Creating
         const { data } = await calendarApi.post('/events', calendarEvent);
         dispatch( onAddNewEvent({ ...calendarEvent, id: data.event.id, user }) );
            
      } catch (error) {
         console.log(error);
         Swal.fire('Couldn\'t save', error.response.data.msg, 'error');
      }
   };

   const startDeletingEvent = async() => {
      
      try {
         await calendarApi.delete(`/events/${ activeEvent.id }`);
         Swal.fire('Deleted', `${activeEvent.title} has been sucesfully removed`, 'success');
         dispatch( onDeleteEvent() );
      } catch (error) {
         console.log(error);
         Swal.fire('Couldn\'t delete this note', error.response.data.msg, 'error');
      }
   };

   return {
      //* Propiedades
      isLoadingEvents,
      events,
      activeEvent,
      hasEventSelected: !!activeEvent, //? null = false - object = true

      //* Metodos
      setActiveEvent,
      onUnSelectActiveEvent,
      startSavingEvent,
      startDeletingEvent,
      startLoadingEvents,
   };
};
