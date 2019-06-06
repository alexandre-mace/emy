import React, { Component } from 'react';
import './NotificationsTotal.scss'

class NotificationsTotal extends Component {
    constructor(props) {
        super(props)
        this.state = {
        };
    }

    render() {
        return (
            <>
                {this.props.notificationsTotal !== null &&
                    <span className="notifications-total">
                        <span className="m-auto">{this.props.notificationsTotal}</span>
                    </span>
                }
            </>
        )
    }
}

export default NotificationsTotal;