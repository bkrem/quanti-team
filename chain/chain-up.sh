CHECKMARK="\u2713"

docker-machine start default &&
    echo "${CHECKMARK} docker-machine instance has booted"
eval $(docker-machine env) &&
   echo "${CHECKMARK} eval'd local environment for docker-machine"
eris chains start simplechain &&
   echo "${CHECKMARK} booted chain instance"
eris chains ls -a &&
eris services start idi &&
    echo "${CHECKMARK} booted the chain service"
