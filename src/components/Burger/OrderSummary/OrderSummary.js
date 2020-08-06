import React  from 'react';

import Auxiliary from '../../../hoc/Auxiliary/Auxiliary';
import Button from '../../UI/Button/Button';

const OrderSummary = props => {
  const style = { textTransform: 'capitalize' };
  const ingredientSummary = Object.keys(props.ingredients)
  .map(igKey => {
    return <li key={igKey}>
      <span style={style}>{igKey}</span>: {props.ingredients[igKey]}
    </li>
  });

  return (
    <Auxiliary>
      <h3>Your order</h3>
      <p>A delicious burger with the following ingredients:</p>
      <ul>
        {ingredientSummary}
      </ul>
      <p><b>Total Price: {props.totalPrice.toFixed(2)}</b></p>
      <div>Continue to Checkout?</div>
      <Button
        btnType="Danger"
        clicked={props.purchaseCancel}
      >CANCEL</Button>
      <Button
        btnType="Success"
        clicked={props.purchaseContinue}
      >CONTINUE</Button>
    </Auxiliary>
  );
};

export default OrderSummary;
