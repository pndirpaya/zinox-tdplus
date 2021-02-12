import React from 'react';
import axios from 'axios'
import Cookies from 'universal-cookie';
import { API_URL } from './apiUrl'
import SideNav from './SideNav'
import plusbtn from './img/plusbtn.svg'
import loader from './img/loader.svg'
import reportbtn from './img/reportbtn.svg'
import closebtn from './img/closebtn.svg'
import user from './img/user.svg'
import engr from './img/engr.svg'
import dept from './img/dept.svg'

const cookies = new Cookies();

class TableRow extends React.Component {
    render() {
        var job_status = ''
        switch (this.props.ticket.status) {
            case 1:
                job_status = <p className='green'>Open</p>
                break;
            case 2:
                job_status = <p className='blue'>Pending</p>
                break;
            case 3:
                job_status = <p className='black'>On-Hold</p>
                break;
            case 4:
                job_status = <p className='blue'>Parts-Awaiting</p>
                break;
            case 5:
                job_status = <p className='blue'>Parts-Recieved</p>
                break;
            default:
                job_status = <p className='red'>Closed</p>
        }
        if (this.props.ticket.status)
            return (
                <tr>
                    <td>{this.props.ticket.warrantyserial_id[0].product_id[0].device_name}</td>
                    <td>{job_status}</td>
                    <td>{this.props.ticket.job_tag}</td>
                    <td>{this.props.ticket.serial}</td>
                    <td>{this.props.ticket.customer_name}</td>
                    <td>{new Date(this.props.ticket.ticket_date).toDateString()}</td>
                    {/* <td><a href={'/update/' + this.props.ticket._id} className="uk-button uk-button-small small_blue_btn">Part Order</a></td> */}
                    {this.props.ticket.status !== 6 && <td><a href={'/update/' + this.props.ticket._id} className="uk-button uk-button-small small_orange_btn">Update</a></td>}
                    {this.props.ticket.status !== 6 && <td><a href={'/tracker/' + this.props.ticket._id} className="uk-button uk-button-small small_slider_btn">TRACK</a></td>}
                    {this.props.ticket.status === 6 && <td colSpan='2'><a href={'/tracker/' + this.props.ticket._id} className="uk-button uk-button-small small_slider_btn">View Closed Ticket</a></td>}
                </tr>
            )
    }
}

class TableRowOffline extends React.Component {
    render() {
        var job_status = ''
        switch (this.props.ticket.status) {
            case 1:
                job_status = <p className='green'>Open</p>
                break;
            case 2:
                job_status = <p className='blue'>Pending</p>
                break;
            case 3:
                job_status = <p className='black'>On-Hold</p>
                break;
            case 4:
                job_status = <p className='blue'>Parts-Awaiting</p>
                break;
            case 5:
                job_status = <p className='blue'>Parts-Recieved</p>
                break;
            default:
                job_status = <p className='red'>Closed</p>
        }
        return (
            <tr>
                {this.props.ticket ? <td>{this.props.ticket.device_name}</td> : <td>{this.props.ticket.warrantyserial_id[0].product_id[0].device_name}</td>}
                <td>{job_status}</td>
                <td>{this.props.ticket.job_tag}</td>
                <td>{this.props.ticket.serial}</td>
                <td>{this.props.ticket.customer_name}</td>
                <td>{new Date(this.props.ticket.ticket_date).toDateString()}</td>
                {/* <td><a href={'/update/' + this.props.ticket._id} className="uk-button uk-button-small small_blue_btn">Part Order</a></td> */}
                <td><a href={'/update-offline/' + this.props.ticket._id} className="uk-button uk-button-small small_orange_btn">Update</a></td>
                <td><a href={'/tracker/' + this.props.ticket._id} className="uk-button uk-button-small small_slider_btn">TRACK</a></td>
            </tr>
        )
    }
}

