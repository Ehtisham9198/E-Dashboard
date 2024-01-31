import './App.css';
import Nav from './componets/Nav';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Footer from './componets/Footer';
import SignInPage from './componets/SignInPage';
import PrivateComponent from './componets/PrivateComponent';
import AddProduct from './componets/AddProduct';
import ProductList from './componets/ProductList';
import UpdateProduct from './componets/Update';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route element={<PrivateComponent/>}>
          <Route path="/" element={<ProductList/>}/>
          <Route path="/add" element={<AddProduct/>}/>
          <Route path="/profile" element={<h1>My profile</h1>}/>
          <Route path="/update/:id" element={<UpdateProduct/>}/>
          <Route path="/logout" element={<h1>Logged out</h1>}/>
          </Route>

          <Route path="/signup" element={<SignInPage/>}/>
        </Routes>
        
      </BrowserRouter>
      <Footer/>
    </div>
  );
}

export default App;
