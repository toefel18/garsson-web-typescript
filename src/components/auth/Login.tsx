import React, {useState} from 'react';
import {Button, Form, Message} from "semantic-ui-react";
import {LoginInterface, LogoutInterface} from "../../interfaces/interfaces";
import UserContext from "../../context/UserContext";

const Login: React.FC<LoginInterface & LogoutInterface> = (props) => {

    const [username, setUsername] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [error, setError] = useState<string | undefined>()

    const login = () => {
        setError(undefined)
        props.doLogin(username, password)
            .catch(err => {
                setError(err)
            })
    }

    return (
        <UserContext.Consumer>
            {user => {
                if (user) {
                    return <div style={{margin: 'auto', width: '250px', textAlign: "left"}}>
                        Logged in as {user.name} with roles {user.roles}
                        <button onClick={props.doLogout}>Logout</button>
                    </div>
                } else {
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
            }
            }
        </UserContext.Consumer>
    );
}

export default Login;
