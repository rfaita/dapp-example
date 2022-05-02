import React, { useState, useEffect, createContext } from "react";
import Web3 from 'web3';
import Counter from 'contracts/Counter.json';

export const Web3Context = createContext({ data: null });

const Web3Provider = (props) => {
    const [data, setData] = useState({});

    const createContext = async function () {

        const loadContracts = async () => {
            const ret = {};

            ret.web3 = new Web3(Web3.givenProvider || process.env.REACT_APP_WEB3_ADDRESS);
            ret.networkId = await ret.web3.eth.net.getId();
            ret.accounts = await ret.web3.eth.getAccounts();

            ret.networkData = Counter.networks[ret.networkId];

            if (ret.networkData) {
                ret.contractAddress = ret.networkData.address;
                ret.contract = new ret.web3.eth.Contract(Counter.abi, ret.contractAddress);
            }

            console.log(ret);
            setData(ret);
        }

        if (window.ethereum) {

            const loadWeb3 = async () => {

                console.log("current env: ");
                console.log(process.env);

                try {

                    console.log("verifying chain ID");
                    await window.ethereum.request({
                        method: 'wallet_switchEthereumChain',
                        params: [{ chainId: process.env.REACT_APP_CHAIN_ID || '0x539' }], // chainId must be in hexadecimal numbers
                    });


                    console.log("loading contracts");
                    loadContracts();


                } catch (error) {
                    // This error code indicates that the chain has not been added to MetaMask
                    // if it is not, then install it into the user MetaMask
                    if (error.code === 4902) {
                        try {
                            await window.ethereum.request({
                                method: 'wallet_addEthereumChain',
                                params: [
                                    {
                                        chainId: process.env.REACT_APP_CHAIN_ID || '0x539',
                                        chainName: process.env.REACT_APP_CHAIN_NAME || 'Localhost 8545',
                                        blockExplorerUrls: [process.env.REACT_APP_BLOCK_EXPLORER_URLS],
                                        rpcUrls: [process.env.REACT_APP_RPC_URL || 'http://localhost:8545'],
                                        nativeCurrency: {
                                            symbol: process.env.REACT_APP_SYMBOL || 'ETH'
                                        }
                                    },
                                ],
                            });
                        } catch (addError) {
                            console.error(addError);
                        }
                    }
                    console.error(error);
                }

            }


            window.ethereum.on('chainChanged', () => {
                loadWeb3();
            })
            window.ethereum.on('accountsChanged', () => {
                loadWeb3();
            })

            await loadWeb3();
        } else {
            loadContracts();
        }

    }

    useEffect(() => {
        createContext();
        return () => {

        }
    }, []);

    return (
        <Web3Context.Provider value={{ data }}>
            {props.children}
        </Web3Context.Provider>
    );

}

export default Web3Provider;