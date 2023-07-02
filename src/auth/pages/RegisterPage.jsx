import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { useAuthStore, useForm } from '../../hooks';
import { LoadingSpinner } from '../../ui';
import './LoginPage.css';
import { Link } from 'react-router-dom';


const registerFormFields = {
   registerName: '',
   registerEmail: '',
   registerPassword: '',
   registerPassword2: '',
};

const registerFormValidations = {
   registerName: [ (value) => value.length >= 5, 'The name must be at least 5 characters long'],
   registerEmail: [
      (value) => {
         // if (!value.includes('@') || !value.includes('.com')) {
         //    return false;
         // }
         // if (value.includes(' ')) {
         //    return false;
         // }
         const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
         if (!emailRegex.test(value)) {
            return false;
         }
         return true; // Retorna `true` si pasa todas las validaciones
      },
      'The emailis invalid',
   ],
   registerPassword: [ (value) => value.length >= 10, 'The name must be at least 10 characters long'],
   // registerPassword2: '',
};

export const RegisterPage = () => {
   const { 
      startRegistering,
      errorMessage,  
      btnRegisterSpinnerIsLoading, 
   } = useAuthStore();

   const [registerSubmitted, setRegisterSubmitted] = useState(false);

   const { 
      registerName, 
      registerEmail, 
      registerPassword, 
      registerPassword2, 
      onInputChange: onRegisterInputChange,
      //validations
      isFormValid,
      registerNameValid, 
      registerEmailValid, 
      registerPasswordValid, 
   } = useForm( registerFormFields, registerFormValidations );

   const registerPasswordValid2 = registerPassword === registerPassword2 && registerPassword2.length >= 10;
   
   const registerSubmit = ( event ) => {
      event.preventDefault();
      setRegisterSubmitted(true);
      
      if ( !isFormValid ) {
         Swal.fire('Invalid fields', 'Please complete all the fields', 'error');
         return;
      }
      
      if ( !registerPasswordValid2 ) {
         Swal.fire('Invalid password', 'The password doesn\'t match', 'error');
         return;
      }

      
      startRegistering({ registerName, registerEmail, registerPassword });
   };

   useEffect(() => {
      if ( errorMessage !== undefined ) {
         Swal.fire('Authentication error', errorMessage, 'error');
      }
   }, [errorMessage]);

   
   return (
      <section className='authBody2 animate__animated animate__fadeIn animate__fast'>
         <div className="container login-container animate__animated animate__fadeIn animate__slower">
            <div className="row d-flex justify-content-center">
               <div className="col-md-6 login-form-2">
                  <h3>Registro</h3>
                  <form onSubmit={ registerSubmit }>
                     <div className="form-group mb-2">
                        <input
                           autoComplete='off'
                           type="text"
                           className={`form-control ${ (registerSubmitted) && registerNameValid && 'is-invalid'}`}
                           placeholder="Nombre"
                           name='registerName'
                           value={ registerName }
                           onChange={ onRegisterInputChange }
                        />
                     </div>
                     <div className="form-group mb-2">
                        <input
                           autoComplete='off'
                           type="email"
                           className={`form-control ${ (registerSubmitted) &&  registerEmailValid && 'is-invalid'}`}
                           placeholder="Correo"
                           name='registerEmail'
                           value={ registerEmail }
                           onChange={ onRegisterInputChange }
                        />
                     </div>
                     <div className="form-group mb-2">
                        <input
                           autoComplete='off'
                           type="password"
                           className={`form-control ${ (registerSubmitted) && registerPasswordValid && 'is-invalid'}`}
                           placeholder="Contraseña" 
                           name='registerPassword'
                           value={ registerPassword }
                           onChange={ onRegisterInputChange }
                        />
                     </div>
      
                     <div className="form-group mb-2">
                        <input
                           autoComplete='off'
                           type="password"
                           className={`form-control ${(registerSubmitted) && !registerPasswordValid2 && 'is-invalid'}`}
                           placeholder="Repita la contraseña" 
                           name='registerPassword2'
                           value={ registerPassword2 }
                           onChange={ onRegisterInputChange }
                        />
                     </div>
      
                     <div className="form-group mb-2 position-relative">
                        <button 
                           disabled={ (registerSubmitted) && !isFormValid || btnRegisterSpinnerIsLoading}
                           type="submit"
                           className="btn btn-primary rounded-4"
                           value="Login" 
                        >
                           <span className='fw-semibold text-light fs-5'>Register</span>
                        </button>
                        {
                           (btnRegisterSpinnerIsLoading) &&
                          <LoadingSpinner color='text-primary' />
                        }
                     </div>
                     <div className="mt-2 text-primary float-end">
                        <span>Already have an account? Return to</span>
                        <Link to={'/auth/login'} 
                           className='text-primary ms-1'>login</Link>
                     </div>
                  </form>
                 
               </div>
            </div>
         </div>
      </section>
   );
};