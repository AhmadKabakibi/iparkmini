# iparkmini
:parking: iparkmini :blue_car:

[![Build Status](https://travis-ci.com/AhmadKabakibi/iparkmini.svg?branch=master)](https://travis-ci.com/AhmadKabakibi/iparkmini)
[![Coverage Status](https://coveralls.io/repos/github/AhmadKabakibi/iparkmini/badge.svg?branch=master)](https://coveralls.io/github/AhmadKabakibi/iparkmini?branch=master)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)

## Install
```sh
npm install
```
## Run
```sh
Need Docker Community Edition installed: `docker-compose up`
npm run start
```
## CLI Tasks
```sh
assuming all csv files are located uneder ./resources

Load default set of cars into database
npm run load-csv <filename>.csv

Run Lint
npm run lint
npm run lint-fix
```

## API Demo 
Import Postman collection IParkMini.postman_collection.json

## API
TODO:
- Improve redis setup 
- Integrate socket.io with api implementation
- Add user interface to check and load parking lots

> implement Story 3
    As a user I want to get a list of all the money I'm making
    `GET /inventory/$(T)` should give me the total inventory of
    all the parking lots.
    example output:
```json
	`{
	"totalAmountOfCars": 6,
	"value": 14.70,
	"discountInCents": 50
	}
```



## Maintainers

[@AhmadKabakibi](https://github.com/AhmadKabakibi)
