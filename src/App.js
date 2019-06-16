import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import PriceList from './components/PriceList';
import ViewTabs from './components/ViewTabs';
import MonthPicker from './components/MonthPicker';
import { LIST_VIEW, CHART_VIEW } from './utility';

const items = [
  {
    "id": 1,
    "title": "去云南旅游",
    "price": 200,
    "date": "2018-09-10",
    "category": {
      "id": "1",
      "name": "旅行",
      "type": "outcome",
      "iconName": "ios-plane"
    }
  },
  {
    "id": 2,
    "title": "去云南旅游",
    "price": 300,
    "date": "2018-09-10",
    "category": {
      "id": "1",
      "name": "旅行",
      "type": "outcome",
      "iconName": "ios-plane"
    }
  }
]

function App() {
  return (
    <div className="App">
      {/* <header className="App-header"></header> */}
      <PriceList
        items={items}
        onModifyItem={(item) => console.log(item.id)}
        onDeleteItem={(item) => console.log(item.id)}
      />
      <ViewTabs
        activeTab={LIST_VIEW}
        onTabChange={(view) => {
          console.log(view);
        }}
      />
      <MonthPicker
        year={2019}
        month={5}
      />
    </div>
  );
}

export default App;
