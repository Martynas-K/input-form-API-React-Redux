import React, {Component} from 'react';
import axios from 'axios';
import '../styles/home.css'

class Home extends Component {
    state = {
        input: '',
        error: '',
        inputIsValid: true,
        showButton: false,
        showError: false
    };

    handleInputChange = async (e) => {
        let input = e.target.value;
        this.setState({
            input
        }, this.handleValidation);
    };

    handleSubmit = (e) => {
        e.preventDefault();
        if (!!this.state.error) {
            this.setState({
                showError: true
            });
        } else {
            this.handleAPI();
            alert('submited')
        }


    };

    handleValidation = () =>{
        let input = this.state.input;
        let error = this.state.error;
        let showButton = true;
        let showError = false;

        if(!input){
            showButton = false;
            showError = true;
            error = "At least 3";
        }

        if(typeof input !== "undefined") {
            error = '';
            if (!input.match(/^[A-Za-z]+$/)) {
                showButton = false;
                error = "Only letters";
                showError = true;
            } else if (!input.match(/^.{0,10}$/)) {
                showButton = false;
                error = "max 10 letters";
                showError = true;
            }
        }
        this.setState({
            error,
            showButton,
            showError
        });
    };

    async componentDidMount() {
        let personData;
        let facilityData;
        let exposureData;
        await axios.get('http://ad918e25-e72c-4029-be77-4313d3f4d79f.mock.pstmn.io/person')
            .then( res => {
                personData = res;
                console.log(res)
                }
            );
        await axios.get('http://ad918e25-e72c-4029-be77-4313d3f4d79f.mock.pstmn.io/facility/' + personData.data.person1 )
            .then( res => {
                facilityData = res;
                console.log(res)
                }
            );
        await axios.get('http://ad918e25-e72c-4029-be77-4313d3f4d79f.mock.pstmn.io/exposure/' + facilityData.data.facility2 )
            .then( res => {
                exposureData = res;
                console.log(res)
                }
            );
        let result = facilityData.data.facility2 * exposureData.data.exposure;
        console.log('rezultatas' + result);
    };

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <h2>input here</h2>
                    <input type="text" name="input"
                           placeholder="add text here"
                           value={this.state.input}
                           onChange={this.handleInputChange}/>
                    <button type="submit" className={!this.state.showButton ? "hide" : ""}>submit</button>
                    <div className={!this.state.showError ? "hide" : ""}>{this.state.error}</div>
                </form>
            </div>
        );
    }
}

export default Home;