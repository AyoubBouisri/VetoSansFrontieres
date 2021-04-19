# VetoSansFrontieres

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 10.2.0.

## Running the application

1) In /client run a 'npm install' to install all the packages needed for the client
2) In /server run a 'npm install' to install all the packages needed for the server

3) Generate your postgreSql Server using the files in the database folder
    3.1 ) Use database/bdschema.sql to create the schema for your db
    3.2 ) Use database/data.sql to insert all the data inside your tables
    3.3 ) In the file server/services/database.service.ts Update the configuration dictionary from line 10 to 14 with the information of your postgreSql server.
    3.4 ) IF no connection happens, try to reinstall the pg module with "npm uninstall pg", "npm uninstall pg.pool" and "npm install pg"

4) In /client run the command 'npm start' to launch the client on localhost:4200
5) In /server run the command 'npm start' to launch the server on localhost:3000

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
