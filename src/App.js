
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Auth from './components/Auth';
import Home from './components/Home';
import Welcome from './components/Welcome';

function App() {
  return (
    <div>
      <Routes>
      <Route path='/' element={<Welcome/>}/>
       <Route path='/home' element={<Home/>}/>
       <Route path='/login' element={<Auth/>}/>
       <Route path='/signup' element={<Auth signup/>}/>

        
      </Routes>
    </div>
  );
}

export default App;
