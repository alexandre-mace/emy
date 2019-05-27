import React, { Component } from 'react';
import { authenticationService } from '../../services';
import { Link }from 'react-router-dom';
import './Header.scss'
import NotificationsTotal from "./NotificationsTotal";

class Header extends Component {
    constructor(props) {
        super(props)
        this.state = {
            place: null,
            currentUser: null,
            activeBurgerMenu: false,
        };
        this.hideBurgerMenu = this.toggleClassBurgerMenu.bind(this);
        this.toggleClassBurgerMenu = this.toggleClassBurgerMenu.bind(this);

    }

    componentDidMount() {
        if (authenticationService.currentUserValue) {
            this.setState({currentUser: authenticationService.currentUserValue})
        }
    };

    componentDidUpdate() {
        if ((authenticationService.currentUserValue &&
            this.state.currentUser &&
            authenticationService.currentUserValue['@id'] !== this.state.currentUser['@id']) ||
            (authenticationService.currentUserValue && !this.state.currentUser) ||
            (!authenticationService.currentUserValue &&
                this.state.currentUser)
        ) {
            this.setState({
                currentUser: authenticationService.currentUserValue,
            })
        }
    }

    handleLogout = () => {
        authenticationService.logout();
        this.props.handleLogout();
    }

    toggleClassBurgerMenu(){
        this.setState({
            activeBurgerMenu: !this.state.activeBurgerMenu
        });
    }


    render() {
        return (
            <header id="header">
                <Link to="/">
                    <h2 id="header-app-name">
                        Emy<span id="header-app-name-dot">.</span>
                        {this.state.currentUser &&
                         <span id="header-hello-user">
                            <img alt="icon bonjour" src={require('../../assets/img/hello.png')} />
                            Hello {this.state.currentUser.firstName}
                         </span>
                        }
                    </h2>
                </Link>

                {this.state.currentUser &&
                    <Link to="/tableau-de-bord" className="btn btn-dashboard d-flex align-items-center">
                        Tableau de bord
                        <NotificationsTotal notificationsTotal={this.props.notificationsTotal}/>
                    </Link>
                }
                <nav className={this.state.activeBurgerMenu ? 'nav-display': null}>
                    <ul id="header-links">
                        <li><Link to="/qui-est-emy" onClick={this.hideBurgerMenu}>Qui est Emy ?</Link></li>
                        <li><Link to="/nos-partenaires" onClick={this.hideBurgerMenu}>Nos Partenaires</Link></li>
                        <li><Link to="/les-contributeurs" onClick={this.hideBurgerMenu}>Les contributeurs <img alt="icon coeur" src={require('../../assets/img/love.png')} /></Link></li>
                        <li><Link to="/aider-emy" onClick={this.hideBurgerMenu}>Aider Emy</Link></li>
                        {this.state.currentUser ? (
                            <li><button id="logout" onClick={this.handleLogout}>Se déconnecter</button></li>
                            ) : (
                            <>
                                <li><Link to="/rejoindre-emy">Rejoindre Emy</Link></li>
                                <li><button id="login" type="button" value="Open" onClick={this.props.openLoginModal}>Se connecter</button></li>
                            </>
                        )}
                    </ul>
                </nav>

                <div className="burger-menu" onClick={this.toggleClassBurgerMenu}>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </header>
        )
    }
}

export default Header;