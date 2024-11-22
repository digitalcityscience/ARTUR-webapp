#!/bin/bash

# Script to recreate the database and restore from the dump
set -e

# Drop and recreate the database
psql -U $POSTGRES_USER -c "DROP DATABASE IF EXISTS $POSTGRES_DB;"
psql -U $POSTGRES_USER -c "CREATE DATABASE $POSTGRES_DB WITH OWNER = $POSTGRES_USER;"

# Restore the database
psql -U $POSTGRES_USER -d $POSTGRES_DB -f /docker-entrypoint-initdb.d/db_dump.sql

echo "Database recreated and initialized successfully."