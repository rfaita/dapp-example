import React, { useContext, useEffect, useState } from 'react';
import { Web3Context } from './providers/Web3Provider';

export default function Application() {

    const { data } = useContext(Web3Context);

    const [count, setCount] = useState();

    useEffect(() => {

        loadCount();

        return () => {
            setCount('');
        };


    }, [data]);

    const loadCount = () => {
        if (!!data && !!data.contract) {
            data?.contract?.methods.getCount().call().then(result => {
                setCount(parseInt(result));
            });
        }
    }

    const increment = () => {
        if (!!data && !!data.contract) {
            data?.contract?.methods.increment().send({ from: data?.accounts[0] }).then(result => {
                loadCount();
            });
        }
    }

    const decrement = () => {
        if (!!data && !!data.contract) {
            data?.contract?.methods.decrement().send({ from: data?.accounts[0] }).then(result => {
                loadCount();
            });
        }
    }

    const incrementByTen = () => {
        if (!!data && !!data.contract) {
            data?.contract?.methods.incrementByTen().send({
                from: data?.accounts[0], value: data?.web3.utils.toWei('1')
            }).then(result => {
                loadCount();
            });
        }
    }

    return (
        <div style={{ 'margin': '20px' }}>
            <div>current count: {count}</div>
            <div><button onClick={loadCount}>Refresh Count</button></div>
            <div><button onClick={increment}>Increment Count</button></div>
            <div><button onClick={decrement}>Decrement Count</button></div>
            <div><button onClick={incrementByTen}>Increment By Ten</button></div>
        </div>
    );
}