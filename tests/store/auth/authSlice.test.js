import { authSlice, clearErrorMessage, onChecking, onLogin, onLogout } from '../../../src/store/auth/authSlice';
import { authenticatedState, initialState } from '../../fixtures/authStates';
import { testUserCredentials } from '../../fixtures/testUserCredentials';

describe('testing authSlice', () => { 
    
   test('should return the default initial state', () => { 
        
      expect( authSlice.getInitialState() ).toEqual( initialState );
   });


   test('state do the onChecking', () => { 

      const state = authSlice.reducer( authenticatedState, onChecking() );
      expect( state ).toEqual({
         status: 'checking',
         user: {},
         errorMessage: undefined
      });
   });

   test('should login', () => { 

      const state = authSlice.reducer( initialState, onLogin( testUserCredentials ) );
      expect( state ).toEqual({
         status: 'authenticated',
         user: testUserCredentials,
         errorMessage: undefined
      });
   });

   test('should logout', () => { 

      const errorMessage = 'Invalid Credentials';
      const state = authSlice.reducer( initialState, onLogout( errorMessage ) );
      expect( state ).toEqual({
         status: 'not-authenticated',
         user: {},
         errorMessage: errorMessage
      });
   });

   test('should clear the errorMessage', () => { 

      const errorMessage = 'Invalid Credentials';
      let state = authSlice.reducer( initialState, onLogout( errorMessage ) );
      state = authSlice.reducer( state, clearErrorMessage() );

      expect( state.errorMessage ).toBeUndefined();
   });



});