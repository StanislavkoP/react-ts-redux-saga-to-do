import React, {Component} from 'react';
import SignUpFormContainer from "containers/SignUpFormContainer/SignUpFormContainer";

export class SignUp extends Component {
    render() {
        return (
            <>
                <p>Sign Up</p>
                <SignUpFormContainer />
            </>
        );
    }
}