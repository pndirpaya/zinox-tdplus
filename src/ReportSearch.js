import React from 'react';
import axios from 'axios'
import Select from 'react-select';
import { API_URL } from './apiUrl'
import SideNav from './SideNav'
import searchbtn from './img/reportbtn.svg'
import loader from './img/loader.svg'
import activeWarranty from './img/active_warranty.svg'
import expiredWarranty from './img/expired_warranty.svg'


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
        var warranty_status = ''
        switch (this.props.ticket.warranty_status) {
            case 1:
                warranty_status = <p className='green'><img className='' src={activeWarranty} alt='active warranty  ' width='25' /> Active</p>
                break;
            default:
                warranty_status = <p className='amber'><img className='' src={expiredWarranty} alt='active warranty  ' width='25' /> Expired</p>
        }

        if (this.props.ticket.status)
            return (
                <tr>
                    <td>{warranty_status}</td>
                    <td>{this.props.ticket.warrantyserial_id[0].product_id[0].device_name}</td>
                    <td>{job_status}</td>
                    <td>{this.props.ticket.job_tag}</td>
                    <td>{this.props.ticket.serial}</td>
                    <td>{this.props.ticket.customer_name}</td>
                    <td>{new Date(this.props.ticket.ticket_date).toDateString()}</td>
                    <td><a href={'/tracker/' + this.props.ticket._id} className="uk-button uk-button-small small_slider_btn">View</a></td>
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
        var warranty_status = ''
        switch (this.props.ticket.warranty_status) {
            case 1:
                warranty_status = <p className='green'><img className='' src={activeWarranty} alt='active warranty  ' width='25' /> Active</p>
                break;
            default:
                warranty_status = <p className='amber'><img className='' src={expiredWarranty} alt='active warranty  ' width='25' /> Expired</p>
        }
        return (
            <tr>
                <td>{warranty_status}</td>
                <td>{this.props.ticket.device_name}</td>
                <td>{job_status}</td>
                <td>{this.props.ticket.job_tag}</td>
                <td>{this.props.ticket.serial}</td>
                <td>{this.props.ticket.customer_name}</td>
                <td>{new Date(this.props.ticket.ticket_date).toDateString()}</td>
                <td><a href={'/tracker-offline/' + this.props.ticket._id} className="uk-button uk-button-small small_slider_btn">View</a></td>
            </tr>
        )
    }
}

