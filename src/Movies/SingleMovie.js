import firebase from '../firebaseApp'

import { Link, useHistory } from "react-router-dom";

import { useState, useEffect } from 'react'


const MovieComp = (props) => {

  const [id] = useState(props.match.params.id)
  const [movie, setMovie] = useState({})
  const [subscriptions, setSubscribtions] = useState([])
  const [subscriptionsHeader, setSubscribtionsHeader] = useState(null)
  const [editButton, setEditButton] = useState(null)
  const [deleteButton, setDeleteButton] = useState(null)
  const [memberPermission, setMemberPermission] = useState(false)

  let history = useHistory();

  useEffect(() => {

    firebase.firestore().collection('Users').doc(sessionStorage["loginUserId"]).get()
      .then(userData => {
        if (userData.data().booleansPermissions[6]) {
          setDeleteButton(<input type="button" className = "low-button" value="Delete" onClick={deleteMovie} />)
        }
        if (userData.data().booleansPermissions[7]) {
          setEditButton(<input type="button" className = "low-button" value="Edit" onClick={editMovie} />)
        }
        if(userData.data().booleansPermissions[0]){
          setMemberPermission(true)
        }
      })

    firebase.firestore().collection('Movies').doc(id).get()
      .then(movieInitial => {
        let movieData = movieInitial.data()
        movieData.id = id;
        movieData.image = movieInitial.data().image.original;
        movieData.year = movieInitial.data().premiered.slice(0, 4)
        movieData.genresString = movieInitial.data().genres.toString()
        setMovie(movieData);
        setSubscribtions(movieInitial.data().subscriptions)

        if (movieInitial.data().subscriptions.length !== 0) {
          setSubscribtionsHeader(<h4> Subscriptions </h4>)
        }
      })
  }, [])

  const editMovie = () => {
    history.push("/MainPage/Movies/EditMovie/" + id);
  }

  const deleteMovie = () => {

    let doc = firebase.firestore().collection('Movies').doc(id)
    doc.delete()
      .then(() => {
        subscriptions.forEach(member => {
          firebase.firestore().collection('Members').doc(member.id).get()
            .then(memberToDelete => {
              let memberToDeleteData = memberToDelete.data();
              let updatedMoviesSubscribed = memberToDeleteData.moviesSubscribed.filter(x => x.id != id)
              memberToDeleteData.moviesSubscribed = updatedMoviesSubscribed
              firebase.firestore().collection('Members').doc(memberToDelete.id)
                .set(memberToDeleteData)
            })
        })

        alert('Deleted');
        history.push("/MainPage/Movies");
      })
  }


  return (
    <div>

      <h3>{movie.name} , {movie.year} </h3>

      <h5> Genres: {movie.genresString} </h5>

      <img width="100" height="100" src={movie.image} /> <br /><br />

      {subscriptionsHeader}

      <ul>
        {
          subscriptions.map((item, index) => {

            if (memberPermission) {
              return <li key={index}>
                <Link to={`/MainPage/Subscriptions/SingleMember/${item.id}`}>{item.name}</Link>
                , {item.date} </li>
            }
            else {
              return <li key={index}> {item.name + " "} , {" " + item.date} </li>
            }

          })
        }

      </ul>

      {deleteButton}
      {editButton}

    </div>
  );
}

export default MovieComp;

