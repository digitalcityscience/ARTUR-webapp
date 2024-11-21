# Base image
FROM postgis/postgis:latest

# Set environment variables for Postgres initialization
ENV POSTGRES_USER=${POSTGIS_USER}
ENV POSTGRES_PASSWORD=${POSTGIS_PASSWORD}
ENV POSTGRES_DB=${POSTGIS_DB}

# Copy the SQL dump into the container
COPY db_dump.sql /docker-entrypoint-initdb.d/db_dump.sql

# Add a script for recreating the database
COPY recreate_db.sh /usr/local/bin/recreate_db.sh
RUN chmod +x /usr/local/bin/recreate_db.sh

# Expose the default PostgreSQL port
EXPOSE 5432
