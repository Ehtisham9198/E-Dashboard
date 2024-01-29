import './App.css';
import Nav from './componets/Nav';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Footer from './componets/Footer';
import SignInPage from './componets/SignInPage';
import PrivateComponent from './componets/PrivateComponent';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route element={<PrivateComponent/>}>
          <Route path="/" element={<h1>Product Listing component</h1>}/>
          <Route path="/add" element={<h1>add Listing component</h1>}/>
          <Route path="/profile" element={<h1>My profile</h1>}/>
          <Route path="/update" element={<h1>updated</h1>}/>
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
