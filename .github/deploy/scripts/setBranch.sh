#!/usr/bin/env bash

set -euo pipefail

BRANCH_NAME=${GITHUB_REF##*/}
echo "BRANCH_NAME=${BRANCH_NAME}" >> $GITHUB_ENV
