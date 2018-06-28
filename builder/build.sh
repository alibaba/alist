#!/bin/sh

# script for inner staff

# clean
echo "start cleaning assets..."
rm -rf build
rm -rf dist
rm -rf lib
echo "clean assets finished"

# build lib, change to builder script later
echo "start building lib..."
just build
echo "start building lib finished"

# build dist
echo "start building dist..."
tnpm run deploy
echo "start building dist finished"