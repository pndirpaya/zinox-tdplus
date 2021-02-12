import React from 'react';
import axios from 'axios'
import { API_URL } from './apiUrl'
import SideNav from './SideNav'
import manageDept from './img/dept.svg'
import Cookies from 'universal-cookie';
import loader from './img/loader.svg'

const cookies = new Cookies();

class TableRow extends React.Component {
    render() {
        return (
            <tr>
                <td>{this.props.dept.department_name}</td>
                <td>{(new Date(this.props.dept.create_date)).toDateString()}</td>
                <td><a href={'/edit-department/' + this.props.dept._id} className="uk-button uk-button-small small_slider_btn">Manage</a></td>
            </tr>
        )
    }
}



class ManageEngineer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            department_name: '',
            departments: [],
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentDidMount() {
        this.checkcookie()
        this.getDepts()

    }
    checkcookie = () => {
        if (cookies.get('current_session') === "" || cookies.get('current_session') === undefined) {
            this.props.history.push('/')
        }
        if (cookies.get('user_type') === '2') {
            this.props.history.push('/dashboard')
        }
    }
    getDepts = () => {
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
        }
        axios.post(API_URL + '/api/tddepartment/', payload)
            .then(function (response) {
                if (response.status === 201 && response.data !== '') {
                    comp.setState({
                        isProcessing: false,
                        showResult: true
                    }, function () {
                        alert('New TDPlus Department Created!')
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
            <section className="uk-grid-small uk-grid-match uk-text-left" data-uk-grid data-uk-height-viewport>
                <div className='uk-width-auto'>
                    <SideNav />
                </div>
                <div className='uk-width-expand uk-padding-remove'>
                    <div className="uk-width-1-1">
                        <div className='uk-padding'>
                            <div data-uk-grid className='uk-grid-medium'>
                                <div className='uk-width-auto'>
                                    <img src={manageDept} width='80' alt='icon' />
                                </div>
                                <div className='uk-width-5-6'>
                                    <h3 className='uk-text-left uk-margin-remove'>Manage Departments</h3>
                                        <p className='uk-text-small uk-width-medium uk-margin-remove'>Manage TDplus Departments</p>
                                </div>

                            </div>
                            <hr className='uk-margin-medium' />
                            <div className="uk-text-left" data-uk-grid>
                                <div className="uk-width-2-5@m">
                                    <div className="uk-background-muted uk-padding">
                                        <form method='POST' onSubmit={this.handleSubmit} >
                                            <div className="uk-margin">
                                                <label className="uk-form-label uk-text-bold ">Department Name <span className='red'>*</span></label>
                                                <input className="uk-input calc_input uk-margin-small-top" type="text" name='department_name' placeholder="Department Name" onChange={this.handleInputChange} />
                                            </div>
                                            <div className="uk-margin-large-top">
                                                {!this.state.isProcessing && <button type='submit' className="uk-button uk-margin-right uk-width-2-3@m slider_btn">Add Department</button>}
                                                {this.state.isProcessing && <h4 className="uk-form-label uk-text-bold "><img className='uk-margin-right' src={loader} width='40' alt='loader' /> Adding New Department ...</h4>}
                                            </div>
                                        </form>
                                    </div>
                                </div>
                                <div className="uk-width-3-5@m">
                                    <div className="uk-card uk-card-default uk-card-body">
                                        <div className='uk-margin'>
                                            <div className="uk-overflow-auto">
                                                <h3 className='uk-text-left uk-margin'>User Details</h3>

                                                <p className='uk-text-left uk-text-meta uk-margin-remove'>Showing {(this.state.departments).length} Departments</p>
                                                <table className="uk-table uk-table-striped">
                                                    <thead>
                                                        <tr>
                                                            <th className='uk-text-bold red'>Department Name</th>
                                                            <th className='uk-text-bold red'>Date Created</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {
                                                            this.state.departments.map(dept =>
                                                                <TableRow key={dept._id}
                                                                    index={dept._id}
                                                                    dept={dept} />
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

export default ManageEngineer;
