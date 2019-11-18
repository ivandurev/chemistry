var substance, reaction, pages, unlocks, page;
var images;
var reagents, type, info, heated, unlocked;
var elements;
var concentrated;
var reagPut;
var xp, levelP, next;
var zoom;
var fast;
var equipment, equipped;
var money;
var tab;
var tabsId;
var shopPage;
var equipMenuState;
var pageEquip;
var rot;
var researchPrice;
var moreMenus;
function lighten(hex, percent){
    hex = hex.replace(/^\s*#|\s*$/g, '');
    if(hex.length == 3) hex = hex.replace(/(.)/g, '$1$1');

    var r = parseInt(hex.substr(0, 2), 16),
        g = parseInt(hex.substr(2, 2), 16),
        b = parseInt(hex.substr(4, 2), 16);

    return '#' +
       ((0|(1<<8) + r + (256 - r) * percent / 100).toString(16)).substr(1) +
       ((0|(1<<8) + g + (256 - g) * percent / 100).toString(16)).substr(1) +
       ((0|(1<<8) + b + (256 - b) * percent / 100).toString(16)).substr(1);
}
var hexDigits = new Array("0","1","2","3","4","5","6","7","8","9","a","b","c","d","e","f"); 
function rgb2hex(rgb) {
 	rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
	return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
}
function hex(x) 
{
	return isNaN(x) ? "00" : hexDigits[(x - x % 16) / 16] + hexDigits[x % 16];
}
var updateMoney = function()
{
	document.getElementById("moneyAmount").innerHTML = money;
}
var addMoney = function(am)
{
	//console.log("dobavqm",am);
	$("#moneyAmount").fadeOut("fast",function()
	{
		money += am;
		updateMoney();
		$("#moneyAmount").fadeIn();
	});
}
var changeTab = function(which)
{
	$("#moneyBar").fadeOut("fast");
	updateMoney();
	$("#tabs").fadeOut("fast",function()
	{
		document.getElementById("tabs").style.backgroundColor = lighten(rgb2hex(getComputedStyle(document.getElementById(tabsId[which]+"Tab")).backgroundColor),40);
		$("#tabs").fadeIn();
		$("#moneyBar").fadeIn();
	});
	$("#"+tabsId[tab]+"Body").fadeOut("fast",function()
	{
		$("#"+tabsId[which]+"Body").fadeIn();
	});
	tab = which;
}
var arr = function(x, y, value)
{
	var ret = [];
	for(var i = 0; i < x; i ++)
	{
		ret[i] = [];
		for(var j = 0; j < y; j ++)
		{
			ret[i][j] = value;
		}
	}
	return ret;
}
var autoType = function(formula)
{
	if(formula==undefined) return -1;
	var ret = 0;
	for(var i = 0; i < 26; i ++)
	{
		ret += formula.search(String.fromCharCode(65+i))==-1?0:1;
	}
	return ret > 1?1:0;
}
var autoCorrectName = function(name)
{
	if(name == undefined || name.length == 0) return '';
	var words = 1, space = [];
	for(var i = 0; i < name.length; i ++)
	{
		if(name[i] == ' ')
		{
			words ++;
			space[space.length] = i;
		}
	}
	//console.log(space);
	if(words == 1)
	{
		return name + "<br>&nbsp;";
	}
	//console.log( name.substring(0,space[0])+'<br>'+name.substring(space[0]+1,name.length));
	if(words > 1) return name.substring(0,space[0])+'<br>'+name.substring(space[0]+1,name.length);
}
var init = function(data)
{
	moreMenus = ["Help","Settings","Log","Progress"];//The names of the menus in the more tab
	researchPrice = 5;//how much money do you need to check reaction
	rot = 0;//rotate degree
	pageEquip = 0;//page in the equip menu
	equipMenuState = 0;//is the equip menu dropped
	shopPage = 0;//current page at the shop
	tabsId = [];//tabs' ids
	tab = 1;//current tab
	money = 0;//money
	equipped = [];//equipnato li e oborudvane s id
	equipment = [];//oborudvane
	fast = false;//to skip animmate
	zoom = 82;//pagezoom
	xp = 0;//xp
	levelP = 0;//level
	need = [];//kolko xp za level;
	reagPut = [];//is element put in the reaction
	concentrated = [];//koncentriran li e
	elements = [0,0];//kolko sa elementite
	unlocked = [];//otklyuchen li e element
	heated = []; //zagrqt li e
	info = [];//info za vseki element
	type = [];//prosto ili slojno
	reagents = []; // v-vata koito shte reagirat
	unlocks = [];//na vseki lvl koi veshtestva se otklyuchvat
	pages = [[[]],[[]]]; //0 - prosti veshtestva podredeni po stranici 1- slozhni
	page = [0,0];//0->tek kategoriq 1 -> podstranica
	substance = [];//veshtestva
	reaction = [];//reakcii

	tabsId = ['reaction','shop','more'];
	/*type[11] = 0;
	type[1] = 0;
	type[111] = 0;
	type[200] = 1;
	type[201] = 1;
	type[202] = 1;

	substance[11] = {formula:"Na",name:"Sodium"};
	substance[1] = {formula:"H",name:"Atomic Hydrogen"};
	substance[111] = {formula:"H{2}",name:"Hydrogen"};
	substance[200] = {formula:"H{2}O",name:"Water"};
	substance[201] = {formula:"NaOH",name:"Sodium Hydroxide"};
	substance[202] = {formula:"NaH",name:"Sodium Hydride"};

	reaction[0] = {reagents:[11,200],products:[201,111],need:[2,2],produced:[2,1],heat:[0,0],conc:[0,0],xp:5};
	reaction[1] = {reagents:[11,111],products:[202],need:[2,1],produced:[2],xp:10};

	info[11] = "Alkali Metal";

	unlocks[1] = [11,111,1,200];

	need = [0,80];*/
	define();
	if(localStorage.slot != undefined) load();
	for(var i = 0; i < substance.length; i ++)
	{
		if(substance[i]!=undefined) type[i] = autoType(substance[i].formula);
		if(substance[i]!=undefined) substance[i].display = autoCorrectName(substance[i].name);
	}
	//console.log(type);
	if(tab != 0) changeTab(0);
	//level(levelP);
	//if(data != localStorage.slot && data != undefined) load();
	checkLevel();
	updateMoney();
	updateMenu();
	updateBar();
	updateReaction();
	xp--;
	addXp(1);
	updateXp();
	$("#b").fadeIn();
	setTimeout(autoSave,120000);
}

function autoSave()
{
	save(true);
	setTimeout(autoSave,120000);
}
init("money=20;");

window.addEventListener("keyup",function(args)
{
	//console.log(args.which);
	if(args.which == 107)
	{
		zoom += 2;
		document.getElementById("b").style.zoom = zoom + '%';
	}
	if(args.which == 109)
	{
		if(zoom <= 0) return;
		zoom -= 2;
		document.getElementById("b").style.zoom = zoom + '%';
	}
	if(args.which == 83) save();
},false);