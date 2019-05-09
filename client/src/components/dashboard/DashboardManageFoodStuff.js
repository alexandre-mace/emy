import React from 'react';
import { authenticationService } from '../../services';
import FoodstuffsToManageTable from './FoodstuffsToManageTable';
import {getToManage} from "../../actions/foodstuff/getToManage";
import {getOne} from "../../actions/user/getOne";
import DashboardHeader from "./DashboardHeader";
import ReactPlaceholder from 'react-placeholder';
import "react-placeholder/lib/reactPlaceholder.css";
import tablePlaceholderTemplate from '../block/tablePlaceholderTemplate';

export default class DashboardFoodstuffToManage extends React.Component {
    constructor(){
        super();
        this.state = {
            refresh: null,
            user: null,
            foodstuffsToManage: null,
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
            getToManage(user),
        ])
    }
    componentDidMount() {
        if (authenticationService.currentUserValue) {
            getOne(authenticationService.currentUserValue['@id'])
                .then(user => {
                    DashboardFoodstuffToManage.triggerAllFetches(user)
                        .then(values => {
                            this.setState({
                                user: user,
                                foodstuffsToManage: values[0],
                            })
                        })
                })
        }
    }
    componentDidUpdate() {
        if (this.state.refresh && this.state.user) {
            getOne(this.state.user['@id'])
                .then(user => {
                    DashboardFoodstuffToManage.triggerAllFetches(user)
                        .then(values => {
                            this.setState({
                                user: user,
                                foodstuffsToManage: values[0],
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
                            <FoodstuffsToManageTable foodstuffsToManage={this.state.foodstuffsToManage} handleChange={this.handleChange}/>
                        </ReactPlaceholder>
                    </div>
                </div>
            </>
        );
    }
}