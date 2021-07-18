
import { useState, useEffect } from 'react'

import firebase from '../firebaseApp'

import MemberComp from './Member.js'

const AllMembersComp = () => {
  
  const [members, setMembers] = useState([])

  useEffect( () => 
  {

    firebase.firestore().collection('Members').get()
    .then(data => 
      {
        let tempMembers = [];
        data.forEach(person =>
         {
           let id = person.id;
           tempMembers.push(id);
         })
         tempMembers.sort();
         setMembers(tempMembers);
     })
  },[])

  const deleteMember = (memberId) => {

    let allMembers = [...members];

    let newAllMembers = allMembers.filter(x => x !== memberId)
    newAllMembers.sort();

    setMembers(newAllMembers);
  }

  return (
    <div>
        
        {
          members.map((item, index) => {
            return <MemberComp key={index} id={item}
                    callback = {data => deleteMember(data)} />
          })
        }

    </div>
  );
}

export default AllMembersComp;
