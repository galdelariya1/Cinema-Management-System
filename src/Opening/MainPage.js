import firebase from '../firebaseApp'
import {useState, useEffect} from 'react';

import {Route, Switch} from 'react-router-dom'

import MoviesComp from '../Movies/Movies'
import SubscriptionsComp from '../Members/Subscriptions'
import UsersManagementComp from '../Users/UsersManegment'

const MainPageComp = (props) => 
{
  const [loginUser, setLoginUser] = useState({})
  const [usersManagementButton, setUsersManagementButton] = useState(null)
  const [moviesButton, setMoviesButton] = useState(null)
  const [subscriptionsButton, setSubscriptionsButton] = useState(null)
  
  useEffect(() => {

    firebase.firestore().collection('Users').doc(sessionStorage["loginUserId"]).get()
      .then(userData => {
            setLoginUser(userData.data())

            if(userData.data().userName === "sysAdmin"){
              setUsersManagementButton(<input type="button" className = "top-button" value="Users Management" onClick={userManagement} />)
            }

            if(userData.data().booleansPermissions[4]){
              setMoviesButton(<input type="button" className = "top-button" value="Movies" onClick={movies} />)
            }

            if(userData.data().booleansPermissions[0]){
              setSubscriptionsButton(<input type="button" className = "top-button" value="Subscriptions" onClick={subscriptions} />)
            }
   
      })
  },[]) 

  const movies = () =>
  {
    props.history.push("/MainPage/Movies");
  }

  const subscriptions = () =>
  {
    props.history.push("/MainPage/Subscriptions");
  }

  const userManagement = () =>
  {
    props.history.push("/MainPage/UsersManagement");
  }

  const logOut = () =>
  {
    props.history.push("/");
  }

  return (
    <div>

      <h2> User : {loginUser.name} </h2>

      {moviesButton}
      {subscriptionsButton}
      {usersManagementButton}
      <input type="button" className = "top-button" value="Log Out" onClick={logOut} />

      <Switch>
          <Route path="/MainPage/Movies" component={MoviesComp} />
          <Route path="/MainPage/Subscriptions" component={SubscriptionsComp} />
          <Route path="/MainPage/UsersManagement" component={UsersManagementComp} />
      </Switch>

    </div>
  );
}

export default MainPageComp;
