import React, { Component } from 'react';
import '../../scss/ToastModal.scss';

class RecipeModal extends Component {
    state = {
        display: false,
        meal: '',
        day: ''
    }

    componentDidUpdate(_prevP, prevS) {
        (prevS.display === false) && this.props.toast &&
        this.setState({
            display: true,
        });

        prevS.display===true&&this.state.display===true&&
        setTimeout(()=>this.setState({
            display: false,
        }), 3000)
    }

    render() {
        return (
            <div className="toast" style={{ display: this.state.display ? "initial" : "none" }}>
                <div className="toast__frame">
                    <h1>Successfully added meal!</h1>
                </div>
            </div>
        );
    }
}

export default RecipeModal;