import React from 'react';
import Header from "./Header.jsx";
import LoginModal from "../login/LoginModal.jsx";
import Alert from 'react-s-alert';
import { authenticationService } from '../../services';
import Loader from "../utils/Loader.jsx";
import { withTranslation } from 'react-i18next';
import {findAllByUser} from "../../actions/foodstuffNotification/findAllbyUser";

export const LayoutContext = React.createContext();

class Layout extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            currentUser: null,
            loginModalActive: false,
            loaded: false,
            notificationsTotal: null,
            refresh: null
        };
        this.openLoginModal = this.openLoginModal.bind(this);
        this.closeLoginModal = this.closeLoginModal.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    openLoginModal = () => {
        this.setState({
             loginModalActive: true,
        });
    }

    handleChange = () => {
        this.setState({
            refresh: true
        })
    }

    closeLoginModal = () => {
        this.setState({
            loginModalActive: false,
        });
    };

    handleLogin = () => {
        if (authenticationService.currentUserValue) {
            this.setState({
                currentUser: authenticationService.currentUserValue['@id']
            })
        }
    };

    handleLogout = () => {
        this.setState({
            currentUser: null
        })
    };

    componentDidMount() {
        document.getElementsByClassName('fullscreenLoader')[0].classList.add('visible');
        if (authenticationService.currentUserValue) {
            findAllByUser(authenticationService.currentUserValue['@id'])
                .then(notificationsTotal => {
                    if (this.state.notificationsTotal !== notificationsTotal['hydra:totalItems']) {
                        this.setState({
                            notificationsTotal: notificationsTotal['hydra:totalItems']
                        })
                    }
                })
        }
        setTimeout(() => {
            this.setState({ loaded: true });
        }, 1500);
    }
    componentDidUpdate() {
        if (this.state.loaded && document.getElementsByClassName('fullscreenLoader')[0].classList.contains('visible')) {
            document.getElementsByClassName('fullscreenLoader')[0].classList.add('fadeOut');
            document.getElementsByClassName('page')[0].classList.add('fadeIn');
        }
        if (authenticationService.currentUserValue) {
            findAllByUser(authenticationService.currentUserValue['@id'])
                .then(notificationsTotal => {
                    if (this.state.notificationsTotal !== notificationsTotal['hydra:totalItems']) {
                        this.setState({
                            notificationsTotal: notificationsTotal['hydra:totalItems']
                        })
                    }
                })
        }
    }
    render() {
        const { t } = this.props;

        return(
            <div>
                <div className="fullscreenLoader d-flex">
                    <div className="row m-auto">
                        <div className="col-12 mb-5">
                            <Loader />
                        </div>
                        <div className="col-12 text-center">
                            <p className="fullscreenLoader-text">Chaque seconde, 41.2 tonnes de nourriture jetées dans le monde</p>
                        </div>
                    </div>
                </div>
                <LayoutContext.Provider value={{ openLoginModal: this.openLoginModal, translation: t, handleChange: this.handleChange }}>
                    <Alert stack={{limit: 3}} />
                    <Header openLoginModal={this.openLoginModal} handleLogout={this.handleLogout} notificationsTotal={this.state.notificationsTotal} />
                    <LoginModal translation={t} visible={this.state.loginModalActive} closeModal={this.closeLoginModal} handleLogin={this.handleLogin} />
                    <div className="page">
                        {this.props.children}
                    </div>
                </LayoutContext.Provider>
            </div>
        );
    }
}

export default withTranslation()(Layout);
