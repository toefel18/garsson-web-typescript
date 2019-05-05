import React, {useState} from 'react';
import {Button, Form} from "semantic-ui-react";

interface LoginProps {
    doLogin: (username:string, password:string) => Promise<any>
}

const Login: React.FC<LoginProps> = (props) => {

    const [username, setUsername] = useState<string>("")
    const [password, setPassword] = useState<string>("")

    const tryLogin = () => {
        props.doLogin(username, password)
            .then()
        alert(`logging in with ${username} ${password}`)
    }

    return (
        <div style={{margin: 'auto', width: '250px', textAlign: "left"}}>
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
                <Button primary type="submit" onClick={tryLogin}>Login</Button>
            </Form>
        </div>
    );
}

export default Login;
