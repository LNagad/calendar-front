export const events = [
   {
      id: '1',
      start: '2023-07-04T17:00:00',
      end: '2023-07-04T19:00:00',
      title: 'Maycol birthday',
      notes: 'Need to buy the cake'
   },
   {
      id: '2',
      start: '2023-11-04T17:00:00',
      end: '2023-11-04T19:00:00',
      title: 'Melissa birthday',
      notes: 'Need to buy something to Melissa'
   }
];

export const initialState = {
   isLoadingEvents: true,
   events: [],
   activeEvent: null
};

export const calendarWithEventsState = {
   isLoadingEvents: false,
   events: [ ...events ],
   activeEvent: null
};

export const calendarWithActiveEventState = {
   isLoadingEvents: false,
   events: [ ...events ],
   activeEvent: { ...events[0] }
};

export const calendarWithOnlyActiveEventState = {
   isLoadingEvents: false,
   events: [],
   activeEvent: { ...events[0] }
};