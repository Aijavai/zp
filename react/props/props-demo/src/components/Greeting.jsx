import PropTypes from 'prop-types';  // prop 类型约定， 校验

function Greeting(props) {
    // console.log(props)
    const {
        name,
        message
    } = props

    return (
        <div>
            <h1>Hello, {name}!</h1>
            <p>{message}</p>
        </div>
    )
}

Greeting.propTypes = {
    name: PropTypes.string.isRequired,
    message: PropTypes.string,
}

export default Greeting