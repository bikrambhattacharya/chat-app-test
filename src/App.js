import React, {Component} from 'react'
import {Launcher} from 'react-chat-window'
import openSocket from 'socket.io-client';
const socket = openSocket('http://localhost:3000');

class ChatWindow extends Component {

  constructor() {
    super();
    this.state = {
      messageList: []
    };
  }
componentDidMount(){
  socket.on('newMessage',(message)=>{
    this.setState({
      messageList: [...this.state.messageList, {author:'them',type:'text',data:{text:message}}]
    })
  });
}
  _onMessageWasSent(message) {
    this.setState({
      messageList: [...this.state.messageList, message]
    })
    socket.emit('message',message);
  }
  render() {
    return (<div>
      <h1>This a test chat app by Bikram Bhattcharya</h1>
      <Launcher
        agentProfile={{
          teamName: 'Fun chat',
          imageUrl: 'https://a.slack-edge.com/66f9/img/avatars-teams/ava_0001-34.png'
        }}
        onMessageWasSent={this._onMessageWasSent.bind(this)}
        messageList={this.state.messageList}
        showEmoji
      />
    </div>)
  }
}
export default ChatWindow;