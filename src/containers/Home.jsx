import React, { Component, Fragment } from 'react';
import Ionicon from 'react-ionicons';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.min.css';
import PriceList from '../components/PriceList';
import MonthPicker from '../components/MonthPicker';
import TotalPrice from '../components/TotalPrice';
import CreateBtn from '../components/CreateBtn';
import { Tabs, Tab } from '../components/Tabs';
import {
  LIST_VIEW, TYPE_OUTCOME, parseToYearAndMonth, padLeft, CHART_VIEW,
} from '../utility';
import logo from '../logo.svg';
// eslint-disable-next-line import/no-cycle
import withContext from '../WithContext';

export const categories = {
  1: {
    id: '1',
    name: '旅行',
    type: 'outcome',
    iconName: 'ios-plane',
  },
  2: {
    id: '2',
    name: '理财',
    type: 'income',
    iconName: 'logo-yen',
  },
};

export const accItems = [
  {
    id: 1,
    title: '去云南旅游',
    price: 200,
    date: '2019-03-10',
    cid: 1,
  },
  {
    id: 2,
    title: '去云南旅游',
    price: 300,
    date: '2019-06-10',
    cid: 1,
  },
  {
    id: 3,
    title: '理财收入',
    price: 200,
    date: '2019-06-10',
    cid: 2,
  },
];


const tabsText = [LIST_VIEW, CHART_VIEW];

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: accItems,
      currentDate: parseToYearAndMonth(),
      tableView: tabsText[0],
    };
  }

  changeView = (index) => {
    this.setState({
      tableView: tabsText[index],
    });
  }

  changeDate = (year, month) => {
    this.setState({
      currentDate: { year, month },
    });
  }

  modifyItem = (item) => {
    this.props.history.push(`/edit/${item.id}`);
  }

  deleteItem = (item) => {
    this.props.actions.deleteItem(item);
  }

  createItem = () => {
    this.props.history.push('/create');
  }

  render() {
    const { items, currentDate, tableView } = this.state;
    const itemsWithCategory = items.map((item) => {
      item.category = categories[item.cid];
      return item;
    }).filter(item => item.date.includes(`${currentDate.year}-${padLeft(currentDate.month)}`));
    let totalIncome = 0;
    let totalOutcome = 0;
    itemsWithCategory.forEach((item) => {
      if (item.category.type === TYPE_OUTCOME) {
        totalOutcome += item.price;
      } else {
        totalIncome += item.price;
      }
    });
    return (
      <Fragment>
        <div className="App-header">
          <div className="row mb-5 justify-content-center">
            <img src={logo} className="App-logo" alt="logo" />
          </div>
          <div className="row">
            <div className="col">
              <MonthPicker
                year={currentDate.year}
                month={currentDate.month}
                onChange={this.changeDate}
              />
            </div>
            <div className="col">
              <TotalPrice
                income={totalIncome}
                outcome={totalOutcome}
              />
            </div>
          </div>
        </div>
        <div className="content-area py-3 px-3">
          <Tabs activeIndex={0} onTabChange={this.changeView}>
            <Tab>
              <Ionicon
                className="rounded-circle mr-2"
                fontSize="25px"
                color="#007bff"
                icon="ios-paper"
              />
              列表模式
            </Tab>
            <Tab>
              <Ionicon
                className="rounded-circle mr-2"
                fontSize="25px"
                color="#007bff"
                icon="ios-pie"
              />
              图表模式
            </Tab>
          </Tabs>
          <CreateBtn onClick={this.createItem} />
          { tableView === LIST_VIEW
            && (
            <PriceList
              items={itemsWithCategory}
              onModifyItem={this.modifyItem}
              onDeleteItem={this.deleteItem}
            />
            )
          }
        </div>
      </Fragment>
    );
  }
}

Home.propTypes = {
  history: PropTypes.any.isRequired,
  actions: PropTypes.any.isRequired,
};

export default withRouter(withContext(Home));
