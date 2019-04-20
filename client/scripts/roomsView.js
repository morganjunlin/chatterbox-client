var RoomsView = {
  // $rooms: $('#rooms'),
  $button: $('#rooms button'),
  $select: $('#rooms select'),
  roomBlock: _.template(`<option value="<%= room %>"><%= room %></option>`),

  initialize: function() {
    RoomsView.render();
    $('#target').change(function(){ RoomsView.showRoom($(this).val()) });
    document.getElementById("addRoom").onclick = RoomsView.addRoom;
  },

  render: function() {
    
    setTimeout(() => allRooms.forEach(room => RoomsView.$select.append(RoomsView.roomBlock({room: room})) ), 4000)


  },

  showRoom: function(roomName){
    let $message = $('.message')
    $message.remove();
    allMessages.results.forEach(function(message) {
      let time = $.timeago(message.createdAt);
      if (message.createdAt.includes(':')) {
        message.createdAt = time;
      }
      if (message.roomname === roomName) {
        MessagesView.renderMessage(message)
      }
    })
  },

  addRoom: function() {
    let newRoom = {room:$('#roomName').val()}
    RoomsView.$select.append(RoomsView.roomBlock(newRoom))
    console.log(newRoom)
  }
};