#!/bin/bash

if [ ! -d "day_${1}" ]; then
    mkdir -p "day_${1}"
fi


curl --cookie session=$(cat secrets/session) https://adventofcode.com/2018/day/$1/input \
    > "day_${1}/day${1}input"
