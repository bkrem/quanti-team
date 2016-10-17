#!/bin/bash

# stop the chain instance
eris chains stop simplechain

# clean up after docker
# source: http://stackoverflow.com/questions/32723111/how-to-remove-old-and-unused-docker-images
docker rm $(docker ps -qa --no-trunc --filter "status=exited") && docker rmi $(docker images --filter "dangling=true" -q --no-trunc)

# stop the docker-machine instance
docker-machine stop default
