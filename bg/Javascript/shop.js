var buy = function(w,pl)
{
	if(equipment[w].price > money) return alert("Нямате достатъчно пари!");
	addMoney(-equipment[w].price);
	equipment[w].price = 0;
	updateShop();
}
var updateShop = function()
{
	var t = document.getElementById("tableShop");
	var n = "<tr>";
	var c = 0, tr = 0;
	var maxOnPage = 10;
	for(var i = shopPage*maxOnPage; i < shopPage*maxOnPage+maxOnPage && (i < equipment.length); i ++)
	{
		if(tr >= 5)
		{
			tr = 0;
			n += "</tr>";
			if(i != shopPage*maxOnPage+maxOnPage-1) n += "<tr>";
		}
		if(equipment[i].price>0)
		{
			n += "<td class = 'shopCard'>";
			n += "<p class = 'shopDesc'>"+equipment[i].name+"<br>";
			n += "Цена: " + equipment[i].price + "&#128;<br><br>";
			n += (equipment[i].info==undefined?"":equipment[i].info);
			n += "</p>";
			n += "<img class = 'shopPic' src = 'Tools/"+i+".jpg'>";
			n += "<img onclick = 'buy("+i+','+c+")' src = 'buy.png' width='136' height='40' style = 'opacity:1'>";
			n += "</td>";
			c ++;
			tr ++;
		}else{
			n += "<td class = 'shopCard'>";
			n += "<p class = 'shopDesc'>"+equipment[i].name+"<br>";
			n += "Купено<br><br>";
			n += (equipment[i].info==undefined?"":equipment[i].info);
			n += "</p>";
			n += "<img class = 'shopPic' src = 'tools/"+i+".jpg'>";
			n += "<div style='width:136px;height:40px' style = 'opacity:1'>";
			n += "</td>";
			c ++;
			tr ++;
		}
	}
	n += "</tr>";
	//console.log(n);
	t.innerHTML = n;
}
var nextPage = function()
{
	if(shopPage*15+15>equipment.length) return;
	shopPage ++;
	$("#tableShop").fadeOut("fast",function()
	{
		updateShop();
		$("#tableShop").fadeIn("fast");
	});
}
var previousPage = function()
{
	if(shopPage<=0) return;
	shopPage --;
	$("#tableShop").fadeOut("fast",function()
	{
		updateShop();
		$("#tableShop").fadeIn("fast");
	});
}