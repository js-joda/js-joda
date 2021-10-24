#!/bin/bash
git add docs
git commit -m "docs updated on - $(date)" || true
git push || true
