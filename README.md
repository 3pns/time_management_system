# Folder structure

## rails backend

Same as usual

## front end React SPA

root folder located in toptal_time_management_system_spa

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

# successful queries


POST/PUT/PATCH : must return the updated object


# queries with errors

Must follow the pattern below :

{
    "errors": {
        "field_name_or_error_name": [
            "error_message"
        ]
    }
}

# Deployment

## rails backend

## Environment variables required by the Docker image

DEVISE_JWT_SECRET_KEY
MAILER_DEVISE_SENDER
