function putsDate() {
  var myDate=new Date();
  document.write( myDate.toLocaleDateString());  
}


function putsStockQuotes(name, hqStr, myPrice, myDate) {

  var nowChange = ((hqStr[3] - hqStr[2]) / hqStr[2]) * 100;
  nowChange = nowChange.toFixed(2);

  document.write("<tr><td>" + name +"</td><td>" + hqStr[0] + "</td><td>" + nowChange + "%</td><td>" + hqStr[3] + "</td><td>" + hqStr[2] + "</td><td>" + myPrice +"</td><td>" + myDate + "</td></tr>");

}


