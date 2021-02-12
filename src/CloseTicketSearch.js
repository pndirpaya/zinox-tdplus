import React from 'react';
import axios from 'axios'
import { API_URL } from './apiUrl'
import SideNav from './SideNav'
import closebtn from './img/closebtn.svg'
import loader from './img/loader.svg'


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
                    <td><a href={'/close-ticket/' + this.props.ticket._id} className="uk-button uk-button-small small_slider_btn">Close Ticket</a></td>
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
                <td><a href={'/close-offline-ticket/' + this.props.ticket._id} className="uk-button uk-button-small small_slider_btn"> Close Ticket</a></td>
            </tr>
        )
    }
}

class CloseTicket extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tickets: [],
            offline_tickets: [],
            job_tag: '',
            serial_number: '',
            warranty_status: ''
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentDidMount() {
        this.getTickets()
        this.getOfflineTickets()
    }
    handleInputChange(event) { //stores input values in states
        this.setState({ [event.target.name]: event.target.value });
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

    handleSubmit(event) {
        event.preventDefault();
        const payload = {
            job_tag: this.state.job_tag,
            warranty_status: this.state.warranty_status,
            serial: this.state.serial_number
        }
        this.setState({
            isProcessing: true,
        });
        axios.post(API_URL + '/api/searchjobticket/', payload)
            .then((response) => {
                console.log(response.data)
                this.setState({
                    isProcessing: false,
                    tickets: response.data,
                })
            })
            .catch(error => {
                if (error.response) {
                    console.log(error)
                }
            });
        axios.post(API_URL + '/api/searchofflinejobticket/', payload)
            .then((response) => {
                console.log(response.data)
                this.setState({
                    isProcessing: false,
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
        return (
            <div>
                <section className="uk-grid-small uk-grid-match uk-text-left" data-uk-grid data-uk-height-viewport>
                    <div className='uk-width-auto'>
                        <SideNav />
                    </div>
                    <div className='uk-width-expand uk-padding-remove'>
                        <div className="uk-width-1-1">
                            <div className='uk-padding'>
                                <div data-uk-grid className='uk-grid-medium'>
                                    <div className='uk-width-auto'>
                                        <img src={closebtn} width='80' alt='icon' />
                                    </div>
                                    <div className='uk-width-5-6'>
                                        <h4 className="uk-text-normal uk-margin-top uk-margin-remove-bottom">Close Job Ticket</h4>
                                        <p className='uk-text-small uk-margin-remove'>Close a Job Ticket once Device Support is Completed</p>
                                    </div>
                                </div>
                                <hr className='uk-margin-medium' />
                                <div className="uk-background-muted uk-padding">
                                    <div className="uk-margin">
                                        <h4 className='uk-text-bold'>Search</h4>
                                        <form method='POST' data-uk-grid onSubmit={this.handleSubmit} >
                                            <div className="uk-width-1-4@m">
                                                <label className="uk-form-label uk-text-bold ">Job Tag <span className='red'>*</span></label>
                                                <input className="uk-input calc_input uk-margin-small-top" type="text" name='job_tag' placeholder="Serial Number" onChange={this.handleInputChange} />
                                            </div>
                                            <div className="uk-width-1-4@m">
                                                <label className="uk-form-label uk-text-bold ">Serial Number <span className='red'>*</span></label>
                                                <input className="uk-input calc_input uk-margin-small-top" type="text" name='serial_number' placeholder="Serial Number" onChange={this.handleInputChange} />
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
            </div>
        )
    }
}
export default CloseTicket;


