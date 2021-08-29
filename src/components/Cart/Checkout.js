import { useRef, useState } from "react";

import classes from "./Checkout.module.css";

const isEmpty = (value) => value.trim() === "";
var phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;

const Checkout = (props) => {
  const [formInputValidity, setFormInputValidity] = useState({
    name: true,
    address: true,
    city: true,
    phone: true,
  });

  const [formDetail, setFormDetail] = useState({
    name: "",
    address: "",
    city: "",
    phone: "",
  });

  const nameInputRef = useRef();
  const addressInputRef = useRef();
  const cityInputRef = useRef();
  const phoneInputRef = useRef();

  const confirmHandler = (event) => {
    event.preventDefault();

    const enteredName = nameInputRef.current.value;
    const enteredAddress = addressInputRef.current.value;
    const enteredCity = cityInputRef.current.value;
    const enteredPhone = phoneInputRef.current.value;

    setFormDetail({
      name: enteredName,
      address: enteredAddress,
      city: enteredCity,
      phone: enteredPhone,
    });

    const nameIsValid = !isEmpty(enteredName);
    const addressIsValid = !isEmpty(enteredAddress);
    const cityIsValid = !isEmpty(enteredCity);
    const phoneIsValid = enteredPhone.match(phoneno);

    setFormInputValidity({
      name: nameIsValid,
      address: addressIsValid,
      city: cityIsValid,
      phone: phoneIsValid,
    });

    const formIsValid =
      nameIsValid && addressIsValid && cityIsValid && phoneIsValid;

    if (!formIsValid) {
      return;
    }

    props.onConfirm({
      name: enteredName,
      address: enteredAddress,
      city: enteredCity,
      phone: enteredPhone,
    });

    setFormDetail({
      name: "",
      address: "",
      city: "",
      phone: "",
    });
  };

  const nameControlClasses = `${classes.control} ${
    formInputValidity.name ? "" : classes.invalid
  }`;

  const addressControlClasses = `${classes.control} ${
    formInputValidity.address ? "" : classes.invalid
  }`;
  const cityControlClasses = `${classes.control} ${
    formInputValidity.city ? "" : classes.invalid
  }`;
  const phoneControlClasses = `${classes.control} ${
    formInputValidity.phone ? "" : classes.invalid
  }`;

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={nameControlClasses}>
        <label htmlFor='name'>Your Name</label>
        <input ref={nameInputRef} type='text' id='name' />
        {!formInputValidity.name && <p>Please enter a valid Name</p>}
      </div>
      <div className={addressControlClasses}>
        <label htmlFor='address'>Address</label>
        <input ref={addressInputRef} type='text' id='street' />
        {!formInputValidity.address && <p>Please enter a valid Address</p>}
      </div>
      <div className={cityControlClasses}>
        <label htmlFor='city'>City</label>
        <input ref={cityInputRef} type='text' id='city' />
        {!formInputValidity.city && <p>Please enter a valid City</p>}
      </div>
      <div className={phoneControlClasses}>
        <label htmlFor='phone'>Phone</label>
        <input ref={phoneInputRef} type='text' id='phone' />
        {!formInputValidity.phone && (
          <p>Please enter a valid Phone (10 digits))</p>
        )}
      </div>
      <div className={classes.actions}>
        <button type='button' onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
