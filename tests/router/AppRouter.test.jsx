import { render, screen } from '@testing-library/react';
import { useAuthStore } from '../../src/hooks/useAuthStore';
import { AppRouter } from '../../src/router/AppRouter';
import { MemoryRouter } from 'react-router-dom';
import { CalendarPage } from '../../src/calendar/pages/CalendarPage';

jest.mock('../../src/hooks/useAuthStore');
jest.mock('../../src/calendar/pages/CalendarPage', () => ({
   CalendarPage: () => <h1>Calendar Page</h1>
}));

describe('testing AppRouter', () => { 
   
   const mockCheckAuthToken = jest.fn();

   beforeEach(() => jest.clearAllMocks() );

   test('should show the login if not authenticated', () => { 
      //   jest.fn().mockReturnValue;
    
      useAuthStore.mockReturnValue({
         status: 'not-authenticated', checkAuthToken: mockCheckAuthToken
      });

      const { container } =render( <AppRouter />,{
         wrapper: ({children}) => <MemoryRouter>{children}</MemoryRouter>
      });

      expect( screen.getByText('Ingreso') ).toBeTruthy();
      expect( container ).toMatchSnapshot();
   });

   test('should show the calendar if user is authenticated', () => { 
      useAuthStore.mockReturnValue({
         status: 'authenticated', checkAuthToken: mockCheckAuthToken
      });

      render( <AppRouter />,{
         wrapper: ({children}) => <MemoryRouter>{children}</MemoryRouter>
      });

      expect( screen.getByText('Calendar Page') ).toBeTruthy();
   });
});