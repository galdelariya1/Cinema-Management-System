import store from 'store';
import {useState, useEffect} from 'react';

import {Route, Switch} from 'react-router-dom'

import MoviesComp from '../Movies/Movies'
import SubscriptionsComp from '../Members/Subscriptions'
import UsersManagementComp from '../Users/UsersManegment'

const MainPageComp = (props) => 
{
  const [usersManagementButton, setUsersManagementButton] = useState(null)
  const [moviesButton, setMoviesButton] = useState(null)
  const [subscriptionsButton, setSubscriptionsButton] = useState(null)
  
  useEffect(() => {

    if (store.get('sysAdmin')) {
      setUsersManagementButton(<input type="button" className="top-button" value="Users Management" onClick={userManagement} />)
    }

    if (store.get('permissions')['View Movies']) {
      setMoviesButton(<input type="button" className="top-button" value="Movies" onClick={movies} />)
    }

    if (store.get('permissions')['View Subscriptions']) {
      setSubscriptionsButton(<input type="button" className="top-button" value="Subscriptions" onClick={subscriptions} />)
    }

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

      <h2> User : {sessionStorage["name"]} </h2>

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
