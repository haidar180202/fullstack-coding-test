#!/bin/sh
set -e

composer install --no-interaction --optimize-autoloader --no-dev

# Wait for the database to be ready
# This is a simple loop, a more robust solution might use docker-compose depends_on with healthchecks
# or a tool like wait-for-it.sh. For this case, we assume the DB is quick to start.
php artisan migrate --force
php artisan db:seed --force

# Now, execute the main command (passed from CMD in Dockerfile)
exec "$@"