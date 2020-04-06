import React, {Component} from 'react';
import SignInFormContainer from "containers/SignInFormContainer/SignInFormContainer";

export class SignIn extends Component {
    render() {
        return (
            <>
                <p>Sign In</p>
                <SignInFormContainer />
            </>
        );
    }
}