import React, { Component } from 'react';
import { authenticationService } from '../../services';
import { Link }from 'react-router-dom';

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
        if (authenticationService.currentUserValue && this.state.currentUser && authenticationService.currentUserValue['@id'] !== this.state.currentUser['@id']) {
            this.setState({currentUser: authenticationService.currentUserValue})
        } else if ((!authenticationService.currentUserValue && this.state.currentUser) || (authenticationService.currentUserValue && !this.state.currentUser)) {
            this.setState({currentUser: authenticationService.currentUserValue})
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
            <header>
                <Link to="/">
                    <h2>
                        Emy<span className="black">.</span>
                        {this.state.currentUser &&
                         <span> 
                            <img src={require('../../assets/img/hello.png')} />
                            Hello {this.state.currentUser.firstName}
                         </span>
                        }
                    </h2>
                </Link>

                {this.state.currentUser &&
                    <Link to="/dashboard" className="btn btnDashboard">Tableau de bord</Link>
                }
                <nav className={this.state.activeBurgerMenu ? 'nav-display': null}>
                    <ul id="header-links">
                        <li><Link to="/qui-est-emy" onClick={this.hideBurgerMenu}>Qui est Emy ?</Link></li>
                        <li><Link to="/partenaires" onClick={this.hideBurgerMenu}>Partenaires</Link></li>
                        <li><Link to="/donateurs" onClick={this.hideBurgerMenu}>Contributeurs <img src={require('../../assets/img/love.png')} /></Link></li>
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