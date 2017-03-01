import { Meteor } from 'meteor/meteor';
import { Links } from '../imports/collections/links';
import { WebApp } from 'meteor/webapp';
import ConnectRoute from 'connect-route';
import _ from 'lodash';

Meteor.startup(() => {
    // code to run on server at startup

    Meteor.publish('links', () => {
     return Links.find({})
     });
});

// Executed whenever a user visits with a route like
// 'localhost:3000/abcd'
function onRoute(req, res, next) {
    // Take the token out of hte url and try to a find a
    // matching link in the Links collection
    const link = Links.findOne({ token: req.params.token });

    if (link) {
        // If we find a link object, redirect the user to the
        // long URL
        Links.update(link, { $inc: { clicks: 1 }});
        res.writeHead(307, { 'Location': link.url });
        res.end();
    } else {
        // If we don't find a link object, send the user
        // to our normal React app
        next();
    }
}

const middleware = ConnectRoute(function(router) {
    router.get('/:token', onRoute);
});

//WebApp.connectHandlers.use(middleware);

WebApp.connectHandlers.use((req, res, next) => {
    if(req.originalUrl != '/') {
        /*console.log('req=', req);
         console.log('res=', res);
         console.log('next=', next);*/
        const link = Links.findOne({token: _.trim(req.originalUrl, '/')});
        if (link) {
            Links.update(link, {$inc: {clicks: 1}});
            res.writeHead(307, {'Location': link.url});
            res.end();
        } else {
            // If we don't find a link object, send the user
            // to our normal React app
            next();
        }
    }

    next();
});
