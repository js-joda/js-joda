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

Steps: `fetch` → `compile` → `collect` → `write-unpacked` → `pack`. Intermediate results live in
`.cache/<version>/`, the results are written into `../timezone/data/` (`unpacked/latest.json`,
`unpacked/<version>.json`, `packed/latest*.json`, `packed/<version>.json`).
See [HowToUpdateTZDB.md](../timezone/HowToUpdateTZDB.md) for the complete update workflow.

Compare the generated data with moment-timezone data of the same release:

```bash
npm run parity -- <moment-timezone>/data/unpacked/2026a.json .cache/2026a/unpacked.json --until 2499
```

`--until` defaults to 2037. The data reaches 2499: zic writes the explicit transitions up to 2037 and
the builder expands the TZif footer rule (POSIX TZ string) after that.

The packed zone strings have the fields `name|abbrs|offsets|indices|untils|population|isdsts|stdOffsets`.
Fields 0–5 are moment-timezone's format (population is always empty), field 6 has the isdst flag and
field 7 the standard offset of each period type (encoded like the offsets). Readers that know only
fields 0–5 resolve the same offsets. The unpacked data has `isdsts` and `stdOffsets` per period.

The standard offset of each period comes from the STDOFF column of the Zone lines in `rearguard.zi`,
because TZif files don't contain it. Compare the standard offsets with java.time (needs `java` 11 or
later on the PATH; use a JDK with the same tzdb version, both versions are printed):

```bash
npm run standard-offsets -- .cache/2026a/unpacked.json --until 2499
```

`--until` defaults to 2499. Known differences are listed with their reason in
`scripts/standard-offsets-expected.json`.

List the zones whose offsets, abbreviations or isdst flags changed between two unpacked data files:

```bash
npm run data-diff -- <previous-unpacked.json> .cache/2026a/unpacked.json
```
