import React, { Component } from 'react';

import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import WithErrorHandler from '../../hoc/WithErrorHandler/WithErrorHandler';

class Orders extends Component {
  state = {
    orders: [],
    loading: true
  };

  componentDidMount() {
    axios.get('/orders.json')
      .then(res => {
        const fetchedOrders = [];

        for (const key in res.data) {
          if (!res.data.hasOwnProperty(key)) {
            continue;
          }

          fetchedOrders.push({
            id: key,
            ...res.data[key]
          });
        }

        this.setState({
          loading: false,
          orders: fetchedOrders
        });
      })
      .catch(err => {
        this.setState({ loading: false });
      })
  }

  render() {
    return (
      <div>
        {this.state.orders.map(order => (
          <Order
            key={order.id}
            ingredients={order.ingredients}
            totalPrice={order.totalPrice}
          />
        ))}
      </div>
    );
  }
}

export default WithErrorHandler(Orders, axios);
