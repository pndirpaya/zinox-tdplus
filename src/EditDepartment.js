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
            department_name: '',
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.dept !== this.props.dept) {
            this.setState({
                department_name: this.props.dept.department_name,
                status: this.props.dept.status,
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
            department_name: this.state.department_name,
            status: this.state.status
        }
        axios.put(API_URL + '/api/tddepartment/' + userID, payload)
            .then(function (response) {
                if (response.status === 200 && response.data !== '') {
                    comp.setState({
                        isProcessing: false,
                    }, function () {
                        alert('TDPlus Department Updated')
                        window.location = '/manage-department'
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
                    <label className="uk-form-label uk-text-bold ">Department Name <span className='red'>*</span></label>
                    <input className="uk-input calc_input uk-margin-small-top" value={this.state.department_name} type="text" name='department_name' placeholder="Department Name" onChange={this.handleInputChange} />
                </div>
                
                <div className="uk-margin-large-top">
                    {!this.state.isProcessing && <button type='submit' className="uk-button uk-margin-right uk-width-2-3@m slider_btn">Update Department</button>}
                    {this.state.isProcessing && <h4 className="uk-form-label uk-text-bold "><img className='uk-margin-right' src={loader} width='40' alt='loader' /> Updating Department ...</h4>}
                </div>
            </form>
        )
    }
}


export default class EditUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dept: [],
        }
    }

    componentDidMount() {
        this.checkcookie()
        this.getdept()
    }
    checkcookie = () => {
        if (cookies.get('current_session') === "" || cookies.get('current_session') === undefined) {
            this.props.history.push('/')
        }
        if (cookies.get('user_type') === '2') {
            this.props.history.push('/dashboard')
        }
    }
    getdept = () => {
        axios.get(API_URL + '/api/tddepartment/' + userID)
            .then((response) => {
                this.setState({
                    dept: response.data,
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
                                        <h4 className='uk-text-left uk-margin'>Currently Editing Department: <span className='red'>{this.state.dept.department_name}</span></h4>
                                        <EditUserForm dept={this.state.dept} />
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

