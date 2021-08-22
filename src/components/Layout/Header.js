import { Fragment } from 'react'
import classes from './Header.module.css'

const Header = props => {
    return (
      <Reqact.Fragmant>
        <header className={classes.header}>
          <h1>ReactMeals</h1>
          <button>Card</button>
        </header>
        <div>
            <img></img>
        </div>
      </Reqact.Fragmant>
    );
}

export default Header