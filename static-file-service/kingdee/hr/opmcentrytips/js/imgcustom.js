
function createImg(argument, settingImg,id) {
    var divimgs = document.querySelectorAll("div[id='"+id+"']");
    var len = divimgs.length;
    if (len === argument.length) {
        for (var j = 0; j < argument.length; j++) {
            // body...
            let tips = argument[j].tips;
            var divimgs = document.querySelectorAll("div[id='"+id+"']");
            var divimg = divimgs[j];
            var ul = divimg.firstElementChild
            //添加 li
            var li = document.createElement("li");
            li.classList.add('li_class_opmc');
            //添加 img
            var img = document.createElement("img");
            //设置 img 属性，如 id
            img.setAttribute("id", "opmccustomimg_" + j + "_");
            img.setAttribute("title", tips);
            img.classList.add('img_class_opmc');
            //设置 img 图片地址s
            img.src = settingImg;
            li.appendChild(img);
            ul.appendChild(li);
        }
    }
}

