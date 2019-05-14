import React from 'react';
import { authenticationService } from '../../services';
import FoodstuffsToConfirmTable from './FoodstuffsToConfirmTable.jsx';
import {getToConfirm} from "../../actions/foodstuff/getToConfirm";
import {getOne} from "../../actions/user/getOne";
import DashboardHeader from "./DashboardHeader.jsx";
import ReactPlaceholder from 'react-placeholder';
import "react-placeholder/lib/reactPlaceholder.css";
import tablePlaceholderTemplate from '../block/tablePlaceholderTemplate.jsx';

export default class DashboardFoodstuffToConfirm extends React.Component {
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
        ])
    }
    componentDidMount = () => {
        if (authenticationService.currentUserValue) {
                getOne(authenticationService.currentUserValue['@id'])
                    .then(user => {
                        DashboardFoodstuffToConfirm.triggerAllFetches(user)
                            .then(values => {
                                this.setState({
                                    user: user,
                                    foodstuffsToConfirm: values[0],
                                })
                            })
                    })
        }
    }
    componentDidUpdate() {
        if (this.state.refresh && this.state.user) {
            getOne(this.state.user['@id'])
                .then(user => {
                    DashboardFoodstuffToConfirm.triggerAllFetches(user)
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
            <>
                <DashboardHeader/>
                <div id="dashboard" className="container">
                        <div className="row">
                            <ReactPlaceholder showLoadingAnimation customPlaceholder={tablePlaceholderTemplate} ready={this.state.user !== null}>
                                <FoodstuffsToConfirmTable foodstuffsToConfirm={this.state.foodstuffsToConfirm} handleChange={this.handleChange}/>
                            </ReactPlaceholder>
                        </div>
                </div>
            </>
        );
    }
}