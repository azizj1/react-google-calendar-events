import React from 'react';
import classnames from 'classnames';

const Preloader = (props) => {
  let classes = classnames({hide: props.hide});
  return (
    <div id="preloader" className={classes}>
      <div className="inner">
        <span className="loader"/>
      </div>
    </div>
  )
};

Preloader.propTypes = {
  hide: React.PropTypes.bool.isRequired
};

export default Preloader;
