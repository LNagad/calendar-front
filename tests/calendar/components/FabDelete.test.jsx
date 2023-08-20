import { render, screen, fireEvent } from '@testing-library/react';
import { FabDelete } from '../../../src/calendar/components/FabDelete';

import { useCalendarStore } from '../../../src/hooks/useCalendarStore';
import { useUIStore } from '../../../src/hooks/useUIStore';
import { useAuthStore } from '../../../src/hooks/useAuthStore';
import { events } from '../../fixtures/calendarStates';

jest.mock('../../../src/hooks/useCalendarStore');
jest.mock('../../../src/hooks/useUIStore');
jest.mock('../../../src/hooks/useAuthStore');

describe('testing <FabDelete />', () => { 
   
   const mockStartDeletingEvent = jest.fn();
   const activeEvent = {
      ...events[0],
      user: {
         _id: '1'
      },
   };

   beforeEach(() => jest.clearAllMocks() );

   test('should show the button if there is activeEvent and is the user event', () => { 
      
      // jest.fn().mockReturnValue
      useCalendarStore.mockReturnValue({
         activeEvent: { ...activeEvent }
      });

      useUIStore.mockReturnValue({ isDateModalOpen: false });
      useAuthStore.mockReturnValue({ user: { _id: '1' } });
      
      render( <FabDelete /> );
      
      const btn = screen.getByLabelText('fab-btn-delete');
      expect( btn.classList ).toContain('btn');
      expect( btn.classList ).toContain('btn-danger');
      expect( btn.classList ).toContain('fab-danger');
      
   });

   test('should call startDeletingEvent on click', () => { 
      
      // jest.fn().mockReturnValue
      useUIStore.mockReturnValue({ isDateModalOpen: false });
      useAuthStore.mockReturnValue({ user: { _id: '1' } });
      useCalendarStore.mockReturnValue({
         activeEvent: { ...activeEvent },
         startDeletingEvent: mockStartDeletingEvent
      }),
      
      render( <FabDelete /> );
      
      const btn = screen.getByLabelText('fab-btn-delete');
      fireEvent.click( btn );
      
      expect( mockStartDeletingEvent ).toHaveBeenCalled();
   });

});