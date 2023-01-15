import React from 'react';
import ManageBooks from './component/ManageBooks';
import ManageUsers from './component/ManageUsers';

function AppBook() { 
 


  return (
    <div>
      <h1 className="text-center">Manage Books and Users</h1>
      <br/>
      <ManageBooks/>

      <ManageUsers/>
    </div>
  );
}
 
export default AppBook;