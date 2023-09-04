import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { openModal, logout } from '../../redux/actions/index.js';
import { NavLink, Link, useHistory } from 'react-router-dom';
// import logo from '../../img/logo-dlca.png';
import './NavBar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping, faHeart } from '@fortawesome/free-solid-svg-icons'


function Navbar() {
    const cart = useSelector(state => state.cart)
    const history = useHistory()
    const [click, setClick] = useState(false);
    const dispatch = useDispatch();
    const handleClick = () => setClick(!click);
    const user = useSelector(state => state.user)

    const handleLike = function (){
      if (!(user.email)){
        dispatch(openModal('login'))
      }
      else {
        history.push('/wishlist')
      }
    }

    return (
        <>
      <nav className='navbar'>
        <div className='navbar_container'>
            <div className='navbar_icon' >
            
            </div>
          <div className='menu_icon' onClick={handleClick}>
            <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
          </div>
          <ul className={click ? 'nav_menu active' : 'nav_menu'}>		
        
        { 
          (user && !user.error && JSON.stringify(user).length>2) ? <>
         <li className='nav_links'> Hola {`${user.name?.split(' ')[0]}`} 😀! </li>
         { user.role===2 ?
         <li className='nav_links'>    <Link className='nav_links' to='/adminCPanel'> AdminControlPanel</Link> </li> : 
         <li className='nav_links'> <Link className='nav_links' to='/myAccount'> My Account </Link> </li>
         }
        <li 
        className='nav_links' 
        // onClick={() => handleLogout()}
        > <Link className='nav_links' to='/home' onClick={() => window.scrollTo(0, 0)}> Logout</Link>
       </li></>
        :
            <>
		  <li>
				<NavLink className='nav_links' to='/form'>Formulario</NavLink >
			</li>
            <li>
			<NavLink className='nav_links' to='/register'
             	onClick={() => dispatch(openModal('signUp'))}>
				Register
			 </NavLink >
            </li>
            <li> 
             <NavLink className='nav_links' to='/login'
			 	onClick={() => dispatch(openModal('signUp'))}>
				Login
		 	</NavLink >
            </li>
            </>
			
          }
		  
		  	<li>
				<NavLink className='nav_links' to='/product'>Home</NavLink >
			</li>
            <li>
				<NavLink className='nav_links' to='/productos'>Products</NavLink >
			</li>
            <li >
              <NavLink
              to='/about'
              className='nav_links'
              >
                About us
              </NavLink>
            </li>
            <li>
            <NavLink
              className='nav_links'
			  to='/cart'
              >
				<FontAwesomeIcon icon={faCartShopping} badgeContent={cart &&  [].concat(cart).reduce((accumulator, currentValue) => accumulator + currentValue.cuantity,0)} color='secondary' /> 
				</NavLink>
              </li>
				<li>
				<NavLink className='nav_links' to='/favorites'>
					<FontAwesomeIcon icon={faHeart} style={{cursor:'pointer'}} size='lg'  color='red' ></FontAwesomeIcon>
          {/* onClick={ () => handleLike()}/>  */}
				</NavLink >

				</li>

			  <li>
				<NavLink className='nav_links' to='/'>DLCA TECHNOLOGY</NavLink >
				</li>
				{/* <li>
				<NavLink className='nav_links' to="/">
          			<img className='nav_img' src={logo} alt="Logo" />
        		</NavLink>
				</li> */}
              </ul>
        </div>
        
      </nav>
    </>
    )
}

export default Navbar;