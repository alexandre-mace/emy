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
                        <li><a href="/">Les produits</a></li>
                        <li><a href="/">Qui est Emy ?</a></li>
                        <li><a href="/">Partenaires</a></li>
                    </ul>
                </nav>
            </header>
        )
    }
}

export default Header;