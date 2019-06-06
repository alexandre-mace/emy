import React from 'react';
import Header from "./Header.jsx";
import LoginModal from "../login/LoginModal.jsx";
import Alert from 'react-s-alert';
import { authenticationService } from '../../services';
import { withTranslation } from 'react-i18next';
import { findAllNotSeenByUser } from "../../actions/foodstuffOffer/findAllNotSeenByUser";
import FullScreenLoader from "../utils/FullScreenLoader";

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
            Alert.success('Hey, nous sommes heureux de vous voir !', {
                position: 'bottom-right',
                effect: 'slide',
                timeout: 5000,
                offset: 10
            });
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
            findAllNotSeenByUser(authenticationService.currentUserValue['@id'])
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
            findAllNotSeenByUser(authenticationService.currentUserValue['@id'])
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
                    <FullScreenLoader/>
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
