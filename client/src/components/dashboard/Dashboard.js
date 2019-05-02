import React from 'react';
import Header from '../block/Header'
import { authenticationService } from '../../services';
import FoodstuffsToConfirmTable from './FoodstuffsToConfirmTable';
import UserRank from "./UserRank";
import {getAwaiting} from "../../actions/foodstuff/getAwaiting";
import {getToConfirm} from "../../actions/foodstuff/getToConfirm";
import {getGiven} from "../../actions/foodstuff/getGiven";
import {getReceived} from "../../actions/foodstuff/getReceived";
import {getOne} from "../../actions/user/getOne";
import Loader from "../block/Loader";
import DashboardHeader from "./DashboardHeader";

export default class Dashboard extends React.Component {
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

    static triggerAllFetches(user) {
        return Promise.all([
            getToConfirm(user),
            getAwaiting(user),
            getReceived(user),
            getGiven(user)
        ])
    }
    componentDidMount = () => {
        this._isMounted = true;
        authenticationService.currentUser.subscribe(localStorageUser => {
            if (this._isMounted) {
                if (localStorageUser) {
                    getOne(localStorageUser['@id'])
                        .then(user => {
                            Dashboard.triggerAllFetches(user)
                                .then(values => {
                                    this.setState({
                                        user: user,
                                        foodstuffsToConfirm: values[0]
                                    })
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
                    Dashboard.triggerAllFetches(user)
                        .then(values => {
                            this.setState({
                                user: user,
                                foodstuffsToConfirm: values[0],
                                refresh: false
                            })
                        })
                })
        }
    }

    render() {
        return(
            <div>
                <Header/>
                <DashboardHeader/>
                <div id="dashboard" className="container">
                    {this.state.user ? (
                        <div className="row">
                            <FoodstuffsToConfirmTable foodstuffsToConfirm={this.state.foodstuffsToConfirm} handleChange={this.handleChange} />
                        </div>
                    ) : (
                        <div className="row mt-5">
                            <div className="col">
                                <Loader />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}