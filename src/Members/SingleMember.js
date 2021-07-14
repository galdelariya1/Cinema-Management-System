import firebase from '../firebaseApp'
import SubscribeComp from './Subscribe'

import { Link , useHistory } from "react-router-dom";

import { useState, useEffect } from 'react'

const SingleMemberComp = (props) => {

  const [id] = useState(props.match.params.id)
  const [member, setMember] = useState({})
  const [toSubscribe, setToSubscribe] = useState(true)
  const [subscribeComp, setSubscribeComp] = useState(null)
  const [moviesSubscribed, setMoviesSubscribed] = useState([])
  const [moviesHeader, setMoviesHeader] = useState(null)
  const [editButton, setEditButton] = useState(null)
  const [deleteButton, setDeleteButton] = useState(null)
  const [moviePermission, setMoviePermission] = useState(false)

  let history = useHistory();

  useEffect(() => {

    firebase.firestore().collection('Users').doc(sessionStorage["loginUserId"]).get()
    .then(userData => {
      if(userData.data().booleansPermissions[2]){
        setDeleteButton(<input type="button" className = "low-button" value="Delete" onClick={deleteMember} />)
      }
      if(userData.data().booleansPermissions[3]){
        setEditButton(<input type="button" className = "low-button" value="Edit" onClick={editMember} />)
      }
      if(userData.data().booleansPermissions[4]){
        setMoviePermission(true)
      }

      firebase.firestore().collection('Members').doc(id).get()
      .then(person => {
        let memberData = person.data()
        memberData.id = person.id;
        setMember(memberData);
        setMoviesSubscribed(person.data().moviesSubscribed)
      })
    
    })
  },[])

  useEffect(() => {

    if(moviesSubscribed.length !== 0){
      if(moviePermission){
          setMoviesHeader(<h4> Movies List </h4>)
      }
    }
  }, [moviesSubscribed])


  const editMember = () => {
    history.push("/MainPage/Subscriptions/EditMember/" + id);
  }

  const deleteMember = () => {

    let doc = firebase.firestore().collection('Members').doc(id)
    doc.delete()
      .then(() => {
        moviesSubscribed.forEach(movie => {
          firebase.firestore().collection('Movies').doc(movie.id).get()
          .then(movieToDelete => {
            let movieToDeleteData = movieToDelete.data();
            let updatedSubscriptions = movieToDeleteData.subscriptions.filter(x => x.id != props.id)
            movieToDeleteData.subscriptions = updatedSubscriptions
            firebase.firestore().collection('Movies').doc(movieToDelete.id)
            .set(movieToDeleteData)
          })
        })
        
        alert('Deleted');
        history.push("/MainPage/Subscriptions")
      })
  }

  const subscribe = () => {
    setToSubscribe(!toSubscribe)

    if (toSubscribe) {
      setSubscribeComp(<SubscribeComp member={member}
        callbackSubscribe={(data) => newSubscribe(data)} />)
    }

    else {
      setSubscribeComp(null)
    }
  }

  const newSubscribe = () => {
    console.log("new movie subscribed!")
    firebase.firestore().collection('Members').doc(id).get()
      .then(person => {
        let newMovieSubscribed = person.data().moviesSubscribed;
        setMoviesSubscribed(newMovieSubscribed)
      })
  }


  return (
    <div>

        <h3>{member.name} </h3>

        Email : {member.email} <br />

        {editButton}
        {deleteButton} <br/><br/>

        {moviesHeader}

        <ul>
          {
            moviesSubscribed.map((item, index) => {
              if(moviePermission){
                return <li key={index}> 
                    <Link to={`/MainPage/Movies/SingleMovie/${item.id}`}>{item.name}</Link>
                     , {item.date} </li>
              }
              else{
                return <li key={index}> {item.name + " "},{" " + item.date} </li>
              }
            })
          }
        </ul>

        <input type="button" className = "low-button" value="Subscribe to new movie" onClick={subscribe} /> <br/><br/>

        {subscribeComp}

    </div>
  );
}

export default SingleMemberComp;

