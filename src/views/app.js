import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider, connect } from 'react-redux';
import '../resource/scss/test.scss';
class Counter extends Component {
    render() {
        const { Text, onIncreaseClick } = this.props
        return (
            <div>
                <span>{Text}</span>
                <button onClick={onIncreaseClick}>点我</button>
            </div>
        )
    }
}





function counter(state = { count: 0 }, action) {
    const count = state.count
    switch (action.type) {
        case 'increase':

            return { count: count + 1 }
        default:
            return state
    }
}


const store = createStore(counter)


function mapStateToProps(state) {
    return {
        Text: state.count
    }
}

function mapDispatchToProps(dispatch) {
    return {
        onIncreaseClick: () => dispatch(increaseAction)
    }
}


const App = connect(
    mapStateToProps,
    mapDispatchToProps
)(Counter)

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('container')
)