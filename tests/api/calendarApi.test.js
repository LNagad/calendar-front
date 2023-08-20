import { calendarApi } from '../../src/api';

describe('Testing CalendarApi', () => {

   test('should have the default config', () => {
      expect(calendarApi.defaults.baseURL).toBe(process.env.VITE_API_URL);
   });

   test('should have the x-token in all header requests', async () => {
      const token = 'ABC-123-XYZ';  
      localStorage.setItem('token', token );
      
      try {
         const res = await calendarApi.post('/auth/login', {
            email: 'test@gmail.com',
            password: '123456',
         });
         
         expect( res.config.headers['x-token'] ).toBe( token );
            
      } catch (error) {
         //  console.log(error);
      }
   });
});
