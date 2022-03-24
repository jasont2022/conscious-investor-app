import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import './Sidebar.scss';

const sidebarNavItems = [
    {
        display: 'Personalize',
        icon: <i className='bx bx-home'></i>,
        to: '/',
        section: ''
    },
    {
        display: 'Dashboard',
        icon: <i className='bx bx-star'></i>,
        to: '/dashboard',
        section: 'started'
    },
    {
        display: 'About Us',
        icon: <i className='bx bx-star'></i>,
        to: '/aboutus',
        section: 'started'
    },
    {
        display: 'Recommendation',
        icon: <i className='bx bx-calendar'></i>,
        to: '/recommendation',
        section: 'calendar'
    },
    {
        display: 'Search Companies',
        icon: <i className='bx bx-user'></i>,
        to: '/search',
        section: 'search'
    }
]

const Sidebar = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [stepHeight, setStepHeight] = useState(0);
    const sidebarRef = useRef();
    const indicatorRef = useRef();

    const navigate = useNavigate();

    const logout = async () => {
        try {
          const res = await axios.post('/account/logout')
          console.log(res)
          navigate('/Login')
        } catch (err) {
          console.log(err)
        }
      }


    return <div className='sidebar'>
        <div className="sidebar__logo">
            Concious Investor
        </div>
        <div ref={sidebarRef} className="sidebar__menu">
            <div
               // ref={indicatorRef}
                className="sidebar__menu__indicator"
                style={{
                    transform: `translateX(-50%) translateY(${activeIndex * stepHeight}px)`
                }}
            ></div>
            {
                sidebarNavItems.map((item, index) => (
                    <Link to={item.to} key={index}>
                        <div className={`sidebar__menu__item`}>
                            <div className="sidebar__menu__item__text">
                                {item.display}
                            </div>
                        </div>
                    </Link>
                ))
            }
            <Button style={{marginLeft:"100px", marginTop:"200px"}} variant="outlined" onClick={logout}> Logout </Button>
        </div>
    </div>;
};

export default Sidebar;
