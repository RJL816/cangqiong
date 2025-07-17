"use strict";

function process_data(data, city_count) {

  for (var i = 0; i < data.length; i++) {
    var date = data[i].date.toString();
    // 城市图片+文字
    var divPicture = document.createElement("div");
	divPicture.classList.add("bounceIn");
	divPicture.setAttribute("onclick","showDialog("+i+")");
	divPicture.setAttribute("data-poem",data[i].poem);//添加弹窗背景图诗意文字说明
	divPicture.setAttribute("data-city",data[i].cityName);//城市名字
	divPicture.setAttribute("data-citybg",data[i].cityBg);//没解决图片服务器跨域问题 不使用这个方法
	divPicture.id="bounceIn"+i;
    divPicture.classList.add("city_picture");
    // divPicture.innerText = "Picture " + i;
    addImgCity(divPicture, data[i].city)//添加图
    addImgCityText(divPicture, data[i].slogon)//添加背景图文字说明
    // 图钉+日期
    var divDateMonth = document.createElement("div");
    divDateMonth.classList.add("date_month");
    divDateMonth.innerText = date.slice(5, 7) + "月";

    var divDateDay = document.createElement("div");
    divDateDay.classList.add("date_day");
    divDateDay.innerText = date.slice(8, 10);

    var divDate = document.createElement("div");
    divDate.classList.add("date");
    divDate.appendChild(divDateMonth);
    divDate.appendChild(divDateDay);

    var divPin = document.createElement("div");
    divPin.classList.add("pin");
    addImgPin(divPin);

    var divDateAndPin = document.createElement("div");
    divDateAndPin.classList.add("pin_date");
    divDateAndPin.appendChild(divPin);
    divDateAndPin.appendChild(divDate);


    var liElement = document.createElement("li");
    liElement.classList.add("in-view");
    liElement.appendChild(divDateAndPin);
    liElement.appendChild(divPicture);

    var ul_list = document.getElementById("timeline_list");
    ul_list.appendChild(liElement);

    var myDate = new Date();

    var source = document.getElementById("source");
	source.innerText = "一共走过了" + city_count + "个城市";
    addCanvas(liElement, i)

  }
}

function addImgPin(div) {
  var img = document.createElement("img");
  img.classList.add("img_pin");
  img.src = "pin.png";
  div.appendChild(img);
}

function addImgCity(div, pic_path) {
  var img = document.createElement("img");
  img.classList.add("img_city");
  img.src = pic_path;
  div.appendChild(img);
}

function addImgCityText(div, content) {
  var div_slogon = document.createElement("div");
  div_slogon.classList.add("slogon");
  div_slogon.innerHTML = "&nbsp;" + content;
  div.appendChild(div_slogon);
}

function addCanvas(div, number) {
  var canvas = document.createElement("canvas");
  // 宽度这个调起来比较麻烦
  canvas.width = 60;
  canvas.height = 109;
  canvas.style.border = "0px solid";
  canvas.style.borderColor = "white";
  canvas.style.backgroundColor = "#F2F8FF";

  var ctx = canvas.getContext("2d");
  ctx.beginPath();
  ctx.setLineDash([2, 4]);
  ctx.moveTo(canvas.width / 2, 0);
  if (number % 2 == 1) {
    ctx.quadraticCurveTo(0, canvas.height / 2, canvas.width / 2, canvas.height);
  } else {
    ctx.quadraticCurveTo(canvas.width, canvas.height / 2, canvas.width / 2, canvas.height);
  }
  ctx.lineWidth = 1;
  ctx.lineCap = "square"; // butt ; square ; round
  ctx.strokeStyle = "#CBD0D8";
  ctx.stroke();

  div.insertBefore(canvas, div.childNodes[0]);
}

//var host_url = "http://localhost:8080/ierp/";
//var web_url = "ierp.kingdee.com:2026";
start();

function start() {
  var host_url = decode_host_url(getQueryString("hosturl"));
  var http_request = new XMLHttpRequest();
  var user_name = "{\"name\":\"" + getQueryString("name") + "\"}";
  console.log(user_name);
  http_request.open("POST", host_url + "api/erbill/getTimeLineInfo.do", true);
  http_request.setRequestHeader("Content-type", "application/json");
  http_request.onreadystatechange = function () {
    if (http_request.readyState == 4 && http_request.status == 200) {
      var obj2 = JSON.parse(http_request.responseText);
	  //console.log('**********************');
	  //console.log(json2str(obj2));
	  //console.log('**********************')
      if (obj2.code == "200") {
        process_data(obj2.data, obj2.cityCount)
      }
    }
  }
  http_request.send(user_name);
}

function json2str(obj)
{
  var S = [];
  for(var i in obj){
  obj[i] = typeof obj[i] == 'string'?'"'+obj[i]+'"':(typeof obj[i] == 'object'?json2str(obj[i]):obj[i]);
  S.push(i+':'+obj[i]); 
  }
    return '{'+S.join(',')+'}';
}


// 如何获取页面参数以及 调用方法
// alert(getQueryString("name"));
function getQueryString(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
  var r = window.location.search.substr(1).match(reg);
  if (r != null) return unescape(r[2]);
  return null;
}

// 翻译编译好的hostURL
function decode_host_url(hosturl) {
  var base64_str = hosturl.replace(/-/g, '+').replace(/\*/g, '/').replace(/_/g, '=');
  console.log(base64_str);
  return window.atob(base64_str);
}