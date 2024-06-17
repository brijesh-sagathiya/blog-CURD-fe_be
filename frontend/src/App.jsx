import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import setAuthToken from './utils/setAuthToken';
import PrivateRoute from './components/routing/PrivateRoute';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import BlogList from './components/blog/BlogList';
import AddBlog from './components/blog/AddBlog';
import EditBlog from './components/blog/EditBlog';
import './App.css';

if (localStorage.token) {
    setAuthToken(localStorage.token);
}

const App = () => {
    return (
        <Provider store={store}>
            <Router>
                <div className="App">
                    <Route exact path="/" />
                    <section className="container">
                        <Switch>
                            <Route exact path="/login" component={Login} />
                            <Route exact path="/signup" component={Signup} />
                            <PrivateRoute exact path="/blogs" component={BlogList} />
                            <PrivateRoute exact path="/add-blog" component={AddBlog} />
                            <PrivateRoute exact path="/edit-blog/:id" component={EditBlog} />
                        </Switch>
                    </section>
                </div>
            </Router>
        </Provider>
    );
};

export default App;
