//日期显示模块
function putsDate() {
  var myDate=new Date();
  document.write( "日期:" + myDate.toLocaleDateString());  
}


//大盘指数显示模块
function putsIndexQuotes(hqStr) {
  var color = putsColor(hqStr[3]);
  document.write("<td style=color:" + color + ">");
  document.write(hqStr[0] + ":&nbsp" + hqStr[1] + "&nbsp&nbsp" + hqStr[2] + "&nbsp&nbsp" + hqStr[3] + "%");
  document.write("</td>");
}


//根据数值设置字的颜色
function putsColor(nowChange) {
  return (nowChange < 0) ? "#009933" : "#FF0000";
}


//根据行业分类关键字给出醒目颜色
function putsColorPoint(str, pointStr) {
  return (str === pointStr) ? "#DAA520" : "#10008F";
}


//股票行情表格显示模块
function putsStockQuotes(id, name, hqStr, industry, myDate, bidPrice, forecastPrice) {

  //当股票当日停盘或者初始化而造成当前价格为0时，对涨跌幅不显示
  var nowChange = ((hqStr[3] - hqStr[2]) / hqStr[2]) * 100;
  nowChange = (nowChange == -100) ? "- . --" : nowChange.toFixed(2); 

  var totalChange = ((hqStr[3] - bidPrice) / bidPrice) * 100;
  totalChange = (totalChange == -100) ? "- . --" : totalChange.toFixed(2);

  var nowPrice = parseFloat(hqStr[3]);
  nowPrice = nowPrice.toFixed(2);

  //根据当日涨跌幅来显示当日涨跌列的颜色
  var colorNow = putsColor(nowChange);

  //根据累计涨跌幅来显示累计涨跌列的颜色
  var colorTotal = putsColor(totalChange);

  //关键行业分类加醒目颜色
  var colorPoint = putsColorPoint(industry, "十大金股");

  //根据市场，设置市场标示符
  var market = (name >= 600000) ? "sh" : "sz";

  document.write("<tr> <td>" + id +"</td>");             //序号

  //股票代码，点击链接跳转至相应新浪股票实时行情网址
  //http://finance.sina.com.cn/realstock/company/sh600000/nc.shtml
  document.write("<td>" + "<a href=\"http://finance.sina.com.cn/realstock/company/" + market + name + "/nc.shtml\" target=\"_blank\">" + name + "</a>" + "</td>");

  document.write("<td style=color:" + colorPoint + ">" + hqStr[0] + "</td>");           //股票名称
  document.write("<td style=color:" + colorNow +">" + nowChange + "%</td>");            //当日涨跌
  document.write("<td style=color:" + colorNow +">" + nowPrice + "</td>");              //当前价格
  document.write("<td style=color:" + colorPoint + ">" + industry + "</td>");           //行业分类
  document.write("<td style=color:" + colorPoint + ">" + myDate + "</td>");             //关注日期
  document.write("<td style=color:" + colorTotal +">" + totalChange +"%</td>");         //累计涨跌
  document.write("<td style=color:" + colorPoint + ">" + forecastPrice +"</td></tr>");  //目标价格

}


