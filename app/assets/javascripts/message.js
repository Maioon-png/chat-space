$(function() {

  function buildHTML(message){
    if (message.image) {
      var html =`<div class="message">
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
      var html =`<div class="message">
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
      $('.new-message__submit-btn').prop('disabled', false);
    })
    .fail(function(){
      alert('メッセージ送信に失敗しました');
    })
  })
});