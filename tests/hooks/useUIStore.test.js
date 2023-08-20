import { renderHook } from '@testing-library/react';
import { useUIStore } from '../../src/hooks/useUIStore';
import { Provider } from 'react-redux';
import { calendarSlice, store, uiSlice } from '../../src/store';
import { configureStore } from '@reduxjs/toolkit';
import { act } from '@testing-library/react';
import { calendarWithOnlyActiveEventState } from '../fixtures/calendarStates';

const getMockStore = ( initialState ) => {
   return configureStore({
      reducer: {
         ui: uiSlice.reducer,
         calendar: calendarSlice.reducer
      },
      preloadedState: {
         ui: { ...initialState },
         calendar: { ...calendarWithOnlyActiveEventState }
      }
   });
};

describe('testing useUIStore', () => { 

   test('should return the default initial state', () => { 
      
      const mockStore = getMockStore({
         isDateModalOpen: false,
         btnLoginSpinnerIsLoading: false,
         btnRegisterSpinnerIsLoading: false
      });

      const { result } = renderHook( () => useUIStore(), {
         wrapper: ({ children }) => <Provider store={ mockStore }>{ children }</Provider>
      } );

      expect( result.current ).toEqual({
         isDateModalOpen: false,
         openDateModal: expect.any(Function),
         closeDateModal: expect.any(Function),
         toggleDateModal: expect.any(Function)
      });
   });

   test('openDateModal should set isDateModalOpen to true ', () => { 
     
      const mockStore = getMockStore({
         isDateModalOpen: false,
         btnLoginSpinnerIsLoading: false,
         btnRegisterSpinnerIsLoading: false
      });
      
      const { result } = renderHook( () => useUIStore(), {
         wrapper: ({ children }) => <Provider store={ mockStore }>{ children }</Provider>
      } );

      const { openDateModal } = result.current;
      act( () => openDateModal() );
      expect( result.current.isDateModalOpen ).toBeTruthy();
   });

   test('closeDateModal should set isDateModalOpen to false ', () => { 
     
      const mockStore = getMockStore({
         isDateModalOpen: true,
         btnLoginSpinnerIsLoading: false,
         btnRegisterSpinnerIsLoading: false
      });
      
      const { result } = renderHook( () => useUIStore(), {
         wrapper: ({ children }) => <Provider store={ mockStore }>{ children }</Provider>
      } );
      
      act( () => result.current.closeDateModal() );
      expect( result.current.isDateModalOpen ).toBeFalsy();
      expect( mockStore.getState().calendar.activeEvent ).toBeFalsy();
   });

   test('toggleDateModal should toggle isDateModalOpen', () => { 
     
      const mockStore = getMockStore({
         isDateModalOpen: true,
         btnLoginSpinnerIsLoading: false,
         btnRegisterSpinnerIsLoading: false
      });
      
      const { result } = renderHook( () => useUIStore(), {
         wrapper: ({ children }) => <Provider store={ mockStore }>{ children }</Provider>
      } );

      act( () => result.current.toggleDateModal() );
      expect( result.current.isDateModalOpen ).toBeFalsy();
      
      act( () => result.current.toggleDateModal() );
      expect( result.current.isDateModalOpen ).toBeTruthy();
   });
   
});