class Reports extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            OpenTickets: [],
            PendingTickets: [],
            OnHoldTickets: [],
            AwaitingTickets: [],
            RecievedTickets: [],
            ClosedTickets: [],
            user: [],
            tickets: [],
            offline_tickets: [],
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
        this.getTickets()
        this.getOfflineTickets()
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
    getTickets = () => {
        axios.get(API_URL + '/api/tdjobticket/')
            .then((response) => {
                this.setState({
                    tickets: response.data,
                })
            })
            .catch(error => {
                if (error.response) {
                    console.log(error)
                }
            });
    }
    getOfflineTickets = () => {
        axios.get(API_URL + '/api/tdofflinejobticket/')
            .then((response) => {
                this.setState({
                    offline_tickets: response.data,
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
                                <div className='uk-margin-large'>
                                    <div data-uk-grid className='uk-grid-medium'>
                                        <div className='uk-width-auto'>
                                            <img src={reportbtn} width='80' alt='icon' />
                                        </div>
                                        <div className='uk-width-5-6'>
                                            <h3 className='uk-text-left uk-margin-remove'>Reports</h3>
                                            <p className='uk-text-small uk-width-medium uk-margin-remove'>Search and Generate Reports</p>
                                        </div>

                                    </div>

                                </div>
                                <div data-uk-grid>
                                    <div className='uk-width-1-3@l uk-width-1-3@m uk-width-1-2@s'>
                                        <p className='uk-margin-remove'>Open Jobs <span className='open_percentage uk-margin-left'>{(this.state.OpenTickets * 100) / totaldevices}%</span></p>
                                        <h1 className='uk-margin-remove uk-heading-large uk-text-bold '>{this.state.OpenTickets}</h1>
                                        <p className='uk-margin-remove'>{this.state.OpenTickets} Devices</p>
                                    </div>
                                    <div className='uk-width-1-3@l uk-width-1-3@m uk-width-1-2@s'>
                                        <p className='uk-margin-remove'>Pending Jobs <span className='pending_percentage uk-margin-left'>{(this.state.PendingTickets * 100) / totaldevices}%</span></p>
                                        <h1 className='uk-margin-remove uk-heading-large uk-text-bold '>{this.state.PendingTickets} </h1>
                                        <p className='uk-margin-remove'>{this.state.PendingTickets}  Devices</p>
                                    </div>

                                    <div className='uk-width-1-3@l uk-width-1-3@m uk-width-1-2@s'>
                                        <p className='uk-margin-remove'>Parts Awaiting <span className='pending_percentage uk-margin-left'>{(this.state.AwaitingTickets * 100) / totaldevices}%</span></p>
                                        <h1 className='uk-margin-remove uk-heading-large uk-text-bold '>{this.state.AwaitingTickets}</h1>
                                        <p className='uk-margin-remove'>{this.state.AwaitingTickets} Devices</p>
                                    </div>
                                    <div className='uk-width-1-3@l uk-width-1-3@m uk-width-1-2@s'>
                                        <p className='uk-margin-remove'>Parts Recieved <span className='pending_percentage uk-margin-left'>{(this.state.RecievedTickets * 100) / totaldevices}%</span></p>
                                        <h1 className='uk-margin-remove uk-heading-large uk-text-bold '>{this.state.RecievedTickets}</h1>
                                        <p className='uk-margin-remove'>{this.state.RecievedTickets} Devices</p>
                                    </div>
                                    <div className='uk-width-1-3@l uk-width-1-3@m uk-width-1-2@s'>
                                        <p className='uk-margin-remove'>Jobs On-Hold <span className='onhold_percentage uk-margin-left'>{(this.state.OnHoldTickets * 100) / totaldevices}%</span></p>
                                        <h1 className='uk-margin-remove uk-heading-large uk-text-bold '>{this.state.OnHoldTickets} </h1>
                                        <p className='uk-margin-remove'>{this.state.OnHoldTickets}  Devices</p>
                                    </div>
                                    <div className='uk-width-1-3@l uk-width-1-3@m uk-width-1-2@s'>
                                        <p className='uk-margin-remove'>Closed Jobs <span className='closed_percentage uk-margin-left'>{(this.state.ClosedTickets * 100) / totaldevices}%</span></p>
                                        <h1 className='uk-margin-remove uk-heading-large uk-text-bold '>{this.state.ClosedTickets}</h1>
                                        <p className='uk-margin-remove'>{this.state.ClosedTickets} Devices</p>
                                    </div>
                                </div>

                                <hr className='uk-margin-medium' />
                                {/* <div className='uk-margin-medium-top ' data-uk-grid>
                                    <div className='uk-width-1-2@m '>
                                        <a href='/create-job'>
                                            <div className="uk-card uk-card-default uk-card-small uk-card-body uk-text-left tool_card">
                                                <div data-uk-grid>
                                                    <div className='uk-width-1-6'>
                                                        <img src={plusbtn} width='80' alt='icon' />
                                                    </div>
                                                    <div className='uk-width-5-6'>
                                                        <h4 className="uk-text-normal uk-margin-small">Generate Reports </h4>
                                                        <p className='uk-text-small uk-margin-small'>Verify Online Warranty Status and Create Support Ticket </p>
                                                    </div>
                                                </div>

                                            </div>
                                        </a>
                                    </div>
                                </div> */}
                                <hr className='uk-margin-medium' />
                                <div className="uk-background-muted uk-padding">
                                    <div className="uk-margin">
                                        <h4 className='uk-text-bold'>Search</h4>
                                        <form method='POST' data-uk-grid onSubmit={this.handleSearch} >
                                            <div className="uk-width-1-4@m">
                                                <label className="uk-form-label uk-text-bold ">Job Tag <span className='red'>*</span></label>
                                                <input className="uk-input calc_input uk-margin-small-top" type="text" name='job_tag' placeholder="Serial Number" onChange={this.handleInputChange} />
                                            </div>
                                            <div className="uk-width-1-4@m">
                                                <label className="uk-form-label uk-text-bold ">Serial Number <span className='red'>*</span></label>
                                                <input className="uk-input calc_input uk-margin-small-top" type="text" name='serial_number' placeholder="Serial Number" onChange={this.handleInputChange} />
                                            </div>
                                            <div className="uk-width-1-4@m">
                                                <label className="uk-form-label uk-text-bold ">Job Status <span className='red'>*</span></label>
                                                <select className="uk-input calc_input uk-margin-small-top" name='warranty_status' onChange={this.handleInputChange} required >
                                                    <option value=''>Select Warranty Status</option>
                                                    <option value=''>All</option>
                                                    <option value='1'>Active Warranty</option>
                                                    <option value='2'>Expired (Out of Warranty)</option>
                                                </select>
                                            </div>

                                            <div className="uk-margin-top uk-width-auto">
                                                {!this.state.isProcessing && <button type='submit' className="uk-button uk-margin-right slider_btn">Search</button>}
                                                {this.state.isProcessing && <h4 className="uk-form-label uk-text-bold "><img className='uk-margin-right' src={loader} width='40' alt='loader' /> Searching...</h4>}

                                            </div>
                                        </form>
                                    </div>
                                </div>
                                <div className='uk-margin'>
                                    <div className="uk-overflow-auto uk-padding">
                                        <p className='uk-text-left uk-text-meta uk-margin-remove'>Showing {this.state.tickets.length + this.state.offline_tickets.length} Job Tickets</p>
                                        <table className="uk-table uk-table-striped uk-overflow-auto" >
                                            <thead>
                                                <tr>
                                                    <th className='uk-text-bold red'>Device Name</th>
                                                    <th className='uk-text-bold red'>Job Status</th>
                                                    <th className='uk-text-bold red'>Job Tag</th>
                                                    <th className='uk-text-bold red'>Serial Number</th>
                                                    <th className='uk-text-bold red'>Customer Name</th>
                                                    <th className='uk-text-bold red'> Ticket Date</th>
                                                    <th className='uk-text-bold red'>&nbsp;</th>
                                                    <th className='uk-text-bold red'>&nbsp;</th>
                                                </tr>

                                            </thead>
                                            <tbody>
                                                {
                                                    this.state.tickets.map(ticket =>
                                                        <TableRow key={ticket._id}
                                                            index={ticket._id}
                                                            ticket={ticket} />
                                                    )
                                                }
                                                {
                                                    this.state.offline_tickets.map(ticket =>
                                                        <TableRowOffline key={ticket._id}
                                                            index={ticket._id}
                                                            ticket={ticket} />
                                                    )
                                                }
                                            </tbody>

                                        </table>
                                    </div>

                                </div>

                            </div>
                        </div>
                    </div>
                </section>
            </div >
        )
    }

}
export default Reports;
