import React from 'react';

export default class UserRank extends React.Component {

    render() {
    
        return(
            <>
                <p>
                    {this.props.user.points} points - Grade {this.props.user.grade}
                    {(() => {
                        if(this.props.user.grade === "platine" ){
                            return <img alt="icon bonjour" src={require('../../assets/img/rank/3.png')} className="img-rank" />
                        }else if (this.props.user.grade === "or"){
                            return <img alt="icon bonjour" src={require('../../assets/img/rank/2.png')} className="img-rank" />
                        }else{
                            return <img alt="icon bonjour" src={require('../../assets/img/rank/1.png')} className="img-rank" />
                        }
                    })()}
                </p>
            </>
        );
    }
}