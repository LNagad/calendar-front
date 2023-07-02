import './spinner.css';

export const LoadingSpinner = ({ color = 'text-light' }) => {
   return (
      <div className="spinner-container h-100 d-flex align-items-center">
         <div className={`spinner-border ${color} spinner-width`} role="status">
            <span className="visually-hidden">Loading...</span>
         </div>
      </div>
   );
};