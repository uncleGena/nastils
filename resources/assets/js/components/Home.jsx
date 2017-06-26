import React from 'react';

// import axios from 'axios';

// import MobileTearSheet from '../../../MobileTearSheet';
import {List, ListItem} from 'material-ui/List';
import ContentInbox from 'material-ui/svg-icons/content/inbox';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import ContentSend from 'material-ui/svg-icons/content/send';
import ContentDrafts from 'material-ui/svg-icons/content/drafts';
import Divider from 'material-ui/Divider';
import ActionInfo from 'material-ui/svg-icons/action/info';

import RaisedButton from 'material-ui/RaisedButton';

import $ from 'jquery';


export default class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  createNewSpendType = () => {
    $.ajax({
      url: '/api/clients/',
      // url: '/api/spend-types/',
      method: 'POST',
      data: {
        // group: `${Math.floor(Math.random() * 1000)} test group`,
        // type: `${Math.floor(Math.random() * 1000)} test type`
        name: `${Math.floor(Math.random() * 1000)} test name`,
        note: `${Math.floor(Math.random() * 1000)} test note`
      },
      headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
      }
    }).then(data => {
      console.log('SUCCESS', data);
    }, err => {
      console.warn('NOT WORK', err.responseText);
    });
  }

  showAllSpendTypes = () => {
    $.ajax({
      url: '/api/spend-types',
      method: 'GET',
      headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
      }
    }).then(data => {
      console.log('SUCCESS show', data);
    }, (err, text) => {
      console.warn('show NOT WORK', text);
    });
  }

  render() {
    return (
      <div>

        <h2>HOME</h2>
        <RaisedButton onClick={this.createNewSpendType} label="create new spend type" primary={true} />
        <br/>
        <br/>
        <RaisedButton onClick={this.showAllSpendTypes} label="show all spend types" primary={true} />

      </div>
    )
  }

}
