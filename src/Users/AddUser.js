import firebase from '../firebaseApp'
import {useState} from 'react';

const AddUserComp = (props) => 
{

  const [name, setName] = useState('')
  const [userName, setUserName] = useState('')
  const [sessionTimeOut, setSessionTimeOut] = useState('')
  const [viewSubscriptions, setViewSubscriptions] = useState(false)
  const [createSubscriptions, setCreateSubscriptions] = useState(false)
  const [deleteSubscriptions, setDeleteSubscriptions] = useState(false)
  const [updateSubscriptions, setUpdateSubscriptions] = useState(false)
  const [viewMovies, setViewMovies] = useState(false)
  const [createMovies, setCreateMovies] = useState(false)
  const [deleteMovies, setDeleteMovies] = useState(false)
  const [updateMovies, setUpdateMovies] = useState(false)


  const customSubmit = async (e) =>
  {
    //Prevdet the browser from being rendered again !!
    e.preventDefault();

    let permissions = [];

    var booleans = [];    
    for (var i = 0; i < 8; i++) {
      booleans.push(false);
    }

    if(viewSubscriptions){
      booleans[0] = true;
      permissions.push("View Subscription ")
    }

    if(createSubscriptions){
      booleans[1] = true;
      permissions.push("Create Subscription ")
    }

    if(deleteSubscriptions){
      booleans[2] = true;
      permissions.push("Delete Subscription ")
    }

    if(updateSubscriptions){
      booleans[3] = true;
      permissions.push("Update Subscription ")
    }

    if(viewMovies){
      booleans[4] = true;
      permissions.push("View Movies ")
    }

    if(createMovies){
      booleans[5] = true;
      permissions.push("Create Movies ")
    }

    if(deleteMovies){
      booleans[6] = true;
      permissions.push("Delete Movies ")
    }

    if(updateMovies){
      booleans[7] = true;
      permissions.push("update Movies")
    }

    let today = new Date().toISOString().slice(0, 10)

    //data shaping
    let obj = {name, userName, "password" : "", sessionTimeOut, createdDate : today,
                booleansPermissions : booleans, stringPermissions : permissions}

    firebase.firestore().collection('Users').add(obj)
    .then(()=>
      {
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

          Name : <input type="text" className = "inputhBar" onChange={e => setName(e.target.value)} /><br/>
          User Name : <input type="text" className = "inputhBar" onChange={e => setUserName(e.target.value)} /><br/>
          Session Time Out (Minutes) : <input type="text" className = "inputhBar" onChange={e => setSessionTimeOut(e.target.value)} /><br/><br/>
          <h4> Persmissions </h4> 
          View Subscriptions <input type="checkbox" checked ={viewSubscriptions} onChange={e => setViewSubscriptions(e.target.checked)} /> <br/>
          Create Subscriptions <input type="checkbox" onChange={e => {setCreateSubscriptions(e.target.checked)
                                                                      setViewSubscriptions(e.target.checked)}} /> <br/>
          Delete Subscriptions <input type="checkbox" onChange={e => {setDeleteSubscriptions(e.target.checked)
                                                                      setViewSubscriptions(e.target.checked)}} /> <br/>
          Update Subscriptions <input type="checkbox" onChange={e => {setUpdateSubscriptions(e.target.checked)
                                                                      setViewSubscriptions(e.target.checked)}} /> <br/>
          View Movies <input type="checkbox" checked ={viewMovies} onChange={e => setViewMovies(e.target.checked)} /> <br/>
          Create Movies <input type="checkbox" onChange={e => {setCreateMovies(e.target.checked)
                                                                setViewMovies(e.target.checked)}} /> <br/>
          Delete Movies <input type="checkbox" onChange={e => {setDeleteMovies(e.target.checked)
                                                                setViewMovies(e.target.checked)}} /> <br/>
          Update Movies <input type="checkbox" onChange={e => {setUpdateMovies(e.target.checked)
                                                                setViewMovies(e.target.checked)}} /> <br/>

          <input type="submit" value="save" />
      </form>

      <input type="button"  className = "mid-button" value="cancel" onClick={cancel} />

    </div>
  );
}

export default AddUserComp;
