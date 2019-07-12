import React from 'react'
import { LoggedInUser, LogoutInterface, RouteProps } from '../interfaces/interfaces'
import { withRouter } from 'react-router'

export interface ProfileInterface extends LogoutInterface, LoggedInUser, RouteProps {}

const Profile: React.FC<ProfileInterface> = props => {
    const doLogout = () => {
        props.doLogout()
        props.history.push('/login')
    }

    if (props.user) {
        return (
            <div style={{ margin: 'auto', width: '250px', textAlign: 'left' }}>
                Logged in as {props.user.name} with roles {props.user.roles}
                <button onClick={doLogout}>Logout</button>
            </div>
        )
    } else {
        return <div>Not logged in</div>
    }
}

export default withRouter(Profile)
