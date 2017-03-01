/**
 * Created by Bruno on 22/02/2017.
 */
import { Mongo } from 'meteor/mongo';
import validUrl from 'valid-url';
import { check, Match } from 'meteor/check';

const Links = new Mongo.Collection('links');

Meteor.methods({
   'link.insert': (url) => {
       console.log(url);
       check(url, Match.Where(url => validUrl.isUri(url)));
       // We're ready to save the url
       const token = Math.random().toString(36).slice(-5);
       Links.insert({url, token, clicks: 0});
   }
});

/*Links.schema = new SimpleSchema({
    full: {
        type: String,
        label: 'Long URL',
        regEx: SimpleSchema.RegEx.Url
    },
    short: {
        type: String,
        label: 'Short URL',
        regEx: SimpleSchema.RegEx.Url
    }
});*/

//exportado para os 2 main.js

export { Links };

//# meteor remove insecure

