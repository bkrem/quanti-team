#!/usr/bin/env bash

# This script should be run to configure `docker-machine`'s environment within the
# terminal session, as well as to set up local environment variables which
# simplify the usage of `eris` drastically, such as the chain directory ($chain_dir)
# and the address of the contract owner ($addr) if a contract is to be deployed onto the chain.

echo "Running eduChain environment setup..."

# Set references to the chain & account
chain_dir=$HOME/.eris/chains/simplechain
chain_dir_this=$chain_dir/simplechain_full_000
echo "chain_dir: ${chain_dir}"
echo "chain_dir_this: ${chain_dir_this}"

# Isolate the account address into a variable
addr=$(cat $chain_dir/addresses.csv|grep simplechain_full_000|cut -d ',' -f 1)
echo "addr: ${addr}"

# Set up local variables for `docker-machine`
eval $(docker-machine env)
# Set the $host variable to the IP of the running docker-machine container
host=$(docker-machine ip)
echo "'host' set to docker-machine IP: ${host}"

# Get the IP address for the local compiler
compiler_addr=$(eris services inspect compilers NetworkSettings.IPAddress)
echo "compiler_addr: ${compiler_addr}"

# Set the port for the node app to listen to for requests by querying the eris service for the port
export IDI_PORT=$( eris services ports idi|cut -d ":" -f 2 )
echo "IDI_PORT set to ${IDI_PORT}"
