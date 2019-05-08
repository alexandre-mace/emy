import React from 'react';
import UserRank from "./UserRank";
import {getOne} from "../../actions/user/getOne";
import { Link }from 'react-router-dom';

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
        return(
            <div id="dashboard-header" className="mb-5 py-3">
                <div className="container">
                    <div className="row">
                        <div className="col d-flex justify-content-between">
                        <ul id="dashboard-header-links" className="d-flex">
                            <li><Link to="/dashboard/foodstuffs-to-confirm">À confirmer</Link></li>
                            <li><Link to="/dashboard">Tous</Link></li>
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