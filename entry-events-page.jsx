import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/events-page/App.jsx'

const calendarId = 'mmwconline.org_5klbp23b863vugjopsb617d6d0@group.calendar.google.com';
const initShowRegularEvents = true;
const initShowFlyers = true;
const initMaxResults = 5;

ReactDOM.render(
  <App calendarId={calendarId} initShowRegularEvents={initShowRegularEvents} maxResults={initMaxResults}
       initShowFlyers={initShowFlyers}/>,
  document.getElementById('event-app'));
