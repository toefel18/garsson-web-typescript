import React, {useState} from 'react';
import {Button, Form, Message} from "semantic-ui-react";
import {LoginInterface, RouteProps} from "../interfaces/interfaces";
import {withRouter} from "react-router";

const LoginForm: React.FC<LoginInterface & RouteProps> = (props) => {

    const [username, setUsername] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [error, setError] = useState<string | undefined>()

    const login = () => {
        setError(undefined)
        props.doLogin(username, password)
            .then(user => {
                console.log(`succesfully logged in ${user.name}`)
                props.history.push("/profile")
            })
            .catch(err => {
                setError(err)
            })
    }

    return <div style={{margin: 'auto', width: '250px', textAlign: "left"}}>
        <Form>
            <Form.Field>
                <label>Email</label>
                <input name="username" placeholder="aaa@bbb.ccc" value={username}
                       onChange={(e) => setUsername(e.target.value)}/>
            </Form.Field>
            <Form.Field>
                <label>Password</label>
                <input name="password" type="password" value={password}
                       onChange={(e) => setPassword(e.target.value)}/>
            </Form.Field>
            <Button primary type="submit" onClick={login}>Login</Button>
        </Form>
        {error && <Message error={true}>{error}</Message>}
    </div>
}

export default withRouter(LoginForm);
