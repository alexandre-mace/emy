import React from 'react';
import { authenticationService } from '../../../services/index';
import ToManageTable from './ToManageTable.jsx';
import {findToManageByUser} from "../../../actions/foodstuff/findToManageByUser";
import DashboardHeader from "../header/DashboardHeader.jsx";
import ReactPlaceholder from 'react-placeholder';
import "react-placeholder/lib/reactPlaceholder.css";
import tablePlaceholderTemplate from '../../block/tablePlaceholderTemplate.jsx';

export default class ToManageDashboard extends React.Component {
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
            findToManageByUser(userId),
        ])
    }

    componentDidMount() {
        const currentUser = authenticationService.currentUserValue;
        if (currentUser) {
            ToManageDashboard.triggerAllFetches(currentUser['@id'])
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
                ToManageDashboard.triggerAllFetches(currentUser['@id'])
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
                        <ReactPlaceholder showLoadingAnimation customPlaceholder={tablePlaceholderTemplate} ready={this.state.foodstuffs !== null}>
                            <ToManageTable foodstuffs={this.state.foodstuffs} handleChange={this.handleChange}/>
                        </ReactPlaceholder>
                    </div>
                </div>
            </>
        );
    }
}