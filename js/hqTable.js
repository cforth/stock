function putsDate() {
  var myDate=new Date();
  document.write( "日期:" + myDate.toLocaleDateString());  
}

function putsIndexQuotes(hqStr) {
  document.write(hqStr[0] + ":" + hqStr[1] + "&nbsp" + hqStr[2] + "&nbsp" + hqStr[3] + "%");
}

function putsStockQuotes(name, hqStr, industry, myPrice, myDate) {

  var nowChange = ((hqStr[3] - hqStr[2]) / hqStr[2]) * 100;
  nowChange = nowChange.toFixed(2); 

  document.write("<tr><td>" + name +"</td>");     //股票代码
  document.write("<td>" + hqStr[0] + "</td>");    //股票名称
  document.write("<td>" + nowChange + "%</td>");  //当日涨跌
  document.write("<td>" + hqStr[3] + "</td>");    //当前价格
  document.write("<td>" + hqStr[2] + "</td>");    //昨日收盘价
  document.write("<td>" + industry + "</td>");    //行业分类
  document.write("<td>" + myPrice +"</td>");      //关注日期
  document.write("<td>" + myDate + "</td></tr>"); //目标价格

}


