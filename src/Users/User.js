import firebase from '../firebaseApp'

import { useHistory } from "react-router-dom";

import { useState, useEffect } from 'react'

const UserComp = (props) => {

  const [user, setUser] = useState({})

  let history = useHistory();

  useEffect(() => {

    firebase.firestore().collection('Users').doc(props.id).get()
      .then(user => {
        let userData = user.data()
        userData.id = props.id;
        userData.permissions = user.data().stringPermissions.toString();
        setUser(userData);
      })
  },[])


  const editUser = () => {
    history.push("/MainPage/UsersManagement/EditUser/" + props.id);
  }

  const deleteUser = () => {

    let doc = firebase.firestore().collection('Users').doc(props.id)
    doc.delete()
      .then(() => {
        props.callback(props.id)
        alert('Deleted');
      })
  }


  return (
    <div className="item">

        <div className = "text"> 
          Name : {user.name} <br/> 
          User Name : {user.userName} <br/>
          Session Time Out (Minutes) : {user.sessionTimeOut} <br/>
          Created Date : {user.createdDate} <br/>
          Permissions : {user.permissions}
        </div>

        <input type="button" className = "low-button" value="Edit" onClick={editUser} /> 
        <input type="button" className = "low-button" value="Delete" onClick={deleteUser} />


    </div>
  );
}

export default UserComp;

