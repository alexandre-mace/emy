import React from 'react';
import {getGiven} from "../../actions/foodstuff/getGiven";
import {getReceived} from "../../actions/foodstuff/getReceived";
import {getOne} from "../../actions/user/getOne";
import DashboardHeader from "./DashboardHeader.jsx";
import ReactPlaceholder from 'react-placeholder';
import "react-placeholder/lib/reactPlaceholder.css";
import FoodstuffsGivenAndReceivedTable from "./FoodstuffsGivenAndReceivedTable";
import phrasialPlaceholderTemplate from "../block/phrasialPlaceholderTemplate";

export default class DashboardGivenAndReceived extends React.Component {
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
            getGiven(user),
            getReceived(user)
        ])
    }
    componentDidMount = () => {
        const currentUser = localStorage.getItem('currentUser');
        if (currentUser) {
            getOne(JSON.parse(currentUser)['@id'])
                .then(user => {
                    DashboardGivenAndReceived.triggerAllFetches(user)
                        .then(values => {
                            this.setState({
                                user: user,
                                foodstuffs: [...new Set([...values[0]['hydra:member'],...values[1]['hydra:member']])],
                            })
                        })
                })
        }
    }
    componentDidUpdate() {
        if (this.state.refresh && this.state.user) {
            getOne(this.state.user['@id'])
                .then(user => {
                    DashboardGivenAndReceived.triggerAllFetches(user)
                        .then(values => {
                            console.log(values)
                            this.setState({
                                user: user,
                                foodstuffs: [...new Set([...values[0]['hydra:member'],...values[1]['hydra:member']])],
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
                        <div className="row">
                            <ReactPlaceholder showLoadingAnimation customPlaceholder={phrasialPlaceholderTemplate} ready={this.state.user !== null}>
                                <FoodstuffsGivenAndReceivedTable foodstuffs={this.state.foodstuffs} handleChange={this.handleChange} />
                            </ReactPlaceholder>
                        </div>   
                </div>
            </>
        );
    }
}