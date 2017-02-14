import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/main-page/App.jsx'

const calendarId = 'mmwconline.org_5klbp23b863vugjopsb617d6d0@group.calendar.google.com';
const initShowRegularEvents = false;
const initMaxResults = 3;

ReactDOM.render(
  <App calendarId={calendarId} initShowRegularEvents={initShowRegularEvents} maxResults={initMaxResults}/>,
  document.getElementById('event-app'));