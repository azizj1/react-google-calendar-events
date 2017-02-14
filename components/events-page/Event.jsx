import React from 'react';
import classnames from 'classnames';

function getMedia(imgUrl, ytId, showMedia) {
  let classes = classnames('margin-bottom-20', {hide: !showMedia});
  //can either have an image or a video; not both. Image takes precedence
  if (imgUrl)
    return (
      <figure className={classes}>
        <img className="img-responsive" src={imgUrl} alt=""/>
      </figure>
    );
  else if (ytId)
    return (
      <div className={classes}>
        <div className="embed-responsive embed-responsive-16by9">
          <iframe className="embed-responsive-item" src={`https://www.youtube.com/embed/${ytId}?wmode=transparent`} width="800" height="450"></iframe>
        </div>
      </div>
    );
  return null;
}

function getLocation(locationStr) {
  if (locationStr)
    return (
      <li>
        <i className="fa fa-map-marker"/>
        <span className="font-lato">{ locationStr }</span>
      </li>
    );
}

const Event = (props) => {

  let
  {   startDateStr,           // Tue, Jun 29, 2014
      startMonthStr,        // Jun
      startDayOfMonth,
      interval
    } = props.getPrintFields();

  return (
    <div style={props.style} className="blog-post-item">

      <div className="timeline-entry">
        { startDayOfMonth }<span>{ startMonthStr} </span>
        <div className="timeline-vline"></div>
      </div>

      { getMedia(props.imgUrl, props.ytId, props.showMedia) }

      <h2>{ props.title } </h2>

      <ul className="blog-post-info list-inline">
        <li>
          <i className="fa fa-calendar"/>
          <span className="font-lato">{ startDateStr }</span>
        </li>
        <li>
          <i className="fa fa-hourglass-start"/>
          <span className="font-lato">{ interval }</span>
        </li>

        { getLocation(props.location) }

      </ul>

      <div dangerouslySetInnerHTML={props.getRawDescriptionMarkup()}></div>
    </div>
  )
};

Event.propTypes = {
  title: React.PropTypes.string.isRequired,
  location: React.PropTypes.string,
  startTime: React.PropTypes.instanceOf(Date).isRequired,
  endTime: React.PropTypes.instanceOf(Date).isRequired,
  isAllDayEvent: React.PropTypes.bool.isRequired,
  description: React.PropTypes.string,
  imgUrl: React.PropTypes.string,
  ytId: React.PropTypes.string,
  style: React.PropTypes.shape({
    maxHeight: React.PropTypes.number,
    opacity: React.PropTypes.number
  }).isRequired,
  showMedia: React.PropTypes.bool,
  getPrintFields: React.PropTypes.func.isRequired,
  getRawDescriptionMarkup: React.PropTypes.func.isRequired
};
Event.defaultProps = {
  showMedia: true
};
export default Event;