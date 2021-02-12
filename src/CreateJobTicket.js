import React from 'react';
import axios from 'axios'
import { API_URL } from './apiUrl'
import SideNav from './SideNav'
import plusbtn from './img/plusbtn.svg'
import loader from './img/loader.svg'
import activeWarranty from './img/active_warranty.svg'
import expiredWarranty from './img/expired_warranty.svg'
import noWarranty from './img/no_warranty.svg'


class SearchResult extends React.Component {
    render() {
        if (this.props.data.deviceActivatedContent) {
            var today = new Date();
            var status = ""
            var btn = ""
            if (new Date(this.props.data.deviceActivatedContent.warranty_end_date) >= today) {
                status = <h4 className='uk-text-left uk-text-bold '><img className='uk-margin-right' src={activeWarranty} alt='active warranty  ' />Warranty Status for Device: <span className='green'>Active</span></h4>
                btn = <div className='uk-width-1-1@m'>
                    <a href={'/create-job/' + this.props.data.deviceActivatedContent._id} className="uk-button uk-margin uk-margin-top green_btn">Proceed</a>
                </div>
            }
            else if (new Date(this.props.data.deviceActivatedContent.warranty_end_date) < today) {
                status = <h4 className='uk-text-left uk-text-bold '><img className='uk-margin-right' src={expiredWarranty} alt='expired warranty ' />Warranty Status for Device: <span className='amber'>Expired (Out of Warranty)</span></h4>
                btn = <div className='uk-width-1-1@m'>
                    <a href={'/create-job/' + this.props.data.deviceActivatedContent._id} className="uk-button uk-margin uk-margin-top orange_btn">Proceed</a>
                </div>
            }
        }
        return (
            <div className='uk-margin-top'>
                {status}
                {this.props.data.deviceNotFound && <h4 className='uk-text-left uk-text-bold red'><img className='uk-margin-right' src={noWarranty} alt='no warranty ' />Device Not Found!</h4>}
                {this.props.data.deviceActivatedContent &&
                    <div data-uk-grid className='uk-grid-small'>
                        <div className='uk-width-1-4@m'>
                            <h5 className='uk-text-bold'>Device Name</h5>
                        </div>
                        <div className='uk-width-3-4@m'>
                            <p>{this.props.data.deviceActivatedContent.product_id[0].item_detail + ' - ' + this.props.data.deviceActivatedContent.product_id[0].item_number}</p>
                        </div>
                        <div className='uk-width-1-4@m'>
                            <h5 className='uk-text-bold'>Device Model</h5>
                        </div>
                        <div className='uk-width-3-4@m'>
                            <p>{this.props.data.deviceActivatedContent.product_id[0].item_number}</p>
                        </div>
                        <div className='uk-width-1-4@m'>
                            <h5 className='uk-text-bold'>Serial Number</h5>
                        </div>
                        <div className='uk-width-3-4@m'>
                            <p>{this.props.data.deviceActivatedContent.serial}</p>
                        </div>
                        <div className='uk-width-1-4@m'>
                            <h5 className='uk-text-bold'>Device Information</h5>
                        </div>
                        <div className='uk-width-3-4@m'>
                            <p>	{this.props.data.deviceActivatedContent.product_id[0].description}</p>
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
                            <p>{(new Date(this.props.data.deviceActivatedContent.warranty_start_date).toDateString())}</p>
                        </div>
                        <div className='uk-width-1-4@m'>
                            <h5 className='uk-text-bold'>End Date</h5>
                        </div>
                        <div className='uk-width-3-4@m'>
                            <p>{(new Date(this.props.data.deviceActivatedContent.warranty_end_date).toDateString())}</p>
                        </div>
                        {btn}

                    </div>
                }
                {this.props.data.deviceActivatedContentw &&
                    <div data-uk-grid className='uk-grid-small'>

                        <div className='uk-width-1-4@m'>
                            <h5 className='uk-text-bold'>Serial Number</h5>
                        </div>
                        <div className='uk-width-3-4@m'>
                            <p>{this.props.data.deviceActivatedContent.serial}</p>
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
                            <p>{(new Date(this.props.data.deviceActivatedContent.warranty_start_date).toDateString())}</p>
                        </div>
                        <div className='uk-width-1-4@m'>
                            <h5 className='uk-text-bold'>End Date</h5>
                        </div>
                        <div className='uk-width-3-4@m'>
                            <p>{(new Date(this.props.data.deviceActivatedContent.warranty_end_date).toDateString())}</p>
                        </div>
                        {btn}
                    </div>
                }
                {this.props.data.deviceNotFound &&
                    <div data-uk-grid className='uk-grid-small'>
                        <div className='uk-width-2-3@m'>
                            <div data-uk-grid className='uk-grid-small'>
                                <div className='uk-width-1-4@m'>
                                    <h5 className='uk-text-bold'>Serial Number</h5>
                                </div>
                                <div className='uk-width-3-4@m'>
                                    <p>{this.props.data.serial}</p>
                                </div>
                            </div>
                            <div className='red_card uk-card-body uk-margin-top'>
                                <p>
                                    The Product Serial : <span className='uk-text-bold'>{this.props.data.serial}</span> Cannot be found in the system.<br /><br />
                                    Kindly Proceed with creating a [No Serial] Job ticket with the Button Below
                                </p>
                            </div>
                        </div>
                        <div className='uk-width-1-3'></div>
                        <div className='uk-width-1-1@m'>
                            <a href='/activate-warranty' className="uk-button uk-margin uk-margin-top slider_btn">Create Job Ticket [No Serial]</a>
                        </div>

                    </div>
                }
                <hr />

                <a href='/dashboard' className="uk-button uk-margin slider_btn">Back to Dashboard</a>
            </div>
        )
    }
}


