import * as React from 'react';
import { observable, action, runInAction } from 'mobx';
import { observer } from 'mobx-react'

import {
  syncBlock,
  useRegisterIncrementDispatcher,
  initialState,
  ids,
  useCheckTearing,
  shallowEqual,
} from '../common';

const store = observable({ count: 0 });

@observer
class Counter extends React.Component {
  render() {
    syncBlock();
    return (
      <div className="count">
        {store.count}
      </div>
    )
  }
}

@observer
class Main extends React.Component {
  @observable.ref localCount = 0;

  @action.bound
  increment = () => {
    this.localCount += 1;
  }

  render() {
    return (
      <div>
        <h1>Shared Count</h1>
        {ids.map(id => <Counter key={id} />)}
        <div className="count">{store.count}</div>
        <h1>Local Count</h1>
        {this.localCount}
        <button type='button' id='localIncrement' onClick={this.increment}>
          Increment local count
        </button>
      </div>
    )
  }
}

const App = () => {
  useRegisterIncrementDispatcher(React.useCallback(() => {
    runInAction(() => {
      store.count += 1;
    });
  }, []));

  return <Main />
}

export default App;