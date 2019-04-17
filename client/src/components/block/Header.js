import logo from '../../assets/img/logo-emy.png';
import React, { Component } from 'react';
import { authenticationService } from '../../services';
import LoginModal from '../login/LoginModal';
import { Link }from 'react-router-dom';

class Header extends Component {
    constructor(props) {
        super(props)
        this.state = {
            place: null,
            currentUser: null
        };
    }

    componentDidMount() {
        authenticationService.currentUser.subscribe(x => this.setState({ currentUser: x }));
    }

    logout() {
        authenticationService.logout();
    }

    render() {
        return (
            <header>
                <Link to="/">
                    <img src={logo} id="logo" alt="Logo Emy" />
                </Link>
                {this.state.currentUser &&
                <Link to="/dashboard" className="btn">Votre tableau de bord</Link>
                }
                <nav>

                    <ul id="header-links">
                        <li><Link to="/qui-est-emy">Qui est Emy ?</Link></li>
                        <li><Link to="/partenaires">Partenaires</Link></li>
                        <li><Link to="/aider-emy">Aider Emy</Link></li>
                        {!this.state.currentUser &&
                            <li><Link to="/rejoindre-emy">Rejoindre Emy</Link></li>
                        }
                        {this.state.currentUser ? (
                            <li><button id="logout" onClick={this.logout}>Se déconnecter</button></li>
                            ) : (
                            <LoginModal />
                        )}
                    </ul>
                </nav>
            </header>
        )
    }
}

export default Header;