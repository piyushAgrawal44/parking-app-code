// import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import List from './components/List';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
function App() {
  return (
    <div className="App">
      <Navbar />
      <br />
      <Router>
          
              <Routes>
                <Route path='/' element={<Home />} />
                
                <Route path='/list' element={<List  />} />
              </Routes>
         
      </Router>
    </div>
  );
}

export default App;
