import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { renderHook } from '@testing-library/react';
import { act, waitFor } from '@testing-library/react';

import { authSlice, uiSlice } from '../../src/store';
import { useAuthStore } from '../../src/hooks/useAuthStore';
import { initialState, notAuthenticatedState, authenticatedState } from '../fixtures/authStates';
import { testUserCredentials } from '../fixtures/testUserCredentials';
import calendarApi from '../../src/api/calendarApi';

describe('testing useAuthStore', () => {
   beforeEach(() => localStorage.clear());

   const getMockedStore = (initialState) => {
      return configureStore({
         reducer: {
            auth: authSlice.reducer,
            ui: uiSlice.reducer,
         },
         preloadedState: {
            auth: { ...initialState },
         },
      });
   };

   test('should return the default values', () => {
      const mockedStore = getMockedStore({ ...initialState });

      const { result } = renderHook(useAuthStore, {
         wrapper: ({ children }) => (
            <Provider store={mockedStore}>{children}</Provider>
         ),
      });

      expect(result.current).toEqual({
         status: 'checking',
         user: {},
         errorMessage: undefined,
         btnLoginSpinnerIsLoading: false,
         btnRegisterSpinnerIsLoading: false,
         startLogin: expect.any(Function),
         startRegistering: expect.any(Function),
         checkAuthToken: expect.any(Function),
         startLogout: expect.any(Function),
      });
   });

   test('startLogin should login correctly', async () => {
      const mockedStore = getMockedStore({ ...notAuthenticatedState });
      const { result } = renderHook(useAuthStore, {
         wrapper: ({ children }) => (
            <Provider store={mockedStore}>{children}</Provider>
         ),
      });

      act(() => {
         result.current.startLogin(testUserCredentials);
      });

      expect(result.current.status).toBe('checking');

      await act(async () => {
         await result.current.startLogin(testUserCredentials);
      });

      const { errorMessage, status, user } = result.current;

      expect({ errorMessage, status, user }).toEqual({
         status: 'authenticated',
         user: { name: testUserCredentials.name, _id: testUserCredentials._id },
         errorMessage: undefined,
      });

      expect(localStorage.getItem('token')).toEqual(expect.any(String));
      expect(localStorage.getItem('token-init-date')).toEqual(expect.any(String));
   });

   test('startLogin should failed the authentication', async () => {
      const mockedStore = getMockedStore({ ...notAuthenticatedState });
      const { result } = renderHook(useAuthStore, {
         wrapper: ({ children }) => (
            <Provider store={mockedStore}>{children}</Provider>
         ),
      });

      await act(async () => {
         await result.current.startLogin({
            email: 'algo@google.com',
            password: '123456',
         });
      });

      const { errorMessage, status, user } = result.current;
      expect(localStorage.getItem('token')).toBe(null);

      expect({ errorMessage, status, user }).toEqual({
         errorMessage: 'Incorrect username or password',
         status: 'not-authenticated',
         user: {},
      });

      //* needs to set the timeout of clearErrorMessage at startLogin shorter than 7s so jest does not trhow error
      await waitFor(() => expect(result.current.errorMessage).toBe(undefined));
   });

   test('startRegistering should create an user', async () => {
      const newUser = {
         registerEmail: 'algo@google.com',
         registerPassword: '123456',
         registerName: 'Test user 2',
      };

      const mockedStore = getMockedStore({ ...notAuthenticatedState });
      const { result } = renderHook(useAuthStore, {
         wrapper: ({ children }) => (
            <Provider store={mockedStore}>{children}</Provider>
         ),
      });

      //* this is similar to axios interceptos, with the spy we avoid the 
      //* calendarApi to get to the backend
      const spy = jest.spyOn(calendarApi, 'post').mockReturnValue({
         data: {
            ok: true,
            uid: 'any-id',
            name: 'Test User 2',
            token: 'any-token',
         },
      });

      await act(async () => {
         await result.current.startRegistering(newUser);
      });

      const { errorMessage, status, user } = result.current;

      expect({ errorMessage, status, user }).toEqual({
         errorMessage: undefined,
         status: 'authenticated',
         user: { name: 'Test User 2', _id: 'any-id' },
      });

      spy.mockRestore(); //*clearing the spy
   });

   test('startRegistering should failed when creating an user', async () => {
      const { email, password, name } = testUserCredentials;

      const newUser = {
         registerName: name,
         registerEmail: email,
         registerPassword: password,
      };

      const mockedStore = getMockedStore({ ...notAuthenticatedState });
      const { result } = renderHook(useAuthStore, {
         wrapper: ({ children }) => (
            <Provider store={mockedStore}>{children}</Provider>
         ),
      });

      await act(async () => {
         await result.current.startRegistering(newUser);
      });

      const { errorMessage, status, user } = result.current;
      expect( { errorMessage, status, user }).toEqual({
         errorMessage: 'Email already in use',
         status: 'not-authenticated',
         user: {}
      });
   });

   test('checkAuthToken should failed if there is no token', async() => { 
      
      const mockedStore = getMockedStore({ ...initialState });
      const { result } = renderHook(useAuthStore, {
         wrapper: ({ children }) => (
            <Provider store={mockedStore}>{children}</Provider>
         ),
      });

      await act(async () => {
         await result.current.checkAuthToken();
      });

      const { errorMessage, status, user } = result.current;

      expect({ errorMessage, status, user }).toEqual({
         errorMessage: undefined,
         status: 'not-authenticated',
         user: {}
      });

   });

   test('checkAuthToken should authenticate if there is a token', async() => { 
      
      const { data } = await calendarApi.post('/auth/login', testUserCredentials);
      localStorage.setItem('token', data.token);

      const mockedStore = getMockedStore({ ...initialState });
      const { result } = renderHook(useAuthStore, {
         wrapper: ({ children }) => (
            <Provider store={mockedStore}>{children}</Provider>
         ),
      });

      await act(async () => {
         await result.current.checkAuthToken();
      });

      const { errorMessage, status, user } = result.current;
      
      expect({ errorMessage, status, user }).toEqual({
         errorMessage: undefined,
         status: 'authenticated',
         user: { name: 'Test user', _id: '64a43485a787e7668ff25dcb' } 
      });

   });

   test('startLogout should logout and clear the token', () => { 
      localStorage.setItem('token', 'test');
      console.log(localStorage.getItem('token'));

      const mockedStore = getMockedStore({ ...authenticatedState });
      const { result } = renderHook(useAuthStore, {
         wrapper: ({ children }) => (
            <Provider store={mockedStore}>{children}</Provider>
         ),
      });

      act(() => {
         result.current.startLogout();
      });


      const { errorMessage, status, user } = result.current;
      
      expect({ errorMessage, status, user }).toEqual({
         errorMessage: undefined, status: 'not-authenticated', user: {}
      });

   });

});
