import React from 'react';
import PropTypes from 'prop-types';
import { padLeft, range } from '../utility';

class MonthPicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      selectedYear: this.props.year,
    };
  }

  componentDidMount() {
    document.addEventListener('click', this.handleClick, false);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleClick, false);
  }

  handleClick = (event) => {
    if (this.node.contains(event.target)) {
      return;
    }
    this.setState({
      isOpen: false,
    });
  }

  toggleDropdown = (event) => {
    const { isOpen } = this.state;
    event.preventDefault();
    this.setState({
      isOpen: !isOpen,
    });
  }

  selectYear = (event, yearNumber) => {
    event.preventDefault();
    this.setState({
      selectedYear: yearNumber,
    });
  }

  selectMonth = (event, monthNumber) => {
    event.preventDefault();
    this.setState({
      isOpen: false,
    });
    this.props.onChange(this.state.selectedYear, monthNumber);
  }

  render() {
    const { year, month } = this.props;
    const { isOpen, selectedYear } = this.state;
    const monthRange = range(12, 1);
    const yearRange = range(9, -4).map(number => number + year);
    return (
      <div className="dropdown month-picker-component" ref={(ref) => { this.node = ref; }}>
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
            <div className="row">
              <div className="col border-right years-range">
                {
                  yearRange.map((yearNumber, index) => (
                    <div
                      key={index}
                      role="button"
                      className={(yearNumber === selectedYear) ? 'dropdown-item active text-white' : 'dropdown-item'}
                      onClick={e => this.selectYear(e, yearNumber)}
                    >
                      {`${yearNumber} 年`}
                    </div>
                  ))
                }
              </div>
              <div className="col months-range">
                {
                  monthRange.map((monthNumber, index) => (
                    <div
                      key={index}
                      role="button"
                      className={(monthNumber === month) ? 'dropdown-item active text-white' : 'dropdown-item'}
                      onClick={e => this.selectMonth(e, monthNumber)}
                    >
                      {`${padLeft(monthNumber)} 月`}
                    </div>
                  ))
                }
              </div>
            </div>
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
  onChange: PropTypes.func.isRequired,
};

MonthPicker.defaultProps = {
};

export default MonthPicker;
