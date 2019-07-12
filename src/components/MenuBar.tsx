import React from 'react'
import { Menu } from 'semantic-ui-react'
import { LoggedInUser, RouteProps } from '../interfaces/interfaces'
import { Link, withRouter } from 'react-router-dom'

export interface MenuBarProps extends LoggedInUser, RouteProps {}

const MenuBar: React.FC<MenuBarProps> = props => {
    const renderMenuItem = (title: string, linkTo: string, position: 'left' | 'right' | undefined = undefined) => {
        return (
            props.user && (
                <Menu.Item name={title} active={props.location.pathname === linkTo} position={position}>
                    <Link to={linkTo}>{title}</Link>
                </Menu.Item>
            )
        )
    }

    return (
        <Menu style={{ margin: '0px' }}>
            {renderMenuItem('Orders', '/orders')}
            {renderMenuItem('New Order', '/new-order')}
            {renderMenuItem('Products', '/products')}
            {!props.user && renderMenuItem('Login', '/login', 'right')}
            {props.user && renderMenuItem(props.user.name, '/profile', 'right')}
            {/*{<Menu.Item*/}
            {/*    name='username'*/}
            {/*    active={props.location.pathname === "/login"}*/}
            {/*    position="right"*/}
            {/*>*/}
            {/*    <Link to="/login">{props.user ? props.user.name : "LoginLogout"}</Link>*/}
            {/*</Menu.Item>*/}
            {/*}*/}
        </Menu>
    )
}

export default withRouter(MenuBar)
