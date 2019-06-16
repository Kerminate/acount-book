import React from 'react'
import PropTypes from 'prop-types';
import { Row, Col, Card, Icon } from 'antd';
import Ionicon from 'react-ionicons';
import { LIST_VIEW, CHART_VIEW } from '../utility'
import './ViewTabs.css';

const tabListNoTitle = [
  {
    key: 'article',
    tab: 'article',
  },
  {
    key: 'app',
    tab: 'app',
  },
  {
    key: 'project',
    tab: 'project',
  },
];

const contentListNoTitle = {
  article: <p>article content</p>,
  app: <p>app content</p>,
  project: <p>project content</p>,
};

const generateLinkClass = (current, view) => {
  return (current === view) ? 'nav-link active' : 'nav-link';
}

const ViewTab = ({ activeTab, onTabChange }) => {
  const noTitleKey = 'app';
  return (
    <div>
      <Row type="flex" justify="space-around">
        <Col>
          <p
            className={generateLinkClass(activeTab, LIST_VIEW)}
            onClick={(event) => {
              event.preventDefault();
              onTabChange(LIST_VIEW);
            }}
          >
            <Ionicon
              fontSize="25px"
              style={{ borderRadius: '20%' }}
              color={'#007bff'}
              icon='ios-paper'
            />
            列表模式
          </p>
        </Col>
        <Col>
          <p
            className={generateLinkClass(activeTab, CHART_VIEW)}
            onClick={(event) => {
              event.preventDefault();
              onTabChange(CHART_VIEW);
            }}
          >
            <Ionicon
              fontSize="25px"
              style={{ borderRadius: '20%' }}
              color={'#007bff'}
              icon='ios-pie'
            />
            图表模式
          </p>
        </Col>
      </Row>
      {/* <Card
          style={{ width: '100%' }}
          tabList={tabListNoTitle}
          activeTabKey={noTitleKey}
          onTabChange={key => {
            this.onTabChange(key, 'noTitleKey');
          }}
        >
          {contentListNoTitle[noTitleKey]}
        </Card> */}
    </div>
  )
}

ViewTab.propTypes = {
  activeTab: PropTypes.string.isRequired,
  onTabChange: PropTypes.func.isRequired,
}

ViewTab.defaultProps = {
}

export default ViewTab;