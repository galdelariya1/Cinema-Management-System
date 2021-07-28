import firebase from '../firebaseApp'
import {useState, useEffect} from 'react';
import { useRouteMatch } from 'react-router-dom';

const EditUserComp = (props) => 
{

  const [id] = useState(props.match.params.id)
  const[user, setUser] = useState({})
  const [name, setName] = useState("")
  const [userName, setUserName] = useState("")
  const [sessionTimeOut, setSessionTimeOut] = useState("")
  const [viewSubscriptions, setViewSubscriptions] = useState(false)
  const [createSubscriptions, setCreateSubscriptions] = useState(false)
  const [deleteSubscriptions, setDeleteSubscriptions] = useState(false)
  const [updateSubscriptions, setUpdateSubscriptions] = useState(false)
  const [viewMovies, setViewMovies] = useState(false)
  const [createMovies, setCreateMovies] = useState(false)
  const [deleteMovies, setDeleteMovies] = useState(false)
  const [updateMovies, setUpdateMovies] = useState(false)

  useEffect(() => {

    firebase.firestore().collection('Users').doc(id).get()
      .then(user => {
        setUser(user.data())
        setName(user.data().name)
        setUserName(user.data().userName)
        setSessionTimeOut(user.data().sessionTimeOut)

        let userBooleansPermissions = user.data().booleansPermissions;
        setViewSubscriptions(userBooleansPermissions[0])
        setCreateSubscriptions(userBooleansPermissions[1])
        setDeleteSubscriptions(userBooleansPermissions[2])
        setUpdateSubscriptions(userBooleansPermissions[3])
        setViewMovies(userBooleansPermissions[4])
        setCreateMovies(userBooleansPermissions[5])
        setDeleteMovies(userBooleansPermissions[6])
        setUpdateMovies(userBooleansPermissions[7])
      })

  }, [])

  const customSubmit = async (e) =>
  {
    //Prevdet the browser from being rendered again !!
    e.preventDefault();

    let booleans = [viewSubscriptions, createSubscriptions, deleteSubscriptions, updateSubscriptions,
                   viewMovies, createMovies, deleteMovies, updateMovies]

    let permissions = [];

    if(viewSubscriptions || createSubscriptions || deleteSubscriptions || updateSubscriptions){
      permissions.push("View Subscription ")
    }

    if(createSubscriptions){
      permissions.push("Create Subscription ")
    }

    if(deleteSubscriptions){
      permissions.push("Delete Subscription ")
    }

    if(updateSubscriptions){
      permissions.push("Update Subscription ")
    }

    if(viewMovies || createMovies || deleteMovies || updateMovies){
      permissions.push("View Movies ")
    }

    if(createMovies){
      permissions.push("Create Movies ")
    }

    if(deleteMovies){
      permissions.push("Delete Movies ")
    }

    if(updateMovies){
      permissions.push("update Movies")
    }

    let updatedUser = {...user}
    updatedUser.name = name;
    updatedUser.userName = userName;
    updatedUser.sessionTimeOut = sessionTimeOut;
    updatedUser.booleansPermissions = booleans;
    updatedUser.stringPermissions = permissions;

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

          Name : <input type="text" className = "inputhBar" value= {name} onChange={e => setName(e.target.value)} /><br/>
          User Name : <input type="text" className = "inputhBar" value= {userName} onChange={e => setUserName(e.target.value)} /><br/>
          Session Time Out (Minutes) : <input type="text" className = "inputhBar" value= {sessionTimeOut} onChange={e => setSessionTimeOut(e.target.value)} /><br/>
          Persmissions: <br/>
          View Subscriptions <input type="checkbox" checked ={viewSubscriptions} onChange={e => setViewSubscriptions(e.target.checked)} /> <br/>
          Create Subscriptions <input type="checkbox" checked ={createSubscriptions} onChange={e => {setCreateSubscriptions(e.target.checked)
                                                                      setViewSubscriptions(e.target.checked)}} /> <br/>
          Delete Subscriptions <input type="checkbox" checked ={deleteSubscriptions} onChange={e => {setDeleteSubscriptions(e.target.checked)
                                                                      setViewSubscriptions(e.target.checked)}} /> <br/>
          Update Subscriptions <input type="checkbox" checked ={updateSubscriptions} onChange={e => {setUpdateSubscriptions(e.target.checked)
                                                                      setViewSubscriptions(e.target.checked)}} /> <br/>
          View Movies <input type="checkbox" checked ={viewMovies} onChange={e => setViewMovies(e.target.checked)} /> <br/>
          Create Movies <input type="checkbox" checked ={createMovies} onChange={e => {setCreateMovies(e.target.checked)
                                                                setViewMovies(e.target.checked)}} /> <br/>
          Delete Movies <input type="checkbox" checked ={deleteMovies} onChange={e => {setDeleteMovies(e.target.checked)
                                                                setViewMovies(e.target.checked)}} /> <br/>
          Update Movies <input type="checkbox" checked ={updateMovies} onChange={e => {setUpdateMovies(e.target.checked)
                                                                setViewMovies(e.target.checked)}} /> <br/>
          
          <input type="submit" className = "low-button" value="update" />

      </form>

      <input type="button" className = "mid-button" value="cancel" onClick={cancel} />

    </div>
  );
}

export default EditUserComp;


/*


          */