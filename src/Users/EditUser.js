import firebase from '../firebaseApp'
import {useState, useEffect} from 'react';
import { useRouteMatch } from 'react-router-dom';

const EditUserComp = (props) => 
{

  const id = props.match.params.id
  const[user, setUser] = useState({})
  const [name, setName] = useState("")
  const [userName, setUserName] = useState("")
  const [sessionTimeOut, setSessionTimeOut] = useState("")
  const [permissions, setPermissions] = useState({})

  useEffect(() => {

    firebase.firestore().collection('Users').doc(id).get()
      .then(user => {
        setUser(user.data())
        setName(user.data().name)
        setUserName(user.data().userName)
        setSessionTimeOut(user.data().sessionTimeOut)
        setPermissions(user.data().permissions)
      })

  }, [])

  const customSubmit = (e) =>
  {
    //Prevdet the browser from being rendered again !!
    e.preventDefault();

    let updatedUser = {...user, name, userName, sessionTimeOut, permissions}

    firebase.firestore().collection('Users').doc(id)
    .set(updatedUser)
      .then(()=>
        {
          alert('Updated');
          props.history.push("/MainPage/UsersManagement");
        })
  }

  const cancel = () =>
  {
    props.history.push("/MainPage/UsersManagement");
  }

  return (
    <div>

      <h3> Edit User : {name}</h3>

      <form onSubmit={e => customSubmit(e)}>

          Name : <input type="text" className = "inputhBar" value= {name} onChange={e => setName(e.target.value)} />
          User Name : <input type="text" className = "inputhBar" value= {userName} onChange={e => setUserName(e.target.value)} />
          Session Time Out (Minutes) : <input type="text" className = "inputhBar" value= {sessionTimeOut} 
                                        onChange={e => setSessionTimeOut(e.target.value)} />
          
          <h4> Persmissions </h4> 

          {
              Object.keys(permissions).map( permis => {

              return <div>
                     {permis} <input type="checkbox" checked ={permissions[permis]} 
                      onChange={e => {
                        let newPremissions = {...permissions}
                        newPremissions[permis] = e.target.checked
                        setPermissions(newPremissions)
                      }} /> <br/>
                    </div>
          })
          
          }
          <br/>
          <input type="submit" className = "low-button" value="update" />

      </form>

      <input type="button" className = "mid-button" value="cancel" onClick={cancel} />

    </div>
  );
}

export default EditUserComp;


