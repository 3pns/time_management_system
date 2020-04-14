# Folder structure

## rails backend

Same as usual

## front end React SPA

the root folder located in time_management_system_spa

## Folder structure
This project is organized by file types. While less common than grouping by features it is
an approach that fits the ruby on rails mindset and it is one of the recommanded folder organization
by the React Team

https://reactjs.org/docs/faq-structure.html

- actions: actions types and actions related to redux-saga
- assets: static files
- components: reusable components that may be shared among different projects
- containers: components that are connected to the redux store
- reducers: https://redux.js.org/basics/reducers 
- sagas: https://redux-saga.js.org/
- scss: https://sass-lang.com/
- services: api / file access / local storage access etc ...
- views: presentational component who should not be directly connected to the redux store.

# Code Conventions

DRY

## successful queries

POST/PUT/PATCH : must return the updated 
serialized
 object

## queries with errors

Must follow the pattern below :

{
    "errors": {
        "field_name_or_error_name": [
            "error_message"
        ]
    }
}

## pagination

{ 
  data: { ...mySerializedData }
  pagination: { ...myPaginationData }
}

# Development

## Setup the environment

install rvm : https://rvm.io/

rvm install 2.6.6
gem install bundler
bundle install
rails s

## Create and seed the database

rails db:create
rails db:migrate
PDD=true rails db:seed

# Deployment

## rails backend

## Requirements
- Ruby 2.6.6
- Rails 6.0.2
- Postgresql 11.4

## Environment variables required

DEVISE_JWT_SECRET_KEY, 
MAILER_DEVISE_SENDER, 
POSTGRES_HOST, 
POSTGRES_PASSWORD, 
POSTGRES_USER, 
SECRET_KEY_BASE, 
SMTP_PASSWORD, 
SMTP_USERNAME

RECAPTCHA_SITE_KEY=~
RECAPTCHA_SECRET_KEY=~
RECAPTCHA_ENABLED=~
FRONT_END_BASE_URL=~
JWT_EXPIRATION_TIME=~

time_management_system_production


## Database

CREATE USER time_management_system_production WITH PASSWORD '~';
create database time_management_system_production;
grant all privileges on database time_management_system_production to time_management_system_production;
