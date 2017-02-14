import React from 'react';
import Event from './Event.jsx'
import EventModel from '../../models/EventModel.js'
import {TransitionMotion, spring, presets} from 'react-motion';
import ErrorMessage from '../ErrorMessage.jsx'

class Calendar extends React.Component {

  render() {
    return (
      <div>
        <ErrorMessage noEvents={this.props.events.length === 0} error={this.props.hasError}/>
        <TransitionMotion defaultStyles={this.getDefaultStyles()} styles={this.getStyles()}
                          willEnter={Calendar.willEnter}>
          {styledEvents =>
            <div className="timeline">
              <div className="timeline-hline"></div>
              {styledEvents.map(({style, key, data}) => {
                return (<Event key={key} style={style} showMedia={this.props.showMedia} {...data} />);
              })}
            </div>
          }
        </TransitionMotion>
      </div>
    );
  }

  getDefaultStyles() {
    return this.props.events.map(e => {
      let { id, ...others } = e;
      return {
        key: id,
        style: {
          maxHeight: 0,
          opacity: 1
        },
        data: {
          getPrintFields: e.getPrintFields.bind(e),
          getRawDescriptionMarkup: e.getRawDescriptionMarkup.bind(e),
          ...others
        }
      };
    });
  }

  getStyles() {
    return this.props.events.map(e => {
      let { id, ...others } = e;
      return {
        key: id,
        style: {
          maxHeight: spring(2000, presets.gentle),
          opacity: spring(1, presets.gentle)
        },
        data: {
          getPrintFields: e.getPrintFields.bind(e),
          getRawDescriptionMarkup: e.getRawDescriptionMarkup.bind(e),
          ...others
        }
      };
    });
  }

  static willEnter() {
    return {
      maxHeight: 0,
      opacity: 1,
    };
  }
}

Calendar.propTypes = {
  events: React.PropTypes.arrayOf(React.PropTypes.instanceOf(EventModel)).isRequired,
  showMedia: React.PropTypes.bool,
  hasError: React.PropTypes.bool
};
Calendar.defaultProps = {
  showMedia: true,
  hasError: false
};

export default Calendar;