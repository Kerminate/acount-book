import React from 'react';
import PropTypes from 'prop-types';
import { padLeft } from '../utility';

class MonthPicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    };
  }

  toggleDropdown = (event) => {
    const { isOpen } = this.state;
    event.preventDefault();
    this.setState({
      isOpen: !isOpen,
    });
  }

  render() {
    const { year, month } = this.props;
    const { isOpen } = this.state;
    return (
      <div className="dropdown month-picker-component">
        <h4>选择月份</h4>
        <button
          type="button"
          className="btn btn-lg btn-secondary dropdown-toggle"
          onClick={this.toggleDropdown}
        >
          {`${year}年 ${padLeft(month)}月`}
        </button>
        {
          isOpen
          && (
          <div className="dropdown-menu" style={{ display: 'block' }}>
            <h2>Hello world</h2>
          </div>
          )
        }
      </div>
    );
  }
}

MonthPicker.propTypes = {
  year: PropTypes.number.isRequired,
  month: PropTypes.number.isRequired,
};

MonthPicker.defaultProps = {
};

export default MonthPicker;
