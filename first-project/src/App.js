import './App.css';
import History from './History';
import Hadith from './Hadith';
import Navigate from './Navigate';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router,Switch, Route, Routes } from 'react-router-dom'



const App = () => {
  return (
    <Router>
    <Navigate> </Navigate>
   <Routes>
          <Route path='/History' element={<History/>} />
          <Route path='/Hadith' element={<Hadith/>} />
          <Route path='/' element={<History/>} />
   </Routes>
       
</Router>
  );
}

export default App;
