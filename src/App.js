import './App.css';
import { Routes, Route } from "react-router-dom";
import Login from './Components/Login';
import Protected from './Protected';
import Register from './Components/Register';
import Dashboard from './Components/Dashboard';
import Navbar from './Components/Navbar';
import ProtectedHome from './ProtectedHome';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route element={<ProtectedHome />}>
          <Route exact path="/" element={<Login />}></Route>
          <Route exact path="/register" element={<Register />}></Route>
        </Route>
        <Route element={<Protected />}>
          <Route exact path="/dashboard" element={<Dashboard />}></Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
