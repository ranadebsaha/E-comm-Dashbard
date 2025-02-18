import React from 'react';
import {Link, useNavigate} from 'react-router-dom';


const Nav=()=>{
    const auth=localStorage.getItem('user');
    const Navigate=useNavigate();
    const logout=()=>{
        localStorage.clear();
        Navigate('/signup');
    }
    return(
        <div>
            <ul className="nav-ul">
                <li><Link to='/'>Products</Link></li>
                <li><Link to='/add'>Add Products</Link></li>
                <li><Link to='/update'>Update Products</Link></li>
                
                {
                auth ? <li><Link onClick={logout} to='/signup'>Logout</Link> </li>:
                <>
                <li><Link to='/signup'>Sign Up</Link></li>
                <li><Link to='/login'>Login</Link></li>
                </>
                }
            </ul>
        </div>
    )
}

export default Nav;