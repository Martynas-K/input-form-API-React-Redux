import React, {Component} from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import '../styles/home.css'
import {updateInput} from "../actions/inputActions";
import {validateInput} from "../actions/inputActions";
import {addApiError, addApiResult} from "../actions/apiActions";

class Home extends Component {

    handleInputChange = async (e) => {
        let input = e.target.value;
        this.props.updateInputOnChange(input);
        this.props.validateInputOnChange(input);
    };

    handleSubmit = (e) => {
        e.preventDefault();
        if (!this.props.error) {
            alert('Result is: ' + this.props.result)
        }
    };

    async componentDidMount() {
        let personData;
        let facilityData;
        let exposureData;
        let result;
        let errorsAPI = [];

        await axios.get('http://ad918e25-e72c-4029-be77-4313d3f4d79f.mock.pstmn.io/person')
            .then((res) => {
                personData = res;
            }).catch(error => {
                if (error.response) { errorsAPI.push(error.response) }
        });

        if (personData && !errorsAPI.length) {
           await axios.get('http://ad918e25-e72c-4029-be77-4313d3f4d79f.mock.pstmn.io/facility/' + personData.data.person1)
                .then((res) => {
                    facilityData = res;
                }).catch((error) => { if (error.response) { errorsAPI.push(error.response) }
            });
        }
        if (facilityData && !errorsAPI.length) {
            await axios.get('http://ad918e25-e72c-4029-be77-4313d3f4d79f.mock.pstmn.io/exposure/' + facilityData.data.facility2)
                .then((res) => {
                    exposureData = res;
                }).catch((error) => {
                    if (error.response) { errorsAPI.push(error.response) }
            });
        }

        if (errorsAPI.length) {
            let error = 'Failed to receive API data';
            let showError = true;
            this.props.addApiErrorsOnFetch(error, showError);
        } else {
            result = facilityData.data.facility2 * exposureData.data.exposure;
            this.props.addApiResultOnFetch(result);
        }
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <h2>input here</h2>
                    <input type="text" name="input"
                           placeholder="add text here"
                           value={this.props.input}
                           onChange={this.handleInputChange}/>
                    <button type="submit" className={!this.props.showButton ? "hide" : ""}>submit</button>
                    <div className={!this.props.showError ? "hide" : ""}>{this.props.error}</div>

                    <div>Result is: {this.props.result}</div>
                </form>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        input: state.input,
        error: state.error,
        inputIsValid: state.inputIsValid,
        showButton: state.showButton,
        showError: state.showError,
        result: state.result,
    }
};
const mapDispatchToProps = (dispatch) => {
  return {
        updateInputOnChange: (input) => { dispatch(updateInput(input)) },
        validateInputOnChange: (input) => { dispatch(validateInput(input)) },
        addApiErrorsOnFetch: (error, showError) => { dispatch(addApiError(error, showError)) },
        addApiResultOnFetch: (result) => { dispatch(addApiResult(result)) },
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);