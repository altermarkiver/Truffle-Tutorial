import React, { Component } from "react";
import LotteryContract from "./contracts/Lottery.json";
import web3 from "./web3";

import "./App.css";

class App extends Component {
  state = { 
		manager: "",
    players: [],
    balance: "",
    value: "",
    message: "",

		accounts: null, 
		contract: null 
	};

  componentDidMount = async () => {
    try {
      
      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = LotteryContract.networks[networkId];
      const instance = new web3.eth.Contract(
        LotteryContract.abi,
        deployedNetwork && deployedNetwork.address,
      );

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ accounts: accounts, contract: instance });

			const manager = await instance.methods.manager().call();
			const players = await instance.methods.getPlayers().call();
			const balance = await web3.eth.getBalance(instance.options.address);

			this.setState({ manager, players, balance });
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

	onSubmit = async (event) => {
    event.preventDefault();

    this.setState({ message: "Waiting on transaction success..." });

    await this.state.contract.methods.enter().send({
      from: this.state.accounts[0],
      value: web3.utils.toWei(this.state.value, "ether"),
    });

    this.setState({ message: "You have been entered!" });
  };

  onClick = async () => {
    this.setState({ message: "Waiting on transaction success..." });

    await this.state.contract.methods.pickWinner().send({
      from: this.state.accounts[0],
    });

    this.setState({ message: "A winner has been picked!" });
  };

  render() {
    return (
      <div>
        <h2>Lottery Contract</h2>
        <p>
          This contract is managed by {this.state.manager}. There are currently{" "}
          {this.state.players.length} people entered, competing to win{" "}
          {web3.utils.fromWei(this.state.balance, "ether")} ether!
        </p>

        <hr />
        <form onSubmit={this.onSubmit}>
          <h4>Want to try your luck?</h4>
          <div>
            <label>Amount of ether to enter</label>
            <input
              value={this.state.value}
              onChange={(event) => this.setState({ value: event.target.value })}
            />
          </div>
          <button>Enter</button>
        </form>

        <hr />

        <h4>Ready to pick a winner?</h4>
        <button onClick={this.onClick}>Pick a winner!</button>

        <hr />

        <h1>{this.state.message}</h1>
      </div>
    );
  }
}

export default App;