class ReportSearch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            engineers: [],
            departments: [],
            locations: [],
            tickets: [],
            offline_tickets: [],
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentDidMount() {
        this.getTickets()
        this.getOfflineTickets()
        this.getEngineers()
        this.getDepartments()
        this.getLocations()
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

    getEngineers = () => {
        axios.get(API_URL + '/api/tdengineer/')
            .then((response) => {
                this.setState({
                    engineers: response.data,
                })
            })
            .catch(error => {
                if (error.response) {
                    console.log(error)
                }
            });
    }
    getDepartments = () => {
        axios.get(API_URL + '/api/tddepartment/')
            .then((response) => {
                this.setState({
                    departments: response.data,
                })
            })
            .catch(error => {
                if (error.response) {
                    console.log(error)
                }
            });
    }
    getLocations = () => {
        axios.get(API_URL + '/api/tdlocations/')
            .then((response) => {
                this.setState({
                    locations: response.data,
                })
            })
            .catch(error => {
                if (error.response) {
                    console.log(error)
                }
            });
    }
    handleEngineerChange = event => {
        this.setState({ engineer_id: event.value });
    };

    handlLocationChange = event => {
        this.setState({ location_id: event.value });
    };

    handlDepartmentChange = event => {
        this.setState({ department_id: event.value });
    };


    handleSubmit(event) {
        event.preventDefault();
        const payload = {
            serial: this.state.serial_number,
            department_id: this.state.department_id,
            engineer_id: this.state.engineer_id,
            location_id: this.state.location_id,
            customer_name: this.state.customer_name,
            customer_phone: this.state.customer_phone,
            customer_email: this.state.customer_email,
            from_date: this.state.from_date,
            to_date: this.state.to_date,
            status: this.state.status
        }
        console.log(payload)
        this.setState({
            isProcessing: true,
        });
        axios.post(API_URL + '/api/generatereport/', payload)
            .then((response) => {
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
        axios.post(API_URL + '/api/generateofflinereport/', payload)
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
        const options = this.state.engineers.map((engineer, index) => {
            return {
                label: engineer.engineer_name,
                value: engineer._id,
                key: index
            }
        })

        const departments = this.state.departments.map((departments, index) => {
            return {
                label: departments.department_name,
                value: departments._id,
                key: index
            }
        })

        const locations = this.state.locations.map((location, index) => {
            return {
                label: location.address,
                value: location._id,
                key: index
            }
        })
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
                                        <img src={searchbtn} width='80' alt='icon' />
                                    </div>
                                    <div className='uk-width-5-6'>
                                        <h4 className="uk-text-normal uk-margin-top uk-margin-remove-bottom">Generate Reports</h4>
                                        <p className='uk-text-small uk-margin-remove'>Generate Realtime Reports based on Search Filters and Parameters</p>
                                    </div>
                                </div>
                                <hr className='uk-margin-medium' />
                                <div className="uk-background-muted uk-padding">
                                    <div className="uk-margin">
                                        <h4 className='uk-text-bold'>Search</h4>
                                        <form method='POST' data-uk-grid onSubmit={this.handleSubmit} >
                                            <div className="uk-width-1-3@m">
                                                <label className="uk-form-label uk-text-bold ">Job Status <span className='red'>*</span></label>
                                                <select className="uk-input calc_input uk-margin-small-top" name='status' onChange={this.handleInputChange}  >
                                                    <option value=''>Select Job Status</option>
                                                    <option value='1'>Open</option>
                                                    <option value='2'>Pending</option>
                                                    <option value='3'>On-Hold</option>
                                                    <option value='4'>Parts-Awaiting</option>
                                                    <option value='5'>Parts-Recieved</option>
                                                    <option value='6'>Closed</option>
                                                </select>
                                            </div>
                                            <div className="uk-width-1-3@m">
                                                <label className="uk-form-label uk-text-bold ">Engineer Responsible <span className='red'>*</span></label>
                                                <Select className="calc_input uk-margin-small-top" options={options} name='engineer_id' onChange={this.handleEngineerChange} required />
                                            </div>
                                            <div className="uk-width-1-3@m">
                                                <label className="uk-form-label uk-text-bold ">Department <span className='red'>*</span></label>
                                                <Select className="calc_input uk-margin-small-top" options={departments} name='department_id' onChange={this.handlDepartmentChange} required />

                                            </div>
                                            <div className="uk-width-1-3@m">
                                                <label className="uk-form-label uk-text-bold ">Store Location <span className='red'>*</span></label>
                                                <Select className="calc_input uk-margin-small-top" options={locations} name='location_id' onChange={this.handlLocationChange} required />
                                            </div>
                                            <div className="uk-width-1-3@m">
                                                <label className="uk-form-label uk-text-bold ">Customer Name <span className='red'>*</span></label>
                                                <input className="uk-input calc_input uk-margin-small-top" type="text" name='customer_name' placeholder="Customer Name" onChange={this.handleInputChange} />
                                            </div>
                                            <div className="uk-width-1-3@m">
                                                <label className="uk-form-label uk-text-bold ">Customer Email <span className='red'>*</span></label>
                                                <input className="uk-input calc_input uk-margin-small-top" type="text" name='customer_email' placeholder="Customer Email" onChange={this.handleInputChange} />
                                            </div>
                                            <div className="uk-width-1-3@m">
                                                <label className="uk-form-label uk-text-bold ">Customer Phone <span className='red'>*</span></label>
                                                <input className="uk-input calc_input uk-margin-small-top" type="text" name='customer_phone' placeholder="Customer Phone" onChange={this.handleInputChange} />
                                            </div>
                                            <div className="uk-width-1-3@m">
                                                <label className="uk-form-label uk-text-bold ">From <span className='red'>*</span></label>
                                                <input className="uk-input calc_input uk-margin-small-top" type="date" name='from_date' placeholder="From Date" onChange={this.handleInputChange} />
                                            </div>
                                            <div className="uk-width-1-3@m">
                                                <label className="uk-form-label uk-text-bold ">To <span className='red'>*</span></label>
                                                <input className="uk-input calc_input uk-margin-small-top" type="date" name='to_date' placeholder="To Date" onChange={this.handleInputChange} />
                                            </div>
                                         


                                            <div className="uk-margin-top uk-width-auto">
                                                {!this.state.isProcessing && <button type='submit' className="uk-button uk-margin-right orange_btn">Generate Report</button>}
                                                {this.state.isProcessing && <h4 className="uk-form-label uk-text-bold "><img className='uk-margin-right' src={loader} width='40' alt='loader' /> Searching...</h4>}
                                                <a href='/report-search' className="uk-button uk-margin-right outline_btn">Clear Search</a>


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
                                                    <th className='uk-text-bold red'>Warranty Status</th>
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
                                        <div className='uk-width-1-4@m '>
                                                    <a href='/' onClick={() => window.print()} className="uk-button uk-margin-right black_btn">Print Report</a>
                                                </div>
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
export default ReportSearch;


