/**
 * Created by Bruno on 01/03/2017.
 */

import React from 'react';
import Tracker from 'tracker-component';
import { Links } from '../../imports/collections/links';

export default class LinkList extends Tracker.Component {

    constructor(props){
        super(props);
        this.subscribe('links');
        this.autorun(() => {
            this.setState( { links: Links.find({}).fetch() })
        })
    }

    render(){
        return (
            <table className="table">
                <thead>
                    <tr>
                        <th>URL</th>
                        <th>Adress</th>
                        <th>Clicks</th>
                    </tr>
                </thead>
                <tbody>
                {this.state.links.map( link => {
                    const { url, token, clicks } = link;
                    return (
                        <tr key={token}>
                            <td>{url}</td>
                            <td>
                                <a href={`http://localhost:3000/${token}`}> {`http://localhost:3000/${token}`} </a>
                            </td>
                            <td>{clicks}</td>
                        </tr>
                    );
                })}
                </tbody>
            </table>
        )
    }
}


