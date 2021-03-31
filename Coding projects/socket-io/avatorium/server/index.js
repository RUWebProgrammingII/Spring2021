const httpServer = require("http").createServer();
const crypto = require("crypto");
const randomId = () => crypto.randomBytes(16).toString("hex");
const io = require("socket.io")(httpServer, {
  cors: {
    origin: "http://localhost:3000",
  },
});

// Session store
const { InMemorySessionStore } = require("./stores/sessionStore");
const sessionStore = new InMemorySessionStore();

io.use((socket, next) => {
  const sessionID = socket.handshake.auth.sessionID;
  if (sessionID) {
    const session = sessionStore.findSession(sessionID);
    if (session) {
      socket.sessionID = sessionID;
      socket.userID = session.userID;
      socket.avatar = session.avatar;
      return next();
    }
  }
  const avatar = socket.handshake.auth.avatar;
  if (!avatar) {
    return next(new Error("invalid avatar"));
  }

  socket.sessionID = randomId();
  socket.userID = randomId();
  socket.avatar = avatar;
  next();
});

const getListOfUsers = () => {
  const sessions = sessionStore.findAllSessions();
  const users = [];

  sessions.forEach((session) => {
    users.push({
      userID: session.userID,
      avatar: session.avatar,
      connected: session.connected
    });
  });
  return users;
}

const getSocketByUserId = async userId => {
  const sockets = Array.from(await io.allSockets());
  const socketId = sockets.find(
    (socketId) => io.sockets.sockets.get(socketId).userID === userId,
  );
  if (!socketId) { return null; }
  return io.sockets.sockets.get(socketId);
}

io.on('connection', socket => {
  // persist session
  sessionStore.saveSession(socket.sessionID, {
    userID: socket.userID,
    avatar: socket.avatar,
    connected: true
  });

  // emit session details
  socket.emit('session', {
    sessionID: socket.sessionID,
    userID: socket.userID,
    avatar: socket.avatar
  });

  socket.join(socket.userID);

  console.log(`Connected with avatar URL ${socket.avatar}`);

  // Broadcast to all users the newly connected user
  socket.broadcast.emit('connected_user', {
    userID: socket.userID,
    avatar: socket.avatar,
    connected: socket.connected
  });

  socket.on('users', () => {
    socket.emit('users', getListOfUsers());
  });

  socket.on('leave', () => {
    sessionStore.removeSession(socket.sessionID);
    socket.broadcast.emit('user_left', socket.userID);
  });

  socket.on('disconnect', () => {
    console.log(`Disconnected: ${socket.avatar}`);

    const session = sessionStore.findSession(socket.sessionID);

    if (session) {
      // update the connection status of the session
      sessionStore.saveSession(socket.sessionID, {
        userID: socket.userID,
        avatar: socket.avatar,
        connected: false
      });

      // notify other users
      socket.broadcast.emit('disconnected_user', socket.userID);
    }
  });

});

httpServer.listen(8080);
