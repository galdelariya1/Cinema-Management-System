
import { useState, useEffect } from 'react'

import firebase from '../firebaseApp'

import MovieComp from './Movie'

const AllMoviesComp = () => {
  
  const [movies, setMovies] = useState([])
  const [filteredMovies, setFilteredMovies] = useState([])

  useEffect( () => 
  {
    firebase.firestore().collection('Movies').get()
    .then(data => 
      {
        let tempMovies = [];
        data.forEach(movie =>
         {
           let movieObj = movie.data();
           movieObj.id = movie.id;
           tempMovies.push(movieObj);
         })

         setMovies(tempMovies);
         setFilteredMovies(tempMovies);
     })
  },[])

  const deleteMovie = (movieId) => {
   
        let allMovies = [...movies];

        let newAllMovies = allMovies.filter(x => x.id !== movieId)

        setFilteredMovies(newAllMovies);
        setMovies(newAllMovies);
        

  }

  const find = (searchString) => {

        let searchStringLow = searchString.toLowerCase();

        let filtered = movies.filter((movie) =>{
          return (movie.name.toLowerCase().includes(searchStringLow))
        })

        setFilteredMovies(filtered);

   }


  return (
    <div>

      <br/><br/>

      <div className = "searchWrpper">
          <input type="text" className = "inputhBar" placeholder="Search for a movie" onChange= {e => find(e.target.value)} />
      </div> 

      {
        filteredMovies.map((item, index) => {
          return <MovieComp key={index} id = {item.id} 
                  callback = {data => deleteMovie(data)}/>
        })
      }

    </div>
  );
}

export default AllMoviesComp;
