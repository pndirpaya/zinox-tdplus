import React from 'react';
import Select from 'react-select';
import axios from 'axios'
import { API_URL } from './apiUrl'
import SideNav from './SideNav'
import jobbtn from './img/jobbtn.svg'
import loader from './img/loader.svg'
import activeWarranty from './img/active_warranty.svg'





class CreateOfflineJobTicketForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            engineers: [],
            departments: [],
            locations: [],
            device_name: '',
            device_model: '',
            serial: '',
            warranty_status: '',
            device_information: '',
            proof_purchase: [],
            customer_name: '',
            customer_phone: '',
            customer_email: '',
            ticket_date: '',
            customer_address: '',
            job_description: '',
            department_id: '',
            comments: '',
            engineer_id: '',
            location_id: '',
            isProcessing: false,
            showResult: false,
            ticket: []
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }
    componentDidMount() {
        this.getEngineers()
        this.getDepartments()
        this.getLocations()
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
        switch (event.target.name) {
            case 'proof_purchase':
                this.setState({ proof_purchase: event.target.files[0] }, function () {
                });
                break;
            default:
                this.setState({ [event.target.name]: event.target.value });
        }
    }
    handleSubmit(event) {
        event.preventDefault();
        this.setState({
            isProcessing: true,
        });
        let formData = new FormData();
        formData.append('device_name', this.state.device_name);
        formData.append('device_model', this.state.device_model);
        formData.append('serial', this.state.serial);
        formData.append('device_information', this.state.device_information);
        formData.append('proof_purchase', this.state.proof_purchase);
        formData.append('engineer_id', this.state.engineer_id);
        formData.append('location_id', this.state.location_id);
        formData.append('job_tag', 'TD' + (new Date()).getTime());
        formData.append('customer_name', this.state.customer_name);
        formData.append('customer_phone', this.state.customer_phone);
        formData.append('customer_email', this.state.customer_email);
        formData.append('ticket_date', this.state.ticket_date);
        formData.append('customer_address', this.state.customer_address);
        formData.append('job_description', this.state.job_description);
        formData.append('department_id', this.state.department_id);
        formData.append('comments', this.state.comments);
        formData.append('status', 1);
        formData.append('warranty_status', this.state.warranty_status);

        axios.post(API_URL + '/api/tdofflinejobticket/', formData)
            .then((response) => {
                if (response.status === 201 && response.data !== '') {
                    this.setState({
                        isProcessing: false,
                        ticket: response.data,
                        showResult: true
                    })
                }
            })
            .catch(error => {
                if (error.response) {
                    console.error('err resp', error.response)
                }
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
        return (

            <div className='uk-section-muted'>
                <div className='uk-padding'>
                    <form encType="multipart/form-data" method='POST' onSubmit={this.handleSubmit} data-uk-grid  >
                        <div className="uk-width-1-1@m">
                            <h4 className='uk-text-left uk-text-bold '>Device Information</h4>
                        </div>
                        <div className="uk-width-1-2@m">
                            <label className="uk-form-label uk-text-bold ">Device Name <span className='red'>*</span></label>
                            <input className="uk-input calc_input uk-margin-small-top" type="text" name='device_name' placeholder="Enter Device Name" onChange={this.handleInputChange} required />
                        </div>
                        <div className="uk-width-1-2@m">
                            <label className="uk-form-label uk-text-bold ">Device Model <span className='red'>*</span></label>
                            <input className="uk-input calc_input uk-margin-small-top" type="text" name='device_model' placeholder="Enter Device Model" onChange={this.handleInputChange} required />
                        </div>
                        <div className="uk-width-1-2@m">
                            <label className="uk-form-label uk-text-bold ">Serial Number <span className='red'>*</span></label>
                            <input className="uk-input calc_input uk-margin-small-top" type="text" name='serial' placeholder="Enter Serial Number" onChange={this.handleInputChange} required />
                        </div>
                        <div className="uk-width-1-2@m">
                            <label className="uk-form-label uk-text-bold ">Device Warranty Status  <span className='red'>*</span></label>
                            <select className="uk-input calc_input uk-margin-small-top" name='warranty_status' onChange={this.handleInputChange} required >
                                <option value=''>Select Warranty Status</option>
                                <option value='1'>Active Warranty</option>
                                <option value='2'>Expired (Out of Warranty)</option>
                            </select>
                        </div>
                        <div className="uk-width-1-1@m">
                            <label className="uk-form-label uk-text-bold ">Device Information <span className='red'>*</span></label>
                            <textarea className="uk-textarea calc_input" rows="8" name='device_information' placeholder="Enter Device Information" onChange={this.handleInputChange} required></textarea>
                        </div>
                        <div className="uk-width-1-2@m">
                            <label className="uk-form-label uk-text-bold ">Upload Proof of Purchase <span className='red'>*</span></label>
                            <div data-uk-form-custom="target: true">
                                <input type="file" onChange={this.handleInputChange} name='proof_purchase' />
                                <input className="uk-input calc_input uk-form-width-large input" type="text" placeholder="Select file" disabled />
                            </div>
                        </div>
                        <div className="uk-width-1-1@m"> <hr /></div>
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
                                        <img src={jobbtn} width='80' alt='icon' />
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
                                                    <p>{this.state.ticket.device_name}</p>
                                                </div>
                                                <div className='uk-width-1-4@m'>
                                                    <h5 className='uk-text-bold'>Device Model</h5>
                                                </div>
                                                <div className='uk-width-3-4@m'>
                                                    <p>{this.state.ticket.device_model}</p>
                                                </div>
                                                <div className='uk-width-1-4@m'>
                                                    <h5 className='uk-text-bold'>Serial Number</h5>
                                                </div>
                                                <div className='uk-width-3-4@m'>
                                                    <p>{this.state.ticket.serial}</p>
                                                </div>
                                                <div className='uk-width-1-4@m'>
                                                    <h5 className='uk-text-bold'>Device Information</h5>
                                                </div>
                                                <div className='uk-width-3-4@m'>
                                                    <p>	{this.state.ticket.device_information}</p>
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
                                                    <h5 className='uk-text-bold'>Proof of Purchase</h5>
                                                </div>
                                                <div className='uk-width-3-4@m'>
                                                    <p>{this.state.ticket.proof_purchase}</p> <a target="blank_" href={API_URL+'/uploads/' + this.state.ticket.proof_purchase}>View</a>
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
                                                    <a href={'/tracker-offline/' + this.state.ticket._id} className="uk-button uk-margin-right slider_btn">Track Job Ticket</a>
                                                </div>
                                                <div className='uk-width-1-4@m'>
                                                    <a href={'/part-order-offline/' + this.state.ticket._id} className="uk-button uk-margin-right blue_btn">Make Part Order</a>
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
                                        <img src={jobbtn} width='80' alt='icon' />
                                    </div>
                                    <div className='uk-width-5-6'>
                                        <h4 className="uk-text-normal uk-margin-top uk-margin-remove-bottom">Create Job Ticket [ No Serial ]</h4>
                                        <p className='uk-text-small uk-margin-remove'>Create a new Job Ticket and Upload Proof of Payment</p>
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

export default CreateOfflineJobTicketForm;