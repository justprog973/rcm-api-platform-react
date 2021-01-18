/*
 * Welcome to your app's main JavaScript file!
 *
 * We recommend including the built version of this JavaScript file
 * (and its CSS file) in your base layout (base.html.twig).
 */

import 'antd/dist/antd.css';
// any CSS you import will output into a single css file (app.css in this case)
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Route, Switch, withRouter } from "react-router-dom";
// start the Stimulus application
import '../bootstrap';
import '../styles/app.css';
import Navbar from './components/Navbar';
import PrivateRoute from './components/PrivateRoute';
import AuthContext from './contexts/AuthContext';
import CustomersPage from './pages/CustomersPage';
import HomePage from './pages/HomePage';
import InvoicesPage from './pages/IvoicesPage';
import LoginPage from './pages/LoginPage';
import AuthAPI from './services/authAPI';


AuthAPI.setUp();

const App = () => {

    const [isAuthenticated, setIsAuthenticated] = useState(AuthAPI.isAuthenticated());

    const NavbarWhitRouter = withRouter(Navbar);

    return (
        <AuthContext.Provider value={{isAuthenticated, setIsAuthenticated}}>
            <HashRouter>
                <NavbarWhitRouter />
                <main className="container pt-5">
                    <Switch>
                        <Route path="/login" component={LoginPage}/>
                        <PrivateRoute path="/invoices" component={InvoicesPage}/>
                        <PrivateRoute path="/customers" component={CustomersPage}/>
                        <Route path="/" component={HomePage}/>
                    </Switch>
                </main>
            </HashRouter>
        </AuthContext.Provider>
    );
}

const rootElement = document.querySelector("#app");
ReactDOM.render(<App />, rootElement);