import React, { Component } from 'react';
import { authenticationService } from '../../services';
import LoginModal from '../login/LoginModal';
import { Link }from 'react-router-dom';

class Header extends Component {
    _isMounted = false;

    constructor(props) {
        super(props)
        this.state = {
            place: null,
            currentUser: null,
        };
    }

    componentDidMount() {
        this._isMounted = true;
        authenticationService.currentUser.subscribe(x => {
            if (this._isMounted) {
                this.setState({currentUser: x})
            }
        });
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    logout() {
        authenticationService.logout();
    }

    render() {
        return (
            <header>
                <Link to="/">
                    <h2>
                        Emy
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
                            <li><button id="logout" onClick={this.logout}>Se déconnecter</button></li>
                            ) : (
                            <li><button id="login" type="button" value="Open" onClick={this.props.openModal}>Se connecter</button></li>
                        )}
                    </ul>
                </nav>
            </header>
        )
    }
}

export default Header;