# project2_petters - May 27th 2022

## Table of Contents

- [Description](#Description)
- [Installation](#Installation)
- [Local Usage](#Local-Usage)
- [Links](#Links)
- [Questions](#Questions)

##

## Description

This application...

## Installation

1. To install application, clone the main project via the HTTP or SSH link on github.

```
git clone
```

2. Once cloned, open up the project folder in your text editor and run the following command in terminal to install all dependencies.

```
npm install
```

## Local-Usage

# Initial setup

Create an '.env' file in the main directory path and include the following data:

```
DB_NAME='your_database_name'
DB_USER='your_mysql_username'
DB_PW='your_mysql_password'
```

Once your '.env' has been created with the corresponding data, open up the schema ('db/schema.sql') and update the database label to match with the database you included in your '.env' file.

# Database reset

Before seeding the data, make sure to reset the database by setting 'force: false' to 'true' in the 'server.js' file and type this command in terminal:

```
npm start
```

After that, revert back to 'false' and exit the server by typing

```
control + c
```

# Seeding starter data into database and starting the server

To seed the database with the starter data, type this command in terminal:

```
npm run seeds
```

To start the server, type in terminal:

```
npm start
```

From there, you are ready to use the application!

## Links

[Link to live application](google.com)

## Built With

- Node.js
- Express.js
- Handlebars template engine
- Bcrypt
- Express sessions
- Sequelize
- Dotenv
- MySQL2
- Heroku
- JavaScript

## License

This project is covered under the MIT License.
