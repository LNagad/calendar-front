import { Provider } from 'react-redux';
import { BrowserRouter, HashRouter } from 'react-router-dom';
import { AppRouter } from './router';
import { store } from './store';
import 'animate.css';

export const CalendarApp = () => {
   return (
      <Provider store={store}>
         <HashRouter>
            <AppRouter />
         </HashRouter>
         {/* <BrowserRouter>
         </BrowserRouter> */}
      </Provider>
   );
};
