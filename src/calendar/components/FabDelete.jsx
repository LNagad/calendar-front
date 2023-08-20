import { useAuthStore, useCalendarStore, useUIStore } from '../../hooks';

//? Fab = floating action button
export const FabDelete = () => {

   const { startDeletingEvent, activeEvent, } = useCalendarStore();
   const { isDateModalOpen } = useUIStore();
   const { user } = useAuthStore();

   const handleDelete = () => {
      startDeletingEvent();
   };

   if ( isDateModalOpen ) {
      return <></>;
   }

   return (
      ( activeEvent?.user._id === user?._id) ?
         <button
            aria-label='fab-btn-delete'
            className="btn btn-danger fab-danger"
            onClick={ handleDelete }>
            <i className="fas fa-trash-alt"></i>
         </button>
         :
         <></>
   );
};
