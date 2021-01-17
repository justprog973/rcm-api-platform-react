/*
 * Welcome to your app's main JavaScript file!
 *
 * We recommend including the built version of this JavaScript file
 * (and its CSS file) in your base layout (base.html.twig).
 */

import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Switch, Route } from "react-router-dom";
// any CSS you import will output into a single css file (app.css in this case)
import 'bootstrap/dist/css/bootstrap.min.css';
import 'antd/dist/antd.css';
import '../styles/app.css';

// start the Stimulus application
import '../bootstrap';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import CustomersPage from './pages/CustomersPage';
import InvoicesPage from './pages/IvoicesPage';


const App = () => {
    return <HashRouter>
                <Navbar/>
                <main className="container pt-5">
                    <Switch>
                        <Route path="/invoices" component={InvoicesPage}/>
                        <Route path="/customers" component={CustomersPage}/>
                        <Route path="/" component={HomePage}/>
                    </Switch>
                </main>
            </HashRouter>;
}

const rootElement = document.querySelector("#app");
ReactDOM.render(<App />, rootElement);