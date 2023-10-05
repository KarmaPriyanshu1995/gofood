import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
// import Navbar from './components/Navbar';
import Home from './screens/Home';
import Login from './screens/Login';
import '../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js';
import SignUp from './screens/SignUp';
import { CardProvider } from './components/contexReducer';
function App() {
  return (
    <CardProvider>
 <Router>
      <div >
        <Routes>
          <Route exact path="/" element={<Home/>} />
          <Route exact path="/login" element={<Login/>} />
          <Route exact path="/createuser" element={<SignUp/>} />
        </Routes>
      </div>
    </Router>
    </CardProvider>
   

  );
}

export default App;
