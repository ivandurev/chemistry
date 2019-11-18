var rename = function()
{
	document.getElementById("b").innerHTML = "";
	for(var i = 0; i < substance.length; i ++)
	{
		if(substance[i] != undefined) document.getElementById("b").innerHTML += i + '&nbsp;&nbsp;&nbsp;&nbsp;' + substance[i].name + "<br>";
	}
}
var define = function()
{
	if(typeof unlocks != 'undefined')
	{
		unlocks[1] = [1,2,3];
		unlocks[2] = [4];
		unlocks[3] = [6];
		unlocks[4] = [5];
		unlocks[5] = [0,19]
	}
	if(typeof need != 'undefined')
	{
		need = [0,35,80,210,1000];
	}
	if(typeof equipment != 'undefined')
	{
		equipment[0] = {name:"Спиртна лампа",price:30,info:"Загрява веществата."};
		equipment[1] = {name:"Концентратор",price:40,info:"Използва се за концентриране на киселини."};
	}
substance[0]={formula:'Al',name:'Алуминий'};
substance[1]={formula:'H{2}',name:'Водород'};
substance[2]={formula:'O{2}',name:'Кислород'};
substance[3]={formula:'Na',name:'Натрий'};
substance[4]={formula:'Cl{2}',name:'Хлор'};
substance[5]={formula:'Cu',name:'Мед'};
substance[6]={formula:'S',name:'Сяра'};
substance[7]={formula:'NaH',name:'Натриев Хидрид'};
substance[8]={formula:'Na{2}O',name:'Натриев Оксид'};
substance[9]={formula:'Na{2}O{2}',name:'Натриев Пероксид'};
substance[10]={formula:'H{2}O',name:'Вода'};
substance[11]={formula:'NaOH',name:'Натриева Основа'};
substance[12]={formula:'NaCl',name:'Натриев Хлорид'};
substance[13]={formula:'HClO',name:'Хипохлориста Киселина'};
substance[14]={formula:'O',name:'Атомен Кислород'};
substance[15]={formula:'NaClO',name:'Натриев Хипохлорит'};
substance[16]={formula:'HCl',name:'Солна Киселина'};
substance[18]={formula:'NaClO{3}',name:'Натриев Хлорат'};
substance[19]={formula:'CO{2}',name:'Въглероден Диоксид'};
substance[20]={formula:'CuS',name:'Меден Сулфид'};
substance[21]={formula:'H{2}O{2}',name:'Водороден Пероксид'};
substance[22]={formula:'H{2}S',name:'Сероводород'};
substance[23]={formula:'SO{2}',name:'Серен Диоксид'};
substance[24]={formula:'SO{3}',name:'Серен Триоксид'};
substance[25]={formula:'H{2}SO{3}',name:'Сериста Киселина'};
substance[26]={formula:'H{2}SO{4}',name:'Сярна Киселина'};
substance[27]={formula:'HCl',name:'Хлороводород'};
substance[28]={formula:'CuO',name:'Меден Оксид'};
substance[29]={formula:'Na{2}S',name:'Натриев Сулфид'};
substance[30]={formula:'Na{2}SO{3}',name:'Натриев Сулфит'};
substance[31]={formula:'Na{2}SO{4}',name:'Натриев Сулфат'};
substance[32]={formula:'CuCl{2}',name:'Меден Хлорид'};
substance[33]={formula:'CuSO{4}',name:'Меден Сулфат'};
substance[34]={formula:'Na{2}CO{3}',name:'Натриев Карбонат'};
substance[35]={formula:'H{2}CO{3}',name:'Въглеродна Киселина'};
substance[36]={formula:'NaHSO{4}',name:'Натриев Хидрогенсулфат'};


reaction[reaction.length]={reagents:[1,3],products:[7],need:[1,2],produced:[2],reqs:[],xp:5};
reaction[reaction.length]={reagents:[2,3],products:[8],need:[1,4],produced:[2],reqs:[],xp:5};
reaction[reaction.length]={reagents:[2,3],products:[9],need:[1,2],produced:[1],reqs:[0],xp:10};
reaction[reaction.length]={reagents:[1,2],products:[10],need:[2,1],produced:[2],reqs:[],xp:5};
reaction[reaction.length]={reagents:[3,10],products:[11,1],need:[2,2],produced:[2,1],reqs:[],xp:10};
reaction[reaction.length]={reagents:[1,4],products:[16],need:[1,1],produced:[2],reqs:[],xp:5};
reaction[reaction.length]={reagents:[4,10],products:[16,13],need:[1,1],produced:[1,1],reqs:[],xp:5};
reaction[reaction.length]={reagents:[13],products:[16,14],need:[1],produced:[1,1],reqs:[],xp:10};
reaction[reaction.length]={reagents:[11,16],products:[12,10],need:[1,1],produced:[1,1],reqs:[],xp:5};
reaction[reaction.length]={reagents:[11,13],products:[15,10],need:[1,1],produced:[1,1],reqs:[],xp:10};
reaction[reaction.length]={reagents:[3,4],products:[12],need:[2,1],produced:[2],reqs:[],xp:5};
reaction[reaction.length]={reagents:[4,11],products:[12,15,10],need:[1,2],produced:[1,1,1],reqs:[],xp:10};
reaction[reaction.length]={reagents:[15],products:[12,18],need:[3],produced:[2,1],reqs:[0],xp:15};
reaction[reaction.length]={reagents:[10],products:[1,2],need:[2],produced:[2,1],reqs:[0],xp:10};
reaction[reaction.length]={reagents:[5,6],products:[20],need:[1,1],produced:[1],reqs:[],xp:5};
reaction[reaction.length]={reagents:[8,10],products:[11],need:[1,1],produced:[2],reqs:[],xp:10};
reaction[reaction.length]={reagents:[9,10],products:[11,21],need:[1,2],produced:[2,1],reqs:[],xp:10};
reaction[reaction.length]={reagents:[21],products:[10,2],need:[2],produced:[2,1],reqs:[],xp:15};
reaction[reaction.length]={reagents:[3,16],products:[12,1],need:[2,2],produced:[2,1],reqs:[],xp:5};
reaction[reaction.length]={reagents:[13,16],products:[10,4],need:[1,1],produced:[1,1],reqs:[],xp:20};
reaction[reaction.length]={reagents:[10,13],products:[16,21],need:[1,1],produced:[1,1],reqs:[],xp:20};
reaction[reaction.length]={reagents:[15,21],products:[12,10,2],need:[1,1],produced:[1,1,1],reqs:[],xp:15};
reaction[reaction.length]={reagents:[15,16],products:[12,4,10],need:[1,2],produced:[1,1,1],reqs:[],xp:15};
reaction[reaction.length]={reagents:[10],products:[1,2],need:[2],produced:[2,1],reqs:[0],xp:10};
reaction[reaction.length]={reagents:[1,6],products:[22],need:[1,1],produced:[1],reqs:[0],xp:5};
reaction[reaction.length]={reagents:[22],products:[1,6],need:[1],produced:[1,1],reqs:[0],xp:10};
reaction[reaction.length]={reagents:[2,5],products:[28],need:[1,2],produced:[2],reqs:[0],xp:5};
reaction[reaction.length]={reagents:[2,6],products:[23],need:[1,1],produced:[1],reqs:[0],xp:5};
reaction[reaction.length]={reagents:[3,6],products:[29],need:[2,1],produced:[1],reqs:[],xp:5};
reaction[reaction.length]={reagents:[3,13],products:[15,1],need:[2,2],produced:[2,1],reqs:[],xp:10};
reaction[reaction.length]={reagents:[3,25],products:[30,1],need:[2,1],produced:[1,1],reqs:[],xp:10};
reaction[reaction.length]={reagents:[3,26],products:[31,1],need:[1,1],produced:[1,1],reqs:[],xp:10};
reaction[reaction.length]={reagents:[3,26],products:[31,23,10],need:[2,1],produced:[1,1,2],reqs:[1],xp:15};
reaction[reaction.length]={reagents:[4,5],products:[32],need:[1,1],produced:[1],reqs:[],xp:5};
reaction[reaction.length]={reagents:[5,26],products:[33,23,10],need:[1,2],produced:[1,1,2],reqs:[1],xp:10};
reaction[reaction.length]={reagents:[7,10],products:[11,1],need:[1,1],produced:[1,1],reqs:[],xp:10};
reaction[reaction.length]={reagents:[7,13],products:[15,1],need:[1,1],produced:[1,1],reqs:[],xp:10};
reaction[reaction.length]={reagents:[2,23],products:[24],need:[1,2],produced:[2],reqs:[],xp:10};
reaction[reaction.length]={reagents:[10,23],products:[25],need:[1,1],produced:[1],reqs:[],xp:10};
reaction[reaction.length]={reagents:[10,24],products:[26],need:[1,1],produced:[1],reqs:[],xp:5};
reaction[reaction.length]={reagents:[7,25],products:[30,1],need:[2,1],produced:[1,2],reqs:[],xp:10};
reaction[reaction.length]={reagents:[7,26],products:[31,1],need:[2,1],produced:[1,2],reqs:[],xp:10};
reaction[reaction.length]={reagents:[8,10],products:[11],need:[1,1],produced:[2],reqs:[],xp:5};
reaction[reaction.length]={reagents:[8,13],products:[15,10],need:[1,2],produced:[2,1],reqs:[],xp:10};
reaction[reaction.length]={reagents:[8,19],products:[34],need:[1,1],produced:[1],reqs:[],xp:5};
reaction[reaction.length]={reagents:[8,23],products:[30],need:[1,1],produced:[1],reqs:[],xp:10};
reaction[reaction.length]={reagents:[8,25],products:[30,10],need:[1,1],produced:[1,1],reqs:[],xp:10};
reaction[reaction.length]={reagents:[8,26],products:[31,10],need:[1,1],produced:[1,1],reqs:[],xp:5};
reaction[reaction.length]={reagents:[9,10],products:[11,2],need:[1,1],produced:[1,1],reqs:[],xp:10};
reaction[reaction.length]={reagents:[9,13],products:[15,21],need:[1,1],produced:[2,1],reqs:[],xp:10};
reaction[reaction.length]={reagents:[9,16],products:[12,21],need:[1,1],produced:[2,1],reqs:[],xp:10};
reaction[reaction.length]={reagents:[8,16],products:[12,10],need:[1,2],produced:[2,1],reqs:[],xp:5};
reaction[reaction.length]={reagents:[9,25],products:[30,21],need:[1,1],produced:[1,1],reqs:[],xp:10};
reaction[reaction.length]={reagents:[9,26],products:[31,21],need:[1,1],produced:[1,1],reqs:[],xp:10};
reaction[reaction.length]={reagents:[10,19],products:[35],need:[1,1],produced:[1],reqs:[],xp:5};
reaction[reaction.length]={reagents:[35],products:[19,10],need:[1],produced:[1,1],reqs:[],xp:10};
reaction[reaction.length]={reagents:[25],products:[23,10],need:[1],produced:[1,1],reqs:[],xp:10};
reaction[reaction.length]={reagents:[11,19],products:[34,10],need:[2,1],produced:[1,1],reqs:[],xp:10};
reaction[reaction.length]={reagents:[11,23],products:[30,10],need:[2,1],produced:[1,1],reqs:[],xp:10};
reaction[reaction.length]={reagents:[11,25],products:[30,10],need:[2,1],produced:[1,1],reqs:[],xp:10};
reaction[reaction.length]={reagents:[11,26],products:[31,10],need:[2,1],produced:[1,1],reqs:[],xp:5};
reaction[reaction.length]={reagents:[24],products:[23,2],need:[2],produced:[2,1],reqs:[],xp:10};
reaction[reaction.length]={reagents:[9,19],products:[34,2],need:[2,2],produced:[2,1],reqs:[],xp:15};
reaction[reaction.length]={reagents:[9,26],products:[30,2],need:[2,2],produced:[2,1],reqs:[],xp:15};
reaction[reaction.length]={reagents:[12,26],products:[36,27],need:[1,1],produced:[1,1],reqs:[1],xp:15};
}