import { addHours, differenceInSeconds } from 'date-fns';
import { useMemo, useState } from 'react';
import Swal from 'sweetalert2';
import { useCalendarStore, useUIStore } from '../../hooks';
import { useEffect } from 'react';

export const useCalendarModal = () => {

   const { activeEvent, startSavingEvent } = useCalendarStore();
   const { isDateModalOpen, closeDateModal } = useUIStore();
   const [formSubmitted, setFormSubmitted] = useState(false);
    
   const [formValues, setFormValues] = useState({
      title: '',
      notes: '',
      start: new Date(),
      end: addHours( new Date(), 2),
   });

   useEffect(() => {
      if ( activeEvent !== null ) {
         setFormValues({ ...activeEvent });
      }
      
   }, [ activeEvent ]);
   
    
   const titleClass = useMemo(() => {
      if ( !formSubmitted ) return '';
    
      return ( formValues.title.length > 0 )
         ? 'is-valid'
         : 'is-invalid';
       
   }, [ formValues.title, formSubmitted ]);
    
   const onInputChange = ({target}) => {
      setFormValues({
         ...formValues,
         [target.name]: target.value
      });
   };
    
   const onDateChange = ( event, changing ) => {
      setFormValues({
         ...formValues,
         [changing]: event
      });
   };
    
   const onCloseModal = () => {
      closeDateModal();
      // setIsModalOpen(false);
   };
    
   const onSubmit = async( event ) => {
      event.preventDefault();
      setFormSubmitted(true);
    
      const difference = differenceInSeconds( formValues.end, formValues.start );
    
      if ( isNaN( difference ) || difference <= 0 ) {
         Swal.fire('Error en fechas', 'Fechas incorrectas', 'error' );
         return;
      }
    
      if ( formValues.title.length <= 0 ) return;
    
      await startSavingEvent( formValues );
      closeDateModal();
      setFormSubmitted(false);
   };

   return {
      isModalOpen: isDateModalOpen,
      onSubmit,
      onCloseModal,
      onDateChange,
      onInputChange,
      titleClass,
      
      formValues
   };
};
