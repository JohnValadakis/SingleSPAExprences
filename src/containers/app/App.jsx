import './App.css';
import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Header } from '../../components/common/Common';
import { Forms, History } from '../pages/Pages';

function App () {
    return (
        <div className="App">
            <BrowserRouter basename={'/'}>
                <Header />
                <Switch>
                    <Route exact path={"/"} component={History} />
                    <Route path={"/history"} component={History} />
                    <Route path={"/add-entry"} component={Forms} />
                </Switch>
            </BrowserRouter>
        </div>
    );
}

export default App;
