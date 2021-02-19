import React from 'react';
import Cookies from 'universal-cookie';
const cookies = new Cookies();


class Logout extends React.Component {
    componentDidMount() {
        this.logout()
    }
    logout = () => {
        cookies.remove('current_session', { path: '/', expires: new Date(Date.now()) });
        cookies.remove('user_type', { path: '/', expires: new Date(Date.now()) });
        this.props.history.push('/')
    }
    render() {
        return (
            <div className='uk-padding uk-text-center' >
                <h1>Goodbye!</h1>
                <p>Logging you out of the Platform</p>
                <a href='/'>Back to Home</a>
            </div>
        );
    }
}

export default Logout;
