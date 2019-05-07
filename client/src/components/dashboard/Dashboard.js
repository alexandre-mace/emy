import React from 'react';
import FoodstuffsTable from './FoodstuffsTable';
import {getAwaiting} from "../../actions/foodstuff/getAwaiting";
import {getToConfirm} from "../../actions/foodstuff/getToConfirm";
import {getGiven} from "../../actions/foodstuff/getGiven";
import {getReceived} from "../../actions/foodstuff/getReceived";
import {getOne} from "../../actions/user/getOne";
import Loader from "../block/Loader";
import DashboardHeader from "./DashboardHeader";

export default class Dashboard extends React.Component {
    constructor(){
        super();
        this.state = {
            refresh: null,
            user: null,
            foodstuffs: null
        };
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange = () => {
        this.setState({
            refresh: true
        })
    };

    static triggerAllFetches(user) {
        return Promise.all([
            getToConfirm(user),
            getAwaiting(user),
            getGiven(user),
            getReceived(user)
        ])
    }
    componentDidMount = () => {
        const currentUser = localStorage.getItem('currentUser');
        if (currentUser) {
            getOne(JSON.parse(currentUser)['@id'])
                .then(user => {
                    Dashboard.triggerAllFetches(user)
                        .then(values => {
                            this.setState({
                                user: user,
                                foodstuffs: [...new Set([...values[0]['hydra:member'],...values[1]['hydra:member'],...values[2]['hydra:member'],...values[3]['hydra:member']])],
                            })
                        })
                })
        }
    }
    componentDidUpdate() {
        if (this.state.refresh && this.state.user) {
            getOne(this.state.user['@id'])
                .then(user => {
                    Dashboard.triggerAllFetches(user)
                        .then(values => {
                            this.setState({
                                user: user,
                                foodstuffs: [...new Set([...values[0]['hydra:member'],...values[1]['hydra:member'],...values[2]['hydra:member'],...values[3]['hydra:member']])],
                                refresh: false
                            })
                        })
                })
        }
    }

    render() {
        return(
            <>
                <DashboardHeader/>
                <div id="dashboard" className="container">
                    {this.state.user ? (
                        <div className="row">
                            <FoodstuffsTable foodstuffs={this.state.foodstuffs} handleChange={this.handleChange} />
                        </div>
                    ) : (
                        <div className="row mt-5">
                            <div className="col">
                                <Loader />
                            </div>
                        </div>
                    )}
                </div>
            </>
        );
    }
}