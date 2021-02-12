import React from 'react';
import Select from 'react-select';
import axios from 'axios'
import { API_URL } from './apiUrl'
import SideNav from './SideNav'
import plusbtn from './img/plusbtn.svg'
import activeWarranty from './img/active_warranty.svg'
import expiredWarranty from './img/expired_warranty.svg'
import loader from './img/loader.svg'
var _id = (window.location.href).split('/').pop();


class CreateJobTicketForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            customer_name: '',
            customer_phone: '',
            customer_email: '',
            ticket_date: '',
            customer_address: '',
            job_description: '',
            department_id: '',
            comments: '',
            device: '',
            engineer_id: '',
            location_id: '',
            engineers: [],
            departments: [],
            locations: [],
            isProcessing: false,
            showResult: false,
            ticket: [],
            warranty_status: ''
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentDidMount() {
        this.getWarranty()
        this.getEngineers()
        this.getDepartments()
        this.getLocations()
    }

    getWarranty = () => {
        axios.get(API_URL + '/api/findwarrantyserial/' + _id)
            .then((response) => {
                this.setState({
                    device: response.data,
                }, function () {
                    var today = new Date();
                    if (new Date(this.state.device.warranty_end_date) >= today) {
                        this.setState({ warranty_status: 1 })
                    }
                    else if (new Date(this.state.device.warranty_end_date) < today) {
                        this.setState({ warranty_status: 2 })
                    }
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

    handleInputChange(event) { //stores input values in states
        this.setState({ [event.target.name]: event.target.value });
    }

    handleSubmit(event) {
        event.preventDefault();
        this.setState({
            isProcessing: true,
        });
        var comp = this
        const payload = {
            customer_name: this.state.customer_name,
            customer_phone: this.state.customer_phone,
            customer_email: this.state.customer_email,
            ticket_date: this.state.ticket_date,
            customer_address: this.state.customer_address,
            job_description: this.state.job_description,
            department_id: this.state.department_id,
            comments: this.state.comments,
            engineer_id: this.state.engineer_id,
            location_id: this.state.location_id,
            warrantyserial_id: _id,
            serial: this.state.device.serial,
            job_tag: 'TD' + (new Date()).getTime(),
            status: 1,
            warranty_status: this.state.warranty_status


        }
        axios.post(API_URL + '/api/tdjobticket/', payload)
            .then(function (response) {
                if (response.status === 201 && response.data !== '') {
                    comp.setState({
                        isProcessing: false,
                        ticket: response.data,
                        showResult: true
                    })
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    renderForm() {
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
        var today = new Date();
        var status = ""
        if (new Date(this.state.device.warranty_end_date) >= today) {
            status = <h4 className='uk-text-left uk-text-bold '><img className='uk-margin-right' src={activeWarranty} alt='active warranty  ' />Warranty Status for Device: <span className='green'>Active</span></h4>
        }
        else if (new Date(this.state.device.warranty_end_date) < today) {
            status = <h4 className='uk-text-left uk-text-bold '><img className='uk-margin-right' src={expiredWarranty} alt='expired warranty ' />Warranty Status for Device: <span className='amber'>Expired (Out of Warranty)</span></h4>
        }

        return (
            <div>
                <div className='uk-section-muted'>
                    <div className='uk-padding'>
                        {status}
                        {this.state.device &&
                            <div data-uk-grid className='uk-grid-small'>
                                <div className='uk-width-1-4@m'>
                                    <h5 className='uk-text-bold'>Device Name</h5>
                                </div>
                                <div className='uk-width-3-4@m'>
                                    <p>{this.state.device.product_id[0].item_detail + ' - ' + this.state.device.product_id[0].item_number}</p>
                                </div>
                                <div className='uk-width-1-4@m'>
                                    <h5 className='uk-text-bold'>Device Model</h5>
                                </div>
                                <div className='uk-width-3-4@m'>
                                    <p>{this.state.device.product_id[0].item_number}</p>
                                </div>
                                <div className='uk-width-1-4@m'>
                                    <h5 className='uk-text-bold'>Serial Number</h5>
                                </div>
                                <div className='uk-width-3-4@m'>
                                    <p>{this.state.device.serial}</p>
                                </div>
                                <div className='uk-width-1-4@m'>
                                    <h5 className='uk-text-bold'>Device Information</h5>
                                </div>
                                <div className='uk-width-3-4@m'>
                                    <p>	{this.state.device.product_id[0].description}</p>
                                </div>
                                <div className='uk-width-1-4@m'>
                                    <h5 className='uk-text-bold'>Warranty type</h5>
                                </div>
                                <div className='uk-width-3-4@m'>
                                    <p>Original Manufacturer Warranty</p>
                                </div>
                                <div className='uk-width-1-4@m'>
                                    <h5 className='uk-text-bold'>Start Date</h5>
                                </div>
                                <div className='uk-width-3-4@m'>
                                    <p>{(new Date(this.state.device.warranty_start_date).toDateString())}</p>
                                </div>
                                <div className='uk-width-1-4@m'>
                                    <h5 className='uk-text-bold'>End Date</h5>
                                </div>
                                <div className='uk-width-3-4@m'>
                                    <p>{(new Date(this.state.device.warranty_end_date).toDateString())}</p>
                                </div>
                            </div>
                        }
                        <hr />

                        <form method='POST' onSubmit={this.handleSubmit} data-uk-grid  >
                            <div className="uk-width-1-1@m">
                                <h4 className='uk-text-left uk-text-bold '>Customer Information</h4>
                            </div>
                            <div className="uk-width-1-2@m">
                                <label className="uk-form-label uk-text-bold ">Customer Name <span className='red'>*</span></label>
                                <input className="uk-input calc_input uk-margin-small-top" type="text" name='customer_name' placeholder="Enter Customer Name" onChange={this.handleInputChange} required />
                            </div>
                            <div className="uk-width-1-2@m">
                                <label className="uk-form-label uk-text-bold ">Customer Phone Number <span className='red'>*</span></label>
                                <input className="uk-input calc_input uk-margin-small-top" type="number" name='customer_phone' placeholder="Enter Customer Phone Number" onChange={this.handleInputChange} required />
                            </div>
                            <div className="uk-width-1-2@m">
                                <label className="uk-form-label uk-text-bold ">Customer Email <span className='red'>*</span></label>
                                <input className="uk-input calc_input uk-margin-small-top" type="email" name='customer_email' placeholder="Enter Customer Email" onChange={this.handleInputChange} required />
                            </div>
                            <div className="uk-width-1-2@m">
                                <label className="uk-form-label uk-text-bold ">Ticket Date <span className='red'>*</span></label>
                                <input className="uk-input calc_input uk-margin-small-top" type="date" name='ticket_date' placeholder="Enter Date" onChange={this.handleInputChange} required />
                            </div>
                            <div className="uk-width-1-1@m">
                                <label className="uk-form-label uk-text-bold ">Customer Address <span className='red'>*</span></label>
                                <textarea className="uk-textarea calc_input" rows="5" name='customer_address' placeholder="Enter Customer Address" onChange={this.handleInputChange} required></textarea>
                            </div>
                            <div className="uk-width-1-1@m">
                                <h4 className='uk-text-left uk-text-bold '>TDPlus Information</h4>
                            </div>
                            <div className="uk-width-1-1@m">
                                <label className="uk-form-label uk-text-bold ">Job Description <span className='red'>*</span></label>
                                <textarea className="uk-textarea calc_input" rows="8" name='job_description' placeholder="Enter Job Description" onChange={this.handleInputChange} required></textarea>
                            </div>
                            <div className="uk-width-1-2@m">
                                <label className="uk-form-label uk-text-bold ">Engineer Responsible <span className='red'>*</span></label>
                                <Select className="calc_input uk-margin-small-top" options={options} name='engineer_id' onChange={this.handleEngineerChange} required />
                            </div>
                            <div className="uk-width-1-2@m">
                                <label className="uk-form-label uk-text-bold ">Department <span className='red'>*</span></label>
                                <Select className="calc_input uk-margin-small-top" options={departments} name='department' onChange={this.handlDepartmentChange} required />

                            </div>
                            <div className="uk-width-1-2@m">
                                <label className="uk-form-label uk-text-bold ">Store Location <span className='red'>*</span></label>
                                <Select className="calc_input uk-margin-small-top" options={locations} name='location_id' onChange={this.handlLocationChange} required />
                            </div>
                            <div className="uk-width-1-1@m">
                                <label className="uk-form-label uk-text-bold ">Additional Comments <span className='red'>(Optional)</span></label>
                                <textarea className="uk-textarea calc_input" rows="5" name='comments' placeholder="Enter Additional Comments" onChange={this.handleInputChange}></textarea>
                            </div>

                            <div className="uk-margin-top uk-width-1-2@m">
                                {!this.state.isProcessing && <button type='submit' className="uk-button uk-margin-right slider_btn">Create Job Ticket</button>}
                                {this.state.isProcessing && <h4 className="uk-form-label uk-text-bold "><img className='uk-margin-right' src={loader} width='40' alt='loader' /> Creating Job Ticket...</h4>}
                            </div>
                        </form>


                    </div>
                </div>
            </div>
        )
    }
    render() {
        if (this.state.showResult) {
            var warranty_status = ''
            if (this.state.ticket.warranty_status === 1) {
                warranty_status = <p className='green'>Active Warranty! Device has Active Warranty when Ticket was Created</p>
            } else if (this.state.ticket.warranty_status === 2) {
                warranty_status = <p className='amber'>Expired Warranty! Device has Expired Warranty when Ticket was Created</p>
            }
            return (
                <section className="uk-grid-small uk-grid-match uk-text-left" data-uk-grid data-uk-height-viewport>
                    <div className='uk-width-auto'>
                        <SideNav />
                    </div>
                    <div className='uk-width-expand uk-padding-remove'>
                        <div className="uk-width-1-1">
                            <div className='uk-padding'>
                                <div data-uk-grid className='uk-grid-medium'>
                                    <div className='uk-width-auto'>
                                        <img src={plusbtn} width='80' alt='icon' />
                                    </div>
                                    <div className='uk-width-5-6'>
                                        <h4 className="uk-text-normal uk-margin-top uk-margin-remove-bottom">Create New Job Tickets </h4>
                                        <p className='uk-text-small uk-margin-remove'>Verify Online Warranty Status and Create Support Ticket </p>
                                    </div>
                                </div>
                                <hr className='uk-margin-medium' />
                                <div className='uk-section-muted'>
                                    <div className='uk-padding'>
                                        <h4 className='uk-text-left uk-text-bold '><img className='uk-margin-right' src={activeWarranty} alt='active warranty  ' />Job Ticket Created</h4>


                                        {this.state.ticket &&
                                            <div data-uk-grid className='uk-grid-small'>
                                                <hr />
                                                <div className='uk-width-1-1@m uk-margin-top'>
                                                    <h5 className='uk-text-bold uk-margin-remove'>Job Tag</h5>
                                                    <h1 className='uk-text-bold red uk-margin-remove uk-margin-bottom'>{this.state.ticket.job_tag}</h1>
                                                </div>
                                                <div className='uk-width-1-4@m'>
                                                    <h5 className='uk-text-bold'>Device Name</h5>
                                                </div>
                                                <div className='uk-width-3-4@m'>
                                                    <p>{this.state.ticket.warrantyserial_id[0].product_id[0].item_detail + ' - ' + this.state.ticket.warrantyserial_id[0].product_id[0].item_number}</p>
                                                </div>
                                                <div className='uk-width-1-4@m'>
                                                    <h5 className='uk-text-bold'>Device Model</h5>
                                                </div>
                                                <div className='uk-width-3-4@m'>
                                                    <p>{this.state.ticket.warrantyserial_id[0].product_id[0].item_number}</p>
                                                </div>
                                                <div className='uk-width-1-4@m'>
                                                    <h5 className='uk-text-bold'>Serial Number</h5>
                                                </div>
                                                <div className='uk-width-3-4@m'>
                                                    <p>{this.state.ticket.warrantyserial_id[0].serial}</p>
                                                </div>
                                                <div className='uk-width-1-4@m'>
                                                    <h5 className='uk-text-bold'>Device Information</h5>
                                                </div>
                                                <div className='uk-width-3-4@m'>
                                                    <p>	{this.state.ticket.warrantyserial_id[0].product_id[0].description}</p>
                                                </div>
                                                <div className='uk-width-1-4@m'>
                                                    <h5 className='uk-text-bold'>Warranty type</h5>
                                                </div>
                                                <div className='uk-width-3-4@m'>
                                                    <p>Original Manufacturer Warranty</p>
                                                </div>
                                                <div className='uk-width-1-4@m'>
                                                    <h5 className='uk-text-bold'>Warranty Status</h5>
                                                </div>
                                                <div className='uk-width-3-4@m'>
                                                    {warranty_status}
                                                </div>
                                                <div className='uk-width-1-4@m'>
                                                    <h5 className='uk-text-bold'>Start Date</h5>
                                                </div>
                                                <div className='uk-width-3-4@m'>
                                                    <p>{(new Date(this.state.ticket.warrantyserial_id[0].warranty_start_date).toDateString())}</p>
                                                </div>
                                                <div className='uk-width-1-4@m'>
                                                    <h5 className='uk-text-bold'>End Date</h5>
                                                </div>
                                                <div className='uk-width-3-4@m'>
                                                    <p>{(new Date(this.state.ticket.warrantyserial_id[0].warranty_end_date).toDateString())}</p>
                                                </div>
                                                <div className="uk-width-1-1@m">
                                                    <h4 className='uk-text-left uk-text-bold uk-margin-large uk-margin-medium-top'>Customer Information</h4>
                                                </div>
                                                <div className='uk-width-1-4@m'>
                                                    <h5 className='uk-text-bold'>Name</h5>
                                                </div>
                                                <div className='uk-width-3-4@m'>
                                                    <p>{this.state.ticket.customer_name}</p>
                                                </div>
                                                <div className='uk-width-1-4@m'>
                                                    <h5 className='uk-text-bold'>Email</h5>
                                                </div>
                                                <div className='uk-width-3-4@m'>
                                                    <p>{this.state.ticket.customer_email}</p>
                                                </div>
                                                <div className='uk-width-1-4@m'>
                                                    <h5 className='uk-text-bold'>Phone</h5>
                                                </div>
                                                <div className='uk-width-3-4@m'>
                                                    <p>{this.state.ticket.customer_phone}</p>
                                                </div>
                                                <div className='uk-width-1-4@m'>
                                                    <h5 className='uk-text-bold'>Address</h5>
                                                </div>
                                                <div className='uk-width-3-4@m'>
                                                    <p>{this.state.ticket.customer_address}</p>
                                                </div>
                                                <div className="uk-width-1-1@m">
                                                    <h4 className='uk-text-left uk-text-bold uk-margin-large uk-margin-medium-top'>TDPlus Information</h4>
                                                </div>
                                                <div className='uk-width-1-4@m'>
                                                    <h5 className='uk-text-bold'>Job Description</h5>
                                                </div>
                                                <div className='uk-width-3-4@m'>
                                                    <p>{this.state.ticket.job_description}</p>
                                                </div>
                                                <div className='uk-width-1-4@m'>
                                                    <h5 className='uk-text-bold'>Ticket Date</h5>
                                                </div>
                                                <div className='uk-width-3-4@m'>
                                                    <p>{(new Date(this.state.ticket.ticket_date).toDateString())}</p>
                                                </div>
                                                <div className='uk-width-1-4@m'>
                                                    <h5 className='uk-text-bold'>Engineer Responsible</h5>
                                                </div>
                                                <div className='uk-width-3-4@m'>
                                                    <p>{this.state.ticket.engineer_id[0].engineer_name}</p>
                                                </div>
                                                <div className='uk-width-1-4@m'>
                                                    <h5 className='uk-text-bold'>Engineer Email</h5>
                                                </div>
                                                <div className='uk-width-3-4@m'>
                                                    <p>{this.state.ticket.engineer_id[0].engineer_email}</p>
                                                </div>
                                                <div className='uk-width-1-4@m'>
                                                    <h5 className='uk-text-bold'>Engineer Phone</h5>
                                                </div>
                                                <div className='uk-width-3-4@m'>
                                                    <p>{this.state.ticket.engineer_id[0].engineer_phone}</p>
                                                </div>
                                                <div className='uk-width-1-4@m'>
                                                    <h5 className='uk-text-bold'>Location</h5>
                                                </div>
                                                <div className='uk-width-3-4@m'>
                                                    <p>{this.state.ticket.location_id[0].address}</p>
                                                </div>
                                                <div className='uk-width-1-4@m'>
                                                    <h5 className='uk-text-bold'>Department</h5>
                                                </div>
                                                <div className='uk-width-3-4@m'>
                                                    <p>{this.state.ticket.department_id[0].department_name}</p>
                                                </div>
                                                <div className='uk-width-1-4@m'>
                                                    <h5 className='uk-text-bold'>Comments</h5>
                                                </div>
                                                <div className='uk-width-3-4@m'>
                                                    <p>{this.state.ticket.comments}</p>
                                                </div>
                                                <div className='uk-width-1-1@m uk-margin-large-top'></div>


                                                <div className='uk-width-1-4@m '>
                                                    <a href='/' onClick={() => window.print()} className="uk-button uk-margin-right black_btn">Print Job Ticket</a>
                                                </div>
                                                <div className='uk-width-1-4@m'>
                                                    <a href={'/' + this.state.ticket._id} className="uk-button uk-margin-right slider_btn">Track Job Ticket</a>
                                                </div>
                                                <div className='uk-width-1-4@m'>
                                                    <a href={'/' + this.state.ticket._id} className="uk-button uk-margin-right blue_btn">Make Part Order</a>
                                                </div>
                                            </div>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            )
        }
        else {
            return (
                <section className="uk-grid-small uk-grid-match uk-text-left" data-uk-grid data-uk-height-viewport>
                    <div className='uk-width-auto'>
                        <SideNav />
                    </div>
                    <div className='uk-width-expand uk-padding-remove'>
                        <div className="uk-width-1-1">
                            <div className='uk-padding'>
                                <div data-uk-grid className='uk-grid-medium'>
                                    <div className='uk-width-auto'>
                                        <img src={plusbtn} width='80' alt='icon' />
                                    </div>
                                    <div className='uk-width-5-6'>
                                        <h4 className="uk-text-normal uk-margin-top uk-margin-remove-bottom">Create New Job Tickets </h4>
                                        <p className='uk-text-small uk-margin-remove'>Verify Online Warranty Status and Create Support Ticket </p>
                                    </div>
                                </div>
                                <hr className='uk-margin-medium' />
                                {this.renderForm()}
                            </div>
                        </div>
                    </div>
                </section>
            )
        }

    }
}
export default CreateJobTicketForm;