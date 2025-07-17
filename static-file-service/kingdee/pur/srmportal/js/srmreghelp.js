var list = [];
function setButtonInVisable(){
	window.document.getElementById("bar_disable_display2").style.display='';
	window.document.getElementById("bar_disable_display").style.display='none';
}

setButtonInVisable();
function iniHelpDocPage(){
	var tab0 = document.getElementById("tabpageap0");
	var tab1 = document.getElementById("tabpageap1");
	var tab2 = document.getElementById("tabpageap2");
	if(tab0 != undefined){
		list[0] = 0;
	}
	if(tab1 != undefined){
		list[1] = 0;
	}
	if(tab2 != undefined){
		list[2] = 0;
	}
}
function setButtonVisable(){
	window.document.getElementById("bar_disable_display2").style.display='none';
	window.document.getElementById("bar_disable_display").style.display='';
}
function hasScroll(){
    var tabSelector = document.getElementsByClassName("kd-cq-tabs-tab");
	for(let j=0;j<tabSelector.length;j++){
		tabSelector[j].addEventListener("click",function(){setInterval(function(){
			var tab = document.getElementById("tabpageap" + j);
		    if(tab.clientHeight + tab.scrollTop + 2 >= tab.scrollHeight){
			var flag = true;
			list[j] = 1;
			for (let i = 0; i < list.length; i++) {
			  if(list[i] != 1){
				flag = false;
			  }
			}
			if(flag){
				setButtonVisable();
			}
		}
		
		},200)});
	}
}

function addScrollListener(tabAp,index){
	var tabap = document.getElementById(tabAp);
	tabap.onscroll = (e)=>{
		if(e.target.clientHeight + e.target.scrollTop + 2 >= e.target.scrollHeight){
			var flag = true;
			list[index] = 1;
			for (let i = 0; i < list.length; i++) {
			  if(list[i] != 1){
				flag = false;
			  }
			}
			if(flag){
				setButtonVisable();
			}
		}
	}
}

function defaultViewFirstHelp(){
	var firstDoc = document.getElementById("tabpageap0");
	if(firstDoc.clientHeight + firstDoc.scrollTop + 2 >= firstDoc.scrollHeight){
		var flag = true;
		list[0] = 1;
		for (let i = 0; i < list.length; i++) {
		  if(list[i] != 1){
			flag = false;
		  }
		}
		if(flag){
			setButtonVisable();
		}
	}
}

iniHelpDocPage();
hasScroll();
defaultViewFirstHelp();
addScrollListener("tabpageap0",0);
addScrollListener("tabpageap1",1);
addScrollListener("tabpageap2",2);
addScrollListener("tabpageap0",0);
