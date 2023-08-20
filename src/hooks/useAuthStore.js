import { useDispatch, useSelector } from 'react-redux';
import { calendarApi } from '../api';
import { clearErrorMessage, onChecking, onLogin, onLogout, onLogoutCalendar, toggleBtnLoginSpinner, toggleBtnRegisterSpinner } from '../store';

export const useAuthStore = () => {
   
   const { status, user, errorMessage } = useSelector( state => state.auth);
   const {
      btnLoginSpinnerIsLoading, 
      btnRegisterSpinnerIsLoading 
   } = useSelector( state => state.ui);

   const dispatch = useDispatch();
   
   const startLogin = async({ email, password }) => {
      dispatch( onChecking() );
      dispatch( toggleBtnLoginSpinner() );

      try {
        
         const { data } = await calendarApi.post('/auth/login', { email, password});
         localStorage.setItem('token', data.token);
         localStorage.setItem('token-init-date', new Date().getTime() );
         dispatch( onLogin({ name: data.name, _id: data.uid }) );
         dispatch( toggleBtnLoginSpinner() );

      } catch (error) {
         console.log(error);
         localStorage.clear();
         dispatch( onLogout(error?.response?.data?.msg || 'Invalid credentials') );
         dispatch( toggleBtnLoginSpinner() );

         setTimeout(() => {
            dispatch( clearErrorMessage() );
         }, 10);
      }

   };

   const startRegistering = async({ registerName, registerEmail , registerPassword }) => {
      dispatch( onChecking() );
      dispatch( toggleBtnRegisterSpinner() );
     
      try {
         const { data } = await calendarApi.post('/auth/signup', {
            name: registerName,
            email: registerEmail.toLowerCase(),
            password: registerPassword
         });

       
         localStorage.setItem('token', data.token);
         localStorage.setItem('token-init-date', new Date().getTime() );
         dispatch( onLogin({ name: data.name, _id: data.uid }) );
         dispatch( toggleBtnRegisterSpinner() );
     
   
      } catch (error) {
         dispatch( onLogout(error?.response?.data?.msg || '--') );
         dispatch( toggleBtnRegisterSpinner() );

         setTimeout(() => {
            dispatch( clearErrorMessage() );
         }, 10);
      }

   };

   const startLogout = async() => {
      localStorage.clear();
      dispatch( onLogout() );
      dispatch( onLogoutCalendar() );
   };

   const checkAuthToken = async () => {
      const token = localStorage.getItem('token');
      if ( !token ) return dispatch( onLogout() );

      try {
         
         const { data } = await calendarApi.get('auth/renew');
         localStorage.setItem('token', data.token);
         localStorage.setItem('token-init-date', new Date().getTime() );
         dispatch( onLogin({ name: data.name, _id: data.uid }) );
     
      } catch (error) {
         localStorage.clear();
         dispatch( onLogout() );
      }
   };

   return {
      //* Properties
      status, 
      user, 
      errorMessage,
      btnLoginSpinnerIsLoading, 
      btnRegisterSpinnerIsLoading,

      //* Methods
      startLogin,
      startRegistering,
      checkAuthToken,
      startLogout

   };
};
