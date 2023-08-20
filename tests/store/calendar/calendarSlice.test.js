import {
   calendarSlice,
   onAddNewEvent,
   onDeleteEvent,
   onLoadEvents,
   onLogoutCalendar,
   onSetActiveEvent,
   onUpdateEvent,
   unSelectActiveEvent,
} from '../../../src/store/calendar/calendarSlice';

import {
   calendarWithActiveEventState,
   calendarWithEventsState,
   events,
   initialState,
} from '../../fixtures/calendarStates';

describe('testing calendarSlice', () => {
   test('should return the default initial state', () => {
      const state = calendarSlice.getInitialState();

      expect(state).toEqual(initialState);
   });

   test('onSetActiveEvent should set the activeEvent', () => {
      const state = calendarSlice.reducer(
         calendarWithEventsState,
         onSetActiveEvent(events[0])
      );
      expect(state.activeEvent).toEqual(events[0]);
   });

   test('unSelectActiveEvent should set the activeEvent to null', () => {
      const state = calendarSlice.reducer(
         calendarWithActiveEventState,
         unSelectActiveEvent()
      );
      expect(state.activeEvent).toBe(null);
   });

   test('onAddNewEvent should add the event', () => {
      const newEvent = {
         id: '3',
         start: new Date('2023-12-17 17:00:00'),
         end: new Date('2023-12-17 19:00:00'),
         title: 'Alexandra birthday',
         notes: 'Need to buy the chocolate cake',
      };

      const state = calendarSlice.reducer(
         calendarWithEventsState,
         onAddNewEvent(newEvent)
      );
      expect(state.events).toHaveLength(3);
      expect(state.events).toEqual([...events, newEvent]);
   });

   test('onUpdateEvent should update the event', () => {
      const updatedEvent = {
         id: '1',
         start: new Date('2023-12-17 17:00:00'),
         end: new Date('2023-12-17 19:00:00'),
         title: 'Alexandra birthday',
         notes: 'Need to buy the chocolate cake',
      };

      const state = calendarSlice.reducer(
         calendarWithEventsState,
         onUpdateEvent(updatedEvent)
      );
      expect(state.events).toContain(updatedEvent);
   });

   test('onDeleteEvent should delete the activeEvent', () => {

      const state = calendarSlice.reducer( calendarWithActiveEventState, onDeleteEvent() );
      expect(state.activeEvent).toBe(null);
      expect(state.events).not.toContain( events[0] );
   });

   test('onLoadEvents should set the events', () => {
      const state = calendarSlice.reducer(initialState, onLoadEvents(events));
      
      expect( state.events.length ).toBeGreaterThanOrEqual(1);
      expect( state.events ).toEqual( events );
      expect( state.isLoadingEvents ).toBeFalsy();
   });

   test('onLogoutCalendar should delete the state', () => {
      const state = calendarSlice.reducer( calendarWithActiveEventState, onLogoutCalendar());
      
      expect( state ).toEqual( initialState );
   });
});
