HowTo update tzdb data
======================

# Build Steps

- Copy over latest data from moment-timezone:
   - Copy moment-timezone's unpacked data `data/unpacked/latest.json` and `data/unpacked/<version>.json` to folder `data/unpacked/`.
   - Copy moment-timezone's packed data`data/packed/latest.json` and `data/packed/<version>.json` to folder `data/packed/`.
- Run `npm run transform-data` to generate all the data/packed/latest*.json files. 
  (Note that CI do not run this step, because we commit the generated files.)
- Run `npm run build-dist` to build all the .js bundles based on the latest*.json files available.

# Build moment-timezone data

- `git clone https://github.com/moment/moment-timezone.git`
- `npx grunt data:latest` # downloads and build new tzdb data
- `cat temp/download/latest/NEWS | less` # figure out latest tzdb version
- `npx grunt data:<version>` # build specific tzdb data version
- `npx grunt` # run tests and fix if necessary
