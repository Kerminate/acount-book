import React from 'react';
import {
  shallow
} from 'enzyme';
import Ionicon from 'react-ionicons';
import PriceList from '../PriceList';
import { accItems, categories } from '../../containers/Home';

const itemsWithCategory = accItems.map((item) => {
  item.category = categories[item.cid];
  return item;
});

const props = {
  items: itemsWithCategory,
  onModifyItem: jest.fn(),
  onDeleteItem: jest.fn(),
}

let wrapper;

describe('test PriceList component', () => {
  beforeEach(() => {
    wrapper = shallow(<PriceList {...props} />);
  })
  // 使用 snapshop 进行快照测试
  it('should render the component to match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  })
  // 传入特定数组，是否渲染对应长度的条目
  it('should render correct price items length', () => {
    expect(wrapper.find('.list-group-item').length).toEqual(itemsWithCategory.length)
  })
  // 第一个条目是否渲染特定组件和内容
  it('should render correct icon and price for each time', () => {
    const iconList = wrapper.find('.list-group-item').first().find(Ionicon);
    expect(iconList.length).toEqual(3);
    expect(iconList.first().props().icon)
    .toEqual(itemsWithCategory[0].category.iconName);
  })
  // 点击按钮是否触发特定回调
  it('should trigger the correct function callbacks', () => {
    const firstItem = wrapper.find('.list-group-item').first();
    firstItem.find('a').first().simulate('click');
    expect(props.onModifyItem).toHaveBeenCalledWith(itemsWithCategory[0]);
    firstItem.find('a').last().simulate('click');
    expect(props.onDeleteItem).toHaveBeenCalledWith(itemsWithCategory[0]);
  })
})
