require(['./js/built-compare-amd.js'], function (Compare) {
	var urlParams = getUrlParams()
	var URI = {
		base: '/' + location.pathname.split('/')[1]
	}
	URI.getScriptContent = urlParams.kdcdc ? URI.base + '/gitmanager/getConflictFiles.do' + '?kdcdc=' + urlParams.kdcdc : URI.base + '/gitmanager/getConflictFiles.do'
	$.ajax({
		type: 'POST',
		url: URI.getScriptContent,
		dataType: 'json',
		data: {
			projecturl: urlParams.projectURL,
			gitrepository: urlParams.gitRepository,
			personalgitrepository: urlParams.personalGitRepository,
			bizappid: urlParams.bizAppId,
			filepath: urlParams.filePath,
			type: urlParams.type,
			id: urlParams.id,
			bizappid: urlParams.bizAppId,
			issave: urlParams.isSave
		},
		success: function (data) {
			if (data.errorinfo != null) {
				alert(data.errorinfo)
				return
			}
			var hideToolbarItem = data.hide
			var showToolbarItem = data.show

			var whitespace = true
			var rightarrow = true
			if (hideToolbarItem && hideToolbarItem.length) {
				for (var index = 0; index < hideToolbarItem.length; index++) {
					if (hideToolbarItem[index] === 'whitespace') {
						whitespace = false

					} else if (hideToolbarItem[index] === 'rightarrow') {
						rightarrow = false

					}
				}
			}
			if (showToolbarItem && showToolbarItem.length) {
				for (var index = 0; index < showToolbarItem.length; index++) {
					if (showToolbarItem[index] === 'whitespace') {
						whitespace = true

					} else if (showToolbarItem[index] === 'rightarrow') {
						rightarrow = true


					}
				}
			}


			var options = {
				parentDivId: 'compareParentDiv',
				newFile: {
					Name: data.svnname,
					Content: data.svncontent
				},
				oldFile: {
					Name: data.localename,
					Content: data.localecontent,
					readonly: false
				},
				showTitle: true,
				whitespace,
				rightarrow
			}
			var compare = new Compare(options, 'compareCommandHolder', 'twoWay', true)
			window.compares = window.compares || {}
			window.compares[urlParams.id] = compare
		},
		error: function (data) {
			$('.tipinfoarea').addClass('error')
			$('.tip').html('操作失败')
			$('.info').html(result.submitinfo)
		}
	})
})
function getUrlParams() {
	var urlParams = {}
	var query = window.query
	var params = query.split('?')[1]
	var vars = params.split('&')
	for (var i = 0; i < vars.length; i++) {
		var pair = vars[i].split('#')
		if (pair[0] == 'type') {
			urlParams.type = pair[1]
		} else if (pair[0] == 'id') {
			urlParams.id = pair[1]
		} else if (pair[0] == 'pageid') {
			urlParams.pageId = pair[1]
		} else if (pair[0] == 'uuid') {
			urlParams.uuid = pair[1]
		} else if (pair[0] == 'bizappid') {
			urlParams.bizAppId = pair[1]
		} else if (pair[0] == 'projecturl') {
			urlParams.projectURL = pair[1]
		} else if (pair[0] == 'gitrepository') {
			urlParams.gitRepository = pair[1]
		} else if (pair[0] == 'personalgitrepository') {
			urlParams.personalGitRepository = pair[1]
		} else if (pair[0] == 'filepath') {
			urlParams.filePath = pair[1]
		} else if (pair[0] == 'issave') {
			urlParams.isSave = pair[1]
    } else if (pair[0] == 'kdcdc') {
      urlParams.kdcdc = pair[1]
		}
	}
	return urlParams
}

function updateToLocale() {
	var urlParams = getUrlParams()
	var compare = window.compares[urlParams.id]

	var newContent = compare.compareView._widget._editors[0].getText()
	var URI = {
		base: '/' + location.pathname.split('/')[1]
	}
	URI.updateToLocale = urlParams.kdcdc ? URI.base + '/gitmanager/updateToLocale.do' + '?kdcdc=' + urlParams.kdcdc : URI.base + '/gitmanager/updateToLocale.do'
	$.ajax({
		type: 'POST',
		url: URI.updateToLocale,
		dataType: 'json',
		data: {
			id: urlParams.id,
			type: urlParams.type,
			content: newContent,
			personalgitrepository: urlParams.personalGitRepository,
			bizappid: urlParams.bizAppId
		},
		success: function (result) {
			$('.tipinfoarea').show()
			// $(window.parent.document.querySelector("[data-ctrl-id='updatetolocale'").parentElement).css('z-index', -1) // 不论成功还是失败，更新按钮始终显示
			if (!result.success) {
				$('.tipinfoarea').addClass('error')
				$('.tip').html('更新失败')
				$('.info').html(result.submitinfo)
				return
			}
			$('.tip').html('')
			$('.info').html('已成功将右侧内容更新到数据库！')
			setTimeout(function (self = this) {
				$('.tipinfoarea').hide()
				// $(window.parent.document.querySelector("[data-ctrl-id='updatetolocale'").parentElement).css('z-index', 1)
			}, 3000)
		},
		error: function (result) {
			$('.tipinfoarea').addClass('error')
			$('.tip').html('操作失败')
			$('.info').html(result.submitinfo)
		}
	})
}
function addEventListenerOfMessage(e) {
	var data = JSON.parse(e.data)
	if (data.type == 'updatetolocale') {
		updateToLocale()
	}
}

function closeTipInfo(e) {
	$('.tipinfoarea').removeClass('error')
	var parentElementExist
	var submitElement = window.parent.document.querySelector("[data-ctrl-id='updatetolocale'")
	if (submitElement) {
		parentElementExist = submitElement.parentElement
	}
	$(parentElementExist).css('z-index', 1)
	$('.tipinfoarea').hide()
}

// 为window注册message事件并绑定监听函数
window.onload = function () {
	if (window.addEventListener) {
		window.addEventListener('message', addEventListenerOfMessage, false)
	} else {
		window.attachEvent('message', addEventListenerOfMessage)
	}
	window.query = window.location.href
}

function getCurrentIframe(uuid) {
	var iframe
	var iframes = window.parent.document.getElementsByTagName('iframe')
	for (var i = 0; i < iframes.length; i++) {
		var src = iframes[i].src
		if (src.indexOf('uuid#' + uuid) != -1) {
			iframe = iframes[i]
			break
		}
	}
	return iframe
}
