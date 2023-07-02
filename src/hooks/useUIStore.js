import { useDispatch, useSelector } from 'react-redux';
import { onCloseDateModal, onOpenDateModal, unSelectActiveEvent } from '../store';

export const useUIStore = () => {

   const dispatch = useDispatch();
   
   const { 
      isDateModalOpen
   } = useSelector( state => state.ui);

   const openDateModal = () => {
      dispatch( onOpenDateModal() );
   };
    
   const closeDateModal = () => {
      dispatch( onCloseDateModal() );
      dispatch( unSelectActiveEvent() );
   };
    
   const toggleDateModal = () => {
      (isDateModalOpen) 
         ? dispatch( onCloseDateModal() )
         : dispatch( onOpenDateModal() );
   };


   return {
      //* Propiedades
      isDateModalOpen,

      //* Metodos
      openDateModal,
      closeDateModal,
      toggleDateModal
   };
};
