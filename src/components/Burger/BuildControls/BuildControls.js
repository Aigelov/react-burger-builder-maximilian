import React from 'react';

import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
  { label: 'Meat', type: 'meat' },
  { label: 'Bacon', type: 'bacon' },
  { label: 'Salad', type: 'salad' },
  { label: 'Cheese', type: 'cheese' }
];

const BuildControls = props => {
  return (
    <div className={classes.BuildControls}>
      <p>Current Price: <strong>{props.totalPrice.toFixed(2)}$</strong></p>
      {controls.map(control => {
        return <BuildControl
          key={control.label}
          label={control.label}
          addIngredient={() => props.addIngredient(control.type)}
          removeIngredient={() => props.removeIngredient(control.type)}
          disabled={props.disabled[control.type]}
        />
      })}
      <button
        className={classes.OrderButton}
        disabled={!props.purchasable}
      >ORDER NOW</button>
    </div>
  );
};

export default BuildControls;
