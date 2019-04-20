var MessagesView = {

  $chats: $('#chats'),

  initialize: function() {
    MessagesView.render();
  },

  render: function() {


    Parse.readAll((data) => {
      allMessages = data;
    })
    setTimeout(() => allMessages.results.forEach(function(message){
      if (!currentRooms[message.roomname] && message.roomname) {
        currentRooms[message.roomname] = true;
        allRooms.push(message.roomname)
      }
      MessagesView.renderMessage(message);

    }), 2000);
    setTimeout(() => MessagesView.$chats.append(MessageView.render()), 2000);

    

  },
  renderMessage: function(message) {
    // $('.timeago').timeago();
    if (!message.username) {
      message.username = 'anonymous';
    } if (!message.text) {
      message.text = 'I have nothing to say...'
    } if (message.text.includes('>')){
      message.text = 'nice try'
    }
    message.pic = randomPics[Math.floor(Math.random()*4)];
    // let time = $.timeago(message.createdAt);
    // console.log(time);
    // message.createdAt = time;
    let messageBlock = _.template(`
      <div class="message">
        <div class="username"><img src="profile-pics/<%= pic %>" height="60px" class="profilePic"><%= username %>: <%= createdAt %></div>
        <div class="text"><%= text %></div>
      </div>
    `);
    MessagesView.$chats.append(messageBlock(message))


//     14
// :
// createdAt :"2019-04-19T20:42:18.189Z"
// objectId:"tOF2MFXcot"
// roomname:"lobby"
// text:"fake news"
// updatedAt:"2019-04-19T20:42:18.189Z"
// username:"angela"
// __proto__:Object

  }

};