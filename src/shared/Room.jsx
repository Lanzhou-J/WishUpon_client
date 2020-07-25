// originally was for src/App.js
import React, { Component } from "react";
// import './App.css'; <-- commented out for styling
import ConversationsList from "../chat/ConversationsList";

class Room extends Component {
  render() {
    return (
      <div className="Room">
        <ConversationsList />
      </div>
    );
  }
}

export default Room;
