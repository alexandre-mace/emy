import React from 'react';

export default class UserRank extends React.Component {
    render() {
        return(
            <>
                <p>{this.props.user.points} points - Grade {this.props.user.grade}</p>
            </>
        );
    }
}