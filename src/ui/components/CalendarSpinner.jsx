
export const CalendarSpinner = () => {
   return (
      <div className="d-flex justify-content-center align-items-center" 
         style={{ width: '100vw', height: 'calc( 100vh - 105px )' }}>
         <div className="spinner-border text-primary" role="status" 
            style={{ width: '50px', height: '50px'}}>
            <span className="visually-hidden">Loading...</span>
         </div>
      </div>
   );
};
