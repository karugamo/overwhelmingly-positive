#!/bin/bash

set -e

# add ssh key
ssh-keyscan -H github.com >> ~/.ssh/known_hosts 2> /dev/null
cat "$ENV_DIR/SSH_KEY" > ~/.ssh/id_rsa
echo >> ~/.ssh/id_rsa
chmod 600 ~/.ssh/id_rsa

git clone git@github.com:flexiproducts/overwhelmingly-positive.git git-repo

cp data/* git-repo/data

cd git-repo

git add data

git commit -m "Update Data from heroku"

git push origin master