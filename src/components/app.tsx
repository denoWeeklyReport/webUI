import { FunctionalComponent, h } from "preact";
import { Route, Router, RouterOnChangeArgs } from "preact-router";

import Home from "../routes/home";
import Profile from "../routes/profile";
import View from "../routes/view";
import Edit from "../routes/edit";
import Write from "../routes/write";
import Login from "../routes/login";
import Reg from "../routes/reg";
import Logout from "../routes/logout";
import NotFoundPage from "../routes/notfound";
import Header from "./header";
import Footer from "./footer";
import "spectre.css";

const App: FunctionalComponent = () => {
    let currentUrl: string;
    const handleRoute = (e: RouterOnChangeArgs) => {
        currentUrl = e.url;
    };

    return (
        <div id="app">
            <Header />
            <Router onChange={handleRoute}>
                <Route path="/" component={Home} />
                <Route path="/login" component={Login} />
                <Route path="/logout" component={Logout} />
                <Route path="/reg" component={Reg} />
                <Route path="/profile/" component={Profile} />
                <Route path="/:username" component={Profile} />
                <Route path="/:username/:year/:week" component={View} />
                <Route path="/edit/:username/:year/:week" component={Edit} />
                <Route path="/write/:username" component={Write} />
                <NotFoundPage default />
            </Router>
            <Footer />
        </div>
    );
};

export default App;
