import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Home from './containers/Home';
import Create from './containers/Create';
import { testItems, testCategories } from './testData';
import { flatternArr, ID, parseToYearAndMonth } from './utility';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

export const AppContext = React.createContext();
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: flatternArr(testItems),
      categories: flatternArr(testCategories),
    };
    this.actions = {
      deleteItem: (item) => {
        delete this.state.items[item.id];
        this.setState({
          // eslint-disable-next-line react/no-access-state-in-setstate
          items: this.state.items,
        });
      },
      createItem: (data, categoryId) => {
        const newId = ID();
        const parsedDate = parseToYearAndMonth(data.date);
        data.monthCategory = `${parsedDate.year}-${parsedDate.month}`;
        data.timestamp = new Date(data.date).getTime();
        const newItem = { ...data, id: newId, cid: categoryId };
        this.setState(prevState => ({
          items: { ...prevState.items, [newId]: newItem },
        }));
      },
      updateItem: (item, updatedCategoryId) => {
        const modifiedItem = {
          ...item,
          cid: updatedCategoryId,
          timestamp: new Date(item.date).getTime(),
        };
        this.setState(prevState => ({
          items: { ...prevState.items, [modifiedItem.id]: modifiedItem },
        }));
      },
    };
  }

  render() {
    return (
      <AppContext value={{
        state: this.state,
        actions: this.actions,
      }}
      >
        <Router>
          <div className="App">
            <ul>
              <Link to="/">Home</Link>
              <Link to="/create">Create</Link>
              <Link to="/edit/10">Edit</Link>
            </ul>
            <div className="container pb-5">
              <Route path="/" exact component={Home} />
              <Route path="/create" component={Create} />
              <Route path="/edit/:id" component={Create} />
            </div>
          </div>
        </Router>
      </AppContext>
    );
  }
}

export default App;
