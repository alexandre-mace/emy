import React from 'react';
import {findGivenByUser} from "../../../actions/foodstuff/findGivenByUser";
import {findReceivedByUser} from "../../../actions/foodstuff/findReceivedByUser";
import DashboardHeader from "../header/DashboardHeader.jsx";
import ReactPlaceholder from 'react-placeholder';
import "react-placeholder/lib/reactPlaceholder.css";
import GivenAndReceivedTable from "./GivenAndReceivedTable";
import phrasialPlaceholderTemplate from "../../block/phrasialPlaceholderTemplate";
import { authenticationService } from '../../../services/index';

export default class GivenAndReceivedDashboard extends React.Component {
    constructor(){
        super();
        this.state = {
            refresh: null,
            foodstuffs: null
        };
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange = () => {
        this.setState({
            refresh: true
        })
    };

    static triggerAllFetches(userId) {
        return Promise.all([
            findGivenByUser(userId),
            findReceivedByUser(userId)
        ])
    }
    componentDidMount = () => {
        const currentUser = authenticationService.currentUserValue;
        if (currentUser) {
            GivenAndReceivedDashboard.triggerAllFetches(currentUser['@id'])
                .then(values => {
                    this.setState({
                        foodstuffs: [...new Set([...values[0]['hydra:member'],...values[1]['hydra:member']])],
                    })
                })
        }
    }
    componentDidUpdate() {
        if (this.state.refresh) {
            const currentUser = authenticationService.currentUserValue;
            if (currentUser) {
                GivenAndReceivedDashboard.triggerAllFetches(currentUser['@id'])
                    .then(values => {
                        this.setState({
                            foodstuffs: [...new Set([...values[0]['hydra:member'],...values[1]['hydra:member']])],
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
                            <GivenAndReceivedTable foodstuffs={this.state.foodstuffs} handleChange={this.handleChange} />
                        </ReactPlaceholder>
                    </div>
                </div>
            </>
        );
    }
}