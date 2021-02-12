import React from 'react';
import axios from 'axios'
import { API_URL } from './apiUrl'
import SideNav from './SideNav'
import manageUser from './img/user.svg'
import Cookies from 'universal-cookie';
import loader from './img/loader.svg'

const cookies = new Cookies();

class TableRow extends React.Component {
    render() {
        console.log(this.props.user)

        let adminStats;
        if (this.props.user.status === 0) {
            adminStats = <td className='black'>Not Activated</td>;
        }
        else if (this.props.user.status === 1) {
            adminStats = <td className='green'>Active</td>
        }
        else {
            adminStats = <td className='red'>Inactive</td>
        }
        return (
            <tr>
                <td>{this.props.user.name}</td>
                <td>{this.props.user.email}</td>
                {this.props.user.user_type === 1 ? <td>Super Administrator</td> : <td>Admin User</td>}
                {adminStats}
                <td>{(new Date(this.props.user.create_date)).toDateString()}</td>
                <td><a href={'/edit-user/' + this.props.user._id} className="uk-button uk-button-small small_slider_btn">Manage</a></td>
            </tr>
        )
    }
}



class AddUser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            password: '',
            status: 0,
            user_type: '',
            phone: '',
            users: [],
            user: []
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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
        axios.get(API_URL + '/api/tdgetuser/')
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
            password: this.state.password,
            phone: this.state.phone,
            status: this.state.status,
            user_type: this.state.user_type
        }
        axios.post(API_URL + '/api/tdcreateuser/', payload)
            .then(function (response) {
                if (response.status === 201 && response.data !== '') {
                    comp.setState({
                        isProcessing: false,
                        showResult: true
                    }, function () {
                        alert('New TDPlus Admin User Created!')
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
            <section className="uk-grid-small uk-grid-match uk-text-left" data-uk-grid data-uk-height-viewport>
                <div className='uk-width-auto'>
                    <SideNav />
                </div>
                <div className='uk-width-expand uk-padding-remove'>
                    <div className="uk-width-1-1">
                        <div className='uk-padding'>
                            <div data-uk-grid className='uk-grid-medium'>
                                <div className='uk-width-auto'>
                                    <img src={manageUser} width='80' alt='icon' />
                                </div>
                                <div className='uk-width-5-6'>
                                    <h3 className='uk-text-left uk-margin-remove'>Manage Users</h3>
                                        <p className='uk-text-small uk-width-medium uk-margin-remove'>Manage TDplus Administrator Users</p>
                                </div>

                            </div>
                            <hr className='uk-margin-medium' />
                            <div className="uk-text-left" data-uk-grid>
                                <div className="uk-width-2-5@m">
                                    <div className="uk-background-muted uk-padding">
                                        <form method='POST' onSubmit={this.handleSubmit} >
                                            <div className="uk-margin">
                                                <label className="uk-form-label uk-text-bold ">Name <span className='red'>*</span></label>
                                                <input className="uk-input calc_input uk-margin-small-top" type="text" name='name' placeholder="Admin Name" onChange={this.handleInputChange} />
                                            </div>
                                            <div className="uk-margin">
                                                <label className="uk-form-label uk-text-bold ">Email <span className='red'>*</span></label>
                                                <input className="uk-input calc_input uk-margin-small-top" type="text" name='email' placeholder="Email Address" onChange={this.handleInputChange} />
                                            </div>
                                            <div className="uk-margin">
                                                <label className="uk-form-label uk-text-bold ">Phone <span className='red'>*</span></label>
                                                <input className="uk-input calc_input uk-margin-small-top" type="tel" name='phone' placeholder="Phone Number" onChange={this.handleInputChange} />
                                            </div>
                                            <div className="uk-margin">
                                                <label className="uk-form-label uk-text-bold ">Temporary Password  <span className='red'>*</span></label>
                                                <input className="uk-input calc_input uk-margin-small-top" type="password" name='password' placeholder="**********" onChange={this.handleInputChange} />
                                            </div>

                                            <div className="uk-margin">
                                                <label className="uk-form-label uk-text-bold ">User Type <span className='red'>*</span></label>
                                                <select className="uk-select calc_input uk-margin-small-top" name='user_type' onChange={this.handleInputChange}>
                                                    <option value='' defaultValue >Select a Type</option>
                                                    <option value='1'>Super Administrator</option>
                                                    <option value='2'>Admin User</option>
                                                </select>
                                            </div>
                                            <div className="uk-margin-large-top">
                                                {!this.state.isProcessing && <button type='submit' className="uk-button uk-margin-right uk-width-2-3@m slider_btn">Add User</button>}
                                                {this.state.isProcessing && <h4 className="uk-form-label uk-text-bold "><img className='uk-margin-right' src={loader} width='40' alt='loader' /> Adding New Admin User</h4>}
                                            </div>
                                        </form>
                                    </div>
                                </div>
                                <div className="uk-width-3-5@m">
                                    <div className="uk-card uk-card-default uk-card-body">
                                        <div className='uk-margin'>
                                            <div className="uk-overflow-auto">
                                                <h3 className='uk-text-left uk-margin'>User Details</h3>

                                                <p className='uk-text-left uk-text-meta uk-margin-remove'>Showing {(this.state.users).length} TDPlus Admin Users</p>
                                                <table className="uk-table uk-table-striped">
                                                    <thead>
                                                        <tr>
                                                            <th className='uk-text-bold red'>Name</th>
                                                            <th className='uk-text-bold red'>Email</th>
                                                            <th className='uk-text-bold red'>Admin Type</th>
                                                            <th className='uk-text-bold red'>Status</th>
                                                            <th className='uk-text-bold red'>Date Created</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {
                                                            this.state.users.map(user =>
                                                                <TableRow key={user._id}
                                                                    index={user._id}
                                                                    user={user} />
                                                            )
                                                        }
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
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

export default AddUser;
