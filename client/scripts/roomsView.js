var RoomsView = {

  $button: $('#rooms button'),
  $select: $('#rooms select'),

  initialize: function() {
    console.log('im running roomsview')
    RoomsView.render();
  },

  render: function() {
    
    const roomBlock = _.template(`<option value="<%= room %>"><%= room %></option>`);
    setTimeout(() => allRooms.forEach(room => RoomsView.$select.append(roomBlock({room: room})) ), 3000)


  },

  renderRoom: function(){
  }

};
