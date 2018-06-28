#!/bin/sh

dir_name=`pwd`
for key in demo api docs dist
do
    rm -rf "${dir_name}/public/${key}"
    ln -s "${dir_name}/${key}" "${dir_name}/public/${key}"
done
