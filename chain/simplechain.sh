# Automatically rolls, configures & begins logging a new 
# `simplechain` instance.

CHECKMARK="\u2713"

chain_dir=$HOME/.eris/chains/simplechain
chain_dir_this=$chain_dir/simplechain_full_000

eris chains make --account-types=Root:2,Full:1 simplechain &&
    echo "${CHECKMARK} Made a new simplechain"

eris chains new simplechain --dir $chain_dir_this &&
    echo "${CHECKMARK} Started the chain" &&
    eris chains ls -a

mv $chain_dir/accounts.json accounts.json &&
    echo "${CHECKMARK} Copied across `accounts.json` into local directory"

echo "Starting chain log...";
eris chains logs simplechain -f;
