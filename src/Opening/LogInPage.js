import store from 'store'
import firebase from '../firebaseApp';
import {useState, useEffect} from 'react';

import {Link, useHistory} from 'react-router-dom';

const LogInPageComp = () => 
{

  const [users, setUsers] = useState([])
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')

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

  const login = (e) =>
  {

    e.preventDefault();

    if(password == ""){
      alert("Please Enter Password")
      return;
    }

    if(userName == ""){
      alert("Please Enter User Name")
      return;
    }

    let userToLogIn = users.find(user => user.userName === userName)

    if(userToLogIn) {
      if(userToLogIn.password === password){
        sessionStorage["name"] = userToLogIn.name;
        store.set('permissions', userToLogIn.permissions);
        (userToLogIn.name == "sysAdmin") ? store.set('sysAdmin', true) : store.set('sysAdmin', false);
        history.push(`/MainPage`);
      }
      

      else{
          alert("Password is wrong!")
      }
  }

    else{
      alert("User Name does not exists!")
    }
  }

  return (
    <div className = "login">
      
      <h2> Log In Page</h2> 

      <form onSubmit={e => login(e)}>

          <input type="text" className = "inputhBar" placeholder="User Name"
                       onChange={e => setUserName(e.target.value)} /><br/>
          <input type="text" className = "inputhBar" placeholder="Password" 
                      onChange={e => setPassword(e.target.value)} /><br/>

          <input type="submit" value="Login" />

      </form> <br/>

      New User? <Link to={"/NewUser"}>Creat Account</Link>

    </div>
  );
}

export default LogInPageComp;
