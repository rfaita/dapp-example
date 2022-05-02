# 1. README

- [1. README](#1-readme)
  - [1.1. Ganache Server](#11-ganache-server)
  - [1.2. Dev Environment](#12-dev-environment)

## 1.1. Ganache Server

- install docker
https://docs.docker.com/engine/install/ubuntu/
- create image to ganache
```Dockerfile
FROM node:alpine
# Set the /app directory as working directory
WORKDIR /app
# Install ganache-cli globally
RUN npm install -g ganache-cli
# Set the default command for the image
CMD ["ganache-cli", "-h", "0.0.0.0", "--gasLimit", "55000000", "--allowUnlimitedContractSize"]
```sh
- build image
```sh
docker build . -t ganache
```
- run image
```sh
docker run -p 8545:8545 ganache
```

## 1.2. Dev Environment

- install Node and NPM
- install truffle
```sh
npm install -g truffle
```
- initialize project
```sh
truffle init
npm init
```
- edit project - install vscode
```sh
code .
```
- compile code
```sh
truffle compile
```
- migrate(deploy) code
```sh
truffle migrate --reset
```
- start truffle console
```sh
truffle console
```
- test case
```js
//getting the contract
const c = await Counter.deployed();

//getting the owner
c.getOwner();

let result = 0;

//getting count result
result = await c.getCount();
parseInt(result);

c.increment();

c.decrement();

c.decrement({'from': accounts[1]});

c.incrementByTen({'value': '1'});

c.incrementByTen({'value': web3.utils.toWei('1')});

c.incrementByTen({'value': web3.utils.toWei('1'), 'from': accounts[1]});

web3.eth.getBalance(accounts[0]);
web3.eth.getBalance(accounts[1]);
```