import React, { Component, Fragment } from 'react';
import Ionicon from 'react-ionicons';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.min.css';
import PriceList from '../components/PriceList';
import MonthPicker from '../components/MonthPicker';
import TotalPrice from '../components/TotalPrice';
import Loader from '../components/Loader';
import CreateBtn from '../components/CreateBtn';
import { Tabs, Tab } from '../components/Tabs';
import {
  LIST_VIEW, TYPE_OUTCOME, CHART_VIEW, TYPE_INCOME,
} from '../utility';
import logo from '../logo.svg';
import withContext from '../WithContext';

const tabsText = [LIST_VIEW, CHART_VIEW];

const generateChartDataByCategory = (items, type = TYPE_OUTCOME) => {
  const categoryMap = {};
  items.filter(item => item.categories.type === type).forEach((item) => {
    if (categoryMap[item.cid]) {
      categoryMap[item.cid].value += (item.price * 1);
      categoryMap[item.cid].items = [...categoryMap[item.cid].items, item.id];
    } else {
      categoryMap[item.cid] = {
        category: item.category,
        value: item.price * 1,
        items: [item.id],
      };
    }
  });
  return Object.keys(categoryMap)
    .map(mapKey => ({ ...categoryMap[mapKey], name: categoryMap[mapKey].category.name }));
};

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tableView: tabsText[0],
    };
  }

  componentDidMount() {
    this.props.actions.getInitalData();
  }

  changeView = (index) => {
    this.setState({
      tableView: tabsText[index],
    });
  }

  changeDate = (year, month) => {
    this.props.actions.selectNewMonth(year, month);
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
    const { data } = this.props;
    const {
      items, categories, currentDate, isLoading,
    } = data;
    const { tableView } = this.state;
    const itemsWithCategory = Object.keys(items).map((id) => {
      items[id].category = categories[items[id].cid];
      return items[id];
    });
    let totalIncome = 0;
    let totalOutcome = 0;
    itemsWithCategory.forEach((item) => {
      if (item.category.type === TYPE_OUTCOME) {
        totalOutcome += item.price;
      } else {
        totalIncome += item.price;
      }
    });
    // const chartOutcomDataByCategory = generateChartDataByCategory(itemsWithCategory, TYPE_OUTCOME);
    // const chartIncomeDataByCategory = generateChartDataByCategory(itemsWithCategory, TYPE_INCOME);

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
          { isLoading && <Loader /> }
          { !isLoading
            && (
            <Fragment>
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
              { tableView === LIST_VIEW && itemsWithCategory.length > 0
                && (
                <PriceList
                  items={itemsWithCategory}
                  onModifyItem={this.modifyItem}
                  onDeleteItem={this.deleteItem}
                />
                )
              }
              { tableView === LIST_VIEW && itemsWithCategory.length === 0
                && (
                <div className="alert alert-light text-center no-record">
                  您还没有任何记账记录
                </div>
                )
              }
            </Fragment>
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
  data: PropTypes.any.isRequired,
};

export default withRouter(withContext(Home));
