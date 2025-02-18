import './App.css';
import Footer from './components/Footer';
import Nav from './components/Nav';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignUp from './components/signup';
import PrivateComponent from './components/PrivateComponent';
import Login from './components/Login';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Nav/>
      <Routes>

        <Route element={<PrivateComponent/>}>

        <Route path='/' element={<h1>Product Listing Components</h1>}/>
        <Route path='/add' element={<h1>Add Product Components</h1>}/>
        <Route path='/update' element={<h1>Update Product Components</h1>}/>
        <Route path='/logout' element={<h1>Logout Components</h1>}/>

        </Route>

        <Route path='/signup' element={<SignUp/>}/>
        <Route path='/login' element={<Login/>}/>

      </Routes>
      </BrowserRouter>
      <Footer/>
    </div>
  );
}

export default App;
