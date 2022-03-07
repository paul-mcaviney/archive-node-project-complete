import './App.css';
import React, { useState } from 'react';

//require('dotenv').config({ path: ".env" });

const Web3 = require('web3');
//const InfuraURL = process.env.INFURA_URL;
const InfuraURL = "http://localhost:8545"; // If no archive access via Infura directly, can use ganache
const web3 = new Web3(new Web3.providers.HttpProvider(InfuraURL));


const App = () => {
    // State variables
    const [address, setAddress] = useState("");
    const [results, setResults] = useState(false);
    const [ethBalance, setEthBalance] = useState(0);
    const [endOfYearBalance, setEndOfYearBalance] = useState(0);
    const [balanceDifference, setBalanceDifference] = useState(0);
    const [transactionCount, setTransactionCount] = useState(0);

    // set the address to user input
    const handleInput = event => {
        setAddress(event.target.value);
    };

    // variable to store balance in wei
    //let balance;
    // let wei;
    // let startOfYearBalance;
    // let endOfYearBalance;
    //let startOfYearTransactions;
    let endOfYearTransactions;


    const accessEthereum = async () => {

        // Get current balance of address and convert it to string 
        let balance = String(await web3.eth.getBalance(address));

        // Set ethBalance and convert balance from wei to eth
        setEthBalance(await web3.utils.fromWei(balance, 'ether'));
        
        // Get wallet balance at the start of 2021 (Block #11565019)
        let startBalance = await web3.eth.getBalance(address, 11565019);

        // Get wallet balance at the end of 2021 (Block #13916165)
        let endBalance = String(await web3.eth.getBalance(address, 13916165));

        // Set endOfYearBalance and convert to ETH
        setEndOfYearBalance(await web3.utils.fromWei(endBalance, 'ether'));
         
        // TODO: this is throwing an error because the Big Number has a decimal
        // Find difference in balance from start of year to end
        //let difference = String(Math.round(endBalance - startBalance));
        let difference = Math.round(endBalance - startBalance);
        console.log(difference);
        difference = String(difference);

        // Set balanceDifference and convert to ETH
        setBalanceDifference(await web3.utils.fromWei(difference, 'ether'));

        // Get transaction count at start of 2021 (Block #11565019)
        let startTransactions = await web3.eth.getTransactionCount(address, 11565019);

        // Get transaction count at end of 2021 (Block #13916165)
        let endTransactions = await web3.eth.getTransactionCount(address, 13916165);

        // Set total transaction count in 2021
        setTransactionCount(endTransactions - startTransactions);

        // Received results, condition met to show them on screen
        setResults(true);    

            

            // Get number of transactions
            //setTransactionCount(await web3.eth.getTransactionCount(address, 13916165));
            
            // received results, condition met to show them on screen
           // setResults(true);

    };

    const reset = () => {
        setResults(false);
    };
   
    
    return (
        <div className="App">
            <div className="container">
                <div className="header-container">
                    <h1 className="header gradient-text">
                        ETH Year in Review
                    </h1>
                </div>

                <div className="formContainer">
                    {!results ? (
                        <div>
                            <h2 className="sub-text">
                                Enter an Ethereum wallet address to see your 2021 stats! 
                            </h2>
                            <p>0x64ae4fD3E9906ee4A0189e3A393d19b3e35cdb67</p>
                            <br />
                            <input onChange={handleInput} className="text-input" type="text" name="wallet" id="wallet" placeholder="0x..." required/>
                            <br />
                            <button onClick={accessEthereum} className="form-button" type="submit" name="submit" id="submit">
                                Submit
                            </button>
                        </div>
                    ) : <div>
                            <h2>Here are your results!</h2>
                            <h3>{address}</h3>
                            <p>Current Balance: {ethBalance} ETH</p>
                            <p>End of 2021 Balance: {endOfYearBalance} ETH</p>
                            <p>Difference from Start of 2021: {balanceDifference} ETH</p>
                            <p>Number of transactions in 2021: {transactionCount}</p>
                            <button onClick={reset} className="form-button" id="restart" name="restart">Enter New Address</button>
                        </div>} 
               </div> 
            </div>
        </div>
    )
}


export default App;


// TODO: get environment variable working properly
// TODO: create a function that takes the wallet address submitted and gets data
            // gets account balance at end of 2021 and beginning of 2021
            // number of transactions in between those blocks
            // 
// Block number at start of 2021 : 11565019
// Block number at end of 2021 : 13916165
// ganache --fork to run a node with archive access