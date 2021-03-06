import React from 'react';
import axios from 'axios'
import { API_URL } from './apiUrl'
import SideNav from './SideNav'
import searchbtn from './img/searchbtn.svg'
import activeWarranty from './img/active_warranty.svg'
import expiredWarranty from './img/expired_warranty.svg'
import openDot from './img/open_dot.svg'
import pendingDot from './img/pending_dot.svg'
import onholdDot from './img/onhold_dot.svg'
import closedDot from './img/closed_dot.svg'
var _id = (window.location.href).split('/').pop();


class UpdateRow extends React.Component {
    render() {
        var stage_img = ''
        switch (this.props.update.stage) {
            case 1:
                stage_img = <img alt='' src={openDot} />
                break;
            case 2:
            case 4:
            case 5:
                stage_img = <img alt='' src={pendingDot} />
                break;
            case 3:
                stage_img = <img alt='' src={onholdDot} />
                break;
            default:
                stage_img = <img alt='' src={closedDot} />
        }
        return (
            <div className='uk-width-1-1@m'>
                <div data-uk-grid>
                    <div className='uk-width-auto@m'>
                        {stage_img}
                    </div>
                    <div className='uk-width-3-5@m'>
                        <h3 className='uk-text-bold'>{this.props.update.title}</h3>
                        <p>{this.props.update.description}</p>
                    </div>
                    <div className='uk-width-1-5@m'>
                        <p>{(new Date(this.props.update.create_date).toDateString())}</p>
                    </div>
                </div>
            </div>
        )

    }
}
class Tracker extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ticket: [],
            updates: [],
            isProcessing: false,
            title: '',
            description: '',
            stage: ''
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentDidMount() {
        this.getTicket()
        this.getUpdates()
    }
    getTicket = () => {
        axios.get(API_URL + '/api/tdofflinejobticketid/' + _id)
            .then((response) => {
                this.setState({
                    ticket: response.data[0],
                })
            })
            .catch(error => {
                if (error.response) {
                    console.log(error)
                }
            });
    }

    getUpdates = () => {
        axios.get(API_URL + '/api/tdupdates/' + _id)
            .then((response) => {
                this.setState({
                    updates: response.data,
                })
            })
            .catch(error => {
                if (error.response) {
                    console.log(error)
                }
            });
    }
    handleInputChange(event) { //stores input values in states
        this.setState({ [event.target.name]: event.target.value });
    }
    handleSubmit(event) {
        event.preventDefault();
        const payload = {
            ticket_id: _id,
            title: this.state.title,
            description: this.state.description,
            stage: this.state.stage
        }
        this.setState({
            isProcessing: true,
        });
        axios.post(API_URL + '/api/tdupdates/', payload)
            .then((response) => {
                if (response.status === 201 && response.data !== '') {
                    this.setState({
                        isProcessing: false,
                    })
                    alert('Ticket Updated')
                    this.props.history.push('/tracker/' + _id)
                }
            })
            .catch(error => {
                if (error.response) {
                    console.log(error)
                }
            });
    }
    render() {
        var status = ''
        if (this.state.ticket.warranty_status === 1) {
            status = <h4 className='uk-text-left uk-text-bold '><img className='uk-margin-right' src={activeWarranty} alt='active warranty  ' />Warranty Status for Device: <span className='green'>Active</span></h4>
        }
        else if (this.state.ticket.warranty_status === 2) {
            status = <h4 className='uk-text-left uk-text-bold '><img className='uk-margin-right' src={expiredWarranty} alt='active warranty  ' />Warranty Status for Device: <span className='amber'>Expired</span></h4>
        }
        var job_status = ''
        switch (this.state.ticket.status) {
            case 1:
                job_status = <span className='green'>Open</span>
                break;
            case 2:
                job_status = <span className='blue'>Pending</span>
                break;
            case 3:
                job_status = <span className='black'>On-Hold</span>
                break;
            case 4:
                job_status = <span className='blue'>Parts-Awaiting</span>
                break;
            case 5:
                job_status = <span className='blue'>Parts-Recieved</span>
                break;
            default:
                job_status = <span className='red'>Closed</span>
        }
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
                                        <h4 className="uk-text-normal uk-margin-top uk-margin-remove-bottom">Tack Job Ticket</h4>
                                        <p className='uk-text-small uk-margin-remove'>Track Job Ticket Progress</p>
                                    </div>

                                </div>
                                <hr className='uk-margin-medium' />
                                <div className="uk-background-muted uk-padding">
                                    <div className="uk-margin">
                                    {this.state.ticket.department_id &&
                                            <div data-uk-grid>
                                                <div className='uk-width-1-2@m'>
                                                    <h4 className='uk-text-bold'>Job Status: {job_status}</h4>
                                                </div>
                                                <div className='uk-width-1-2@m'>
                                                    {status}
                                                </div>
                                                <div className='uk-width-1-2@m'>
                                                    <div className='uk-width-1-4@m'>
                                                        <h5 className='uk-text-bold uk-margin-remove'>Device Name :</h5>
                                                    </div>
                                                    <div className='uk-width-1-1@m '>
                                                        <p>{this.state.ticket.device_name}</p>
                                                    </div>
                                                    <div className='uk-width-1-4@m'>
                                                        <h5 className='uk-text-bold uk-margin-remove'>Device Model</h5>
                                                    </div>
                                                    <div className='uk-width-1-1@m uk-margin-remove'>
                                                        <p>{this.state.ticket.device_model}</p>
                                                    </div>
                                                    <div className='uk-width-1-4@m'>
                                                        <h5 className='uk-text-bold uk-margin-remove'>Serial Number</h5>
                                                    </div>
                                                    <div className='uk-width-1-1@m uk-margin-remove'>
                                                        <p>{this.state.ticket.serial}</p>
                                                    </div>
                                                    <div className='uk-width-1-4@m'>
                                                        <h5 className='uk-text-bold uk-margin-remove'>Device Information</h5>
                                                    </div>
                                                    <div className='uk-width-1-1@m'>
                                                        <p>{this.state.ticket.device_information}</p>
                                                    </div>
                                                    <div className='uk-width-1-4@m'>
                                                        <h5 className='uk-text-bold uk-margin-remove'>Engineer</h5>
                                                    </div>
                                                    <div className='uk-width-1-1@m'>
                                                        <p>{this.state.ticket.engineer_id[0].engineer_name}</p>
                                                    </div>
                                                    <div className='uk-width-1-4@m'>
                                                        <h5 className='uk-text-bold uk-margin-remove'>Location</h5>
                                                    </div>
                                                    <div className='uk-width-1-1@m'>
                                                        <p>{this.state.ticket.location_id[0].address}</p>
                                                    </div>

                                                </div>
                                                <div className='uk-width-1-2@m'>

                                                    <div className='uk-width-1-4@m'>
                                                        <h5 className='uk-text-bold uk-margin-remove'>Warranty type</h5>
                                                    </div>
                                                    <div className='uk-width-1-1@m'>
                                                        <p>Original Manufacturer Warranty</p>
                                                    </div>
                                                    <div className='uk-width-1-4@m '>
                                                        <h5 className='uk-text-bold uk-margin-remove'>Customer Name</h5>
                                                    </div>
                                                    <div className='uk-width-1-1@m'>
                                                        <p>{this.state.ticket.customer_name}</p>
                                                    </div>
                                                    <div className='uk-width-1-4@m '>
                                                        <h5 className='uk-text-bold uk-margin-remove'>Customer Email / Phone Number</h5>
                                                    </div>
                                                    <div className='uk-width-1-1@m'>
                                                        <p>{this.state.ticket.customer_email} / {this.state.ticket.customer_phone}</p>
                                                    </div>
                                                    <div className='uk-width-1-4@m '>
                                                        <h5 className='uk-text-bold uk-margin-remove'>Customer Address</h5>
                                                    </div>
                                                    <div className='uk-width-1-1@m'>
                                                        <p>{this.state.ticket.customer_address}</p>
                                                    </div>
                                                    <div className='uk-width-1-4@m'>
                                                        <h5 className='uk-text-bold uk-margin-remove'>Department</h5>
                                                    </div>
                                                    <div className='uk-width-1-1@m'>
                                                        <p>{this.state.ticket.department_id[0].department_name}</p>
                                                    </div>
                                                    <div className='uk-width-1-4@m'>
                                                        <h5 className='uk-text-bold uk-margin-remove'>Proof of Purchase</h5>
                                                    </div>
                                                    <div className='uk-width-3-4@m'>
                                                        <p>{this.state.ticket.proof_purchase} <a target="blank_" href={API_URL + '/uploads/' + this.state.ticket.proof_purchase}>View</a></p>
                                                    </div>
                                                </div>
                                                <div className='uk-width-1-1@m uk-margin-remove'>
                                                    <div className='uk-width-1-4@m'>
                                                        <h5 className='uk-text-bold uk-margin-remove'>Job Description</h5>
                                                    </div>
                                                    <div className='uk-width-1-1@m'>
                                                        <p>{this.state.ticket.job_description}</p>

                                                    </div>
                                                </div>
                                            </div>
                                        }
                                        <div>
                                        </div>
                                    </div>
                                </div>
                                <hr className='uk-margin-medium' />
                                <div className='uk-width-1-1@m uk-margin-large'>
                                    <h3 className='uk-text-bold tag'><span>Job Tag: {this.state.ticket.job_tag}</span></h3>
                                    {this.state.ticket.status !== 6 && <a href={'/update-offline/' + this.state.ticket._id}  className="uk-button uk-margin-right orange_btn">Update Job ticket</a>}
                                    {this.state.ticket.status !== 6 && <a  href={'/part-order-offline/' + this.state.ticket._id} className="uk-button uk-margin-right blue_btn">Make Part Order</a>}

                                </div>
                                <div data-uk-grid>
                                    <div className='uk-width-1-1@m'>
                                    <p>Track the progress on Job {this.state.ticket.job_tag}</p>
                                        <div data-uk-grid>
                                            <div className='uk-width-auto@m'>
                                                <img alt='' src={openDot} />
                                            </div>
                                            <div className='uk-width-3-5@m'>
                                                <h3 className='uk-text-bold'>Device Recieved at TDPlus Service Center</h3>
                                                {this.state.ticket.location_id && <p>{this.state.ticket.device_name} received at the service center</p>}
                                                {this.state.ticket.location_id && <p>{this.state.ticket.location_id[0].address} </p>}
                                            </div>
                                            <div className='uk-width-1-5@m'>
                                                {this.state.ticket.location_id && <p>{(new Date(this.state.ticket.ticket_date).toDateString())}</p>}
                                            </div>
                                        </div>
                                    </div>
                                    {
                                        this.state.updates.map(update =>
                                            <UpdateRow key={update._id}
                                                index={update._id}
                                                update={update} />
                                        )
                                    }
                                </div>
                          
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        )
    }

}

export default Tracker
