import classes from './Input.module.css'

const Input = props => {
    return <div className={classes.input}>
        <label htmlFor={props.input.id}>{props.label}</label>
        {/* using spread operator here will result all key-value pairs that was passing to props.input will be getted by <input> */}
        <input {...props.input} />
    </div>
}

export default Input