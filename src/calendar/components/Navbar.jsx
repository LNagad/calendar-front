import { formatDisplayName } from '../../helpers';
import { useAuthStore } from '../../hooks';

export const Navbar = () => {

   const { startLogout, user } = useAuthStore();

   const displayName = formatDisplayName( user?.name );
   
   return (
      <div className="navbar navbar-dark bg-dark px-4"
         style={{ height: '80px', marginBottom: '25px'}}>
         <span className="navbar-brand">
            <i className="fas fa-calendar-alt"></i>
            &nbsp;
            {  displayName }
         </span>

         <button className="btn btn-outline-danger" onClick={ startLogout }>
            <i className="fas fa-sign-out-alt"></i>
            &nbsp;
            <span>Exit</span>
         </button>

      </div>
   );
};
