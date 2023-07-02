import { useMemo, useEffect, useState } from 'react';

export const useForm = (initialState = {}, validationsForm = {}) => {
   
   const [formState, setFormState] = useState(initialState);
   const [formValidation, setFormValidation] = useState({});

   useEffect(() => {
      createValidators();
   }, [formState]);

   useEffect(() => {
      setFormState(initialState);
   }, [initialState]);

   const isFormValid = useMemo(() => {
      for (const formValue of Object.keys(formValidation)) {
         if (formValidation[formValue] !== null) return false;
      //null means there is an error
      }
      return true;
   }, [formValidation]);

   const onInputChange = ({ target }) => {
      const { value, name } = target;

      setFormState({ ...formState, [name]: value });
   };

   const createValidators = () => {
      const formCheckedValues = {};

      for (const formField of Object.keys(validationsForm)) {
         const [fn, errorMessage = 'This field is required'] =
        validationsForm[formField];

         if (formField === 'confirmPassword') {
            formCheckedValues[`${formField}Valid`] =
          formState[formField] === formState['password'] ? null : errorMessage;
         } else {
            formCheckedValues[`${formField}Valid`] = fn(formState[formField])
               ? null
               : errorMessage;
         }
      }

      setFormValidation(formCheckedValues);
      // console.log(formCheckedValues);
   };

   const onResetBtn = () => {
      setFormState(initialState);
   };

   return {
      ...formState,
      formState,
      onInputChange,
      onResetBtn,

      isFormValid,
      formValidation,
      ...formValidation,
   };
};
