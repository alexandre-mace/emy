import React, { Component } from 'react';
import { authenticationService } from '../../services';
import { Link }from 'react-router-dom';

class Header extends Component {
    constructor(props) {
        super(props)
        this.state = {
            place: null,
            currentUser: null,
        };
    }

    componentDidMount() {
        if (authenticationService.currentUserValue) {
            this.setState({currentUser: authenticationService.currentUserValue})
        }
    };

    componentDidUpdate() {
        if (authenticationService.currentUserValue && this.state.currentUser && authenticationService.currentUserValue['@id'] !== this.state.currentUser['@id']) {
            this.setState({currentUser: authenticationService.currentUserValue})
        } else if (!authenticationService.currentUserValue && this.state.currentUser ) {
            this.setState({currentUser: authenticationService.currentUserValue})
        } else if (authenticationService.currentUserValue && !this.state.currentUser) {
            this.setState({currentUser: authenticationService.currentUserValue})
        }
    }

    handleLogout = () => {
        authenticationService.logout();
        this.props.handleLogout();
    }

    render() {
        return (
            <header>
                <Link to="/">
                    <h2>
                        emy
                        {this.state.currentUser &&
                         <span> - Hello {this.state.currentUser.firstName}</span>
                        }
                    </h2>
                </Link>

                {this.state.currentUser &&
                    <Link to="/dashboard" className="btn">Votre tableau de bord</Link>
                }
                <nav>

                    <ul id="header-links">
                        <li><Link to="/qui-est-emy">Qui est Emy ?</Link></li>
                        <li><Link to="/partenaires">Partenaires</Link></li>
                        <li><Link to="/donateurs">Les donateurs</Link></li>
                        <li><Link to="/aider-emy">Aider Emy</Link></li>
                        {!this.state.currentUser &&
                            <li><Link to="/rejoindre-emy">Rejoindre Emy</Link></li>
                        }
                        {this.state.currentUser ? (
                            <li><button id="logout" onClick={this.handleLogout}>Se déconnecter</button></li>
                            ) : (
                            <li><button id="login" type="button" value="Open" onClick={this.props.openLoginModal}>Se connecter</button></li>
                        )}
                    </ul>
                </nav>
            </header>
        )
    }
}

export default Header;