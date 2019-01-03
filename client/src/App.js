import React, { Component } from 'react';
import { ChatFeed, Message } from 'react-chat-ui'

import './App.css';

class App extends Component {
  state = {
    response: '',
    post: '',
    responseToPost: '',
    currentUserMsg: '',
    messages: []
  };

  constructor(props){
    super(props)
    this.onTextAreaChange = this.onTextAreaChange.bind(this)
    this.onTextAreaEnterPress = this.onTextAreaEnterPress.bind(this)
  }

  onTextAreaChange(e){
    this.setState({currentUserMsg: e.target.value})
  }

  onTextAreaEnterPress(e){
    if(e.keyCode == 13){
      let m = this.state.currentUserMsg;
      this.addUserMessage()
      //this.addBotMessage("you said something")
      this.postUserMessage(m)
    }
  }

  addBotMessage(s){
    const m = new Message({
        id: 1,
        message: s
      });

   let messages = this.state.messages;
   messages.push(m)
   this.setState({messages:messages, currentUserMsg:""})
  }

  addUserMessage(){
    const m = new Message({
        id: 0,
        message: this.state.currentUserMsg
      });

   let messages = this.state.messages;
   messages.push(m)
   this.setState({messages:messages, currentUserMsg:""})
  }

  componentDidMount() {
    this.callApi()
      .then(res => this.setState({ response: res.express }))
      .catch(err => console.log(err));
  }

  callApi = async () => {
    const response = await fetch('/api/hello');
    const body = await response.json();

    if (response.status !== 200) throw Error(body.message);

    return body;
  };

  async postUserMessage (str) {

    const response = await fetch('/api/world', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ post: str }),
    });
    const body = await response.text();

    this.addBotMessage(body)
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
        </header>


        <div className="chat_container">
          <ChatFeed
               messages={this.state.messages} // Boolean: list of message objects
               isTyping={this.state.is_typing} // Boolean: is the recipient typing
               hasInputField={false} // Boolean: use our input, or use your own
               showSenderName // show the name of the user who sent the message
               bubblesCentered={false} //Boolean should the bubbles be centered in the feed?
             />

          <textarea value={this.state.currentUserMsg} onChange={this.onTextAreaChange} onKeyDown={this.onTextAreaEnterPress}></textarea>
        </div>


      </div>
    );
  }
}

export default App;
