#!/usr/bin/env bash

mkdir -p ./.nyc_output
rm ./.nyc_output/*
cp ./packages/**/.nyc_output/*.json ./.nyc_output
NODE_ENV=test COVERAGE=1 ./node_modules/.bin/nyc report --report-dir=build/coverage --reporter=lcov --reporter html
