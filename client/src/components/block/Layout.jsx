import React from 'react';
import Header from "./Header";
import LoginModal from "../login/LoginModal";
import Alert from 'react-s-alert';
import { authenticationService } from '../../services';

export const LayoutContext = React.createContext();

export default class Layout extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            currentUser: null,
            loginModalActive: false
        };
        this.openLoginModal = this.openLoginModal.bind(this);
        this.closeLoginModal = this.closeLoginModal.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
    }

    openLoginModal = () => {
        this.setState({
             loginModalActive: true,
        });
    }

    closeLoginModal = () => {
        this.setState({
            loginModalActive: false,
        });
    };

    handleLogin = () => {
        this.setState({
            currentUser: authenticationService.currentUserValue['@id']
        })
    };

    handleLogout = () => {
        this.setState({
            currentUser: null
        })
    };

    render() {
        return(
            <div>
                <Alert stack={{limit: 3}} />
                <Header openLoginModal={this.openLoginModal} handleLogout={this.handleLogout} />
                <LoginModal visible={this.state.loginModalActive} closeModal={this.closeLoginModal} handleLogin={this.handleLogin} />
                <LayoutContext.Provider value={{ openLoginModal: this.openLoginModal }}>
                    {this.props.children}
                </LayoutContext.Provider>
            </div>
        );
    }
}

