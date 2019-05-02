import React from 'react';
import Header from '../block/Header'
import { authenticationService } from '../../services';
import FoodstuffsAwaitingTable from './FoodstuffsAwaitingTable';
import UserRank from "./UserRank";
import {getAwaiting} from "../../actions/foodstuff/getAwaiting";
import {getOne} from "../../actions/user/getOne";
import Loader from "../block/Loader";
import DashboardHeader from "./DashboardHeader";

export default class DashboardFoodstuffAwaiting extends React.Component {
    _isMounted = false;

    constructor(){
        super();
        this.state = {
            refresh: null,
            user: null,
            foodstuffsAwaiting: null,
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
            getAwaiting(user),
        ])
    }
    componentDidMount = () => {
        this._isMounted = true;
        authenticationService.currentUser.subscribe(localStorageUser => {
            if (this._isMounted) {
                if (localStorageUser) {
                    getOne(localStorageUser['@id'])
                        .then(user => {
                            DashboardFoodstuffAwaiting.triggerAllFetches(user)
                                .then(values => {
                                    this.setState({
                                        user: user,
                                        foodstuffsAwaiting: values[0],
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
                    DashboardFoodstuffAwaiting.triggerAllFetches(user)
                        .then(values => {
                            this.setState({
                                user: user,
                                foodstuffsAwaiting: values[0],
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
                    {this.state.user &&
                        <div className="row">
                            <FoodstuffsAwaitingTable foodstuffsAwaiting={this.state.foodstuffsAwaiting} />
                        </div>
                    }
                </div>
            </div>
        );
    }
}