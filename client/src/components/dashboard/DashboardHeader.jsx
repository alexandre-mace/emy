import React from 'react';
import UserRank from "./UserRank.jsx";
import {getOne} from "../../actions/user/getOne";
import { Link }from 'react-router-dom';
import './DashboardHeader.scss';

export default class DashboardHeader extends React.Component {
    constructor(){
        super();
        this.state = {
            refresh: null,
            user: null,
        }
    }

    handleChange = () => {
        this.setState({
            refresh: true
        })
    }

    componentDidMount = () => {
        const currentUser = localStorage.getItem('currentUser');
        if (currentUser) {
                getOne(JSON.parse(currentUser)['@id'])
                    .then(user => {
                        this.setState({
                            user: user,
                        })
                    })
            }
    };

    componentDidUpdate() {
        if (this.state.refresh && this.state.user) {
            getOne(this.state.user['@id'])
                .then(user => {
                    this.setState({
                        user: user,
                        refresh: false
                    })
                })
        }
    }

    render() {
        const currentLocation = window.location.pathname;
        return(
            <>
                <div id="dashboard-header" className="mb-4 py-3">
                    <div className="container">
                        <div className="row">
                            <div className="col d-flex justify-content-center">

                                {this.state.user &&
                                    <UserRank user={this.state.user}/>
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container mb-5">
                    <div className="row">
                        <div className="col d-flex">
                            <ul id="dashboard-header-links" className="d-flex w-100">
                                <li className={(currentLocation === '/tableau-de-bord/produits-en-cours' ? 'active' : '')}><Link to="/tableau-de-bord/produits-en-cours">En cours</Link></li>
                                <li className={(currentLocation === '/tableau-de-bord/produits-a-confirmer' ? 'active' : '')}><Link to="/tableau-de-bord/produits-a-confirmer">À confirmer</Link></li>
                                <li className={(currentLocation === '/tableau-de-bord/produits-en-attente' ? 'active' : '')}><Link to="/tableau-de-bord/produits-en-attente">Vous attendez</Link></li>
                                <li className={(currentLocation === '/tableau-de-bord/produits-donnes-et-recus' ? 'active' : '')}><Link to="/tableau-de-bord/produits-donnes-et-recus">Donnés et reçus</Link></li>
                                <li className={(currentLocation === '/tableau-de-bord/gerer-vos-produits' ? 'active ml-auto' : 'ml-auto')}><Link to="/tableau-de-bord/gerer-vos-produits" className="mr-0">Gérer mes produits ajoutés</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}