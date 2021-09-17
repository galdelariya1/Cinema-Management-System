import firebase from '../firebaseApp'
import {useState} from 'react';

const AddUserComp = (props) => 
{

  const [name, setName] = useState('')
  const [userName, setUserName] = useState('')
  const [sessionTimeOut, setSessionTimeOut] = useState('')
  const [permissions, setPermissions] = useState({"View Subscriptions" : false, "Create Subscriptions" : false,
                                                  "Update Subscriptions" : false, "Delete Subscriptions" : false,
                                                  "View Movies" : false, "Create Movies" : false,
                                                  "Update Movies" : false, "Delete Movies" : false})


  const customSubmit = async (e) =>
  {
    //Prevdet the browser from being rendered again !!
    e.preventDefault();

    let today = new Date().toISOString().slice(0, 10)

    //data shaping
    let obj = {name, userName, "password" : "", sessionTimeOut, createdDate : today, permissions}

    firebase.firestore().collection('Users').add(obj)
    .then( () => {
        alert('New User created ! ');
        props.history.push("/MainPage/UsersManagement");
      })
      
  }

  const cancel = () =>
  {
    props.history.push("/MainPage/UsersManagement");
  }

  return (
    <div>

      <form onSubmit={e => customSubmit(e)}>

          Name : <input type="text" className = "inputhBar" onChange={e => setName(e.target.value)} />
          User Name : <input type="text" className = "inputhBar" onChange={e => setUserName(e.target.value)} />
          Session Time Out (Minutes) : <input type="text" className = "inputhBar" onChange={e => setSessionTimeOut(e.target.value)} />

          <h4> Persmissions </h4> 

          {
              Object.keys(permissions).map( permis => {

              return <div>
                     {permis} <input type="checkbox" onChange={e => {
                        let newPremissions = {...permissions}
                        newPremissions[permis] = e.target.checked
                        setPermissions(newPremissions)
                      }} /> <br/>
                    </div>
          })
          
          }

          <br/>
          <input type="submit" value="save" />
      </form>

      <input type="button"  className = "mid-button" value="cancel" onClick={cancel} />

    </div>
  );
}

export default AddUserComp;