class CreateJobTicket extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            serial: '',
            showResult: false,
            isProcessing: false,
            deviceNotFound: false,
            deviceActivated: true,

        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.checkWarranty = this.checkWarranty.bind(this);

    }
    handleInputChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    checkWarranty = (e) => {
        e.preventDefault();

        const payload = {
            serial: this.state.serial
        }
        this.setState({
            isProcessing: true,
            deviceActivated: false,
            deviceActivatedContent: '',
            deviceNotFound: false
        });

        axios.post(API_URL + '/api/checkwarrantyserial', payload)
            .then((response) => {
                this.setState({
                    isProcessing: false
                })
                if (response.status === 204 && response.data === '') {
                    this.setState({
                        deviceNotFound: true,
                        showResult: true
                    })
                }
                if (response.status === 200 && response.data[0].status === 1) {
                    this.setState({
                        deviceActivated: true,
                        showResult: true,
                        deviceActivatedContent: response.data[0]
                    })
                }
                if (response.status === 200 && response.data[0].status === 0) {
                    this.props.history.push('/create-job-offline')
                }
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
                                        <img src={plusbtn} width='80' alt='icon' />
                                    </div>
                                    <div className='uk-width-5-6'>
                                        <h4 className="uk-text-normal uk-margin-top uk-margin-remove-bottom">Create New Job Ticket </h4>
                                        <p className='uk-text-small uk-margin-remove'>Verify Online Warranty Status and Create Support Ticket </p>
                                    </div>
                                </div>
                                <hr className='uk-margin-medium' />
                                <div className="uk-background-muted uk-padding">
                                    <div className="uk-margin">
                                        <h4 className='uk-text-bold'>Warranty Check</h4>
                                        <form method='POST' data-uk-grid onSubmit={this.checkWarranty} >
                                            <div className="uk-width-1-2@m">
                                                <label className="uk-form-label uk-text-bold ">Serial Number <span className='red'>*</span></label>
                                                <input className="uk-input calc_input uk-margin-small-top" type="text" name='serial' placeholder="Serial Number" onChange={this.handleInputChange} required />
                                            </div>

                                            <div className="uk-margin-top uk-width-auto">
                                                {!this.state.isProcessing && <button type='submit' className="uk-button uk-margin-right slider_btn">Check Warranty</button>}
                                                {this.state.isProcessing && <h4 className="uk-form-label uk-text-bold "><img className='uk-margin-right' src={loader} width='40' alt='loader' /> Checking for Serial...</h4>}
                                            </div>
                                        </form>
                                    </div>
                                </div>
                                {this.state.showResult && <SearchResult data={this.state} />}
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        )
    }
    // }
}
export default CreateJobTicket;
