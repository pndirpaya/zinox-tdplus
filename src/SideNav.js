import React, { Component } from 'react';
import logo from './img/tdlogo.svg';
import plus from './img/menu/plus.svg';
import search from './img/menu/search.svg';
import close from './img/menu/close.svg';
import report from './img/menu/report.svg';
import logout from './img/menu/logout.svg';
var currentUrl = (window.location.href).split('/').pop();

class SideNav extends Component {
    render() {
        return (
            <div className='uk-visible@s td_nav_bar'>
                <div className='uk-padding-small uk-margin-top'>
                    <img src={logo} width='180' alt='tdplus zinox logo' />
                    <p className='td_nav_bar_title'>Dashboard</p>
                    <hr />
                    {/* <div className="" style={{ zIndex: '980' }} data-uk-sticky="offset: 100; bottom: #top"> */}
                    <ul className="uk-nav uk-nav-default">
                        <li><a className='' href="/dashboard"><img src={plus} width='20' alt='' />  Create Job Ticket</a></li>
                        <li><a className='' href="/"><img src={search} width='20' alt='' />  Search Job Ticket</a></li>
                        <li><a className='' href="/"><img src={close} width='20' alt='' />  Close Job Ticket</a></li>
                        <li><a className='' href="/"><img src={report} width='20' alt='' />  Reports</a></li>
                        <li><a className='' href="/logout"><img src={logout} width='20' alt='' />  Logout</a></li>
                        {/* {currentUrl === 'dashboard' ? <li><a className='orange' href="/dashboard">Dashboard</a></li> : <li><a href="/dashboard">Dashboard</a></li>}
                        {currentUrl === 'add-product' ? <li><a className='orange' href="/add-product">Add Product</a></li> : <li><a href="/add-product">Add Product</a></li>}
                        {currentUrl === 'upload-serial' ? <li><a className='orange' href="/upload-serial">Upload Serial</a></li> : <li><a href="/upload-serial">Upload Serial</a></li>}
                        {currentUrl === 'activate-warranty' ? <li><a className='orange' href="/activate-warranty">Activate Warranty</a></li> : <li><a href="/activate-warranty">Activate Warranty</a></li>}
                        {currentUrl === 'manage-user' ? <li><a className='orange' href="/manage-user">User Management</a></li> : <li><a href="/manage-user">User Management</a></li>} */}
                    </ul>
                    {/* </div> */}


                </div>
            </div>
        )
    }
}
export default SideNav;

