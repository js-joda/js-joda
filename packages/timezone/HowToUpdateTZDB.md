HowTo update tzdb data
======================

# Build Steps

- Copy over latest data from moment-timezone:
   - moment-timezone's unpacked latest.json should be copied over to data/unpacked/latest.json.
   - moment-timezone's dated packed data, such as 2018h.json, can be copied over to data/packed/<name> if it isn't yet.
- Run npm run transform-data to generate all the data/packed/latest*.json files. (Note that CI doesn't have to run this step since I checked the generated files in.)
- Run npm run build-dist to build all the .js bundles based on the latest*.json files available.

# Build moment-timezone data

- `git clone https://github.com/moment/moment-timezone.git`
- `npx grunt data:latest` # downloads and build new tzdb data
- `cat temp/download/latest/NEWS | less` # figure out latest tzdb version
- `npx grunt data:<version>` # build specific tzdb data version
- `npx grunt` # run tests and fix if necessary
