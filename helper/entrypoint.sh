#!/bin/sh
export NODE_OPTIONS=--openssl-legacy-provider 
ganache-cli -h 0.0.0.0 --gasLimit 55000000 --allowUnlimitedContractSize
