import { useState, useEffect } from 'react'

import firebase from '../firebaseApp'


const SubscribeComp = (props) => {

  const [movies, setMovies] = useState([])
  const [movieToSubscribe, setMovieToSubscribe] = useState("")
  const [date, setDate] = useState("")

  useEffect(() => {

    firebase.firestore().collection('Movies').get()
      .then(data => {
        let tempMovies = [];
        data.forEach(movie => {
          if(!props.member.moviesSubscribed.map(movieData => movieData.id).includes(movie.id)) {
            let obj = { id : movie.id , name : movie.data().name };
            tempMovies.push(obj);
          }
        })

        setMovies(tempMovies);
      })
  }, [])

  const subscribe = () => {

    if (movieToSubscribe && date) {

      firebase.firestore().collection('Movies').doc(movieToSubscribe).get()
        .then(movie => {
          let movieToAdd = movie.data();
          let movieToAddName = movie.data().name;
          movieToAdd.id = movie.id;
          movieToAdd.subscriptions.push({ id : props.member.id, name : props.member.name, date : date.split("T").toString()});
          firebase.firestore().collection('Movies').doc(movieToSubscribe)
          .set(movieToAdd)
          firebase.firestore().collection('Members').doc(props.member.id).get()
          .then(member => {
            let memberToAdd = member.data();
            let newMovie = {id : movieToSubscribe , name : movieToAddName, date : date.split("T").toString()}
            memberToAdd.moviesSubscribed.push(newMovie)
            memberToAdd.id = member.id;
            firebase.firestore().collection('Members').doc(props.member.id)
            .set(memberToAdd).then( () => {
              props.callbackSubscribe();
            })
          }) 
      })    
    }

    else if (!movieToSubscribe && date){
      alert("Movie was not chosen!")
    }


  else if (movieToSubscribe && !date){
    alert("Date was not chosen!")
    }

  else {
    alert("Movie and Date were not chosen!")
    }
  }

  return (
    <div className = "subscribe">

      <h4> Add a new movie </h4>

      <select onClick={e => setMovieToSubscribe(e.target.value)}>
        {
          movies.map(item => {
            return <option key={item.id} value={item.id}>{item.name}</option>
          })
        }
      </select>

      <input type="datetime-local" onChange={e => setDate(e.target.value)} />

      <input type="button" className = "low-button" value="Subscribe" onClick={subscribe} />

    </div>
  );
}

export default SubscribeComp;
