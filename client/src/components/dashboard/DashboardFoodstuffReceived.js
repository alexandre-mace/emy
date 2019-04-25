import React from 'react';
import Header from '../block/Header'
import { authenticationService } from '../../services';
import FoodstuffsReceivedTable from './FoodstuffsReceivedTable';
import UserRank from "./UserRank";
import {getReceived} from "../../actions/foodstuff/getReceived";
import {getOne} from "../../actions/user/getOne";
import Loader from "../block/Loader";
import DashboardHeader from "./DashboardHeader";

export default class DashboardFoodstuffReceived extends React.Component {
    _isMounted = false;

    constructor(){
        super();
        this.state = {
            refresh: null,
            user: null,
            foodstuffsReceived: null
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
            getReceived(user)
        ])
    }
    componentDidMount = () => {
        this._isMounted = true;
        authenticationService.currentUser.subscribe(localStorageUser => {
            if (this._isMounted) {
                if (localStorageUser) {
                    getOne(localStorageUser['@id'])
                        .then(user => {
                            DashboardFoodstuffReceived.triggerAllFetches(user)
                                .then(values => {
                                    this.setState({
                                        user: user,
                                        foodstuffsReceived: values[0],
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
                    DashboardFoodstuffReceived.triggerAllFetches(user)
                        .then(values => {
                            this.setState({
                                user: user,
                                foodstuffsReceived: values[0],
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
                <div id="dashboard" className="content container">
                    <DashboardHeader/>
                    {this.state.user ? (
                        <div className="row">
                            <FoodstuffsReceivedTable foodstuffsReceived={this.state.foodstuffsReceived}/>
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