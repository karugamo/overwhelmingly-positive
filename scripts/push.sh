#!/bin/bash

set -e

cat ~/.ssh/id_rsa

git config --global user.email "heroku@karugamo.agency"
git config --global user.name "Heroku Butler"

git clone git@github.com:flexiproducts/overwhelmingly-positive.git git-repo

cp data/* git-repo/data

cd git-repo

git add data

git commit -m "Update Data from heroku"

git push origin master