import React from 'react';
import { authenticationService } from '../../../services/index';
import DashboardHeader from "../header/DashboardHeader.jsx";
import ReactPlaceholder from 'react-placeholder';
import "react-placeholder/lib/reactPlaceholder.css";
import {findAwaiting} from "../../../actions/foodstuff/findAwaiting";
import AwaitingTable from "./AwaitingTable.jsx";
import phrasialPlaceholderTemplate from "../../block/phrasialPlaceholderTemplate";

export default class AwaitingDashboard extends React.Component {
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
            findAwaiting(userId),
        ])
    }

    componentDidMount() {
        const currentUser = authenticationService.currentUserValue;
        if (currentUser) {
            AwaitingDashboard.triggerAllFetches(currentUser['@id'])
                .then(values => {
                    this.setState({
                        foodstuffs: values[0]
                    })
                })
        }
    }

    componentDidUpdate() {
        if (this.state.refresh) {
            const currentUser = authenticationService.currentUserValue;
            AwaitingDashboard.triggerAllFetches(currentUser['@id'])
                .then(values => {
                    this.setState({
                        foodstuffs: values[0],
                        refresh: false
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
                        <ReactPlaceholder showLoadingAnimation customPlaceholder={phrasialPlaceholderTemplate} ready={this.state.foodstuffs !== null}>
                            <AwaitingTable foodstuffs={this.state.foodstuffs} handleChange={this.handleChange}/>
                        </ReactPlaceholder>
                    </div>
                </div>
            </>
        );
    }
}