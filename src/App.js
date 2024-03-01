import {Routes,Route } from 'react-router-dom';
import './App.css';
import './Responce.css'
import Home from './Component/Home';
import Login from './Component/Login';
import Sinup from './Component/Sinup';
import Newdata from './Component/Context/Updatecontext'
import UpdateAlert from './Component/Context/UpdateAlert';
import Selectdata from './Component/Selectdata';
function App() {
  
  return (
    <>
        <UpdateAlert>
      <Newdata>
          
      <Routes>
        <Route path='/' element={<Home/>}></Route>
          <Route path='/login' element={<Login/>}/>
          <Route path='/sinup' element={<Sinup/>}></Route>
          <Route path='/mydata' element={<Selectdata/>}></Route>
          
    </Routes>
    </Newdata>
    </UpdateAlert>
    </>
  );
}

export default App;
