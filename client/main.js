/**
 * Created by Bruno on 22/02/2017.
 */
import React from 'react';
import ReactDOM from 'react-dom';

import Header from './components/header';
import LinkCreate from './components/link-create';
import LinkList from './components/link-list';
import { Links } from '../imports/collections/links';

const App = () => {
    return(
        <div>
            <Header/>
            <LinkCreate/>
            <LinkList/>
        </div>
    )
};

Meteor.startup(() => {
    ReactDOM.render(<App/>, document.querySelector('.container'));
});


