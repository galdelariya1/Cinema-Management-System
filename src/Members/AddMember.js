import firebase from '../firebaseApp'
import {useState} from 'react';

const AddMemberComp = (props) => 
{

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [city, setCity] = useState(' ')

  const save = () =>
  {
    let obj = {name, email, address : {city}, moviesSubscribed : []};


    firebase.firestore().collection('Members').add(obj)
    .then(()=>
      {
        alert('New Member created ! ');
        props.history.push("/MainPage/Subscriptions");
      })
  }

  const cancel = () =>
  {
    props.history.push("/MainPage/Subscriptions");
  }

  return (
    <div>

      Name : <input type="text" onChange={e => setName(e.target.value)} /><br/>
      Email : <input type="text" onChange={e => setEmail(e.target.value)} /><br/>
      City : <input type="text" onChange={e => setCity(e.target.value)} /><br/>

      <input type="button" className = "low-button" value="save" onClick={save} />
      <input type="button" className = "low-button" value="cancel" onClick={cancel} />

    </div>
  );
}

export default AddMemberComp;
