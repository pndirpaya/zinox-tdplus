import React from 'react';
import axios from 'axios'
import Cookies from 'universal-cookie';
import { API_URL } from './apiUrl'
import SideNav from './SideNav'
import plusbtn from './img/plusbtn.svg'
import jobbtn from './img/jobbtn.svg'
import searchbtn from './img/searchbtn.svg'
import reportbtn from './img/reportbtn.svg'
import closebtn from './img/closebtn.svg'
import user from './img/user.svg'
import engr from './img/engr.svg'
import dept from './img/dept.svg'

const cookies = new Cookies();



class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            OpenTickets: [],
            PendingTickets: [],
            OnHoldTickets: [],
            AwaitingTickets: [],
            RecievedTickets: [],
            ClosedTickets: [],
            user: []
        }

    }
    componentDidMount() {
        this.checkcookie()
        this.getUser()
        this.getOpenTickets()
        this.getPendingTickets()
        this.getOnHoldTickets()
        this.getAwaitingTickets()
        this.getRecievedTickets()
        this.getClosedTickets()
    }
    checkcookie = () => {
        if (cookies.get('current_session') === "" || cookies.get('current_session') === undefined) {
            this.props.history.push('/')
        }
    }
    getUser = () => {
        axios.get(API_URL + '/api/tdgetuser/' + cookies.get('current_session'))
            .then((response) => {
                this.setState({
                    user: response.data,
                })
            })
            .catch(error => {
                if (error.response) {
                    console.log(error)
                }
            });
    }
    getOpenTickets = () => {
        axios.get(API_URL + '/api/getopen/')
            .then((response) => {
                this.setState({
                    OpenTickets: response.data,
                })
            })
            .catch(error => {
                if (error.response) {
                    console.log(error)
                }
            });
    }
    getPendingTickets = () => {
        axios.get(API_URL + '/api/getpending/')
            .then((response) => {
                this.setState({
                    PendingTickets: response.data,
                })
            })
            .catch(error => {
                if (error.response) {
                    console.log(error)
                }
            });
    }
    getOnHoldTickets = () => {
        axios.get(API_URL + '/api/getonhold/')
            .then((response) => {
                this.setState({
                    OnHoldTickets: response.data,
                })
            })
            .catch(error => {
                if (error.response) {
                    console.log(error)
                }
            });
    }
    getAwaitingTickets = () => {
        axios.get(API_URL + '/api/getpartsawaiting/')
            .then((response) => {
                this.setState({
                    AwaitingTickets: response.data,
                })
            })
            .catch(error => {
                if (error.response) {
                    console.log(error)
                }
            });
    }
    getRecievedTickets = () => {
        axios.get(API_URL + '/api/getpartsrecieved/')
            .then((response) => {
                this.setState({
                    RecievedTickets: response.data,
                })
            })
            .catch(error => {
                if (error.response) {
                    console.log(error)
                }
            });
    }
    getClosedTickets = () => {
        axios.get(API_URL + '/api/getclosed/')
            .then((response) => {
                this.setState({
                    ClosedTickets: response.data,
                })
            })
            .catch(error => {
                if (error.response) {
                    console.log(error)
                }
            });
    }
    render() {
        var totaldevices = this.state.OpenTickets + this.state.PendingTickets + this.state.OnHoldTickets + this.state.AwaitingTickets + this.state.RecievedTickets + this.state.ClosedTickets
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
                                <h5 className='uk-text-bold uk-margin-remove'> {this.state.user.name} ({this.state.user.email})</h5>
                                <p className='uk-margin-large-bottom'>Welcome to your Dashboard</p>
                                <div data-uk-grid>
                                    <div className='uk-width-1-4@l uk-width-1-3@m uk-width-1-2@s'>
                                        <p className='uk-margin-remove'>Open Jobs <span className='open_percentage uk-margin-left'>{(this.state.OpenTickets * 100) / totaldevices}%</span></p>
                                        <h1 className='uk-margin-remove uk-heading-large uk-text-bold '>{this.state.OpenTickets}</h1>
                                        <p className='uk-margin-remove'>{this.state.OpenTickets} Devices</p>
                                    </div>
                                    <div className='uk-width-1-4@l uk-width-1-3@m uk-width-1-2@s'>
                                        <p className='uk-margin-remove'>Pending Jobs <span className='pending_percentage uk-margin-left'>{((this.state.PendingTickets + this.state.AwaitingTickets + this.state.RecievedTickets) * 100) / totaldevices}%</span></p>
                                        <h1 className='uk-margin-remove uk-heading-large uk-text-bold '>{this.state.PendingTickets + this.state.AwaitingTickets + this.state.RecievedTickets} </h1>
                                        <p className='uk-margin-remove'>{this.state.PendingTickets + this.state.AwaitingTickets + this.state.RecievedTickets}  Devices</p>
                                    </div>
                                    <div className='uk-width-1-4@l uk-width-1-3@m uk-width-1-2@s'>
                                        <p className='uk-margin-remove'>Jobs On-Hold <span className='onhold_percentage uk-margin-left'>{(this.state.OnHoldTickets * 100) / totaldevices}%</span></p>
                                        <h1 className='uk-margin-remove uk-heading-large uk-text-bold '>{this.state.OnHoldTickets} </h1>
                                        <p className='uk-margin-remove'>{this.state.OnHoldTickets}  Devices</p>
                                    </div>
                                    <div className='uk-width-1-4@l uk-width-1-3@m uk-width-1-2@s'>
                                        <p className='uk-margin-remove'>Closed Jobs <span className='closed_percentage uk-margin-left'>{(this.state.ClosedTickets * 100) / totaldevices}%</span></p>
                                        <h1 className='uk-margin-remove uk-heading-large uk-text-bold '>{this.state.ClosedTickets}</h1>
                                        <p className='uk-margin-remove'>{this.state.ClosedTickets} Devices</p>
                                    </div>
                                </div>

                                <hr className='uk-margin-medium' />
                                <div className='uk-margin-medium-top ' data-uk-grid>
                                    <div className='uk-width-1-2@m '>
                                        <a href='/create-job'>
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
                                        <a href='/create-job-offline'>
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
                                        <a href='/search'>
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
                                        <a href='/close-ticket-search'>
                                            <div className="uk-card uk-card-default uk-card-body uk-card-small uk-text-left tool_card">
                                                <div data-uk-grid>
                                                    <div className='uk-width-1-6'>
                                                        <img src={closebtn} width='80' alt='icon' />
                                                    </div>
                                                    <div className='uk-width-5-6'>
                                                        <h4 className="uk-text-normal">Closed Job Ticket</h4>
                                                        <p className='uk-text-small'>Search for Device Warranty and Create Support Ticket </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </a>
                                    </div>
                                    <div className='uk-width-1-2@m '>
                                        <a href='/reports'>
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
                                    {cookies.get('user_type') === '1' &&
                                        <div className='uk-width-1-2@m '>
                                            <a href='/manage-user'>
                                                <div className="uk-card uk-card-default uk-card-body uk-card-small uk-text-left tool_card">
                                                    <div data-uk-grid>
                                                        <div className='uk-width-1-6'>
                                                            <img src={user} width='80' alt='icon' />
                                                        </div>
                                                        <div className='uk-width-5-6'>
                                                            <h4 className="uk-text-normal">Manage Users</h4>
                                                            <p className='uk-text-small'>Manage TDPlus Administrator Users</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </a>
                                        </div>
                                    }
                                    {cookies.get('user_type') === '1' &&
                                        <div className='uk-width-1-2@m '>
                                            <a href='/manage-engineer'>
                                                <div className="uk-card uk-card-default uk-card-body uk-card-small uk-text-left tool_card">
                                                    <div data-uk-grid>
                                                        <div className='uk-width-1-6'>
                                                            <img src={engr} width='80' alt='icon' />
                                                        </div>
                                                        <div className='uk-width-5-6'>
                                                            <h4 className="uk-text-normal">Manage Engineers</h4>
                                                            <p className='uk-text-small'>Manage TDPlus Engineers</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </a>
                                        </div>
                                    }
                                    {cookies.get('user_type') === '1' &&
                                        <div className='uk-width-1-2@m '>
                                            <a href='/manage-department'>
                                                <div className="uk-card uk-card-default uk-card-body uk-card-small uk-text-left tool_card">
                                                    <div data-uk-grid>
                                                        <div className='uk-width-1-6'>
                                                            <img src={dept} width='80' alt='icon' />
                                                        </div>
                                                        <div className='uk-width-5-6'>
                                                            <h4 className="uk-text-normal">Manage Departments</h4>
                                                            <p className='uk-text-small'>Manage TDPlus Departments</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </a>
                                        </div>
                                    }
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
