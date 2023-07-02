import { createSlice } from '@reduxjs/toolkit';

export const uiSlice = createSlice({
   name: 'ui',
   initialState: {
      isDateModalOpen: false,
      btnLoginSpinnerIsLoading: false,
      btnRegisterSpinnerIsLoading: false
   },
   reducers: {
      onOpenDateModal: ( state ) => {
         state.isDateModalOpen = true;
      },
      onCloseDateModal: ( state ) => {
         state.isDateModalOpen = false;
      },
      toggleBtnLoginSpinner: ( state ) => {
         state.btnLoginSpinnerIsLoading = !state.btnLoginSpinnerIsLoading;
      },
      toggleBtnRegisterSpinner: ( state ) => {
         state.btnRegisterSpinnerIsLoading = !state.btnRegisterSpinnerIsLoading;
      }
   }
});

// Action creators are generated for each case reducer function
export const { 
   onOpenDateModal, 
   onCloseDateModal, 
   toggleBtnLoginSpinner, 
   toggleBtnRegisterSpinner 
} = uiSlice.actions;