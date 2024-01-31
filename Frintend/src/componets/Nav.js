import React from 'react';
import {Link} from 'react-router-dom';
import { useNavigate } from 'react-router-dom'


const Nav = () => {
  const auth = localStorage.getItem('user');
  const navigate = useNavigate();
  const logout=()=>{
    localStorage.clear();
    navigate('/signup')
  }
  return (

    <div>
      {auth?
      <ul className='nav_ul'>
        <li><Link to="/">Products</Link></li>
        <li><Link to="/add">Add Products</Link></li>
        <li><Link to="/update">Update Products</Link></li>
        <li><Link to="/profile">Profile</Link></li>
        <li> <Link onClick={logout} to='/signup'>Logout({JSON.parse(auth).name})</Link></li>
      </ul>
      :
      <ul className='nav_ul1'>
      <li className='text-right  mr-12'> <Link to='/signup'>Login</Link></li>
      </ul>}
    </div>
  )
  }

export default Nav