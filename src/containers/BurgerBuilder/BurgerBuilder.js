import React, { Component } from 'react';
import { connect } from 'react-redux';

import axios from '../../axios-orders';
import Modal from '../../components/UI/Modal/Modal';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import WithErrorHandler from '../../hoc/WithErrorHandler/WithErrorHandler';
import * as actionTypes from '../../store/actions';

class BurgerBuilder extends Component {
  state = {
    purchasing: false,
    loading: false,
    error: false
  }

  updatePurchaseState(ingredients) {
    const sum = Object.keys(ingredients)
      .map(igKey => {
        return ingredients[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);

    return sum > 0;
  }

  purchaseHandler = () => {
    this.setState({purchasing: true});
  }

  purchaseCancelHandler = () => {
    this.setState({purchasing: false});
  }

  purchaseContinueHandler = () => {
    this.props.history.push('/checkout');
  }

  render() {
    const disableInfo = {...this.props.ings};

    for (let key in disableInfo) {
      if (disableInfo.hasOwnProperty(key)) {
        disableInfo[key] = disableInfo[key] <= 0;
      }
    }

    let orderSummary = null;

    let burger = this.state.error
      ? <p>Ingredients can't be loaded!</p>
      : <Spinner />;

    if (this.props.ings) {
      burger = (
        <Auxiliary>
          <Burger
            ingredients={this.props.ings}
          />
          <BuildControls
            totalPrice={this.props.totalPrice}
            addIngredient={this.props.onIngredientAdded}
            removeIngredient={this.props.onIngredientRemoved}
            disabled={disableInfo}
            purchasable={this.updatePurchaseState(this.props.ings)}
            ordered={this.purchaseHandler}
          />
        </Auxiliary>
      );

      orderSummary = <OrderSummary
        ingredients={this.props.ings}
        purchaseCancel={this.purchaseCancelHandler}
        purchaseContinue={this.purchaseContinueHandler}
        totalPrice={this.props.totalPrice}
      />;
    }

    if (this.state.loading) {
      orderSummary = <Spinner />
    }

    return (
      <Auxiliary>
        <Modal
          show={this.state.purchasing}
          closeModal={this.purchaseCancelHandler}
        >
          {orderSummary}
        </Modal>
        {burger}
      </Auxiliary>
    );
  }
}

const mapStateToProps = state => {
  return {
    ings: state.ingredients,
    totalPrice: state.totalPrice
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdded: ingName => dispatch({
      type: actionTypes.ADD_INGREDIENT,
      ingredientName: ingName
    }),
    onIngredientRemoved: ingName => dispatch({
      type: actionTypes.REMOVE_INGREDIENT,
      ingredientName: ingName
    })
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(WithErrorHandler(BurgerBuilder, axios));
