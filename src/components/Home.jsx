import React, {Component} from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import '../styles/home.css'
import {addError, updateInput, validateInput} from "../actions/inputActions";
import {addResult, addOverlay} from "../actions/resultActions";

class Home extends Component {
    handleInputChange = async (e) => {
        let input = e.target.value;
        this.props.updateInputOnChange(input);
        this.props.validateInputOnChange(input);
    };

    handleSubmit = async (e) => {
        e.preventDefault();
        let user = 'Tom',
            accessGranted = true,
            personData,
            facilityData,
            exposureData, 
            result,
            errorsAPI = [],
            showOverlay = false;

        if (this.props.input.toLowerCase() === user.toLowerCase()) {
            await axios.get('https://c01863c8-3c7b-4f7e-a7a3-5945459c6f3f.mock.pstmn.io/person/' + user.toLowerCase())
                .then((res) => {
                    personData = res;
                }).catch(error => {
                    if (error.response) {
                        errorsAPI.push(error.response)
                    }
                });
        } else { accessGranted = false }

        if (accessGranted && personData && !errorsAPI.length) {
            await axios.get('https://c01863c8-3c7b-4f7e-a7a3-5945459c6f3f.mock.pstmn.io/facility/' + personData.data.person1)
                .then((res) => {
                    facilityData = res;
                }).catch((error) => {
                    if (error.response) {
                        errorsAPI.push(error.response)
                    }
                });
        }
        if (accessGranted && facilityData && !errorsAPI.length) {
            await axios.get('https://c01863c8-3c7b-4f7e-a7a3-5945459c6f3f.mock.pstmn.io/exposure/' + facilityData.data.facility2)
                .then((res) => {
                    exposureData = res;
                }).catch((error) => {
                    if (error.response) {
                        errorsAPI.push(error.response)
                    }
                });
        }
        if (!accessGranted){
            let error = 'You are not Tom. Please go away.';
            let showError = true;
            this.props.addErrorsOnInput(error, showError);
        } else if (errorsAPI.length) {
            let error = 'Failed to receive data from API.';
            let showError = true;
            this.props.addErrorsOnInput(error, showError);
        } else {
            result = facilityData.data.facility2 * exposureData.data.exposure;
            showOverlay = true;
            this.props.addResultOnFetch(result);
            this.props.showOverlayOnValidSubmit(showOverlay);
        }
    };

    render() {
        return (
            <div className={`body ${this.props.showOverlay ? "opacity" : ""}`}>
                <form className={"form-container"} onSubmit={this.handleSubmit}>
                    <h1 className={'header'}>Ahh, Tom. We were expecting you.</h1>
                    <h2 className={'subheader'}>Please enter your name to calculate the answer to the Ultimate Question of Life, the Universe, and Everything.</h2>
                    <input className={"input-box"}
                           type="text" name="input"
                           placeholder="type up to 10 letters here..."
                           value={this.props.input}
                           onChange={this.handleInputChange}/>
                    <div className={"button-error-container"}>
                        <button type="submit" className={`button ${!this.props.showButton ? "hide" : ""}`}>Submit</button>
                        <div className={`error ${!this.props.showError ? "hide" : ""}`}>{this.props.error}</div>
                    </div>
                </form>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        input: state.input,
        error: state.error,
        showButton: state.showButton,
        showError: state.showError,
        result: state.result,
        showOverlay: state.showOverlay
    }
};

const mapDispatchToProps = (dispatch) => {
  return {
        updateInputOnChange: (input) => { dispatch(updateInput(input)) },
        validateInputOnChange: (input) => { dispatch(validateInput(input)) },
        addErrorsOnInput: (error, showError) => { dispatch(addError(error, showError)) },
        addResultOnFetch: (result) => { dispatch(addResult(result)) },
        showOverlayOnValidSubmit: (showOverlay) => { dispatch(addOverlay(showOverlay)) },
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);