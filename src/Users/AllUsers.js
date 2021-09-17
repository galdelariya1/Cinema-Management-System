
import { useState, useEffect } from 'react'

import firebase from '../firebaseApp'
import UserComp from './User'

const AllUsersComp = () => {
  
  const [users, setUsers] = useState([])

  useEffect( () => 
  {
    firebase.firestore().collection('Users').get()
    .then(data => 
      {
        let tempUsers = [];
        data.forEach(user =>
         {
           let id = user.id;
           tempUsers.push(id);
         })
         setUsers(tempUsers);
     })
  },[])

  const deleteUser = (id) => {

    let allUsers = [...users]

    setUsers(allUsers.filter(x => x.id !== id));
  }

  return (
    <div>
        
        {
          users.map((item, index) => {
            return <UserComp key={index} id={item}
                    callback = {data => deleteUser(data)} />
          })
        }

    </div>
  );
}

export default AllUsersComp;
