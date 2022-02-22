import React from 'react'

import './topnav.css'

import { Link } from 'react-router-dom'

import axios from 'axios';

import { useNavigate } from 'react-router-dom';

//import ThemeMenu from '../thememenu/ThemeMenu'

//import notifications from '../../assets/JsonData/notification.json'

import user_image from '../NavbarC/Profile.png'
import Dropdown from './dropdown/dropdown.js'

import user_menu from './user_menus.json'


//import user_menu from '../../assets/JsonData/user_menus.json'







const renderUserToggle = (user) => (
    <div className="topnav__right-user">
        <div className="topnav__right-user__image">
            <img src={user.image} alt="" />
        </div>
        <div className="topnav__right-user__name">
            {user.display_name}
        </div>
    </div>
)

const renderUserMenu =(item, index) => (
    <Link to='/' key={index}>
        <div className="notification-item">
            <i className={item.icon}></i>
            <span>{item.content}</span>
        </div>
    </Link>
)

const Navbar = ({ user, count, setCount }) => {

    const navigate = useNavigate();

    const curr_user = {
        display_name: user,
        image: user_image
    }

    
    const logout = async () => {
        try {
          const res = await axios.post('/account/logout')
          console.log(res)
          setCount(count + 1)
          navigate('/')
        } catch (err) {
          console.log(err)
        }
    }
    return (
        <div className='topnav'>
            <div className="topnav__search">
                <input type="text" placeholder='Search here...' />
                <i className='bx bx-search'></i>
            </div>
            <div className="topnav__right">
                <div className="topnav__right-item">
                    {/* dropdown here */}
                    <Dropdown
                        customToggle={() => renderUserToggle(curr_user)}
                        contentData={user_menu}
                        renderItems={(item, index) => renderUserMenu(item, index)}
                    />
                </div>
               
                
            </div>
        </div>
    )
}

export default Navbar
