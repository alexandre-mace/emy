import React from 'react';
import Header from '../block/Header'
import { authenticationService } from '../../services';
import FoodstuffsGivenTable from './FoodstuffsGivenTable';
import UserRank from "./UserRank";
import {getGiven} from "../../actions/foodstuff/getGiven";
import {getOne} from "../../actions/user/getOne";
import Loader from "../block/Loader";
import DashboardHeader from "./DashboardHeader";

export default class DashboardFoodstuffGiven extends React.Component {
    _isMounted = false;

    constructor(){
        super();
        this.state = {
            refresh: null,
            user: null,
            foodstuffsGiven: null
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
                            DashboardFoodstuffGiven.triggerAllFetches(user)
                                .then(values => {
                                    this.setState({
                                        user: user,
                                        foodstuffsGiven: values[0]
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
                    DashboardFoodstuffGiven.triggerAllFetches(user)
                        .then(values => {
                            this.setState({
                                user: user,
                                foodstuffsGiven: values[0],
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
                            <FoodstuffsGivenTable foodstuffsGiven={this.state.foodstuffsGiven}/>
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