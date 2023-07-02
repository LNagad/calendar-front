import { addHours } from 'date-fns';
import { useCalendarStore, useUIStore } from '../../hooks';

//? Fab = floating action button
export const FabAddNew = () => {

   const { openDateModal, isDateModalOpen } = useUIStore();
   const { setActiveEvent } = useCalendarStore();

   if ( isDateModalOpen ) {
      return <></>;
   }

   const handleClickNew = () => {
      setActiveEvent( {
         title: '',
         notes: '',
         start: new Date(),
         end: addHours( new Date(), 2 ),
         bgColor: '#fafafa',
         user: {
            _id: '123',
            name: 'Maycol'
         }
      });
      openDateModal();
   };

   return (
      <button
         className="btn btn-primary fab"
         onClick={ handleClickNew }
      >
         <i className="fas fa-plus"></i>
      </button>
   );
};
