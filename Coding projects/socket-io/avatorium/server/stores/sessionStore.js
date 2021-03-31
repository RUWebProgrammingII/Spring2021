/* abstract */ class SessionStore {
  isUsernameOccupied(username) { }
  findSession(id) { }
  findSessionByUserID(userID) { }
  saveSession(id, session) { }
  removeSession(id) { }
  findAllSessions() { }
}

class InMemorySessionStore extends SessionStore {
  constructor() {
    super();
    this.sessions = new Map();
  }

  isUsernameOccupied(username) {
    return !!Array.from(this.sessions.values()).find(s => s.username === username);
  }

  findSession(id) {
    return this.sessions.get(id);
  }

  findSessionByUserID(userID) {
    return this.findAllSessions().find(s => s.userID === userID);
  }

  saveSession(id, session) {
    this.sessions.set(id, session);
  }

  removeSession(id) {
    this.sessions.delete(id);
  }

  findAllSessions() {
    return [...this.sessions.values()];
  }
}

module.exports = {
  InMemorySessionStore
};
