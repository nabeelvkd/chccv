import './App.css';
import Home from './components/home';
import Signup from './components/signup';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './components/login';
import {BrowserRouter as Router,Routes,Route} from "react-router-dom"

function App(){
    
    return(
       <div>
            <Router>
                <Routes>
                    <Route exact path="/" element={<Home/>}/>
                    <Route path="/signup" element={<Signup/>}/>
                    <Route path="/login" element={<Login/>}/>
                </Routes>
            </Router>
            
       </div> 
    )
}

export default App;
