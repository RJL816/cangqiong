;
Array.prototype.indexOf = function(val) {
    for (var i = 0; i < this.length; i++) {
        if (this[i] == val) return i;
    }
    return -1;
};

function imShare(opt) {
    this.data = opt.data;
    this.eid = opt.eid;
    this.sGroup = [];
    this.sPerson = [];
    this.selectedInfo = {};
    this.shareInfo = {};
    this.groupOffset = 0;
    this.ticket = '';
    this.init();
}

var origin = '//yunzhijia.com';
imShare.prototype = {
    init: function() {
        var me = this;
        if (!$('#ims-layer').length) {
            $.ajax({
                type: 'post',
                url: origin + '/imsdk/auth.do',
                data: {
                    eid: me.eid,
                    data: me.data
                },
                dataType: 'json'
            }).then(function(resp) {
                if (resp.success) {
                    me.ticket = resp.data;
                    $('head').append('<link rel="stylesheet" href="https:' + origin + '/imsdk/imshare/css/imShare.css"/>');
                    var rootEle = document.createElement('div');
                    rootEle.id = 'ims-layer';
                    rootEle.className = 'ims-layer';
                    rootEle.style.display = 'none';
                    rootEle.innerHTML = '<div class="ims-shade"></div><div class="ims-window">' +
                        '<div class="ims-head"><span class="ims-head-title">分享到云之家</span><span class="ims-head-close ims-close">×</span></div>' +
                        '<div class="ims-main">' +
                        '<div class="ims-group-tree">' +
                        '<div class="ims-tab"><ul>' +
                        '<li class="ims-tab-item ims-tab-cur"><span>已有会话</span></li>' +
                        '<li class="ims-tab-item "><span>组织架构</span></li>' +
                        '</ul></div>' +
                        '<div class="ims-tab-panle ims-group">' +
                        '</div>' +
                        '<div class="ims-tab-panle" style="display:none;"><ul class="ims-tree">' +
                        '</ul></div>' +
                        '</div>' +
                        '<div class="ims-selected-panle">' +
                        '<div class="ims-tip">已选组或人员<span class="ims-errormsg"></span></div>' +
                        '<ul class="ims-selected-list">' +
                        '</ul>' +
                        '<div class="ims-btn-bar">' +
                        '<a href="javascript:;" class="ims-cancle-btn ims-close">取消</a>' +
                        '<a href="javascript:;" class="ims-sure-btn">确定</a>' +
                        '</div>' +
                        '</div>' +
                        '</div>' +
                        '</div>' +
                        '</div>';
                    document.body.appendChild(rootEle);
                    me.$root = $('#ims-layer');
                    me.$group = me.$root.find('.ims-group');
                    me.$tree = me.$root.find('.ims-tree');
                    me.$selectedList = me.$root.find('.ims-selected-list');
                    me.$error = me.$root.find('.ims-errormsg');
                    me.bindEvent();
                }
            });
        } else {
            this.$root = $('#ims-layer');
            this.$group = this.$root.find('.ims-group');
            this.$tree = this.$root.find('.ims-tree');
            this.$selectedList = this.$root.find('.ims-selected-list');
            this.$error = this.$root.find('.ims-errormsg');
        }
    },
    bindEvent: function() {
        var me = this;
        this.$root.find('.ims-tab-item').click(function() {
            var index = $(this).index();
            $(this).addClass('ims-tab-cur').siblings().removeClass('ims-tab-cur');
            me.$root.find('.ims-tab-panle').hide().eq(index).show();
        });
        this.$root.find('.ims-close').click(function() {
            me.close();
        });
        this.$root.find('.ims-sure-btn').click(function() {
            me.sendShareInfo(me.shareInfo);
        });
        this.$group.on('click', '.ims-group-detail', function(e) {
            e.stopPropagation();
            me._onGroupClick(e.currentTarget);
        });
        this.$group.on('click', '.ims-group-more', function(e) {
            e.stopPropagation();
            me.requestGroup(me.groupOffset, 100);
            $(this).remove();
        });
        this.$tree.on('click', '.tree-leaf', function(e) {
            e.stopPropagation();
            me._onLeafClick(e.currentTarget);
        });
        this.$tree.on('click', '.tree-node-name', function(e) {
            e.stopPropagation();
            me._onNodeClick(e.currentTarget);
        });
        this.$tree.on('click', '.im-select-org-members', function(e) {
            e.stopPropagation();
            me._onSelectOrgMemberClick(e.currentTarget);
        });
        this.$selectedList.on('mouseenter', 'li', function() {
            $(this).find('.ims-del-person').show();
        });
        this.$selectedList.on('mouseleave', 'li', function() {
            $(this).find('.ims-del-person').hide();
        });
        this.$selectedList.on('click', '.ims-del-person', function(e) {
            var ele = $(e.currentTarget.parentNode);
            me.delSelected(ele.data('id'), ele.data('isgroup'));
        });
    },
    _onGroupClick: function(ele) {
        var ele = $(ele);
        var id = ele.attr('data-groupid');
        if (ele.hasClass('selected')) {
            this.delSelected(id, true);
        }
        // 选中再添加到人员列表中
        else {
            var name = ele.find('.ims-group-name').text();
            var photoUrl = ele.find('.ims-group-avatar img').attr('src');

            this.addSelected({
                name: name,
                photoUrl: photoUrl,
                id: id,
                srcElement: ele[0],
                isGroup: true
            });
            ele.addClass('selected');
        }
    },
    _onLeafClick: function(ele, ignorePub) {
        var ele = $(ele);
        var id = ele.attr('data-userid');
        var checkbox = ele.parent().siblings('.im-select-org-members')[0];

        // 取消选中
        if (ele.hasClass('selected')) {
            ele.removeClass('selected');
            var checkbox = ele.parent().siblings('.im-select-org-members')[0];
            if (checkbox && checkbox.checked) checkbox.checked = false;
            this.delSelected(id, false);
        }
        // 选中再添加到人员列表中
        else {
            var name = ele.find('span').text();
            var photoUrl = ele.find('img').attr('src');
            var userid = ele.data("userid");
            var status = ele.data('status');

            if (!ignorePub) this.addSelected({
                name: name,
                photoUrl: photoUrl,
                id: id,
                status: status,
                srcElement: ele[0],
                isGroup: false
            });
            ele.addClass('selected');

            if (checkbox && !checkbox.checked) {
                var leaves = ele.parent().find('.tree-leaf');
                var curLen = leaves.filter('.selected').length;
                var totalLen = leaves.length;
                if (curLen === totalLen) checkbox.checked = true;
            }
        }
    },
    // 非终端结点点击事件，会加载下一级内容
    _onNodeClick: function(ele) {
        var treenode = $(ele).closest('li.tree-node');
        var loaded = treenode.data('loaded');
        var isUnallot = (treenode.attr('data-unallot') === 'true');
        var orgId = isUnallot ? 'unallotPersons' : treenode[0].id;
        var wrapper = treenode.find(' > .list-wrapper');

        if (!loaded) {
            if (!wrapper.length) {
                wrapper = $('<ul class="list-wrapper none"><li><div class="im-tree-loading"></div></li></ul>');
                treenode.append(wrapper);
            }

            var level = treenode.data('level');
            this.createTree(false, orgId, wrapper, level, treenode);
        }

        if (!wrapper.length) return;

        if (wrapper.hasClass('none')) {
            wrapper.removeClass('none');
            treenode.addClass('tree-node-expanded');
        } else {
            wrapper.addClass('none');
            treenode.removeClass('tree-node-expanded');
        }
    },
    _onSelectOrgMemberClick: function(ele) {
        var ele = $(ele);
        var persons = ele.data('info');

        if (!persons || !persons.length) return;

        var checked = ele.prop('checked');
        var leaves = ele.find(' ~ .list-wrapper > .tree-leaf');

        var i = 0;
        var id;
        // 全选
        if (checked) {
            leaves.addClass('selected');
            for (i = persons.length - 1; i >= 0; --i) {
                var person = persons[i];
                var photoUrl = person.photoUrl;
                var id = person.id;
                var status = person.status;
                var name = person.name;
                this.addSelected({
                    photoUrl: photoUrl,
                    id: id,
                    name: name,
                    status: status,
                    srcElement: leaves[i],
                    isGroup: false
                });
            }
        }
        // 全取消
        else {
            leaves.removeClass('selected');
            for (; i < persons.length; ++i) {
                id = persons[i].id;
                this.delSelected(id, false)
            }
        }
    },
    requestSubTree: function(orgId) {
        var def = $.Deferred();
        var me = this;

        var data = JSON.stringify({
            "eid": this.eid,
            "orgId": orgId,
            "count": 0,
            "begin": 0
        });

        $.ajax({
            type: 'post',
            headers: {
                'Content-Type': 'text/plain'
            },
            url: origin + '/imsdk/org/getPersons.do?ticket=' + me.ticket,
            data: data,
            dataType: 'json',
            success: function(resp) {
                if (resp && resp.success) {
                    def.resolve(resp.data);
                } else {
                    def.reject('请求部门树失败！');
                }
            }
        });

        return def.promise();
    },
    requestGroup: function(offset, count) {
        var me = this;

        var loading = $('<div class="ims-loading"></div>');

        this.$group.append(loading);

        var data = JSON.stringify({
            "offset": offset,
            "count": count
        });

        $.ajax({
            type: 'post',
            headers: {
                'Content-Type': 'text/plain'
            },
            url: origin + '/imsdk/group/list.do?ticket=' + me.ticket,
            data: data,
            dataType: 'json'
        }).then(function(resp) {
            if (resp) {
                loading.remove();
                me.groupOffset += resp.list.length;
                me.initGroup(resp.list, resp.more);
            }
        });
    },
    initGroup: function(list, more) {
        if (!!list.length) {
            var frag = document.createDocumentFragment();
            for (var i = 0, len = list.length; i < len; i++) {
                var status = list[i].status.toString(2),
                    isExist = status.substr(status.length - 1, 1) == '1' ? true : false;
                if (list[i].type == 1 || list[i].type == 2 && isExist) {
                    var item = '<div class="ims-group-detail" data-groupid="' + list[i].groupId + '">' +
                        '<span class="ims-group-avatar"><img src="' + list[i].headerUrl + '"></span>' +
                        '<span class="ims-group-name ellipsis ">' + list[i].groupName + '</span>' +
                        '</div>';
                    frag.appendChild($(item)[0]);
                }
            }
            this.$group[0].appendChild(frag);
        }
        if (more) {
            this.$group.append('<div class="ims-group-more">更多会话组</div>');
        }
    },
    createTree: function(isRoot, orgId, node, level, treenode) {
        var me = this;
        level = level || 1;

        return this.requestSubTree(orgId)
            .then(function(resp) {
                var $tree = node || me.$tree;
                $tree.empty();

                treenode && treenode.data('loaded', true);

                if (isRoot) {
                    var t = '<li data-loaded="1" data-level="0" id="' + resp.id + '" class="tree-node tree-root">' +
                        '<span title="' + resp.name + '" class="tree-node-name"><b class="tree-space"></b>' + resp.name + '</span>' +
                        '</li>';
                    var ele = $(t + '');
                    $tree.append(ele);
                }

                resp._level = level + 1;
                $tree.append(me._itemTpl(resp));

                if (resp.children.length === 0 && resp.person.length > 0) {
                    var checker = $('<input type="checkbox" class="im-select-org-members" />');
                    var arr = [];
                    var person = resp.person;
                    for (var i = 0; i < person.length; ++i) {
                        var item = person[i];
                        arr.push({
                            id: item.id,
                            photoUrl: item.photoUrl,
                            name: item.name,
                            status: item.status
                        });
                    }

                    checker.data('info', arr);
                    $tree.before(checker)
                        .parent().find('.tree-node-icon').remove();
                }
            });
    },
    _itemTpl: function(resp) {
        var unallotPersonCount = resp.unallotPersonCount || 0;

        var str = '';
        var level = resp._level;
        for (var i = 0, len = resp.person.length; i < len; i++) {
            var item = resp.person[i];
            str += '<li class="tree-leaf" data-userid="' + item.id + '" data-status="' + item.status + '">';
            str += new Array(level).join('<b class="tree-space"></b>');
            str += '<img src="' + (item.photoUrl || "/space/c/photo/load") + '">';
            str += '<span>' + item.name + '</span>';
            str += '</li>';
        }
        for (var i = 0, len = resp.children.length; i < len; i++) {
            var item = resp.children[i];
            str += '<li data-level="' + (level || 0) + '" id="' + item.id + '" class="tree-node">';
            str += '<span class="tree-node-name" title="' + item.name + '"><i class="tree-node-icon">&gt;</i>'
            str += new Array(level + 1).join('<b class="tree-space"></b>');
            str += item.name + '</span>';
            str += '</li>';
        }
        if (!resp.person.length && !resp.children.length) {
            str += '<li class="tree-empty">无数据</li>';
        }

        if (unallotPersonCount > 0) {
            str += '<li data-level="' + (level || 0) + '" class="tree-node" data-unallot = "true">' +
                '<span class="tree-node-name" title="未分配部门的成员">' +
                '<i class="tree-node-icon">&gt;</i>';
            str += new Array(level + 1).join('<b class="tree-space"></b>');
            str += '未分配部门的成员</span></li>';
        }
        return str;
    },
    delSelected: function(id, isGroup) {
        var me = this;

        isGroup ? (function() {
            var index = me.sGroup.indexOf(id);
            index != -1 && me.sGroup.splice(index, 1);
        })() : (function() {
            var index = me.sPerson.indexOf(id);
            index != -1 && me.sPerson.splice(index, 1);
        })();

        this.$selectedList.find('[data-id =' + id + ']').remove();
        var ele = $(this.selectedInfo[id].srcElement);
        var checkbox = ele.parent().siblings('.im-select-org-members')[0];

        // 取消选中
        if (ele.hasClass('selected')) {
            ele.removeClass('selected');
            if (checkbox && checkbox.checked) checkbox.checked = false;
        }
    },
    addSelected: function(data) {
        if (this.sGroup.indexOf(data.id) == -1 && this.sPerson.indexOf(data.id) == -1) {
            data.isGroup ? this.sGroup.push(data.id) : this.sPerson.push(data.id);
            this.selectedInfo[data.id] = data;
            var str = '<li data-id="' + data.id + '" data-isgroup="' + data.isGroup + '">' +
                '<img src="' + data.photoUrl + '" title="' + data.name + '" alt="' + data.name + '">' +
                '<div class="ims-selected-name">' + data.name + '</div>' +
                '<span class="ims-del-person">-</span>' +
                '</li>';
            this.$selectedList.append(str);
        }
    },
    sendShareInfo: function(info) {
        var me = this;

        var data = JSON.stringify({
            "content": info.title || '外部分享',
            "msgLen": info.title && info.title.length || 0,
            "msgType": 7,
            "param": {
                "unreadMonitor": 1,
                "openNewPage": info.openNewPage || false,
                "appName": "分享到云之家",
                "content": info.content || '外部分享',
                "title": info.title || '外部分享',
                "thumbUrl": info.thumbUrl || 'http://yunzhijia.com/microblog/filesvr/5699eb83e4b00fb2b9b448a3',
                "webpageUrl": info.webpageUrl
            },
            "groupId": me.sGroup,
            "userId": me.sPerson
        });

        $.ajax({
            type: 'post',
            headers: {
                'Content-Type': 'text/plain'
            },
            url: origin + '/imsdk/message/multiSend.do?ticket=' + me.ticket,
            data: data,
            dataType: 'json',
            success: function(resp) {
                if (resp && resp.success) {
                    me.close()
                } else {
                    me.$error.html('操作失败' + (resp ? ('，' + resp.error) : '')).show();
                }
            }
        });
    },
    close: function() {
        this.$root.hide();
        this.$tree.html('');
        this.$group.html('')
        this.$selectedList.html('');
        this.$error.hide();
        this.sGroup = [];
        this.sPerson = [];
        this.selectedInfo = {};
        this.shareInfo = {};
        this.$root.find('.ims-tab-item:first').click();
        this.groupOffset = 0;
    },

    share: function(arg) {
        if (arg && arg.webpageUrl && this.$root && this.$root.css('display') == 'none') {
            this.shareInfo = arg;
            this.$root.show();
            this.requestGroup(0, 50);
            this.createTree(true, '');
        }
    }
}