
$(document).ready(function () {
  var pcyzjShare
  $.get('../integration/getIMSecData.do', {}, function (data) {
    if (data.errorcode == 0) {
      window.pcyzjShare = new imCloud({ eid: data.eid, data: data.key })
	  var funCallback = window.funCallback;
	  funCallback && funCallback();
	  window.beLoadedImCloud = true;
    } else {
      var funCallback = window.funCallback;
	  funCallback && funCallback();
	  window.beLoadedImCloud = true;
      //console.warn('yzj login fail. errorcode=' + data.errorcode)
    }
    //window.funCallback 在scene/common-designer.js下定义的
  })

  var bindYzjImEvents = function (e) {
    var isLoaded = false
    var origin_x, origin_y
    var dragStart = false; var dragMove = false; var mx = 0; var my = 0; var sx = 0; var sy = 0
    var hideEle = false
    var time = setInterval(function () {
      if ($('.im-wrap').length > 0) {
        isLoaded = true
        clearInterval(time)
      }
    }, 1000)

    $(document).on('mousedown', '.im-wrap', function (event) {
      dragStart = true
      hideEle = false
      sx = event.clientX
      sy = event.clientY
      mx = 0
      my = 0
      origin_x = parseInt($('.im-wrap').css('right'))
      origin_y = parseInt($('.im-wrap').css('bottom'))
    })
    $(document).on('mousemove', function (event) {
      if (dragStart) {
        mx = event.clientX - sx
        my = event.clientY - sy
        var right = origin_x - mx
        var bottom = origin_y - my
        dragMove = true
        right = right < 0 ? 0 : right
        bottom = bottom < 0 ? 0 : bottom
        $('.im-wrap').css('right', right + 'px').css('bottom', bottom + 'px')
        if (!hideEle && !$('#im-session-left').hasClass('im-listAppear')) {
          $('.im-session-left').css('display', 'none')
          hideEle = true
        }
      }
    })

    document.addEventListener('mouseup', function (event) {
      if (dragStart && dragMove && hideEle) {
        setTimeout(function () {
          $('.im-session-left').css('display', '')
          $('.im-session-left.im-listAppear').removeClass('im-listAppear')
        }, 0)
      } else {
        if ($(event.target).parents('.im-wrap').length === 0 && $('.im-session-left.im-listAppear').hasClass('im-listAppear')) {
          // $('.im-session-left.im-listAppear').removeClass('im-listAppear');
          // $('#im-chat-container').hide();
          document.querySelector('.im-tray').click()
        }
      }
      dragStart = false
      dragMove = false
    }, true)
  }

  bindYzjImEvents()
})
