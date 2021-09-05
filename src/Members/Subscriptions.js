import firebase from '../firebaseApp'
import {Route, Switch} from 'react-router-dom'
import {useState, useEffect} from 'react';

import AddMemberComp from './AddMember'
import AllMembersComp from './AllMembers'
import EditMemberComp from './EditMember'
import SingleMemberComp from './SingleMember'

const SubscriptionsComp = (props) => 
{
  const [addMemberButton, setAddMemberButton] = useState(null)

  useEffect(() => {

    firebase.firestore().collection('Users').doc(sessionStorage["loginUserId"]).get()
      .then(userData => {
        if(userData.data().permissions['Create Subscriptions']){
          setAddMemberButton(<input type="button" className = "mid-button" value="Add Member" onClick={addMember} />)
        }
      })
  },[]) 

  const allMembers = () =>
  {
    props.history.push("/MainPage/Subscriptions");
  }

  const addMember = () =>
  {
    props.history.push("/MainPage/Subscriptions/AddMember");
  }


  return (
    <div>
      
      <h3> Members </h3> 

      <input type="button" className = "mid-button" value="All Members" onClick={allMembers} />
      {addMemberButton}

      <Switch>
          <Route path="/MainPage/Subscriptions/SingleMember/:id" component={SingleMemberComp} />
          <Route exact path="/MainPage/Subscriptions" component={AllMembersComp} />
          <Route path="/MainPage/Subscriptions/AddMember" component={AddMemberComp} />
          <Route path="/MainPage/Subscriptions/EditMember/:id" component={EditMemberComp} />
          
      </Switch>
  

    </div>
  );
}

export default SubscriptionsComp;
