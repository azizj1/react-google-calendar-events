//noinspection NpmUsedModulesInstalled
import $ from 'jQuery';
import React from 'react';
import ReactBootstrapToggle from 'react-bootstrap-toggle'
import classnames from 'classnames';

class SearchBar extends React.Component {

  render() {
    return (
      <div className="inline-search clearfix margin-bottom-30">
        <input type="search" placeholder="Start Searching..." className="search-input" ref={(r) => this.searchBox = r}/>
        <button type="submit" onClick={this.handleSubmit.bind(this)}>
          <i className="fa fa-search"/>
        </button>
      </div>
    )
  }

  handleSubmit() {
    console.log(this.searchBox.value);
    this.props.onSearch(this.searchBox.value);
  }
}

SearchBar.propTypes = {
  onSearch: React.PropTypes.func.isRequired
};

const Toggle = (props) => {
  let classes = classnames('padding-6', props.className);
  return(
    <div className={classes}>
      <span className="pull-right event-toggle">
        <ReactBootstrapToggle on="Shown" off="Hidden" active={props.initialToggle} height="33px" className="pull-right"
                              onChange={props.onToggle}/>
      </span>
      <span className="event-toggle-title">{props.label}</span>
    </div>
  )
};

Toggle.propTypes = {
  initialToggle: React.PropTypes.bool,
  onToggle: React.PropTypes.func.isRequired,
  label: React.PropTypes.string.isRequired,
  className: React.PropTypes.string
};

Toggle.defaultProps = {
  initialToggle: true
};

// const RegularEventsButton = () => {
//   return (
//     <a href="#" className="btn btn-3d btn-lg btn-red">
//       Regular Events Shown
//       <span className="font block font-lato">Click here to hide</span>
//     </a>
//   );
// };

class DatePicker extends React.Component {
  constructor(props) {
    super(props);
    this.divId = 'datepicker';
  }
  render() {
    return (
      <div className="side-nav margin-bottom-30 margin-top-30">

        <div className="side-nav-head">
          <button className="fa fa-bars"/>
          <h4>FILTER BY START DATE</h4>
        </div>
        <div id={this.divId} data-date={new Date()}></div>
      </div>
    );
  }
  componentDidMount() {
    $(`#${this.divId}`).datepicker({
      todayHighlight: true,
      todayBtn: 'linked'
    })
      .on('changeDate', this.props.onDateChange);
  }
}

DatePicker.propTypes = {
  onDateChange: React.PropTypes.func.isRequired
};
const Filters = (props) => {
  return (
    <div>
      <SearchBar onSearch={props.onSearch}/>
      <hr/>
      <DatePicker onDateChange={props.onStartDateChange}/>
      <hr />
      <Toggle className="margin-bottom-10" onToggle={props.onRegularEventsToggle}
              initialToggle={props.initShowRegularEvents} label='REGULAR EVENTS'/>
      <Toggle onToggle={props.onMediaToggle} initialToggle={props.initShowMedia} label='MEDIA AND FLYERS'/>
    </div>
  )
};

Filters.propTypes = {
  onRegularEventsToggle: React.PropTypes.func.isRequired,
  initShowRegularEvents: React.PropTypes.bool,
  onSearch: React.PropTypes.func.isRequired,
  onStartDateChange: React.PropTypes.func.isRequired,
  onMediaToggle: React.PropTypes.func.isRequired,
  initShowMedia: React.PropTypes.bool
};

Filters.defaultProps = {
  initShowRegularEvents: true,
  initShowMedia: true
};

export default Filters;

