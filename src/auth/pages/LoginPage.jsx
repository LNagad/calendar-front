import { useEffect } from 'react';
import Swal from 'sweetalert2';
import { useAuthStore, useForm } from '../../hooks';
import { LoadingSpinner } from '../../ui';
import './LoginPage.css';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const loginFormFields = {
   loginEmail: '',
   loginPassword: '',
};

const loginFormValidations = {
   loginPassword: [ (value) => value.length >= 5, 'The name must be at least 5 characters long'],
   loginEmail: [
      (value) => {
         const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
         if (!emailRegex.test(value)) {
            return false;
         }
         return true; // Retorna `true` si pasa todas las validaciones
      },
      'The email is invalid',
   ],
};

export const LoginPage = () => {
   const [loginSubmitted, setLoginSubmitted] = useState(false);

   const { 
      startLogin, 
      errorMessage, 
      btnLoginSpinnerIsLoading, 
   } = useAuthStore();

   const { 
      loginEmail, 
      loginPassword, 
      onInputChange: onLoginInputChange,
      isFormValid,
      loginEmailValid, 
      loginPasswordValid, 
   } = useForm( loginFormFields, loginFormValidations );
   
   const loginSubmit = ( event ) => {
      event.preventDefault();
      setLoginSubmitted(true);
      if ( !isFormValid ) return;

      startLogin({ email: loginEmail, password: loginPassword });
      setLoginSubmitted(false);
   };
   
   useEffect(() => {
      if ( errorMessage !== undefined ) {
         Swal.fire('Authentication error', errorMessage, 'error');
      }
   }, [errorMessage]);

   
   return (
      <section className='authBody animate__animated animate__fadeIn animate__fast'>
         <div className="container login-container animate__animated animate__fadeIn animate__slower">
            <div className="row d-flex justify-content-center">
               <div className="col-md-6 login-form-1">
                  <h3>Ingreso</h3>
                  <form onSubmit={ loginSubmit }>
                     {
                        (errorMessage) &&
                     <div className="form-group mb-2">
                        <div className="alert alert-danger alert-dismissible fade show" role="alert">
                           <strong>{errorMessage} </strong> 
                           You should check in on some of those fields below.
                           <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                        </div>
                     </div>
                     }
                     <div className="form-group mb-2">
                        <input
                           autoComplete='off' 
                           type="email"
                           className={`form-control ${ (loginSubmitted) && !!loginEmailValid && 'is-invalid'}`}
                           placeholder="Correo"
                           name='loginEmail'
                           value={ loginEmail }
                           onChange={ onLoginInputChange }
                        />
                        <div className="invalid-feedback mb-2">
                           {loginEmailValid}
                        </div>
                     </div>
                     <div className="form-group mb-2">
                        <input
                           autoComplete='off'
                           type="password"
                           className={`form-control ${ (loginSubmitted) && !!loginPasswordValid && 'is-invalid'}`}
                           placeholder="Contraseña"
                           name='loginPassword'
                           value={ loginPassword }
                           onChange={ onLoginInputChange }
                        />
                        <div className="invalid-feedback mb-2">
                           {loginPasswordValid}
                        </div>
                     </div>
                     <div className="form-group mb-2 position-relative">
                        <button 
                           disabled={btnLoginSpinnerIsLoading}
                           type="submit"
                           className="btn btn-primary rounded-4"
                           value="Login" 
                        >
                           <span className='fw-semibold fs-5'>Login</span>
                        </button>
                        {
                           (btnLoginSpinnerIsLoading) &&
                         <LoadingSpinner color='text-light' />
                        }
                     </div>
                     <div className="mt-2 text-primary float-end">
                        <span>Don`t have an account?</span>
                        <Link to={'/auth/register'} 
                           className='text-primary ms-1'>create one</Link>
                     </div>
                  </form>
               </div>
      
           
            </div>
         </div>
      </section>
   );
};