#!/bin/sh

echo "Waiting for Postgres to start..."
./wait-for db:5432 

echo "Migrating the databse..."
npx prisma migrate dev

echo "Starting the server..."
npm run dev 
