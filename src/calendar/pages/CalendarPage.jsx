import { useState } from 'react';
import { Calendar } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import { CalendarEvent, CalendarModal, FabAddNew, FabDelete, Navbar } from '../';
import { getMessagesES, localizer } from '../../helpers';
import { useAuthStore, useCalendarStore, useUIStore } from '../../hooks';
import { useEffect } from 'react';
import { CalendarSpinner } from '../../ui';

// import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
// const DnDCalendar = withDragAndDrop(Calendar);

export const CalendarPage = () => {
   
   const { user } = useAuthStore();
   const { openDateModal } = useUIStore();
   const { isLoadingEvents, activeEvent, events, setActiveEvent, onUnSelectActiveEvent, startLoadingEvents } = useCalendarStore();
   
   const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'month');

   const eventStyleGetter = ( event, start, end, isSelected ) => {
      const isMyEvent = ( user._id === event.user._id );

      const style = {
         backgroundColor: isMyEvent ? '#347CF7' : '#465660',
         borderRadius: '0px',
         opacity: 1,
         color: 'white'
      };
   
      return {
         style
      };
   };
   
   /**
    * TODO: usar onSelectSlot para agregar un evento de forma 
    * TODO: mas reactiva al clickear un slot del calendar
    */

   const onSelectSlot = ( { action, start } ) => {
      
      if ( action === 'click' ) {
         onUnSelectActiveEvent();
      }
      // console.log({ action, start});
   };
   
   const onDoubleClick = ( event ) => {
      // console.log({ doubleClick: event});
      if ( event.user._id !== user._id ) {
         return;
      }
      openDateModal();
   };
   
   const onSelect = ( event ) => {
      // console.log({ click: event});
      if ( event.user._id !== user._id ) {
         if (activeEvent) {
            onUnSelectActiveEvent(); 
         }
         return;
      }
      setActiveEvent( event );
   };
   
   const onViewChange = ( event ) => {
      // console.log({ viewChanged: event});
      localStorage.setItem('lastView', event);
      setLastView(event);
   };

   useEffect(() => {
      startLoadingEvents();
   }, []);
   

   return (
      <>
         <Navbar />
         {
            ( isLoadingEvents ) 
               ? <CalendarSpinner color='text-primary' />
               :
               <>
                  <Calendar
                     culture='es'
                     localizer={localizer}
                     events={events}
                     defaultView={ lastView }
                     startAccessor="start"
                     endAccessor="end"
                     style={{ height: 'calc( 100vh - 105px ) ' }}
                     messages={ getMessagesES() }
                     eventPropGetter={ eventStyleGetter }
                     components={{ event: CalendarEvent }}
                     onDoubleClickEvent={ onDoubleClick }
                     onSelectEvent={ onSelect }
                     onView={ onViewChange }
                     onSelectSlot={ onSelectSlot }
                     selectable
                  />

                  <CalendarModal />
                  <FabAddNew />
                  <FabDelete />
               </>             
         }
      </>
   );
};
