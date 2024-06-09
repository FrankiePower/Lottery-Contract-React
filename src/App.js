import React from "react";
import "./App.css";
import web3 from "./web3";
import lottery from "./lottery";

//Good place to start is to try to get the address of the manager.

// One component and it initializes 5 different properties of state.
class App extends React.Component {
  state = {
    manager: "",
    players: [],
    balance: "",
    value: "",
    message: "",
  };

  // automatically called once component is rendered.
  async componentDidMount() {
    const manager = await lottery.methods.manager().call();
    const players = await lottery.methods.getPlayers().call();
    const balance = await web3.eth.getBalance(lottery.options.address);

    this.setState({ manager, players, balance });
  }

  onSubmit = async (event) => {
    event.preventDefault();

    const accounts = await web3.eth.getAccounts();

    this.setState({ message: "Waiting on transaction success..." });

    await lottery.methods.enter().send({
      from: accounts[0],
      value: web3.utils.toWei(this.state.value, "ether"),
    });

    this.setState({ message: "You have been entered!" });
  };

  onClick = async () => {
    const accounts = await web3.eth.getAccounts();

    this.setState({ message: "Picking a winner..." });

    await lottery.methods.pickWinner().send({
      from: accounts[0],
    });

    this.setState({ message: "A winner has been picked!" });
  };

  render() {
    return (
      <div className="lottery-div">
        <h2>Lottery Contract</h2>
        <p>
          This contract is managed by <strong> {this.state.manager}</strong>.
          There are currently <strong>{this.state.players.length}</strong>{" "}
          people entered, competing to win{" "}
          <strong>
            {web3.utils.fromWei(this.state.balance, "ether")} ether!{" "}
          </strong>
        </p>
        <hr />
        <form onSubmit={this.onSubmit}>
          <h3>Want to try your luck?</h3>
          <div>
            <label>Amount of ether to enter</label>

            <input
              // it takes the value from the input,
              value={this.state.value}
              onChange={(event) => this.setState({ value: event.target.value })}
            />
          </div>
          <button>Enter</button>
        </form>
        <hr />
        <h3> Ready to Pick a Winner?</h3>
        <button onClick={this.onClick}>Pick a Winner</button>
        <hr />
        <h1>{this.state.message}</h1>
      </div>
    );
  }
}
export default App;
