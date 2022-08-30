import './App.css';
import { Routes, Route, Link } from "react-router-dom";
import Login from './Components/Login';
import Protected from './Protected';
import Register from './Components/Register';
import Dashboard from './Components/Dashboard';
import Navbar from './Components/Navbar';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Login />}></Route>
        <Route exact path="/register" element={<Register />}></Route>
        <Route element={<Protected />}>
          <Route exact path="/dashboard" element={<Dashboard />}></Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
