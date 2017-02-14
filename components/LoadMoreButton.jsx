import React from 'react';
import classnames from 'classnames';

const LoadMoreButton = (props) => {
  let classes = classnames('btn btn-lg btn-3d btn-reveal btn-primary', {
    hide: props.hide
  });
  return (
    <div className="text-center">

      <a onClick={props.onLoadMore} className={classes}>
        <i className="fa fa-calendar-plus-o"/>
        <span>Load More</span>
      </a>
    </div>
  )
};

LoadMoreButton.propTypes = {
  onLoadMore: React.PropTypes.func.isRequired,
  hide: React.PropTypes.bool
};

LoadMoreButton.defaultProps = {
  hide: false
};

export default LoadMoreButton;