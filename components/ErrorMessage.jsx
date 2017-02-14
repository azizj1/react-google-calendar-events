import React from 'react';
import classnames from 'classnames';

const ErrorMessage = (props) => {
  let classes = classnames('alert alert-danger margin-bottom-30', {
    hide: !props.error && !props.noEvents
  });
  return (
    <div className={classes}>
      <strong>Oh snap! </strong>
      {props.error ?
        (<span>There was an error trying to load the events. Please try again later.</span>) :
        (
          <span>There are no upcoming events for the foreseeable future.
            Please <a href="/contact" className="text-danger" style={{textDecoration: 'underline'}}>contact us</a> for
            more details.
          </span>
        )
      }
    </div>
  )
};

ErrorMessage.propTypes = {
  error: React.PropTypes.bool,
  noEvents: React.PropTypes.bool
};

ErrorMessage.defaultProps = {
  error: false,
  noEvents: false
};

export default ErrorMessage;