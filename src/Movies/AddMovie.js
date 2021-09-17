import firebase from '../firebaseApp'
import {useState} from 'react';

const AddMovieComp = (props) => 
{

  const [name, setName] = useState('')
  const [genres, setGenres] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [premiered, setPremiered] = useState('')

  const save = () =>
  {
    let genresArr = genres.split(',');

    let obj = {name, genres : genresArr, image : {"original" : imageUrl}, premiered, subscriptions : []};


    firebase.firestore().collection('Movies').add(obj)
    .then(()=>
      {
        alert('New Movie created ! ');
        props.history.push("/MainPage/Movies");
      })
  }

  const cancel = () =>
  {
    props.history.push("/MainPage/Movies");
  }

  return (
    <div>

       Name : <input type="text" className = "inputhBar" onChange={e => setName(e.target.value)} /><br/>
      Genres : <input type="text" className = "inputhBar" onChange={e => setGenres(e.target.value)} /><br/>
      Image Url : <input type="text" className = "inputhBar" onChange={e => setImageUrl(e.target.value)} /><br/>
      Premiered : <input type="text" className = "inputhBar" onChange={e => setPremiered(e.target.value)} /><br/><br/>

      <input type="button" className = "low-button" value="save" onClick={save} />
      <input type="button" className = "low-button" value="cancel" onClick={cancel} />

    </div>
  );
}

export default AddMovieComp;
