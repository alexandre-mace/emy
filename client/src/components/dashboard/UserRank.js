import React from 'react';

export default class UserRank extends React.Component {
    render() {
        return(
            <>
                <p>{this.props.user.points} points</p>
                <p>Grade {this.props.user.grade}</p>
            </>
        );
    }
}