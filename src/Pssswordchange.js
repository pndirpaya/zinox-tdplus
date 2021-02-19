import React from 'react';
import axios from 'axios'
import Cookies from 'universal-cookie';
import { API_URL } from './apiUrl'
import logo from './img/tdlogo.svg'
import loader from './img/loader.svg'
const cookies = new Cookies();



class PasswordChange extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            password: '',
            confirmpassword: '',
            isProcessing: false,
            passwordnomatch: false
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }
    componentDidMount() {
        this.checkcookie()
    }
    checkcookie = () => {
        if (cookies.get('current_session') === "" || cookies.get('current_session') === undefined) {
            this.props.history.push('/')
        }
    }
    handleInputChange(event) { //stores input values in states
        this.setState({ [event.target.name]: event.target.value });
    }
    handleSubmit(event) {
        event.preventDefault();
        if (this.state.password !== this.state.confirmpassword) {
            this.setState({
                passwordnomatch: true,
            });
        } else {
            this.setState({
                isProcessing: true,
            });
            const payload = {
                email: this.state.email,
                password: this.state.password
            }
            axios.put(API_URL + '/api/tdupdatepassword/' + cookies.get('current_session'), payload)
                .then(function (response) {
                    if (response.status === 200) {
                        alert('Password Changed Successfully.\n\n You will be redirected to your login page shortly.')
                        window.location = '/logout'
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        }

    }
    render() {
        return (
            <div>
                <section className='uk-section uk-section-muted' data-uk-height-viewport>
                    <div className='uk-container'>
                        <div className="uk-position-cover uk-flex uk-flex-center uk-flex-middle uk-flex-column uk-text-center">
                            <div className='uk-margin'>
                                <img src={logo} alt='logo' width='200' />
                            </div>
                            <div className="uk-card uk-card-default uk-card-body ">
                                <p>Before You Proceed To The Dashboard, <br /> Change Your Password</p>
                                {/* <h4 className='uk-text-center red uk-margin-remove'>Change Password</h4> */}
                                <form className='uk-margin-medium-top' method='POST' onSubmit={this.handleSubmit}>
                                    {
                                        this.state.passwordnomatch &&
                                        <div className="uk-alert-danger" data-uk-alert>
                                            <p>Error! Passwords Do Not Match.</p>
                                        </div>}
                                    <div className="uk-margin">
                                        <input className="uk-input uk-width-medium" type="password" name='password' placeholder="Password" onChange={this.handleInputChange} required />
                                    </div>
                                    <div className="uk-margin">
                                        <input className="uk-input uk-width-medium" type="password" name='confirmpassword' placeholder="Confirm Password" onChange={this.handleInputChange} required />
                                    </div>
                                    <div className="uk-margin">
                                        {!this.state.isProcessing && <button type='submit' className="uk-button uk-button-small uk-width-1-1@m orange_btn">UPDATE PASSWORD</button>}
                                        {this.state.isProcessing && <h4 className="uk-form-label uk-text-bold "><img className='uk-margin-right' src={loader} width='40' alt='loader' /> Updating Password</h4>}
                                    </div>
                                </form>
                            </div>

                        </div>
                    </div>

                </section>
                <section className='uk-position-bottom uk-section-default uk-padding-small '>
                    <p className='uk-text-left uk-text-bold footer_subtxt uk-margin-remove'>© 2020 Zinox Technologies Ltd.</p>
                </section>
            </div>
        );
    }
}

export default PasswordChange;
