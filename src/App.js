import React,{useEffect,useContext,createContext,useState} from 'react';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { AuthContext } from './store/FirebaseContext';
import Signup from './Pages/Signup'
import Home from './Pages/Home'
import Login from './Pages/Login'
import Create from './Pages/Create'
import View from './Pages/ViewPost'
import './App.css';



export const PostContext = createContext(null);

function App() {

    
    const {user,setUser}=useContext(AuthContext)
    const auth = getAuth();
    const [postDetails, setPostDetails] = useState();
    useEffect(()=>{
        onAuthStateChanged(auth, (user) => {
          if (user) {
            setUser(user)
            console.log(user,'s or no');
          } 
        });  
    }, [auth, setUser, user])  // I added dependency  user to get rid of the warning "user was declared but never used". 

    return (
        <PostContext.Provider value={{ postDetails, setPostDetails }}>
        <div className="App">
            <Router>
                <Routes>
                    <Route path="/" element={<Home />}  />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/create" element={<Create />} />
                    <Route path="/view" element={<View />} />
                </Routes>
            </Router>
        </div>
        </PostContext.Provider>
    ); 
}

export default App;
