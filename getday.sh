#!/bin/bash

curl --cookie session=$(cat secrets/session) https://adventofcode.com/2018/day/$1/input
