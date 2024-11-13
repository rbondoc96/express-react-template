#!/bin/bash

set -Eeo pipefail

# Generate private key
openssl genrsa -out jwtRSA256-private.pem 2048
# Generate public key
openssl rsa -in jwtRSA256-private.pem -pubout -outform PEM -out jwtRSA256-public.pem

mv jwtRSA256-private.pem packages/server/jwtRSA256-private.pem
mv jwtRSA256-public.pem packages/server/jwtRSA256-public.pem
