#!/bin/bash
git add docs
set +e  # Grep succeeds with nonzero exit codes to show results.
git status | grep modified
if [ $? -eq 0 ]
then
    set -e
    git commit -m "docs updated on - $(date)" || true
    git push || true
else
    set -e
    echo "No changes since last run"
fi
