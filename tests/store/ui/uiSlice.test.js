import { onCloseDateModal, onOpenDateModal, toggleBtnLoginSpinner, toggleBtnRegisterSpinner, uiSlice } from '../../../src/store/ui/uiSlice';

describe('testing uiSlice', () => { 
    
   test('should return the default initial state', () => { 
    
      expect( uiSlice.getInitialState() ).toEqual({
         isDateModalOpen: false,
         btnLoginSpinnerIsLoading: false,
         btnRegisterSpinnerIsLoading: false
      });
   });

   test('should change isDateModalOpen correctly', () => { 

      let state = uiSlice.getInitialState();
      state = uiSlice.reducer( state, onOpenDateModal() );
      expect( state.isDateModalOpen ).toBeTruthy();
    
      state = uiSlice.reducer( state, onCloseDateModal() );
      expect( state.isDateModalOpen ).toBeFalsy();
    
   });


   test('should toggle btnLoginSpinnerIsLoading correctly', () => { 

      let state = uiSlice.getInitialState();
      state = uiSlice.reducer( state, toggleBtnLoginSpinner() );
      expect( state.btnLoginSpinnerIsLoading ).toBeTruthy();
      
      state = uiSlice.reducer( state, toggleBtnLoginSpinner() );
      expect( state.btnLoginSpinnerIsLoading ).toBeFalsy();
      
   });

   test('should toggle btnRegisterSpinnerIsLoading correctly', () => { 

      let state = uiSlice.getInitialState();
      state = uiSlice.reducer( state, toggleBtnRegisterSpinner() );
      expect( state.btnRegisterSpinnerIsLoading ).toBeTruthy();
      
      state = uiSlice.reducer( state, toggleBtnRegisterSpinner() );
      expect( state.btnRegisterSpinnerIsLoading ).toBeFalsy();
      
   });

   

});