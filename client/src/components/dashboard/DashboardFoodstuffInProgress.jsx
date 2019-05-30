import React from 'react';
import { authenticationService } from '../../services';
import FoodstuffsInProgressTable from './FoodstuffsInProgressTable.jsx';
import {getOne} from "../../actions/user/getOne";
import DashboardHeader from "./DashboardHeader.jsx";
import ReactPlaceholder from 'react-placeholder';
import "react-placeholder/lib/reactPlaceholder.css";
import tablePlaceholderTemplate from '../block/tablePlaceholderTemplate.jsx';
import {findInProgress} from "../../actions/foodstuff/findInProgress";
import phrasialPlaceholderTemplate from "../block/phrasialPlaceholderTemplate";

export default class DashboardFoodstuffInProgress extends React.Component {
    constructor(){
        super();
        this.state = {
            refresh: null,
            user: null,
            foodstuffsInProgress: null,
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
            findInProgress(user['@id']),
        ])
    }
    componentDidMount = () => {
        if (authenticationService.currentUserValue) {
            getOne(authenticationService.currentUserValue['@id'])
                .then(user => {
                    DashboardFoodstuffInProgress.triggerAllFetches(user)
                        .then(values => {
                            this.setState({
                                user: user,
                                foodstuffsInProgress: values[0],
                            })
                        })
                })
        }
    }
    componentDidUpdate() {
        if (this.state.refresh && this.state.user) {
            getOne(this.state.user['@id'])
                .then(user => {
                    DashboardFoodstuffInProgress.triggerAllFetches(user)
                        .then(values => {
                            this.setState({
                                user: user,
                                foodstuffsInProgress: values[0],
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
                        <FoodstuffsInProgressTable foodstuffsInProgress={this.state.foodstuffsInProgress} handleChange={this.handleChange}/>
                    </ReactPlaceholder>
                </div>
            </div>
            </>
        );
    }
}