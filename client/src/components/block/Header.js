import logo from '../../assets/img/logo-emy.png';
import React, { Component } from 'react';

class Header extends Component {
    constructor(props) {
        super(props)
        this.state = {
            place: null,
        };
    }

    render() {
        return (
            <header>
                <img src={logo} className="logo" alt="Logo Emy" />
                <nav>
                    <ul>
                        <li><a href="/">Accueil</a></li>
                        <li><a href="/">À propos</a></li>
                        <li><a href="/">Partenaires</a></li>
                        <li><a href="/">S inscrire</a></li>
                        <li><a href="/">Se connecter</a></li>
                    </ul>
                </nav>
            </header>
        )
    }
}

export default Header;