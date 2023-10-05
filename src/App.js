
import  './components/assets/styles/styles.css';
import  './components/assets/styles/responsive.css';
import { useEffect } from 'react';
import Header from "./components/Header";
import Signup from './components/Signup';
import Main from './components/Main';
import { useState } from 'react';
import BlogForm from './components/BlogForm';
import DefaultBlog from './components/DefaultBlog';
import { defaultData } from './components/Helpers/helpers';

function App() {
  const [isLoggedIn,setIsLoggedIn]=useState(false);
  const [showForm, setShowForm]=useState(false);
  const [showSignup,setShowSignup]=useState(false);
  const [loggedInUser,setLoggedInUser]=useState({});
  useEffect(()=>{
    let loggedinUser=localStorage.getItem('loginDetail')?localStorage.getItem('loginDetail'):{};
    if(loggedinUser.length){
      setLoggedInUser(JSON.parse(loggedinUser));
      setIsLoggedIn(true);
    }
  },[])
const handleLogout = ()=>{
    localStorage.removeItem('loginDetail');
    setIsLoggedIn(false);
  }
  const updateLoggedInUserDetail = (user)=>{
      setLoggedInUser(user);
      localStorage.setItem('loginDetail',JSON.stringify(user));
  }
return(
    <>
        <Header isLoggedIn={isLoggedIn} handleLogout={handleLogout} setShowForm={setShowForm} setShowSignup={setShowSignup} user={loggedInUser}/>
        <div className="page-wrapper">
          { !isLoggedIn&&!showSignup&&
          <DefaultBlog blog={defaultData} />
          }
          {
            !isLoggedIn&&showSignup&&<Signup setIsLoggedIn={setIsLoggedIn} setShowForm={setShowForm} setShowSignup={setShowSignup} setLoggedInUser={setLoggedInUser}/>

          }
           {
            isLoggedIn&&showForm&&
             <BlogForm setShowForm={setShowForm} user={loggedInUser} updateLoggedInUserDetail={updateLoggedInUserDetail}/>
             
           }
           {
            isLoggedIn&&!showForm&&
            <Main />
           }
           
        </div>
    </>
);
}

export default App;
