$(function() {

  function buildHTML(message){
    if (message.image) {
      var html =`<div class="message" data-message-id="${message.id}">
                  <div class="message__info">
                    <p class="message__info__user">
                      ${message.user_name}
                    </p>
                    <p class="message__info__date">
                      ${message.created_at}
                    </p>
                  </div>
                  <div class="message__text">
                    <p>${message.content}</p>
                    <img src="${message.image}">
                </div>
              </div>`
      return html;
    } else {
      var html =`<div class="message" data-message-id="${message.id}">
                  <div class="message__info">
                    <p class="message__info__user">
                      ${message.user_name}
                    </p>
                    <p class="message__info__date">
                      ${message.created_at}
                    </p>
                  </div>
                  <div class="message__text">
                    ${message.content}
                  </div>
                </div>`
    }
    return html;
  }

  $('#new_message').on('submit', function(e) {
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: 'POST',
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data) {
      var html = buildHTML(data);
      $('.chat-main__message-list').append(html);
      $('.chat-main__message-list').animate({ scrollTop: $('.chat-main__message-list')[0].scrollHeight});
      $('#new_message')[0].reset();
    })
    .fail(function(){
      alert('メッセージ送信に失敗しました');
    })
    .always(function(){
      $('.new-message__submit-btn').prop('disabled', false);
    })
  })
  

  var reloadMessages = function() {
    var last_message_id = $('.message:last').data("message-id");
    $.ajax({
      url: "api/messages",
      type: 'GET',
      dataType: 'json',
      data: { id: last_message_id }
    })
    .done(function(messages) {
      if (messages.length !== 0) {
        var insertHTML = '';
        $.each(messages, function(i, message) {
          insertHTML = insertHTML + buildHTML(message);
        })
        $('.chat-main__message-list').append(insertHTML);
        $('.chat-main__message-list').animate({ scrollTop: $('.chat-main__message-list')[0].scrollHeight});
      }
    })
    .fail(function() {
      alert('error!');
    });
  };

  if (document.location.href.match(/\/groups\/\d+\/messages/)) {
    setInterval(reloadMessages, 7000);
  }
});