@js-joda/tzdb-builder
=====================

Private (unpublished) package that generates the IANA tzdb data of `@js-joda/timezone`.

It downloads a tzdb release from [data.iana.org](https://data.iana.org/time-zones/),
builds `zic` from the matching tzcode, compiles the data in rearguard format and reads the
compiled TZif files in plain JavaScript.

## Requirements

Node >= 20, `make`, a C compiler (`cc`), `tar` and network access to `data.iana.org`.

## Usage

```bash
npm install
npm run generate -- <latest|version>          # e.g. 2026a
npm run generate -- 2026a --step compile      # run a single step
npm run generate -- 2026a --from collect      # resume from a step
npm run generate -- 2026a --force             # download again, ignore the cache
```

Steps: `fetch` → `compile` → `collect`. Intermediate results live in `.cache/<version>/`.

Compare the generated data with moment-timezone data of the same release:

```bash
npm run parity -- <moment-timezone>/data/unpacked/2026a.json .cache/2026a/unpacked.json --until 2499
```

`--until` defaults to 2037. The data reaches 2499: zic writes the explicit transitions up to 2037 and
the builder expands the TZif footer rule (POSIX TZ string) after that.
