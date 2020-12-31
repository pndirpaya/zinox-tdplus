import React from 'react';
import SideNav from './SideNav'
import plusbtn from './img/plusbtn.svg'
import jobbtn from './img/jobbtn.svg'
import searchbtn from './img/searchbtn.svg'
import reportbtn from './img/reportbtn.svg'
import closebtn from './img/closebtn.svg'
// import btn from './img/btn.svg'

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    render() {
        return (
            <div>
                <section className="uk-grid-small uk-grid-match uk-text-left" data-uk-grid data-uk-height-viewport>
                    <div className='uk-width-auto'>
                        <SideNav />
                    </div>
                    <div className='uk-width-expand uk-padding-remove'>
                        <div className="uk-width-1-1">
                            <div className='uk-padding '>
                                <h3 className='orange uk-text-bold uk-margin-remove'>Hello, TDPlus Administrator  </h3>
                                <h5 className='uk-text-bold uk-margin-remove'> John Doe (joe@tdplus.com)</h5>
                                <p className='uk-margin-large-bottom'>Welcome to your Dashboard</p>
                                <div data-uk-grid>
                                    <div className='uk-width-1-4@l uk-width-1-3@m uk-width-1-2@s'>
                                        <p className='uk-margin-remove'>Open Jobs <span className='open_percentage uk-margin-left'>63.7%</span></p>
                                        <h1 className='uk-margin-remove uk-heading-large uk-text-bold '>423</h1>
                                        <p className='uk-margin-remove'>423 Devices</p>
                                    </div>
                                    <div className='uk-width-1-4@l uk-width-1-3@m uk-width-1-2@s'>
                                        <p className='uk-margin-remove'>Pending Jobs <span className='pending_percentage uk-margin-left'>63.7%</span></p>
                                        <h1 className='uk-margin-remove uk-heading-large uk-text-bold '>423</h1>
                                        <p className='uk-margin-remove'>423 Devices</p>
                                    </div>
                                    <div className='uk-width-1-4@l uk-width-1-3@m uk-width-1-2@s'>
                                        <p className='uk-margin-remove'>Jobs On-Hold <span className='onhold_percentage uk-margin-left'>10.7%</span></p>
                                        <h1 className='uk-margin-remove uk-heading-large uk-text-bold '>10</h1>
                                        <p className='uk-margin-remove'>423 Devices</p>
                                    </div>
                                    <div className='uk-width-1-4@l uk-width-1-3@m uk-width-1-2@s'>
                                        <p className='uk-margin-remove'>Closed Jobs <span className='closed_percentage uk-margin-left'>63.7%</span></p>
                                        <h1 className='uk-margin-remove uk-heading-large uk-text-bold '>120</h1>
                                        <p className='uk-margin-remove'>423 Devices</p>
                                    </div>
                                </div>

                                <hr className='uk-margin-medium' />
                                <div className='uk-margin-medium-top ' data-uk-grid>
                                    <div className='uk-width-1-2@m '>
                                        <a href='/add-product'>
                                            <div className="uk-card uk-card-default uk-card-small uk-card-body uk-text-left tool_card">
                                                <div data-uk-grid>
                                                    <div className='uk-width-1-6'>
                                                        <img src={plusbtn} width='80' alt='icon' />
                                                    </div>
                                                    <div className='uk-width-5-6'>
                                                        <h4 className="uk-text-normal uk-margin-small">Create New Job Ticket </h4>
                                                        <p className='uk-text-small uk-margin-small'>Verify Online Warranty Status and Create Support Ticket </p>
                                                    </div>
                                                </div>

                                            </div>
                                        </a>
                                    </div>
                                    <div className='uk-width-1-2@m '>
                                        <a href='/add-product'>
                                            <div className="uk-card uk-card-default uk-card-body uk-card-small uk-text-left tool_card">
                                                <div data-uk-grid>
                                                    <div className='uk-width-1-6'>
                                                        <img src={jobbtn} width='80' alt='icon' />
                                                    </div>
                                                    <div className='uk-width-5-6'>
                                                        <h4 className="uk-text-normal uk-margin-small">Create Job Ticket [ No Serial ]</h4>
                                                        <p className='uk-text-small uk-margin-small'>Create a new Job Ticket and Upload Proof of Payment</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </a>
                                    </div>
                                    <div className='uk-width-1-2@m '>
                                        <a href='/add-product'>
                                            <div className="uk-card uk-card-default uk-card-body  uk-card-small uk-text-left tool_card">
                                                <div data-uk-grid>
                                                    <div className='uk-width-1-6'>
                                                        <img src={searchbtn} width='80' alt='icon' />
                                                    </div>
                                                    <div className='uk-width-5-6'>
                                                        <h4 className="uk-text-normal">Search Job Tickets</h4>
                                                        <p className='uk-text-small'>Search Support Tickets and Update Status </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </a>
                                    </div>
                                    <div className='uk-width-1-2@m '>
                                        <a href='/add-product'>
                                            <div className="uk-card uk-card-default uk-card-body uk-card-small uk-text-left tool_card">
                                                <div data-uk-grid>
                                                    <div className='uk-width-1-6'>
                                                        <img src={closebtn} width='80' alt='icon' />
                                                    </div>
                                                    <div className='uk-width-5-6'>
                                                        <h4 className="uk-text-normal">Close Job Ticket</h4>
                                                        <p className='uk-text-small'>Search for Device Warranty and Create Support Ticket </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </a>
                                    </div>
                                    <div className='uk-width-1-2@m '>
                                        <a href='/add-product'>
                                            <div className="uk-card uk-card-default uk-card-body uk-card-small uk-text-left tool_card">
                                                <div data-uk-grid>
                                                    <div className='uk-width-1-6'>
                                                        <img src={reportbtn} width='80' alt='icon' />
                                                    </div>
                                                    <div className='uk-width-5-6'>
                                                        <h4 className="uk-text-normal">Reports</h4>
                                                        <p className='uk-text-small'>Search and Generate Reports</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </a>
                                    </div>

                                    {/* } */}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div >
        )
    }

}
export default Dashboard;
