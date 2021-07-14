
import {Route, Switch} from 'react-router-dom'

import AddUserComp from './AddUser'
import AllUsersComp from './AllUsers'
import EditUserComp from './EditUser'


const UsersManegmentComp = (props) => 
{

  const allUsers = () =>
  {
    props.history.push("/MainPage/UsersManagement");
  }

  const addUser = () =>
  {
    props.history.push("/MainPage/UsersManagement/AddUser");
  }


  return (
    <div>
      
      <h3> Users Manegment </h3> 

      <input type="button" className = "mid-button" value="All Users" onClick={allUsers} />
      <input type="button" className = "mid-button" value="Add User" onClick={addUser} /> <br/> <br/>

      <Switch>
          <Route exact path="/MainPage/UsersManagement" component={AllUsersComp} />
          <Route path="/MainPage/UsersManagement/AddUser" component={AddUserComp} />
          <Route path="/MainPage/UsersManagement/EditUser/:id" component={EditUserComp} />
      </Switch>
  

    </div>
  );
}

export default UsersManegmentComp;
