#!/usr/bin/env bash

echo "Running eduChain environment setup..."

# Set the port for the node app to listen to for requests by querying the eris service for the port
export IDI_PORT=$( eris services ports idi|cut -d ":" -f 2 )
echo "IDI_PORT set to ${IDI_PORT}"

# Set the $host variable to the IP of the running docker-machine container
host=$(dm ip)
echo "'host' set to docker-machine IP: ${host}"