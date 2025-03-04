import './App.css'
import { ToastContainer } from 'react-toastify';
import { BrowserRouter as Router,Routes,Route } from "react-router-dom";
import UserRoutes from './Routes/UserRoutes';
import AgentRoute from './Routes/AgentRoute';
import AdminRoutes from './Routes/AdminRoutes';

function App() {
 
  return (
  
    <>
   
    <ToastContainer position="top-center"
  reverseOrder={false}/>
   
   <Router>
    <Routes>
      <Route path='/*'element={<UserRoutes/>}/>
      <Route path='/agent/*'element={<AgentRoute/>}/>
      <Route path='/admin/*'element={<AdminRoutes/>}/>
    </Routes>
   </Router>
    </>
  )
}

export default App
