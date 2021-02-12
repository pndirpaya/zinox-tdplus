import React, { Component } from 'react';
import axios from 'axios'
import { API_URL } from './apiUrl'
import SideNav from './SideNav'
import manageUser from './img/user.svg'
import Cookies from 'universal-cookie';
import loader from './img/loader.svg'
let userID = (window.location.href).split('/').pop();


const cookies = new Cookies();

class EditUserForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            engineer_name: '',
            engineer_phone: '',
            engineer_email:''
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.engr !== this.props.engr) {
            this.setState({
                engineer_name: this.props.engr.engineer_name,
                engineer_phone: this.props.engr.engineer_phone,
                engineer_email: this.props.engr.engineer_email,
            })
        }
    }

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
            engineer_name: this.state.engineer_name,
            engineer_phone: this.state.engineer_phone,
            engineer_email: this.state.engineer_email
        }
        axios.put(API_URL + '/api/tdengineer/' + userID, payload)
            .then(function (response) {
                if (response.status === 200 && response.data !== '') {
                    comp.setState({
                        isProcessing: false,
                    }, function () {
                        alert('TDPlus Engineer Updated')
                        window.location = '/manage-engineer'
                    })
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    render() {
        return (
            <form method='POST' onSubmit={this.handleSubmit} >
                <div className="uk-margin">
                    <label className="uk-form-label uk-text-bold ">Name <span className='red'>*</span></label>
                    <input className="uk-input calc_input uk-margin-small-top" value={this.state.engineer_name} type="text" name='engineer_name' placeholder="Admin Name" onChange={this.handleInputChange} />
                </div>
                <div className="uk-margin">
                    <label className="uk-form-label uk-text-bold ">Email <span className='red'>*</span></label>
                    <input className="uk-input calc_input uk-margin-small-top" value={this.state.engineer_email} type="text" name='engineer_email' placeholder="Email Address" onChange={this.handleInputChange} />
                </div>
                <div className="uk-margin">
                    <label className="uk-form-label uk-text-bold ">Phone <span className='red'>*</span></label>
                    <input className="uk-input calc_input uk-margin-small-top" value={this.state.engineer_phone} type="text" name='engineer_phone' placeholder="Email Address" onChange={this.handleInputChange} />
                </div>
                <div className="uk-margin-large-top">
                    {!this.state.isProcessing && <button type='submit' className="uk-button uk-margin-right uk-width-2-3@m slider_btn">Update User</button>}
                    {this.state.isProcessing && <h4 className="uk-form-label uk-text-bold "><img className='uk-margin-right' src={loader} width='40' alt='loader' /> Update New Admin User</h4>}
                </div>
            </form>
        )
    }
}


export default class EditUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            engr: [],
        }
    }

    componentDidMount() {
        this.checkcookie()
        this.getEngineer()
    }
    checkcookie = () => {
        if (cookies.get('current_session') === "" || cookies.get('current_session') === undefined) {
            this.props.history.push('/')
        }
        if (cookies.get('user_type') === '2') {
            this.props.history.push('/dashboard')
        }
    }
    getEngineer = () => {
        axios.get(API_URL + '/api/tdengineer/' + userID)
            .then((response) => {
                this.setState({
                    engr: response.data,
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
            <section className="uk-grid-small uk-grid-match uk-text-left" data-uk-grid data-uk-height-viewport>
                <div className='uk-width-auto'>
                    <SideNav />
                </div>
                <div className='uk-width-expand uk-padding-remove'>
                    <div className="uk-width-1-1">
                        <div className='uk-padding'>
                            <div data-uk-grid className=''>
                                <div className='uk-width-auto '>
                                    <img src={manageUser} width='80' alt='icon' />
                                </div>
                                <div className='uk-width-expand uk-margin-small-top'>
                                    <h3 className='uk-text-left uk-margin-remove'>Manage Users</h3>
                                    <p className='uk-text-small uk-width-medium uk-margin-remove'>Manage TDPlus Administrator Users</p>
                                </div>
                            </div>
                            <hr />
                            <div className="uk-text-left" data-uk-grid>
                                <div className="uk-width-2-5@m">
                                    <div className="uk-background-muted uk-padding">
                                        <h4 className='uk-text-left uk-margin'>Currently Editing Engineer: <span className='red'>{this.state.engr.engineer_name}</span></h4>
                                        <EditUserForm engr={this.state.engr} />
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

