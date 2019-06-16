import React from 'react'
import PropTypes from 'prop-types';
import Ionicon from 'react-ionicons';
import { LIST_VIEW, CHART_VIEW } from '../utility'

const generateLinkClass = (current, view) => {
  return (current === view) ? 'nav-link active' : 'nav-link';
}

const ViewTab = ({ activeTab, onTabChange }) => {
  return (
    <ul className="nav nav-tabs nav-fill my-4">
      <li className="nav-item">
        <p
          className={generateLinkClass(activeTab, LIST_VIEW)}
          onClick={(event) => {
            event.preventDefault();
            onTabChange(LIST_VIEW);
          }}
        >
          <Ionicon
            className='rounded-circle mr-2'
            fontSize="25px"
            color={'#007bff'}
            icon='ios-paper'
          />
          列表模式
        </p>
      </li>
      <li className="nav-item">
        <p
          className={generateLinkClass(activeTab, CHART_VIEW)}
          onClick={(event) => {
            event.preventDefault();
            onTabChange(CHART_VIEW);
          }}
        >
          <Ionicon
            className='rounded-circle mr-2'
            fontSize="25px"
            color={'#007bff'}
            icon='ios-pie'
          />
          列表模式
        </p>
      </li>
    </ul>
  )
}

ViewTab.propTypes = {
  activeTab: PropTypes.string.isRequired,
  onTabChange: PropTypes.func.isRequired,
}

ViewTab.defaultProps = {
}

export default ViewTab;