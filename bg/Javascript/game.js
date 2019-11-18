var text = function(id,pl)
{
	var ret = "";
	ret += "<img src = 'Substances/"+id+".jpg"+"' class = 'cardImg'><br><div id = 'iconContainer'><img class = 'cardRemove' onclick = 'javascript:removeReagent("+pl+")'src = 'x.png'></div>";
	//ret += "<div id = 'iconContainer'><img src = 'heat.gif' class = 'cardHeat' onclick = 'heat("+pl+")'></div>";
	//ret += substance[id].name.search("Acid")==-1?"":"<div id = 'iconContainer'><img src = 'concentrate.png' class = 'cardConc' onclick = 'concentrate("+pl+")'></div>";
	ret += "<p class = 'cardText'><b>";
	ret += substance[id].display;
	ret += "</b>";
	//ret += (substance[id].name.length<=15?"<br>&nbsp;":"");
	//ret += info[id]==undefined?"&nbsp;":info[id];
	ret += "</p>";
	return ret;
}
var updateReaction = function()
{
	var n = "";
	var t = document.getElementById("tableReagents");
	for(var i = 0; i < reagents.length; i += 4)
	{
		n += "<tr>";
		for(var j = 0; j < 4 && (i+j < reagents.length); j ++)
		{
			n += "<td class = 'card'>";
			n += text(reagents[i+j],i+j);
			n += "</td>";
		}
		n += "</tr>";
	}
	t.innerHTML = n;
}
var changeCategory = function(t)
{
	page[0] = t;
	page[1] = 0;
	var ids = ["cat"+t,"cat"+(1-t)];
	//console.log(ids);
	$("#"+ids[1]).fadeOut("fast", function()
		{
			document.getElementById(ids[1]).style.backgroundColor = "#1975FF";
			$("#"+ids[1]).fadeIn("fast");
			//document.createStyleSheet().addRule('#'+ids[0]+':hover', 'background:#CED6D8;');
			//console.log(document.getElementById(ids[1]));
		});
	$("#"+ids[0]).fadeOut("fast", function()
		{
			document.getElementById(ids[0]).style.backgroundColor = "#9EAEB2";
			$("#"+ids[0]).fadeIn("fast");
			//document.createStyleSheet().addRule('#'+ids[1]+':hover', 'background:#CED6D8;');
			//console.log(document.getElementById(ids[0]));
		});
	$("#tableElements").fadeOut("fast", function(){updateMenu();});
	$("#tableElements").fadeIn("fast");

	$("#bar").fadeOut("fast", function(){updateBar();});
	$("#bar").fadeIn("fast");
}
var changePage = function(t)
{
	page[1] = t;
	$("#tableElements").fadeOut("fast", function(){updateMenu();});
	$("#tableElements").fadeIn("fast");

	$("#bar").fadeOut("fast", function()
	{
		$("#bar").fadeIn("fast");
		updateBar();
	});
}
var updateMenu = function()
{
	var t = document.getElementById("tableElements");
	//t.innerHTML = "";
	var n = "";
	
	for(var i = 0; i < pages[page[0]][page[1]].length; i += 3)
	{
		n += "<tr>";
		for(var j = 0; j < 3 && (i+j < pages[page[0]][page[1]].length); j ++)
		{
			n += "<td class = \"element\" onclick = 'javascript:put("+pages[page[0]][page[1]][i+j]+")'>";
			var text = substance[pages[page[0]][page[1]][i+j]].formula;
			if(text.search("{")==-1||text.search("}") == -1)
			{
				n += text;
			}else{
				text = text.replace(/{/g,'<sub>');
				text = text.replace(/}/g,'</sub>');
				//console.log(text);
				n += text;
			}
			n += "</td>";
		}
		n += "</tr>";
	}
	t.innerHTML = n;
}
var updateBar = function()
{
	var t = document.getElementById("bar");
	var n = "<div id = 'pageText'>Страница:&nbsp</div>";
	var p = 0;
	while((pages[page[0]][p]!=undefined))
	{
		if(p == page[1])
		{
			n += "<div id = 'currpageNum' onclick = 'changePage("+p+")'>";
		}else{
			n += "<div id = 'pageNum' onclick = 'changePage("+p+")'>";
		}
		n += p+1;
		n += "</div>";
		p ++;
	}
	t.innerHTML = n;
	if(navigator.userAgent.toLowerCase().indexOf('chrome') > -1)
	{
		if(document.getElementById("currpageNum") != undefined) document.getElementById("currpageNum").style.top = "-6px";
		if(document.getElementById("pageNum") != undefined) document.getElementById("pageNum").style.top = "-6px";
		if(document.getElementById("pageText") != undefined) document.getElementById("pageText").style.top = "-5px";
	}
	updateXp();
}
var updateXp = function()
{
	//level
	//console.log((xp>need[levelP]?1:xp/need[levelP]*(document.getElementById("xpBar").offsetWidth-8)) + 'px');
	$("#xp").animate({
		width: ((xp>need[levelP]?1:xp/need[levelP]*(document.getElementById("xpBar").offsetWidth-8)) + 'px')
	},90);
}
var addXp = function(amount)
{

	var t = document.getElementById("xpText");
	if(amount <= 0) 
	{
		t.innerHTML = xp;
		t.innerHTML += ' / ';
		t.innerHTML += need[levelP];
		return;
	}
	xp += 1;
	updateXp();
	t.innerHTML = xp-1;
	t.innerHTML += ' / ';
	t.innerHTML += need[levelP];
	setTimeout(function(){addXp(amount-1);},100);
}
var put = function(id) //dobavq reagent
{
	if(reagents.length >= 4) return alert("Твърде много вещества!");
	//if(reagPut[id]) return;
	reagPut[id] = true;
	reagents[reagents.length] = id;
	heated[reagents.length-1] = false;
	updateReaction();
	$($(".card").get(reagents.length-1)).hide();
	$($(".card").get(reagents.length-1)).fadeIn("slow");
}
var removeReagent = function(place, t)
{
	reagPut[reagents[place]] = false;
	heated[place] = false;
	if(reagents.length == 1) reagents = [];
	reagents.splice(place,1);
	$($(".card").get(place)).fadeOut("fast");
	if(t==undefined)
	{
		$("#tableReagents").fadeOut("fast",function(){
			updateReaction();
			$("#tableReagents").fadeIn();
		});
	}else{
		updateReaction();
	}
	//console.log(reagents);
}
var addSubstance = function(cat, t) // funkciq koqto dobavq toku shto otklyucheno v-vo kum menuto
{
	if(t == undefined || substance[t] == undefined) return;
	//console.log(cat, t);
	if(unlocked[t] == true) return;
	addMoney((substance[t].money == undefined?(5+cat*5):substance[t].money));
	var currpage = pages[cat][pages[cat].length-1].length<21?pages[cat].length-1:pages[cat].length;
	if(pages[cat][currpage] == undefined) pages[cat][currpage] = [];
	if(pages[cat][currpage].length>=21) currpage ++;
	if(pages[cat][currpage][0] == undefined) pages[cat][currpage] = [];
	pages[cat][currpage][pages[cat][currpage].length] = t;
	elements[cat] ++;
	unlocked[t] = true;
	if(page[1]!=currpage)
	{
		changePage(currpage);
	}
	if(page[0] == cat) 
	{
		updateMenu();
		$($(".element").get(elements[cat]-1-(page[1]*21))).hide();
		$($(".element").get(elements[cat]-1-(page[1]*21))).fadeIn("slow");
	}
}
var level = function(lvl) // diga levela
{
	if(unlocks[lvl] == undefined)
	{
		need[Infinity] = Infinity;
		lvl = Infinity;
		var str = "Поздравления! Минахте всички нива! Все още не сте направили ";
		var c = 0;
		for(var i = 0; i < reaction.length; i ++)
		{
			if(reaction[i].xp == 0) c ++;
		}
		str += (reaction.length-c)+" реакции.";
		alert(str);
	}
	levelP = lvl;
	addMoney(5);
	$("#levelNotif").fadeOut();
	document.getElementById("levelNotif").innerHTML = "Браво! Вече сте на ниво "+lvl+"!";
	$("#levelNotif").fadeIn("slow",function(){
		setTimeout(function()
		{
			$("#levelNotif").fadeOut("slow",function()
			{
				document.getElementById("levelNotif").innerHTML = "Ниво "+lvl;
				$("#levelNotif").fadeIn();
			});
		},1000);
		if(unlocks[lvl] == undefined || unlocks[lvl].length == 0) return;
		for(var i = 0; i < unlocks[lvl].length; i ++)
		{
			addSubstance(type[unlocks[lvl][i]],unlocks[lvl][i]);
		}

		$("#bar").fadeOut("fast", function(){updateBar();});
		$("#bar").fadeIn("fast");
	});
	//save();
}
var treact;
var makeRequest = function(react)
{
	var t = document.getElementById("popupText");
	var r = "";
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
	//return r;
	t.innerHTML = r;
	$("#popup").fadeIn("slow");
	$("#popupInner").fadeIn("slow");
	$("#popupTitle").fadeIn("slow");
	$("#popupText").fadeIn("slow");
	$("#yes").fadeIn("slow");
	$("#no").fadeIn("slow");
}
var yesF = function()
{
	doReaction(treact);
	$("#popup").fadeOut("slow");
	$("#popupInner").fadeOut("slow");
	$("#popupTitle").fadeOut("slow");
	$("#popupText").fadeOut("slow");
	$("#yes").fadeOut("slow");
	$("#no").fadeOut("slow");

	if(fast) return;
	$("#chemist").animate({
		width: "-=100px",
		height: "-=100px"
	}, {
		duration: 2000,
		complete: function() 
		{
			$("#theButton").animate({
				left: "+=459px",
				top: "+=300px"
			},{
				duration: 3500,
				complete: function()
				{
					document.getElementById("theButton").onclick = function(){animateChemist();}
				}
			});
		}
	});
}
var noF = function(t)
{
	if(t == undefined)
	{
		//document.getElementById("b").style.transform = 'rotate('+(rot+4)+'deg)'; // Ako iskash da se vurti body-to ot greshna reakciq
		rot += 4;
	}else{
		addMoney(researchPrice);
	}
	$("#popup").fadeOut("slow");
	$("#popupInner").fadeOut("slow");
	$("#popupTitle").fadeOut("slow");
	$("#popupText").fadeOut("slow");
	$("#yes").fadeOut("slow");
	$("#no").fadeOut("slow");

	if(fast) return;
	$("#chemist").animate({
		width: "-=100px",
		height: "-=100px"
	}, {
		duration: 2000,
		complete: function() 
		{
			$("#theButton").animate({
				left: "+=459px",
				top: "+=300px"
			},{
				duration: 3500,
				complete: function()
				{
					document.getElementById("theButton").onclick = function(){animateChemist();}
				}
			});
		}
	});
}
function s(a,b)
{
	return a.id > b.id;
}
var startReaction = function()
{
	if(money < researchPrice) return alert("Нямате достатъчно пари! ("+researchPrice+"&#128;)");
	addMoney(-researchPrice);
	//console.log(reagents);
	var elements = [];
	for(var i = 0; i < reagents.length; i ++)
	{
		elements[i] = {id: reagents[i],heat: heated[i], conc: concentrated[i]};
	}
	elements.sort(s);
	if(elements.length<=0) return noF();
	var react;
	for(var i = 0; i < reaction.length; i ++)
	{
		var match = 0;
		for(var j = 0; j < elements.length && (reaction[i].reagents.length == elements.length); j ++)
		{
			if(elements[j].id == reaction[i].reagents[j]) 
			{
				match ++;
			}
		}
		if(match == elements.length)
		{
			if(reaction[i].reqs == undefined) reaction[i].reqs = [];
			var has = [];
			for(var a = 0; a < reaction[i].reqs.length; a ++)
			{
				has[reaction[i].reqs[a]] = true;
			}
			//console.log(has, equipped);
			var cannot = false;
			for(var a = 0; a < has.length; a ++)
			{
				if(has[a] && !equipped[a]) cannot = true;
			}
			for(var a = 0; a < equipped.length; a ++)
			{
				if(equipped[a] && !has[a]) cannot = true;
			}
			if(!cannot)
			{
				react = i;
				i = reaction.length;
			}
		}
	}
	//console.log(react);
	reagents
	if(react == undefined) return noF();
	
	makeRequest(react);
	//zapochva reakciqta
	treact = react;
	return true;
}
var doReaction = function(react)
{
	var c = reagents.length;
	addXp(reaction[react].xp);
	reaction[react].xp = 0;
	for(var i = 0; i < equipped.length; i ++)
	{
		equipped[i] = false;
	}
	for(var i = 0; i < c; i ++)
	{
		removeReagent(0, 0);
		//console.log("Mahnah ",substance[reaction[react].reagents[i]].name);
	}
	for(var i = 0; i < reaction[react].products.length; i ++)
	{
		addSubstance(type[reaction[react].products[i]],reaction[react].products[i]);
		put(reaction[react].products[i]);
		//console.log("Slagam ",substance[reaction[react].products[i]].name);
	}

	$("#bar").fadeOut("fast", function(){updateBar();});
	$("#bar").fadeIn("fast");
	//searchNext(ind, c);
}
var animateChemist = function()
{
	if(fast) return startReaction();
	document.getElementById("theButton").onclick = undefined;
	$("#theButton").animate({
		left: "-=459px",
		top: "-=300px"
	},{
		duration: 3500,
		complete: function()
		{
			$("#chemist").animate({
				width: "+=100px",
				height: "+=100px"
			}, {
				duration: 2000,
				complete: function() 
				{
					startReaction();
				}
			});
		}
	});
}
var equip = function(ind)
{
	equipped[ind] = equipped[ind]==undefined?1:1-equipped[ind];
	equipMenuState = 1-equipMenuState;
	updateEquipMenu();
}
var nextEquipPage = function()
{
	if((pageEquip+1)*8>equipment.length) return;
	$("#tableEquip").fadeOut("fast",function()
	{
		equipMenuState = 1-equipMenuState;
		pageEquip ++;
		updateEquipMenu();
		$("#tableEquip").fadeIn();
	});
}
var previousEquipPage = function()
{
	if(pageEquip<=0) return;
	$("#equipMenu").fadeOut("fast",function()
	{
		equipMenuState = 1-equipMenuState;
		pageEquip --;
		updateEquipMenu();
		$("#tableEquip").fadeIn();
	});
}
var updateEquipMenu = function()
{
	equipMenuState = 1-equipMenuState;
	var t = document.getElementById("tableEquip");
	var n = "<tr>";
	if(equipMenuState == 1)
	{
		var c = 0, tc = 0, ri = pageEquip*8;
		for(var i = pageEquip*8; i < pageEquip*8+8 && (i < equipment.length); i ++)
		{
			if(tc >= 4)
			{
				n += "</tr><tr>";
				tc = 0;
			}
			if(equipment[i].price == 0)
			{
				n += "<td id = 'equipElement' onclick='equip("+i+")'>";
				n += "<img id = 'equipTick' src='tick.png' style='"+(equipped[i]?"opacity:0.9;":"opacity:0;")+"'>";
				n += "<div class = 'equipText'><br>"+equipment[i].name+"</div>";
				n += "<img id = 'equipImage' src='tools/"+i+".jpg' style='"+(equipped[i]?"opacity:0;":"")+"'>";
				n += "</td>";
				c ++;
			}else{
				n += "<td id ='equipElement'>&nbsp;</td>";
			}
			tc ++;
		}
		n += "</tr>";
		t.innerHTML = n;
		$("#equipMenu").fadeIn();
	}
	if(equipMenuState == 0) $("#equipMenu").fadeOut();
}
var checkLevel = function()
{
	var c = 0;
	for(var i = 0; i < reaction.length; i ++)
	{
		if(reaction[i].xp == 0) c ++;
	}
	if(c == reaction.length)
	{
		alert("Поздравления! Спечелихте с резултат: "+money);
	}
	if(xp >= need[levelP])
	{
		level(levelP+1);
	}
	setTimeout(checkLevel, 20);
}