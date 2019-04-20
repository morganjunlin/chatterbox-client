var MessagesView = {

  $chats: $('#chats'),

  initialize: function() {
    MessagesView.render();
  },

  render: function() {
    let lastMesssage;

    Parse.readAll((data) => {
      allMessages = data;
    })
    setTimeout(() => allMessages.results.forEach(function(message, i){
      if (i === 0) {
        lastMessage = message.objectId;
        console.log(lastMessage)
      }
      if (!message.roomname || message.roomname.includes('>')) {
        message.roomname = 'lobby'
      }
      if (!currentRooms[message.roomname] && message.roomname) {
        currentRooms[message.roomname] = true;
        allRooms.push(message.roomname)
      }
      let time = $.timeago(message.createdAt);
      message.createdAt = time;
      MessagesView.renderMessage(message);

    }), 3000);
    setTimeout(() => MessagesView.$chats.append(MessageView.render()), 3000);
    
    setInterval( function() {
      Parse.readAll((data) => {
        allMessages = data;
      })
      setTimeout(function() {
        for (let i = 0; i < allMessages.results.length; i++) {
          if (allMessages.results[i].objectId !== lastMessage){
            console.log('ready to add new message')
            if (i === 0) {
              lastMessage = allMessages.results[i].objectId;
              console.log('new last message', lastMessage)
            }
            if (!allMessages.results[i].roomname || allMessages.results[i].roomname.includes('>')) {
              allMessages.results[i].roomname = 'lobby'
            }
            if (!currentRooms[allMessages.results[i].roomname] && allMessages.results[i].roomname) {
              currentRooms[allMessages.results[i].roomname] = true;
              allRooms.push(allMessages.results[i].roomname)
            }
            let time = $.timeago(allMessages.results[i].createdAt);
            allMessages.results[i].createdAt = time;


            MessagesView.renderNewMessage(allMessages.results[i]);

            
          }
          if (allMessages.results[i].objectId === lastMessage){
            console.log('no more new messages')
            return
          }
        }
  
      }, 3000);

    }, 3001);
    



  
  },
  renderMessage: function(message) {
    if (!message.username || message.username.includes('>')) {
      message.username = 'anonymous';
    } if (!message.text) {
      message.text = 'I have nothing to say...'
    } if (message.text.includes('>')){
      message.text = 'nice try'
    }
    message.pic = randomPics[Math.floor(Math.random()*randomPics.length)];
    let messageBlock = _.template(`
      <div class="message">
        <section class="profilePic"><img src="profile-pics/<%= pic %>" height="100%"></section>
        <section class="msg"><div class="username"><a href=""><%= username %></a> · <%= createdAt %></div>
        <div class="text"><%= text %></div></section>
      </div>
    `);

    // $('.username').click(function() {
    //   console.log(this)
    // })
    MessagesView.$chats.append(messageBlock(message))



// objectId:"tOF2MFXcot"
// roomname:"lobby"
// text:"fake news"
// updatedAt:"2019-04-19T20:42:18.189Z"
// username:"angela"
// __proto__:Object

  },
  renderNewMessage: function(message) {
    if (!message.username || message.username.includes('>')) {
      message.username = 'anonymous';
    } if (!message.text) {
      message.text = 'I have nothing to say...'
    } if (message.text.includes('>')){
      message.text = 'nice try'
    }
    message.pic = randomPics[Math.floor(Math.random()*randomPics.length)];
    let messageBlock = _.template(`
      <div class="message">
        <section class="profilePic"><img src="profile-pics/<%= pic %>" height="100%"></section>
        <section class="msg"><div class="username"><a href=""><%= username %></a> · <%= createdAt %></div>
        <div class="text"><%= text %></div></section>
      </div>
    `);

    // $('.username').click(function() {
    //   console.log(this)
    // })
    MessagesView.$chats.prepend(messageBlock(message))



// objectId:"tOF2MFXcot"
// roomname:"lobby"
// text:"fake news"
// updatedAt:"2019-04-19T20:42:18.189Z"
// username:"angela"
// __proto__:Object

  }

};