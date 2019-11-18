var savedVars = ["money","reagents","equipped","zoom","xp","levelP","unlocked","tab","reaction","equipment[0].price","equipment[1].price","pages"];
var convert = function(str)
{
	var ret = str+"=";
	ret += eval('JSON.stringify('+str+')');
	ret += ';';
	return ret;
}
var reset = function()
{
	if(!confirm("Сигурни ли сте, че искате да започнете отначало?")) return;
	localStorage.slot = undefined;
	if(tab != 0) changeTab(0);
	init();
	localStorage.slot = undefined;
}
var save = function(no)
{
	var code = "";
	for(var i = 0; i < savedVars.length; i ++)
	{
		code += convert(savedVars[i]);
	}
	localStorage.slot = code;
	localStorage.ver = "saves";
	if(no == undefined || !no)
	{
		if(tab != 0) changeTab(0);
		//load();
	}
}
var load = function()
{
	//changeTab(0);
	//console.log("h");
	changeTab(0);
	if(localStorage.ver == "saves") eval(localStorage.slot);
}
var updateLog = function()
{
	var t = document.getElementById("moreLog");
	var r = "";
	for(var react = 0; react < reaction.length; react ++)
	{
		if(reaction[react].xp != 0) continue;
		for(var i = 0; i < reaction[react].reagents.length; i ++)
		{
			r += reaction[react].need[i] == 1?"":reaction[react].need[i];
			var text = substance[reaction[react].reagents[i]].formula;
			if(text.search("{")==-1||text.search("}") == -1)
			{
				r += text;
			}else{
				text = text.replace(/{/g,'<sub>');
				text = text.replace(/}/g,'</sub>');
				r += text;
			}
			r += (i == reaction[react].reagents.length-1?" ":" + ");
		}
		r += "&#8594; ";
		for(var i = 0; i < reaction[react].products.length; i ++)
		{
			r += reaction[react].produced[i] == 1?"":reaction[react].produced[i];
			var text = substance[reaction[react].products[i]].formula;
			if(text.search("{")==-1||text.search("}") == -1)
			{
				r += text;
			}else{
				text = text.replace(/{/g,'<sub>');
				text = text.replace(/}/g,'</sub>');
				r += text;
			}
			r += (i == reaction[react].products.length-1?"":" + ");
		}
		r += '<br>';
	}
	t.innerHTML = r;
}
var updateProgress = function()
{
	var t = document.getElementById("moreProgress");
	var n = "";
	var uc = 0, rc = 0;
	var ul = [];
	for(var i = 0; i < substance.length; i ++)
	{
		if(substance[i] != undefined)
		{
			if(unlocked[i])
			{
				ul[ul.length] = i;
				uc ++;
			}
			rc ++;
		}
	}
	n += "<b>Отключени вещества:</b> ";
	n += uc + ' / ' + rc;
	n += "<br><br>";
	for(var i = 0; i < ul.length; i ++)
	{
		var a = substance[ul[i]].formula;
		a = a.replace(/{/g, '<sub>');
		a = a.replace(/}/g, '</sub>');
		n += a;
		if(i != ul.length-1) n += ', ';
	}
	n += "<br>";
	//console.log(n);
	t.innerHTML = n;
}
var showHelp = function()
{
	for(var i = 0; i < moreMenus.length; i ++)
	{
		$("#more"+moreMenus[i]).fadeOut("slow");
	}
	setTimeout(function(){$("#moreHelp").fadeIn("slow");},400);
}
var showSettings = function()
{
	for(var i = 0; i < moreMenus.length; i ++)
	{
		$("#more"+moreMenus[i]).fadeOut("fast");
	}
	setTimeout(function(){$("#moreSettings").fadeIn("slow");},400);
}
var showLog = function()
{
	for(var i = 0; i < moreMenus.length; i ++)
	{
		$("#more"+moreMenus[i]).fadeOut("fast");
	}
	setTimeout(function(){updateLog();
	$("#moreLog").fadeIn("slow");},50);
}
var showProgress = function()
{
	for(var i = 0; i < moreMenus.length; i ++)
	{
		$("#more"+moreMenus[i]).fadeOut("fast");
	}
	setTimeout(function(){updateProgress();$("#moreProgress").fadeIn("slow");},400);
}