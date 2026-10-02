#!/usr/bin/env bash
#
# Opens a GitHub issue when IANA has published a tzdb release that is newer than the data
# committed in @js-joda/timezone. Does nothing if an open issue for that release already exists.
# Used by .github/workflows/tzdb-release-check.yaml, needs curl, jq and an authenticated gh.

set -euo pipefail

DATA_FILE="${DATA_FILE:-packages/timezone/data/packed/latest.json}"
VERSION_URL="${VERSION_URL:-https://data.iana.org/time-zones/tzdb/version}"
REPOSITORY="${GITHUB_REPOSITORY:-js-joda/js-joda}"
VERSION_PATTERN='^([0-9]{4})([a-z]+)$'

latest="$(curl -fsSL "$VERSION_URL" | tr -d '[:space:]')"
current="$(jq -r .version "$DATA_FILE")"

for version in "$latest" "$current"; do
    if [[ ! "$version" =~ $VERSION_PATTERN ]]; then
        echo "Unexpected tzdb version '$version'" >&2
        exit 1
    fi
done

# true if version $1 is newer than $2: compare the year, then the letters (a < z < aa)
is_newer() {
    [[ "$1" =~ $VERSION_PATTERN ]]; local year1="${BASH_REMATCH[1]}" letters1="${BASH_REMATCH[2]}"
    [[ "$2" =~ $VERSION_PATTERN ]]; local year2="${BASH_REMATCH[1]}" letters2="${BASH_REMATCH[2]}"
    if (( year1 != year2 )); then
        (( year1 > year2 ))
    elif (( ${#letters1} != ${#letters2} )); then
        (( ${#letters1} > ${#letters2} ))
    else
        [[ "$letters1" > "$letters2" ]]
    fi
}

echo "IANA latest tzdb: $latest, committed in @js-joda/timezone: $current"

if ! is_newer "$latest" "$current"; then
    echo "tzdb data is up to date"
    exit 0
fi

title="Update tzdb to $latest"
if gh issue list --repo "$REPOSITORY" --state open --limit 200 --json title --jq '.[].title' | grep -Fxq "$title"; then
    echo "An open issue '$title' already exists"
    exit 0
fi

body="IANA published tzdb release **$latest**, \`@js-joda/timezone\` contains **$current**.

- Release notes: https://data.iana.org/time-zones/tzdb-$latest/NEWS
- How to update: https://github.com/$REPOSITORY/blob/main/packages/timezone/HowToUpdateTZDB.md

_Opened by the tzdb release check workflow._"

gh issue create --repo "$REPOSITORY" --title "$title" --body "$body"
echo "Opened issue '$title'"
