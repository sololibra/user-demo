# Users(NodeJs,vue,element)

## Technology stack

### Front end

- vue
- ElementUI

### Back end

- Node.js
- Koa2
- Mongoess

### Database

- mongodb

## Intro

A simple user management

## How to use
### back end
1. Install mongodb
   Refer to [install mongodb](https://www.runoob.com/mongodb/mongodb-window-install.html)
2. Install node
   Refer to [install mongodb](https://www.runoob.com/nodejs/nodejs-install-setup.html)
3. Database configuration <br>
   Take .env.simple as an example to create a .env file
```
$ mv .env.simple .env
# database address
DB_BASE_URL=mongodb://<user>:<pwd>@127.0.0.1:27017
DB_NAME=color

# env
NODE_ENV=dev

# jwt secret
JWT_SECRET=abcd1234
```
6. Project beginning
```
npm install
npm run dev
```
