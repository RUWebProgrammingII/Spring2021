# General information
The server is written in NodeJS, which must be installed on the machine before running the server code. It can be downloaded [here](https://nodejs.org/en/).

Also all dependencies must be setup before running the server:
`npm install`

In order to run the server (which will run the server in a watch mode): `npm start`

The server is running on port **8080**

# Event listeners
Below is a listing of all the event listeners setup on the server as well as a basic example how to active the listeners:

**'users'**
This event should be emitted when you want to get the initial user list. 
*Parameters:* No parameters.
*Example:*
```js
socket.emit('users');
```

**'leave'**
This event should be emitted when a player decides to leave
*Parameters:* No parameters.
*Example:*
```js
socket.emit('leave');
```

# Emitting events
Below is a listing of all the events which are emitted from the server, the clients connected via **socket.io** can add listeners on their side which are activated on emission:

**'users'**
This event is emitted from the server and contains a list of users
```js
socket.on('users', users => {
  // Do something with the users list
});
```

**'connected_user'**
This event is emitted from the server when a new player connects and all connected sockets are notified by this.
```js
socket.on('connected_user', userObject => {
  // Do something with the information
});
```

**'disconnected_user'**
This event is emitted from the server when a player disconnects and all connected sockets are notified by this.
```js
socket.on('disconnected_user', userId => {
  // Do something with the information
});
```

**'session'**
This event is emitted from the server to the socket which just connected and contains information to reconnect using a session id. This should be stored within a local storage.
```js
socket.on('session', session => {
  // Do something with the information
});
```