import './App.css';
import React, { useState } from 'react';

//require('dotenv').config({ path: ".env" });

const Web3 = require('web3');
//const InfuraURL = process.env.INFURA_URL;
const InfuraURL = "http://localhost:8545"; // If no archive access via Infura directly, can use ganache
const web3 = new Web3(new Web3.providers.HttpProvider(InfuraURL));


const App = () => {
    const [address, setAddress] = useState("");
    let [results, setResults] = useState(false);

    const handleInput = event => {
        setAddress(event.target.value);
    };

    // Blockchain Data Variables
    let balance;
    let ethBalance;
    let transactionCount = 0;

    let addressAcquired = false;
    let WalletResults;

    const logValue = async () => {
        console.log(address);
        // get balance of address and convert it to string
        balance = String(await web3.eth.getBalance(address, 14134416));
        console.log(balance);
        // convert balance from wei to eth
        ethBalance = await web3.utils.fromWei(balance, 'ether');

        console.log(ethBalance); 
        
        transactionCount = await web3.eth.getTransactionCount(address, 13916165);

        console.log(transactionCount);
        WalletResults = (<div>
            <h3>Wallet Address<br /></h3>
            {address}<br />
            <h3>Current Balance:<br /></h3>
            {ethBalance + ' ETH'}

        </div>);
        setResults(true);
    };

    // const renderResults = () => {
    //     <button onClick={logValue} className="form-button">
    //         Get Results
    //     </button>
    // };

    
    
    return (
        <div className="App">
            <div className="container">
                <div className="header-container">
                    <h1 className="header gradient-text">
                        ETH Year in Review
                    </h1>
                </div>
                <div className="formContainer">
                    <label className="sub-text">
                        Enter an Ethereum wallet address to see your 2021 stats! 
                    </label>
                    <p>0x64ae4fD3E9906ee4A0189e3A393d19b3e35cdb67</p>
                    <br />
                    <input onChange={handleInput} className="text-input" type="text" name="wallet" id="wallet" placeholder="0x..." required/>
                    <br />
                    <input onClick={logValue} className="form-button" type="submit" name="submit" id="submit"/>

                    {/* { results ? <WalletResults /> : <p>this is a test</p>} */}


    
               </div> 
            </div>
        </div>
    )
}


export default App;


// TODO: import web3 and set variables + add infura API variable
// TODO: create a view that updates when you hit the submit button
// TODO: create a function that takes the wallet address submitted and gets data
            // gets account balance at end of 2021 and beginning of 2021
            // number of transactions in between those blocks
            // 
// Block number at start of 2021 : 11565019
// Block number at end of 2021 : 13916165
// ganache --fork to run a node with archive access