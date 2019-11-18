var substance, reaction;
//var reactions = "reaction[reaction.length]={reagents:[1,3],products:[7],need:[1,2],produced:[2],xp:5};\nreaction[reaction.length]={reagents:[2,3],products:[8],need:[1,4],produced:[2],xp:5};\nreaction[reaction.length]={reagents:[2,3],products:[9],need:[1,2],produced:[1],reqs:[0],xp:10};\nreaction[reaction.length]={reagents:[1,2],products:[10],need:[2,1],produced:[2],xp:5};\nreaction[reaction.length]={reagents:[3,10],products:[11,1],need:[2,2],produced:[2,1],xp:10};\nreaction[reaction.length]={reagents:[1,4],products:[16],need:[1,1],produced:[2],xp:5};\nreaction[reaction.length]={reagents:[4,10],products:[16,13],need:[1,1],produced:[1,1],xp:5};\nreaction[reaction.length]={reagents:[13],products:[16,14],need:[1],produced:[1,1],xp:10};\nreaction[reaction.length]={reagents:[11,16],products:[12,10],need:[1,1],produced:[1,1],xp:5};\nreaction[reaction.length]={reagents:[11,13],products:[15,10],need:[1,1],produced:[1,1],xp:10};\nreaction[reaction.length]={reagents:[3,4],products:[12],need:[2,1],produced:[2],xp:5};\nreaction[reaction.length]={reagents:[4,11],products:[12,15,10],need:[1,2],produced:[1,1,1],xp:10};\nreaction[reaction.length]={reagents:[15],products:[12,18],need:[3],produced:[2,1],xp:15,reqs:[0]};\nreaction[reaction.length]={reagents:[10],products:[1,2],need:[2],produced:[2,1],xp:10,reqs:[0]};\nreaction[reaction.length]={reagents:[5,6],products:[20],need:[1,1],produced:[1],xp:5};\nreaction[reaction.length]={reagents:[8,10],products:[11],need:[1,1],produced:[2],xp:10};\nreaction[reaction.length]={reagents:[9,10],products:[11,21],need:[1,2],produced:[2,1],xp:10};\nreaction[reaction.length]={reagents:[21],products:[10,2],need:[2],produced:[2,1],xp:15};\n", substance;
function exp()
{
	var substances = "", reactions = "";
	for(var i = 0; i < substance.length; i ++)
	{
		if(substance[i] != undefined)
		{
			substances += "substance["+i+"]={formula:'";
			substances += substance[i].formula;
			substances += "',name:'";
			substances += substance[i].name;
			substances += "'};\n";
		}
	}
	for(var j = 0; j < reaction.length; j ++)
	{
		var reactionss = "";
		var reagents = reaction[j].reagents;
		var products = reaction[j].products;
		var need = reaction[j].need;
		var produced = reaction[j].produced;
		var reqs = (reaction[j].reqs==undefined?[]:reaction[j].reqs);
		var xp = reaction[j].xp;
		reactionss += "reaction[reaction.length]={";
		reactionss += "reagents:[";
		for(var i = 0; i < reagents.length; i ++)
		{
			reactionss += reagents[i];
			if(i != reagents.length-1) reactionss += ',';
		}
		reactionss += '],products:[';
		for(var i = 0; i < products.length; i ++)
		{
			reactionss += products[i];
			if(i != products.length-1) reactionss += ',';
		}
		reactionss += '],need:[';
		for(var i = 0; i < reagents.length; i ++)
		{
			reactionss += (need[i]==undefined?1:need[i]);
			if(i != reagents.length-1) reactionss += ',';
		}
		reactionss += '],produced:[';
		for(var i = 0; i < products.length; i ++)
		{
			reactionss += (produced[i]==undefined?1:produced[i]);
			if(i != products.length-1) reactionss += ',';
		}
		reactionss += '],reqs:[';
		for(var i = 0; i < reqs.length; i ++)
		{
			reactionss += reqs[i];
			if(i != reqs.length-1) reactionss += ',';
		}
		reactionss += '],xp:' + xp;
		reactionss += "};\n";
		if(reactions.search(reactionss) == -1) reactions += reactionss;
		console.log(j);
	}
	document.getElementById("b").innerHTML += "<textarea style='width:1250px;height:19000px;' id = 'exps'>";
	document.getElementById("exps").innerHTML = substances + "\n";
	document.getElementById("exps").innerHTML += reactions;
	document.getElementById("b").innerHTML += "</textarea>";
}
function add(formula)
{
	if(formula == undefined) formula = prompt("formula:");
	var name = prompt(formula+" name:");
	if(formula == null || formula == "" || name == null || name == "") return;
	substance[substance.length] = {formula:formula,name:name};
	exp();
}
function get()
{
	var react = prompt("enter reaction(indexes in {} or [], no spaces, use '-' for arrow and '+' for substances)","2H{2}+O{2}-2H{2}O");
	//react = prompt("Don't forget to put '-' at the end!",react);
	react = react.replace(/\[/g,"{");
	react = react.replace(/\]/g,"}");
	if(react[react.length-1] != '-') react += '-';
	var reqs = [];
	var temp = prompt("enter equipment requirement ids if any(when you finish just leave blank this)");
	while(temp!=""&&temp!=null) 
	{
		reqs[reqs.length] =  parseInt(temp);
		temp = prompt("enter equipment requirement ids if any(when you finish just leave blank this)");
	}
	var xp = prompt("xp?");
	var reagents = [];
	var need = [];
	var products = [];
	var produced = [];
	var current = 0;
	var str = "";
	for(var i = 0; i < react.length; i ++)
	{
		if(react[i] != '+' && react[i] != '-')
		{
			if(react[i] >= '0' && react[i] <= '9' && str == "")
			{
				need[current] = parseInt(react[i]);
			}else{
				str += react[i];
			}
		}
		if(react[i] == '+')
		{
			for(var j = 0; j < substance.length; j ++)
			{
				if(substance[j] != undefined && substance[j].formula == str)
				{
					reagents[current] = j;
				}
			}

			if(reagents[current] == 0 || reagents[current] == undefined) add(str);
			for(var j = 0; j < substance.length; j ++)
			{
				if(substance[j] != undefined && substance[j].formula == str)
				{
					reagents[current] = j;
				}
			}
			current ++;
			str = "";
		}
		if(react[i] == '-')
		{
			for(var j = 0; j < substance.length; j ++)
			{
				if(substance[j] != undefined && substance[j].formula == str)
				{
					reagents[current] = j;
				}
			}

			if(products[current] == 0 || reagents[current] == undefined) add(str);
			for(var j = 0; j < substance.length; j ++)
			{
				if(substance[j] != undefined && substance[j].formula == str)
				{
					reagents[current] = j;
				}
			}
			current ++;
			str = "";
			i = react.length;
		}
	}
	current = 0;
	for(var i = react.indexOf("-")+1; i < react.length; i ++)
	{
		if(react[i] != '+' && react[i] != '-')
		{
			if(react[i] >= '0' && react[i] <= '9' && str == "")
			{
				produced[current] = parseInt(react[i]);
			}else{
				str += react[i];
			}
		}
		if(react[i] == '+')
		{
			console.log(str);
			for(var j = 0; j < substance.length; j ++)
			{
				if(substance[j] != undefined && substance[j].formula == str)
				{
					products[current] = j;
				}
			}

			if(products[current] == 0 || products[current] == undefined) add(str);
			for(var j = 0; j < substance.length; j ++)
			{
				if(substance[j] != undefined && substance[j].formula == str)
				{
					products[current] = j;
				}
			}
			current ++;
			str = "";
		}
		if(react[i] == '-')
		{
			console.log(str);
			for(var j = 0; j < substance.length; j ++)
			{
				if(substance[j] != undefined && substance[j].formula == str)
				{
					products[current] = j;
				}
			}
			if(products[current] == 0 || products[current] == undefined) add(str);
			for(var j = 0; j < substance.length; j ++)
			{
				if(substance[j] != undefined && substance[j].formula == str)
				{
					products[current] = j;
				}
			}
			current ++;
			str = "";
			i = react.length;
		}
	}
	var link = [];
	for(var i = 0; i < reagents.length; i ++)
	{
		link[reagents[i]] = i;
	}
	reagents = reagents.sort();
	var nneed = [];
	for(var i = 0; i < reagents.length; i ++)
	{
		nneed[i] = (need[link[reagents[i]]]==undefined?1:need[link[reagents[i]]]);
	}
	need = nneed;
	var a = {reagents:reagents,products:products,need:need,produced:produced,reqs:reqs,xp:parseInt(xp)};
	for(var i = 0; i < reaction.length; i ++)
	{
		console.log(i,JSON.stringify(reaction[i]),JSON.stringify(a),JSON.stringify(reaction[i]) == JSON.stringify(a));
		if(JSON.stringify(reaction[i]) == JSON.stringify(a)) return;
	}
	reaction[reaction.length] = a;
	exp();
	console.log(reaction);
}
function vars()
{
	document.getElementById("b").innerHTML = "<div onclick='get()'>Add Reaction&nbsp;</div>";
	document.getElementById("b").innerHTML += "<div onclick='add()'>Add Substance&nbsp;</div>";
	document.getElementById("b").innerHTML += "<div onclick='exp()'>Export&nbsp;</div>";
	substance = [];
	reaction = [];
	define();
	exp();
}
vars();