import React from 'react'
import PropTypes from 'prop-types';
import { Row, Col, Icon } from 'antd';
import Ionicon from 'react-ionicons';

const PriceList = ({ items, onModifyItem, onDeleteItem }) => {
  return (
    <div>
      {
        items.map(item => (
          <Row type="flex" justify="space-around" key={item.id}>
            <Col span={2}>
              <Ionicon
                fontSize="30px"
                style={{ backgroundColor: '#007bff', padding: '5px', borderRadius: '20%' }}
                color={'#fff'}
                icon={item.category.iconName}
              />
            </Col>
            <Col span={6}>{item.title}</Col>
            <Col span={2}>
              {item.category.type === 'income' ? '+' : '-'}
              {item.price}元
            </Col>
            <Col span={2}>{item.date}</Col>
            <Col span={2}>
              {/* <Button type="primary" onClick={() => onModifyItem(item)}>编辑</Button> */}
              <Icon
                type="form"
                style={{ backgroundColor: "#28a745", color: "#fff", padding: '5px', borderRadius: '50%' }}
                onClick={() => onModifyItem(item)}
              />
            </Col>
            <Col span={2}>
              {/* <Button type="danger" onClick={() => onDeleteItem(item)}>删除</Button> */}
              <Icon
                type="close"
                style={{ backgroundColor: "#dc3545", color: "#fff", padding: '5px', borderRadius: '50%' }}
                onClick={() => onDeleteItem(item)}
              />
            </Col>
          </Row>
        ))
      }
    </div>
  )
}

PriceList.propTypes = {
  items: PropTypes.array.isRequired,
  onModifyItem: PropTypes.func.isRequired,
  onDeleteItem: PropTypes.func.isRequired,
}

PriceList.defaultProps = {
  onDeleteItem: () => {}
}

export default PriceList;