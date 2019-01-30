$(function() {
	// Custom JS
	//Настройка индикаторов
	for(var i = 0; i<=3; i++){
		var radialObj = radialIndicator('.indicator' + i, {
		    barWidth : 10,
		    barColor : '#87CEEB',
		    barBgColor: "#fff",
		    barWidth : 3.5,
		    initValue : 40*i,
		    maxValue : 1000,
		    percentage: false,
		    fontSize: "24",
		    fontFamily: "Exo20-example",
		    fontColor: "#fff"
		}); 
		//Using Instance
		}
});
