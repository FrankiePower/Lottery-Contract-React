import React from "react";
import web3 from "./web3";
import lottery from "./lottery";

//Good place to start is to try to get the address of the manager.

class App extends React.Component {
  state = {
    manager: "",
  };

  // automatically called once component is rendered.
  async componentDidMount() {
    const manager = await lottery.methods.manager().call();
    this.setState({ manager });
  }

  render() {
    return (
      <div>
        <h2>Lottery Contract</h2>
        <p>This contract is managed by {this.state.manager}</p>
      </div>
    );
  }
}
export default App;
