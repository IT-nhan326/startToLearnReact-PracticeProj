import { useContext, useEffect, useState } from 'react'
import classes from "./HeaderCartButton.module.css";
import CartIcon from "../Cart/CartIcon";
import CartContext from '../../store/cart-context';

const HeaderCartButton = (props) => {
  const [btnIsHighLightecd, setBtnIsHighLighted] = useState(false)
  const cartCtx = useContext(CartContext);
  //destructuring items represent cartCtx.items
  const { items } = cartCtx

  const numberOfCartItem = items.reduce((currentNumber, item) => {
    return currentNumber + item.amount
  }, 0)

  const btnClasses = `${classes.button} ${btnIsHighLightecd && classes.bump}`

  useEffect(() => {
    if (items.length === 0){
      return
    }
    setBtnIsHighLighted(true)
    
    const timer = setTimeout(() => {
      setBtnIsHighLighted(false)
      //this will trigger the btnClasses to set-back the css to normal without classes.bump
    },300)

    //clean-up function in useEffect in case multiple item are added respestively and timer not have enough time to recharge
    return () => {
      clearTimeout(timer)
    }
  },[items])

  return (
    <button className={btnClasses} onClick={props.onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{numberOfCartItem}</span>
    </button>
  );
};

export default HeaderCartButton;
