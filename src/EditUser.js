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
            name: '',
            email: '',
            user_type: '',
            phone:''
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.users !== this.props.users) {
            this.setState({
                name: this.props.users.name,
                email: this.props.users.email,
                user_type: this.props.users.user_type,
                phone: this.props.users.phone,
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
            name: this.state.name,
            email: this.state.email,
            user_type: this.state.user_type
        }
        axios.put(API_URL + '/api/tdupdateuser/' + userID, payload)
            .then(function (response) {
                if (response.status === 200 && response.data !== '') {
                    comp.setState({
                        isProcessing: false,
                    }, function () {
                        alert('TDPlus Admin User Updated')
                        window.location = '/manage-user'
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
                    <input className="uk-input calc_input uk-margin-small-top" value={this.state.name} type="text" name='name' placeholder="Admin Name" onChange={this.handleInputChange} />
                </div>
                <div className="uk-margin">
                    <label className="uk-form-label uk-text-bold ">Email <span className='red'>*</span></label>
                    <input className="uk-input calc_input uk-margin-small-top" value={this.state.email} type="text" name='email' placeholder="Email Address" onChange={this.handleInputChange} />
                </div>
                <div className="uk-margin">
                    <label className="uk-form-label uk-text-bold ">Phone <span className='red'>*</span></label>
                    <input className="uk-input calc_input uk-margin-small-top" value={this.state.phone} type="text" name='phone' placeholder="Email Address" onChange={this.handleInputChange} />
                </div>
                <div className="uk-margin">

                    <label className="uk-form-label uk-text-bold ">User Type <span className='red'>* | Current Role:{this.state.user_type === 1 ? <span>Super Administrator</span> : <span>Admin User</span>} </span></label>
                    <select className="uk-select calc_input uk-margin-small-top" name='user_type' onChange={this.handleInputChange}>
                        <option value='' defaultValue >Select a Type</option>
                        <option value='1'>Super Administrator</option>
                        <option value='2'>Admin User</option>
                    </select>
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
            users: [],
            user: []
        }
    }

    componentDidMount() {
        this.checkcookie()
        this.getUsers()
    }
    checkcookie = () => {
        if (cookies.get('current_session') === "" || cookies.get('current_session') === undefined) {
            this.props.history.push('/')
        }
        if (cookies.get('user_type') === '2') {
            this.props.history.push('/dashboard')
        }
    }
    getUsers = () => {
        axios.get(API_URL + '/api/tdgetuser/' + userID)
            .then((response) => {
                this.setState({
                    users: response.data,
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
                                        <h4 className='uk-text-left uk-margin'>Currently Editing User: <span className='red'>{this.state.users.name}</span></h4>
                                        <EditUserForm users={this.state.users} />
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

