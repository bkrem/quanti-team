#!/usr/bin/env bash

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

# Set the port for the node app to listen to for requests by querying the eris service for the port
export IDI_PORT=$( eris services ports idi|cut -d ":" -f 2 )
echo "IDI_PORT set to ${IDI_PORT}"