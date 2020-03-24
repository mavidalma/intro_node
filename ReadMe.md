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
```sh
Endpoint: https://localhost:3000/api/user/register
Request method: POST

Headers:
{
    content-type: application-URLencoded
}
Body:
{
    username: String,
    password: String,
}

response type: Json
{
    "success": true,
    "newUser": {
        "_id",
        "username",
        "password",
        "__v",
    }
}

```
#### Login
```sh
Endpoint: https://localhost:3000/api/user/login
Request method: GET

Headers:
{
    content-type: application-URLencoded
}

Body:
you can add an optional remember me option by adding a remember key. It will extend the cookie for 3 months. By default it will be a session cookie
{
    username: String,
    password: String,
    [remember: boolean]
}

response type: Json
{
    "success": true,
    "user": {
        "_id",
        "username",
        "password",
        "__v",
    }
}

```

### AD Management
The APP covers the CRUD basics plus methods to manage pictures.

#### Display Ads
```sh
Endpoint: https://localhost:3000/api/ads/
Request method: GET
response type: Json

response: {
    ads: [{
        title: title,
        description: description,
        etc
    }]
}
```
You can filter, limit & skip (for pagination), order and select displayed fields by passing the following query params:

| filter | query | example |
| ------ | ------ | ----------- |
| title | exact match | title=coche
| Description | indexed (will search coincidences on every field)| description = log lake big
| price | Number (from - to) | price=100-600 // price=-600 // price=100-
| Tags | Array | tags= lifestyle motor realstate
| Type | Boolean (true =sell -- false = buy)|type=true
| City | String | city=Madrid

Example: 
https://localhost3000:api/ads?title=car&price=-20000&city=Madrid
Will display ads with the title including "car" with a max. price of 20000 and with city Madrid.
**Queries are case sensitive**

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

It does not require any field. 

```sh
Endpoint: https://localhost:3000/api/ads/create
Request method: POST

Headers: 
{
    content-type: 'application/form-data'
}
body:
{
    title: string,
    description: String,
    price: Number,
    Tags: Array,
    Cover: file,
    pictures: file (max. 8 files) stored in array
    Type: Boolean,
    city: String
}


response type: Json
{
    "success": true,
    "ad": {
        "pictures": [],
        "tags": [],
        "_id",
        "title",
        "price",
        "type",
        "cover",
        "user",
        "__v"
    }
}
```
#### Edit AD (login required)

Use it to edit an ad info. For picture management there are especific methods.
```sh
Endpoint: https://localhost:3000/api/ads/:id
Request method: PUT

Headers 
{
    content-type: 'application/x-www-form-urlencoded'
}
Body
{
    key: value
}

response type: Json
{
    "sucess": _id,
    "changes": {
        title: title,
        description: description,
        ...
    }
}
```
#### Delete AD (login required)
```sh
Endpoint: https://localhost:3000/api/ads/:id
Request method: DELETE

Headers {
    content-type: 'application/x-www-form-urlencoded'
}

response type: Json
{
    "sucess": true,
    "deleted": _id
}
```
#### Update cover picture (login required)
```sh
Endpoint: https://localhost:3000/api/ads/cover/:id
Request method: POST

Headers 
{
    content-type: 'application/form-data'
}
Body:
{
    "pictures": [files]
}

response type: Json
{
    "success": true,
    "ad": _id,
    "path": {
        "cover": "ad_pics/file.extension"
    }
}
```

#### Add pictures to an AD -max. 8 pics per Ad- (login required)
This method overwrites all previous pictures with the following pictures. Should you want to include previous pictures, add them to the request
```sh
Endpoint: https://localhost:3000/api/ads/pics/:id
Request method: POST

Headers 
{
    content-type: 'application/form-data'
}
Body:
{
    "pictures": [files]
}

response type: Json
{
    "success": true,
    "ad": _id,
    "pictures": [paths]
}
```
#### Get available tags
```sh
Endpoint: https://localhost:3000/api/ads/tags
Request method: GET
response type: Json

response: {
    sucess: true,
    tags: [tags]
}
```
# Enjoy! 