import React, {Component} from 'react';
import '../styles/homeOverlay.css'
import { connect } from 'react-redux';


class HomeOverlay extends Component {
     render() {
        return (
            <div className={this.props.showOverlay ? 'show' : 'hide'}>
                <div className={"overlay"}>
                    <div className={"answer-text"}>It's {this.props.result}.</div>
                    <button className={"answer-button"}
                            onClick={() => window.location.reload()}
                    >Cool.</button>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        showOverlay: state.showOverlay,
        result: state.result,
    }
};

export default connect(mapStateToProps)(HomeOverlay);