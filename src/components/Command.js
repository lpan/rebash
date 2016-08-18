import React, {Component} from 'react';
import {visiblePropTypes} from '../utils/customPropTypes';

const renderOutput = visible => JSON.stringify(visible);

const onEnter = evt => {
  if (evt.key === 'Enter' || evt.which === 13) {
    console.log(evt.target.value);
  }
};

class Command extends Component {
  focus() {
    this.input.focus();
  }

  render() {
    const {visible} = this.props;

    return (
      <div>
        <div>
          <div>prompt</div>
          <input
            ref={ref => { this.input = ref; }}
            disabled={visible}
            onKeyPress={onEnter}
            autoComplete={false}
            autoFocus
          />
        </div>
        {renderOutput(visible)}
      </div>
    );
  }
}

Command.propTypes = {
  visible: visiblePropTypes,
};

export default Command;
