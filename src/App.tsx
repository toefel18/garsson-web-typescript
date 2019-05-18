import React from 'react';
import {
    GetOrderInterface, GetOrdersInterface,
    LoggedInUser,
    LoginInterface,
    LogoutInterface,
    OrdersInterface
} from "./interfaces/interfaces";
import LoginForm from "./components/LoginForm";
import MenuBar from "./components/MenuBar";

import {BrowserRouter as Router, Redirect, Route, Switch} from 'react-router-dom';
import NotFound from "./components/NotFound";
import Profile from "./components/Profile";
import OrdersForm from "./components/OrdersForm";

export interface AppProps extends LoginInterface,
    LogoutInterface,
    GetOrderInterface,
    LoggedInUser,
    OrdersInterface,
    GetOrdersInterface
{
}

const App: React.FC<AppProps> = (props: AppProps) => {

    return (
        <div className="App">
            <Router>
                <MenuBar user={props.user} />
                <Switch>
                    <Route path="/orders" exact={true} render={
                        (routeProps) => props.user ? <OrdersForm orders={props.orders} fetchOrders={props.fetchOrders} /> : <Redirect to="/login"/>
                    }/>
                    <Route path="/new-order" exact={true} render={
                        (routeProps) => props.user ? <div>New order</div> : <Redirect to="/login"/>
                    }/>
                    <Route path="/login" exact={true} render={
                        (routeProps) => !props.user && <LoginForm doLogin={props.doLogin} />
                    }/>
                    <Route path="/profile" exact={true} render={
                        (routeProps) => props.user && <Profile user={props.user} doLogout={props.doLogout} />
                    }/>
                    <Route component={NotFound}/>
                </Switch>
            </Router>
        </div>
    )
}

export default App;
