#!/bin/bash

# Automatically rolls, configures & begins logging a new
# `simplechain` instance.

CHECKMARK="\u2713"

# set variables for the relevant chain directories
chain_dir=$HOME/.eris/chains/simplechain
chain_dir_this=$chain_dir/simplechain_full_000

# TODO make --account-types optional CLI arg
eris chains make --account-types=Root:2,Full:1 simplechain &&
    echo "${CHECKMARK} Made a new simplechain"

eris chains new simplechain --dir $chain_dir_this && echo "${CHECKMARK} Started the chain" && eris chains ls -a

cp $chain_dir/accounts.json . && echo "${CHECKMARK} Copied across accounts.json into local directory"

echo "To see log output for the new simplechain instance run: 'npm run chainlog'"
