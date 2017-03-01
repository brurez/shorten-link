/**
 * Created by Bruno on 22/02/2017.
 */
import React, { Component } from 'react';
import {createContainer} from 'meteor/react-meteor-data'

/*Let's go through each one and figure out which one is state. Simply ask three questions about each piece of data:

1. Is it passed in from a parent via props? If so, it probably isn't state.
2. Does it remain unchanged over time? If so, it probably isn't state.
3. Can you compute it based on any other state or props in your component? If so, it isn't state.*/

class LinkCreate extends Component {

    constructor(props){
        super(props);
        this.state = { link: '' };
    }

    handleChange(e){
        this.setState({ link: e.target.value })
    }
    handleSubmit(e){
        //alert('Form submited: ' + this.refs.link.value);
        Meteor.call('link.insert', this.refs.link.value);
        e.preventDefault();
    }

    render() {
        return (
            <form onSubmit={(e) => this.handleSubmit(e)}>
                <div className="form-group">
                    <label>Link to shorten</label>
                    <input  ref="link"
                            className="form-control"
                            value={this.state.link}
                            onChange={(e) => this.handleChange(e)} />
                </div>
                <button className="btn btn-primary">Shorten!</button>
            </form>
        );
    }
}

export default LinkCreate;

/*export default LinkCreate = createContainer(() => {
    const links = Meteor.subscribe('links');
    return {links};
}, LinkCreate);*/
