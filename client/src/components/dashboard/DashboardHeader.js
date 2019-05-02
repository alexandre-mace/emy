import React from 'react';
import Header from '../block/Header'
import { authenticationService } from '../../services';
import UserRank from "./UserRank";
import {getOne} from "../../actions/user/getOne";
import Loader from "../block/Loader";
import { Link }from 'react-router-dom';

export default class DashboardHeader extends React.Component {
    _isMounted = false;

    constructor(){
        super();
        this.state = {
            refresh: null,
            user: null,
            foodstuffsToConfirm: null,
        }
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange = () => {
        this.setState({
            refresh: true
        })
    }

    componentDidMount = () => {
        this._isMounted = true;
        authenticationService.currentUser.subscribe(localStorageUser => {
            if (this._isMounted) {
                if (localStorageUser) {
                    getOne(localStorageUser['@id'])
                        .then(user => {
                            this.setState({
                                user: user,
                            })
                        })
                }
            }
        });
    }
    componentWillUnmount() {
        this._isMounted = false;
    }
    componentDidUpdate() {
        if (this.state.refresh === true && this.state.user) {
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
        return(
            <div id="dashboard-header" className="mb-5 py-3">
                <div className="container">
                    <div className="row">
                        <div className="col d-flex justify-content-between">
                        <ul id="dashboard-header-links" className="d-flex">
                            <li><Link to="/dashboard">À confirmer</Link></li>
                            <li><Link to="/dashboard/foodstuffs-awaiting">En attente</Link></li>
                            <li><Link to="/dashboard/foodstuffs-received">Vous avez reçu</Link></li>
                            <li><Link to="/dashboard/foodstuffs-given">Vous avez donné</Link></li>
                        </ul>
                            {this.state.user &&
                                <UserRank user={this.state.user}/>
                            }
                        </div>
                    </div>
                </div>
               
            </div>
        );
    }
}