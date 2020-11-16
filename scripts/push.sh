#!/bin/bash

set -e

cat ~/.ssh/id_rsa

git clone git@github.com:flexiproducts/overwhelmingly-positive.git git-repo

cp data/* git-repo/data

cd git-repo

git add data

git commit -m "Update Data from heroku"

git push origin master