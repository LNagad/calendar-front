import Modal from 'react-modal';
import 'sweetalert2/dist/sweetalert2.min.css';

import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import es from 'date-fns/locale/es';

import { useCalendarModal } from '../hooks';
import { getEnvVariables } from '../../helpers';
registerLocale('es', es);

if ( getEnvVariables().VITE_MODE !== 'test' ) {
   Modal.setAppElement('#root');
}

const customStyles = {
   content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
   },
};

export const CalendarModal = () => {

   const {
      isModalOpen,
      onSubmit,
      onCloseModal,
      onDateChange,
      onInputChange,
      titleClass,
      formValues
   } = useCalendarModal();

   return (
      <Modal
         isOpen={isModalOpen}
         onRequestClose={ onCloseModal}
         style={customStyles}
         className='modal'
         overlayClassName='modal-fondo'
         closeTimeoutMS={ 200 }
      >
         <h1> {formValues.title || 'Nuevo evento'} </h1>
         <hr />
         <form className="container" onSubmit={ onSubmit }>

            <div className="form-group mb-2">
               <label >Fecha y hora inicio</label>
               <DatePicker 
                  minDate={ formValues.start }
                  selected={ formValues.start }
                  onChange={ (event) => onDateChange(event, 'start')}
                  className='form-control'
                  dateFormat='Pp'
                  showTimeSelect
                  locale='es'
                  timeCaption='Hora'
                  
               />
            </div>

            <div className="form-group mb-2">
               <label>Fecha y hora fin</label>
               <DatePicker 
                  minDate={ formValues.start }
                  selected={ formValues.end }
                  onChange={ (event) => onDateChange(event, 'end')}
                  className='form-control'
                  dateFormat='Pp'
                  showTimeSelect
                  locale='es'
                  timeCaption='Hora'
               />
            </div>

            <hr />
            <div className="form-group mb-2">
               <label>Titulo y notas</label>
               <input 
                  type="text" 
                  className={`form-control ${titleClass}`}
                  placeholder="Título del evento"
                  name="title"
                  autoComplete="off"
                  value={ formValues.title }
                  onChange={ onInputChange }
               />
               <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
            </div>

            <div className="form-group mb-2">
               <textarea 
                  type="text" 
                  className="form-control"
                  placeholder="Notas"
                  rows="5"
                  name="notes"
                  value={ formValues.notes }
                  onChange={ onInputChange }
               ></textarea>
               <small id="emailHelp" className="form-text text-muted">Información adicional</small>
            </div>

            <button
               type="submit"
               className="btn btn-outline-primary btn-block"
            >
               <i className="far fa-save"></i>
               <span> Guardar</span>
            </button>

         </form>
      </Modal>
   );
};
