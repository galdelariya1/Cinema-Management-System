
import {useState, useEffect} from 'react';
import firebase from '../firebaseApp'

import { useHistory } from "react-router-dom";

const NewUserComp = () => 
{

  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [users, setUsers] = useState([])

  let history = useHistory();

  useEffect( () => 
  {
    firebase.firestore().collection('Users').get()
    .then(data => 
      {
        let tempUsers = [];
        data.forEach(user =>
         {
           let userData = user.data();
           userData.id = user.id;
           tempUsers.push(userData);
         })
         setUsers(tempUsers);
     })
  },[])

  const creat = () =>
  {
      let obj = users.find(user => user.userName == userName)

      if(obj){

          obj.password = password;
          firebase.firestore().collection('Users').doc(obj.id)
          .set(obj)
            .then(()=>
            {
              alert('Password was set succefully!');
              history.push("/");
            })
      }
      else{
        alert("User Name Does Not exists!")
        history.push("/");
      }
  
  }
    
  const cancel = () => {

    history.push("/");
  }

  return (
    <div>
      
      <h3> Creat An Account</h3> 

      <input type="text" className = "inputhBar" placeholder="User Name" onChange={e => setUserName(e.target.value)} />
      <input type="text" className = "inputhBar" placeholder="Password" onChange={e => setPassword(e.target.value)} /><br/><br/>

      <input type="button" className = "mid-button" value="Creat" onClick={creat} /> 
      <input type="button" className = "mid-button" value="Cancel" onClick={cancel} /> <br/><br/>

    </div>
  );
}

export default NewUserComp;
