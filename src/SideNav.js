import React, { Component } from 'react';
import logo from './img/tdlogo.svg';
import plus from './img/menu/plus.svg';
import search from './img/menu/search.svg';
import close from './img/menu/close.svg';
import report from './img/menu/report.svg';
import logout from './img/menu/logout.svg';
// var currentUrl = (window.location.href).split('/').pop();

class SideNav extends Component {
    render() {
        return (
            <div className='uk-visible@s td_nav_bar'>
                <div className='uk-padding-small uk-margin-top'>
                    <img src={logo} width='180' alt='tdplus zinox logo' />
                    <p className='td_nav_bar_title'><a href='/dashboard' className='orange'>Dashboard</a></p>
                    <hr />
                    <ul className="uk-nav uk-nav-default">
                        <li><a className='' href="/create-job"><img src={plus} width='20' alt='' />  Create Job Ticket</a></li>
                        <li><a className='' href="/create-job-offline"><img src={plus} width='20' alt='' />  Create Job Ticket [ No Serial ]</a></li>
                        <li><a className='' href="/search"><img src={search} width='20' alt='' />  Search Job Ticket</a></li>
                        <li><a className='' href="/close-ticket-search"><img src={close} width='20' alt='' />  Close Job Ticket</a></li>
                        <li><a className='' href="/reports"><img src={report} width='20' alt='' />  Reports</a></li>
                        <li><a className='' href="/logout"><img src={logout} width='20' alt='' />  Logout</a></li>
                    </ul>
                </div>
            </div>
        )
    }
}
export default SideNav;

