import logo from '../../assets/img/logo-emy.png';
import React, { Component } from 'react';
import { authenticationService } from '../../services';
import LoginModal from '../login/LoginModal';

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
                <a href="/">
                    <img src={logo} id="logo" alt="Logo Emy" />
                </a>
                {this.state.currentUser &&
                <a href="/dashboard">Tableau de bord</a>
                }
                <nav>

                    <ul id="header-links">
                        <li><a href="/qui-est-emy">Qui est Emy ?</a></li>
                        <li><a href="/partenaires">Partenaires</a></li>
                        <li><a href="/aider-emy">Aider Emy</a></li>
                        {!this.state.currentUser &&
                            <li><a href="/rejoindre-emy">Rejoindre Emy</a></li>
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