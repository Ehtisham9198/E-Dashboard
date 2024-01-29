import React from 'react';
import {Link} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


const Nav = () => {
  const auth = localStorage.getItem('user');
  const navigate = useNavigate();
  const logout=()=>{
    localStorage.clear();
    navigate('/signup')
  }
  return (

    <div>
      <ul className='nav_ul'>
        <li><Link to="/">Products</Link></li>
        <li><Link to="/add">Add Products</Link></li>
        <li><Link to="/update">Update Products</Link></li>
        <li><Link to="/profile">Profile</Link></li>
        <li>{auth? <Link onClick={logout} to='/signup'>Logout</Link>:<Link to="/signup">Login</Link>}</li>
      </ul>
    </div>
  )
  }

export default Nav