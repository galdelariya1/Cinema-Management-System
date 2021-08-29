import firebase from '../firebaseApp'
import {useState, useEffect} from 'react';

const EditMovieComp = (props) => 
{

  const id = props.match.params.id;
  const [movie, setMovie] = useState({})
  const [name, setName] = useState("")
  const [genres, setGenres] = useState([])
  const [image, setImage] = useState("")
  const [premiered, setPremiered] = useState("")

  useEffect( () => 
  {
    firebase.firestore().collection('Movies').doc(id).get()
      .then(movieToSet => {
      
        setMovie(movieToSet.data())
        setName(movieToSet.data().name)
        setGenres(movieToSet.data().genres.toString())
        setImage(movieToSet.data().image.original)
        setPremiered(movieToSet.data().premiered)
      })

  },[])

  const update = () =>
  {
    let updatedMovie = {...movie}
    updatedMovie.name = name;
    updatedMovie.genres = genres;
    updatedMovie.image.original = image;
    updatedMovie.premiered = premiered;

    firebase.firestore().collection('Movies').doc(id)
    .set(updatedMovie)
      .then(() =>
        {
          alert('Updated');
          props.history.push("/MainPage/Movies");
        })
  }
  
  const cancel = () =>
  {
    props.history.push("/MainPage/Movies");
  }


  return (
    <div>

      <h3> Edit Movie : {props.name}</h3>

      Name : <input type="text" className = "inputhBar" value= {name} onChange={e => setName(e.target.value)} /><br/>
      Genres : <input type="text" className = "inputhBar" value= {genres} onChange={e => setGenres(e.target.value)} /><br/>
      Image Url : <input type="text" className = "inputhBar" value= {image} onChange={e => setImage(e.target.value)} /><br/>
      Premiered : <input type="text" className = "inputhBar" value= {premiered} onChange={e => setPremiered(e.target.value)} /><br/><br/>

      <input type="button" className = "low-button" value="update" onClick={update} />
      <input type="button" className = "low-button" value="cancel" onClick={cancel} />

    </div>
  );
}

export default EditMovieComp;

