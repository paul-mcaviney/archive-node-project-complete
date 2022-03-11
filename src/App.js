import './App.css';
import React, { useState } from 'react';

const Web3 = require('web3');
//const infuraURL = { YOUR_URL_HERE };
const infuraURL = 'http://localhost:8545'; // If no archive access via Infura, can use `ganache --fork`
const web3 = new Web3(new Web3.providers.HttpProvider(infuraURL));


const App = () => {
    
    // State variables
    const [results, setResults] = useState(false);
    const [address, setAddress] = useState('');
    const [currentBalance, setCurrentBalance] = useState(0);
    const [startOfYearBalance, setStartOfYearBalance] = useState(0);
    const [endOfYearBalance, setEndOfYearBalance] = useState(0);
    const [balanceDifference, setBalanceDifference] = useState(0);
    const [transactionCount, setTransactionCount] = useState(0);


    // set the address to user input
    const handleInput = event => {
        setAddress(event.target.value);
    };


    // Reset the app
    const reset = () => {
        setResults(false);
    };


    // Access data from Ethereum blockchain
    const accessEthereum = async () => {

        // Get current balance of address and convert it to string 
        let balance = await web3.eth.getBalance(address);

        // Set ethBalance and convert balance from wei to ETH
        setCurrentBalance(await web3.utils.fromWei(balance.toString(), 'ether'));
        
        // Get wallet balance at the start of 2021 (Block #11565019)
        let startBalance = await web3.eth.getBalance(address, 11565019);

        // Get wallet balance at the end of 2021 (Block #13916165)
        let endBalance = await web3.eth.getBalance(address, 13916165);
         
        // Convert startBalance to ETH and set state variable
        startBalance = await web3.utils.fromWei(startBalance.toString(), 'ether');
        setStartOfYearBalance(startBalance);

        // Convert endBalance to ETH and set state variable
        endBalance = await web3.utils.fromWei(endBalance.toString(), 'ether');
        setEndOfYearBalance(endBalance);

        // Set balanceDifference from start to end of 2021
        setBalanceDifference(endBalance - startBalance);

        // Get transaction count at start of 2021 (Block #11565019)
        let startTransactions = await web3.eth.getTransactionCount(address, 11565019);

        // Get transaction count at end of 2021 (Block #13916165)
        let endTransactions = await web3.eth.getTransactionCount(address, 13916165);

        // Set total transaction count in 2021
        setTransactionCount(endTransactions - startTransactions);

        // Received results, condition met to show them on screen
        setResults(true);    

    };
   
    
    return (
        <div className='App'>
            <div className='container'>
                <div className='header-container'>
                    <h1 className='header gradient-text'>
                        ETH Year in Review
                    </h1>
                </div>

                <div className='formContainer'>
                    {!results ? (
                        <div>
                            <h2 className='sub-text'>
                                Enter an Ethereum wallet address to see your 2021 stats! 
                            </h2>
                            <p>If you don't have a wallet address, feel free to use <a href='https://etherscan.io/address/0xd8da6bf26964af9d7eed9e03e53415d37aa96045' target='_blank'>Vitalik's</a> ;)</p>
                            <p>0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045</p>
                            
                            <input onChange={handleInput} className='text-input' type='text' name='wallet' id='wallet' placeholder='0x...' required/>
                            <br />
                            <button onClick={accessEthereum} className='form-button' type='submit' name='submit' id='submit'>
                                Submit
                            </button>
                        </div>
                    ) : <div>
                            <h2>Here are your results!</h2>
                            <h3>{address}</h3>

                            <p className='result-heading'>Current Balance</p>
                            <p>{currentBalance} ETH</p>

                            <p className='result-heading'>Start of 2021 Balance</p>
                            <p>{startOfYearBalance} ETH</p>

                            <p className='result-heading'>End of 2021 Balance</p>
                            <p>{endOfYearBalance} ETH</p>

                            <p className='result-heading'>Difference from Start of 2021</p>
                            <p>{balanceDifference} ETH</p>

                            <p className='result-heading'>Number of transactions in 2021</p>
                            <p>{transactionCount}</p>
                            <br />

                            <button onClick={reset} className='form-button' id='restart' name='restart'>Enter New Address</button>
                        </div>} 
               </div> 
               <p>Additional Resources: <a href='https://web3js.readthedocs.io/en/v1.7.0/web3.html' target='_blank'>Web3.js Docs</a>, <a href='https://docs.infura.io/infura/networks/ethereum' target='_blank'>Infura Docs</a></p> 
            </div>
        </div>
    )
}


export default App;
