import React, { Component } from 'react';
import ResetPasswordFormContainer from "containers/ResetPasswordFormContainer/ResetPasswordFormContainer";

export class ResetPassword extends Component {
    render() {
        return (
            <>
                <p>Reset password</p>
                <ResetPasswordFormContainer />
            </>
        );
    }
}