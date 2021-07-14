import firebase from '../firebaseApp'
import {useState, useEffect} from 'react';

const EditMemberComp = (props) => 
{

  const [id] = useState(props.match.params.id)
  const[member, setMember] = useState({})
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [city, setCity] = useState("")

  useEffect(() => {

    firebase.firestore().collection('Members').doc(id).get()
      .then(person => {
        setMember(person.data())
        setName(person.data().name)
        setEmail(person.data().email)
        setCity(person.data().address.city)
      })
  }, [])

  const update = () =>
  {
    let updatedMember = {...member}
    updatedMember.name = name;
    updatedMember.email = email;
    updatedMember.address.city = city;

    firebase.firestore().collection('Members').doc(id)
    .set(updatedMember)
      .then(()=>
        {
          alert('Updated');
          props.history.push("/MainPage/Subscriptions");
        })
  }

  const cancel = () =>
  {
    props.history.push("/MainPage/Subscriptions");
  }

  return (
    <div>

      <h3> Edit Member : {props.name}</h3>

      Name : <input type="text" value= {name} onChange={e => setName(e.target.value)} /><br/>
      Email : <input type="text" value= {email} onChange={e => setEmail(e.target.value)} /><br/>
      City : <input type="text" value= {city} onChange={e => setCity(e.target.value)} /><br/>
   
      <input type="button" className = "low-button" value="update" onClick={update} />
      <input type="button" className = "low-button" value="cancel" onClick={cancel} />

    </div>
  );
}

export default EditMemberComp;
