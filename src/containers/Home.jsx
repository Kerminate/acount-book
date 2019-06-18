import React, { Component, Fragment } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import PriceList from '../components/PriceList';
import ViewTab from '../components/ViewTab';
import MonthPicker from '../components/MonthPicker';
import TotalPrice from '../components/TotalPrice';
import CreateBtn from '../components/CreateBtn';
import {
  LIST_VIEW, TYPE_OUTCOME, parseToYearAndMonth, padLeft,
} from '../utility';
import logo from '../logo.svg';

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

const newItem = {
  id: 4,
  title: '新添加的项目',
  price: 300,
  date: '2019-06-10',
  cid: 1,
};

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: accItems,
      currentDate: parseToYearAndMonth(),
      tableView: LIST_VIEW,
    };
  }

  changeView = (view) => {
    this.setState({
      tableView: view,
    });
  }

  changeDate = (year, month) => {
    this.setState({
      currentDate: { year, month },
    });
  }

  modifyItem = (modifiedItem) => {
    const { items } = this.state;
    const modifiedItems = items.map((item) => {
      if (item.id === modifiedItem.id) {
        return { ...item, title: '更新后的标题' };
      }
      return item;
    });
    this.setState({
      items: modifiedItems,
    });
  }

  deleteItem = (deletedItem) => {
    const { items } = this.state;
    const filteredItems = items.filter(item => item.id !== deletedItem.id);
    this.setState({
      items: filteredItems,
    });
  }

  createItem = () => {
    this.setState(prevState => ({
      items: [newItem, ...prevState.items],
    }));
  }

  render() {
    const { items, currentDate, tableView } = this.state;
    const itemsWithCategory = items.map((item) => {
      // eslint-disable-next-line no-param-reassign
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
          <ViewTab
            activeTab={tableView}
            onTabChange={this.changeView}
          />
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

export default Home;
