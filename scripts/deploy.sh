#!/bin/sh

# copy dist
dir_name=`pwd`
for key in demo api docs dist
do
    rm -rf "${dir_name}/public/${key}"
    ln -s "${dir_name}/${key}" "${dir_name}/public/${key}"
done

# generate menu
npm run menu

# clean example
npm run exampleclean

# copy example
npm run copyexample

# build for deploy
npm run build

