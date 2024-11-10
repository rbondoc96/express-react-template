#!/bin/bash

# -E:           Any `ERR` traps triggered will not be just for the main script,
#               but also for any functions or subshells called within the script.
# -e:           Script will exit automatically if any command returns a non-zero exit status.
# -o pipefail:  In a pipeline, the script will return the exit status of the LAST command to FAIL,
#               rather than just the status of the last command in the pipeline.
set -Eeo pipefail

# Build Databases
if docker exec -i ert_db psql -U postgres_user ert -c '\q' 2>&1; then
  echo "'ert' database already exists. skipping..."
else
  docker exec -i ert_db createdb -U postgres_user ert
fi

if docker exec -i ert_db psql -U postgres_user ert_test -c '\q' 2>&1; then
  echo "'ert_test' database already exists. skipping..."
else
  docker exec -i ert_db createdb -U postgres_user ert_test
fi
