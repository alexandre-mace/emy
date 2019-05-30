import React from 'react';
import { authenticationService } from '../../../services/index';
import DashboardHeader from "../header/DashboardHeader.jsx";
import ReactPlaceholder from 'react-placeholder';
import "react-placeholder/lib/reactPlaceholder.css";
import {findAllByUser} from "../../../actions/foodstuffOffer/findAllByUser";
import phrasialPlaceholderTemplate from "../../block/phrasialPlaceholderTemplate";
import ToConfirmTable from "./ToConfirmTable";

export default class ToConfirmDashboard extends React.Component {
    constructor(){
        super();
        this.state = {
            refresh: null,
            foodstuffs: null,
        }
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange = () => {
        this.setState({
            refresh: true
        })
    }

    static triggerAllFetches(userId) {
        return Promise.all([
            findAllByUser(userId),
        ])
    }
    componentDidMount() {
        const currentUser = authenticationService.currentUserValue;
        if (currentUser) {
            ToConfirmDashboard.triggerAllFetches(currentUser['@id'])
                .then(values => {
                    this.setState({
                        foodstuffs: values[0],
                    })
                })
        }
    }
    componentDidUpdate() {
        if (this.state.refresh) {
            const currentUser = authenticationService.currentUserValue;
            if (currentUser) {
                ToConfirmDashboard.triggerAllFetches(currentUser['@id'])
                    .then(values => {
                        this.setState({
                            foodstuffs: values[0],
                            refresh: false
                        })
                    })
            }
        }
    }

    render() {
        return(
            <>
                <DashboardHeader/>
                <div id="dashboard" className="container">
                        <div className="row">
                            <ReactPlaceholder showLoadingAnimation customPlaceholder={phrasialPlaceholderTemplate} ready={this.state.foodstuffs !== null}>
                                <ToConfirmTable foodstuffs={this.state.foodstuffs} handleChange={this.handleChange}/>
                            </ReactPlaceholder>
                        </div>
                </div>
            </>
        );
    }
}