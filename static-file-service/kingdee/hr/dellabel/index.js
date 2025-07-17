(function (KDApi, $) {
    function MyComponent(model) {
        this._setModel(model);
    }

    var themeColor;
    MyComponent.prototype = {
        _setModel: function (model) {
            this.model = model;
        },
        init: function (props) {
            themeColor = getThemeColor(props.themeColor)
            setHtml(this.model, props);
        },
        update: function (props) {
            themeColor = getThemeColor(props.themeColor);
            updateHtml(this.model, props);
        },
        destoryed: function () {

        }
    }

    var setHtml = function (model, props, isUpdate) {
        var cssHref = KDApi.getNameSpace(model) + './css/dellabel.css';
        if($('link[href="' + cssHref + '"]').length === 0){
            KDApi.loadFile('./css/dellabel.css', model, function() {
                updateHtml(model, props);
            })            
        }
        updateHtml(model, props);
    }

    var updateHtml = function(model, props){
        var template = '<div class="hr-delLabel" title="<%= text %>">' +
                            '<div class="hr-delLabel-text">' +
                                '<%= text %>' +
                            '</div>' +
                            '<div class="hr-delLabel-icon"></div>' +
                        '</div>';
        var result = KDApi.getHTMLStringBytemplate(template, {
            text: props.data && props.data['text'] ? props.data['text'] : props.configItems ? props.configItems[0].value : '标签'
        })
        model.dom.innerHTML = result;
        initEvent(model, props);
    }

    function getThemeColor(themeColor) {
        switch (themeColor) {
            case 'blue':
                return '#5582F3';
            case 'green':
                return '#29C392';
            case 'orange':
                return '#FC8555';
            case 'purple':
                return '#6869FB';
            case 'red':
                return '#E94E4F';
            default:
                return '#5582F3';
        }
    }
    var initEvent = function (model, props) {
        $(model.dom).css({
            "overflow":"visible"
        })
        $('.hr-delLabel', model.dom).css({
            "width": model.dom.style.width,
            "height": model.dom.style.height,
            "font-size": model.dom.style.fontSize !== '' ? model.dom.style.fontSize : '12px',
            "text-align": model.dom.style.textAlign,
            "overflow":"visible"
        }).mouseenter(function () {
            $(this).find('.hr-delLabel-icon').css({
                "background-color": themeColor,
            }).addClass('active');
            $(this).css({
                "border-color": themeColor
            })
        }).mouseleave(function () {
            $(this).find('.hr-delLabel-icon').css({
                "background-color": "transparent"
            }).removeClass('active')
            $(this).css({
                "border-color": "#CCCCCC"
            })
        })
        $('.hr-delLabel-text', model.dom).css({
            "width": parseInt(model.dom.style.width) - 19 + 'px',
            "line-height": model.dom.style.height
        })
		$('.hr-delLabel-icon', model.dom).click(function () {
            model.invoke('click', '');
        })
    }
    KDApi.register('dellabel', MyComponent)
})(window.KDApi, jQuery);