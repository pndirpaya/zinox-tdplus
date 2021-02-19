import React from 'react';
import axios from 'axios'
import Cookies from 'universal-cookie';
import { API_URL } from './apiUrl'
import logo from './img/tdlogo.svg'
import loader from './img/loader.svg'
const cookies = new Cookies();



class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      isProcessing: false,
      authError: false,
    }
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

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
      email: this.state.email,
      password: this.state.password
    }
    axios.post(API_URL + '/api/tdlogin/', payload)
      .then(function (response) {
        if (response.status === 204 && response.data === '') {
          comp.setState({
            authError: true,
            isProcessing: false,
          })
        }
        else {
          comp.setState({ authError: false })
          // console.log(response)
          if (response.data[0].status === 0) {
            cookies.set('current_session', response.data[0]._id, { path: '/', expires: new Date(Date.now() + 1800000) });
            comp.props.history.push('/password-change')
          }
          else if (response.data[0].status === 2) {
            alert('Your Account is Deactivated.\r\n Kindly Contact Your TDPlus Adminstrator For Further Assistance.')
            comp.setState({ isProcessing: false })
          }
          else {
            cookies.set('user_type', response.data[0].user_type, { path: '/', expires: new Date(Date.now() + 1800000) });
            cookies.set('current_session', response.data[0]._id, { path: '/', expires: new Date(Date.now() + 1800000) });
            comp.props.history.push('/dashboard')
          }

        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  render() {
    return (
      <div>
        <section className='uk-section uk-section-muted' data-uk-height-viewport>
          <div className='uk-container'>
            <div className="uk-position-cover uk-flex uk-flex-center uk-flex-middle uk-flex-column uk-text-left">
              <div className='uk-margin'>
                <img src={logo} alt='logo' width='300' />
              </div>
              <div className="uk-card uk-card-default uk-card-body ">
                <p>You are connecting to:</p>
                <h4 className='uk-text-left orange uk-margin-remove'>TDPlus Support Dashboard</h4>
                <form className='uk-margin-medium-top' method='POST' onSubmit={this.handleSubmit}>
                  {this.state.authError &&
                    <div className="uk-alert-danger" data-uk-alert>
                      <p>Error! Incorrect username or password</p>
                    </div>}
                  <div className="uk-margin">
                    <input className="uk-input uk-width-medium" type="text" name='email' placeholder="Username (Email)" onChange={this.handleInputChange} required />
                  </div>
                  <div className="uk-margin">
                    <input className="uk-input uk-width-medium" type="password" name='password' placeholder="Password" onChange={this.handleInputChange} required />
                  </div>
                  <div className="uk-margin">
                    {!this.state.isProcessing && <button type='submit' className="uk-button uk-button-small uk-width-1-1@m orange_btn">LOGIN</button>}
                    {this.state.isProcessing && <h4 className="uk-form-label uk-text-bold "><img className='uk-margin-right' src={loader} width='40' alt='loader' /> Verifying Login Details</h4>}
                  </div>
                  <p className='uk-text-meta orange uk-margin-small serial_example'>Forgot your username or password?</p>
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

export default App;
