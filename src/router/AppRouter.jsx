import { useEffect } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';

import { LoginPage, RegisterPage } from '../auth';
import { CalendarPage } from '../calendar';
import { useAuthStore } from '../hooks';

export const AppRouter = () => {
   const { status, checkAuthToken } = useAuthStore();

   useEffect(() => {
      checkAuthToken();
   }, []);

   // if ( status === 'checking' ) {
   //    return (
   //       <h3>Loading...</h3>
   //    );
   // }
   return (
      <Routes>
         
         {
            ( status !== 'authenticated' )
               ? (
                  <>
                     <Route path='/auth/*' element={ <LoginPage />} />
                     <Route path='/auth/register' element={ <RegisterPage />} />
                     <Route path='/*' element={ <Navigate to='/auth/login' /> } />
                  </>
               )
               : (
                  <>
                     <Route path='/' element={ <CalendarPage /> } />
                     <Route path='/*' element={ <Navigate to='/' /> } />
                  </>
               )
         }

      </Routes>
   );
};
