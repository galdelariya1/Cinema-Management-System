import firebase from '../firebaseApp'
import {Route, Switch} from 'react-router-dom'
import {useState, useEffect} from 'react';

import AddMovieComp from './AddMovie'
import AllMoviesComp from './AllMovies'
import EditMovieComp from './EditMovie'
import SingleMovieComp from './SingleMovie'

const MoviesComp = (props) => 
{

  const [addMovieButton, setAddMovieButton] = useState(null)

  useEffect(() => {

    firebase.firestore().collection('Users').doc(sessionStorage["loginUserId"]).get()
      .then(userData => {
        if(userData.data().booleansPermissions[5]){
          setAddMovieButton(<input type="button" className = "mid-button" value="Add Movie" onClick={addMovie} />)
        }
      })
  },[]) 

  const allMovies = () =>
  {
    props.history.push("/MainPage/Movies/AllMovies");
  }

  const addMovie = () =>
  {
    props.history.push("/MainPage/Movies/AddMovie");
  }


  return (
    <div>
      
      <h3> Movies </h3> 

      <input type="button" className = "mid-button" value="All Movies" onClick={allMovies} />
      {addMovieButton}

      <Switch>
          <Route exact path="/MainPage/Movies" component={AllMoviesComp} />
          <Route path="/MainPage/Movies/SingleMovie/:id" component={SingleMovieComp} />
          <Route path="/MainPage/Movies/AddMovie" component={AddMovieComp} />
          <Route path="/MainPage/Movies/EditMovie/:id" component={EditMovieComp} />
      </Switch>
  

    </div>
  );
}

export default MoviesComp;
