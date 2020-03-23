# AnunciaLOL

AnunciaLOL is an API based craigslist-like ad adminsitrator. You are very welcome to use the API by installing the APP into your system or check it out on --> **waiting for deployment**

The app includes a brief frontend manager to help you with the development on ** *localhost/* **

The app runs on ** *localhost/api/* **

## Tech

AnunciaLOL uses a number of open source projects to work properly:

* [node.js] - evented I/O for the backend
* [Express] - fast node.js network app framework [@tjholowaychuk]
* [MongoDB](www.mongodb.com) - DB powered mongo Style
* [Dillinger](https://dillinger.io) - markdown parser for newbies like me!

## Installation

AnunciaLOL requires [Node.js](https://nodejs.org/) v4+ to run and a MongoDB database deployed on local computer.

Install the dependencies and devDependencies, launnch your [DB](https://mongodb.com) and start the server.

```sh
$ npm install
$ npm run dev
```

Then initialize your DB on the application and then launch the express API to start listening to events on *LOCALHOST:3000*
```sh
$ npm reset_db
$ npm run dev
```
## AD Structure and schema
The ADS will have the following keys and value types:
| key | value (type) |
| ------ | ------ |
| title | String |
| Description | Mixed (indexed)|
| price | Number |
| Tags | Array |
| Cover | String (Path to fs) |
| Pictures | array (of paths |
| Type | Boolean (true =sell -- false = buy)|
| City | String |

## API methods and endpoints

- The API is divided on two main features: user administration and Ad displaying & management.
- The API does not require login in order to GET the ads, but login is required for posting, updating and deleting. User access is managed through cookies.
- A user can only update or delete their own ads

### USER ADMIN
User administration is divided on two methods: register an user and login into the platform

#### REGISTER

Route: https://localhost:3000/api/user/register
POST method --> URLencoded

Body:
| key | value (type) |
| ------ | ------ |
| username | String |
| password | String |

#### Login

Route: https://localhost:3000/api/user/login
POST method --> URLencoded

Body:
| key | value (type) |
| ------ | ------ |
| username | String |
| password | String |
| remember [optional] | Boolean |

you can add an optional remember me option by adding a remember key. It will extend the cookie for 3 months. By default it will be a session cookie

### AD Management
The APP covers the CRUD basics plus methods to manage pictures.

#### Display Ads
```sh
Endpoint: https://localhost:3000/api/ads/
Request method: GET
response type: Json

response: {
    success: true,
    ads: [{
        title: title,
        description: description,
        etc
    }]
}
```
#### Display single Ad
```sh
Endpoint: https://localhost:3000/api/ads/:id
Request method: GET
response type: Json

response: {
    sucess: true,
    ad: {
        title: title,
        description: description,
        etc
    }
}
```

#### Post AD (login required)
```sh
Endpoint: https://localhost:3000/api/ads/create
Request method: POST
response type: Json
Headers {
    content-type: 'application/form-data'
}

response: {
    sucess: true,
    ad: {
        title: title,
        description: description,
        etc
    }
}
```
#### Edit AD (login required)
```sh
Endpoint: Route --> https://localhost:3000/api/ads/:id
Request method: POST
response type: Json
Headers {
    content-type: 'application/form-URLencoded'
}

response: {
    sucess: true,
    ad: {
        title: title,
        description: description,
        etc
    }
}
```
#### Delete AD (login required)
#### Update cover picture (login required)
#### Add pictures to an AD -max. 8 pics per Ad- (login required)
