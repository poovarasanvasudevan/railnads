import React, {Fragment} from 'react';
import LoginBG from '../../assets/images/nbg.png';
import Logo from '../../assets/images/logo.png';
import Button from '@atlaskit/button';
import TextField from '@atlaskit/textfield';

import Form, {
    ErrorMessage,
    Field,
    FormFooter,
    HelperMessage,
} from '@atlaskit/form';
import {Action, ContextStore} from "../../core/context";
import {useNavigate} from "react-router-dom";

export default function Login(props) {

    const {dispatch} = React.useContext(ContextStore);

    const onSubmit = (data) => {
        dispatch({
            type: Action.LOGIN,
            username: data.username,
            password: data.password,
            callback: (user, error) => {
                if (error == null) {
                    window.location.href = "/home";
                }
            }
        });
    };

    return (
        <div className="flex h-screen flex-row bg-product">

            <div className="w-4/6  h-full" style={{
                background: `url(${LoginBG}) no-repeat`,
                backgroundSize: "auto 400px",
                backgroundPosition: "center center"
            }}>

            </div>
            <div className="w-2/6 flex">
                <div className="bg-white rounded-md m-8 p-8 shadow flex-1">
                    <img src={Logo} alt={"Logo"} className="w-2/4"/>

                    <Form onSubmit={onSubmit}>
                        {({formProps, submitting}) => (
                            <form {...formProps}>
                                <Field
                                    name="username"
                                    label="User name"
                                    isRequired
                                    defaultValue="hello"
                                >
                                    {({fieldProps, error}) => (
                                        <Fragment>
                                            <TextField autoComplete="off" {...fieldProps} />
                                            {!error && (
                                                <HelperMessage>
                                                    You can use letters, numbers & periods.
                                                </HelperMessage>
                                            )}
                                            {error && (
                                                <ErrorMessage>
                                                    This user name is already in use, try another one.
                                                </ErrorMessage>
                                            )}
                                        </Fragment>
                                    )}
                                </Field>
                                <Field
                                    name="password"
                                    label="Password"
                                    defaultValue=""
                                    isRequired
                                >
                                    {({fieldProps, error, valid, meta}) => (
                                        <Fragment>
                                            <TextField type="password" {...fieldProps} />
                                        </Fragment>
                                    )}
                                </Field>
                                <FormFooter>

                                    <Button type="submit" appearance="primary" isLoading={submitting}>
                                        Sign up
                                    </Button>
                                </FormFooter>
                            </form>
                        )}
                    </Form>
                </div>
            </div>
        </div>
    );
}
