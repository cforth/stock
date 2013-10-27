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


//股票行情表格显示模块
function putsStockQuotes(id, name, hqStr, industry, myDate, bidPrice, forecastPrice) {

  var nowChange = ((hqStr[3] - hqStr[2]) / hqStr[2]) * 100;
  nowChange = nowChange.toFixed(2); 

  var totalChange = ((hqStr[3] - bidPrice) / bidPrice) * 100;
  totalChange = totalChange.toFixed(2);

  var nowPrice = parseFloat(hqStr[3]);
  nowPrice = nowPrice.toFixed(2);

  //根据当日涨跌幅来显示每行股票行情的颜色
  var color = putsColor(nowChange);

  //根据市场，设置市场标示符
  var market = (name >= 600000) ? "sh" : "sz";

  document.write("<tr style=color:" + color + ">");

  document.write("<td>" + id +"</td>");             //序号

  //股票代码，点击链接跳转至相应新浪股票实时行情网址
  document.write("<td>" + "<a href=\"http://biz.finance.sina.com.cn/suggest/lookup_n.php?q=" + market + name + "\" target=\"_blank\">" + name + "</a>" + "</td>");

  document.write("<td>" + hqStr[0] + "</td>");          //股票名称
  document.write("<td>" + nowChange + "%</td>");        //当日涨跌
  document.write("<td>" + nowPrice + "</td>");          //当前价格
  document.write("<td>" + industry + "</td>");          //行业分类
  document.write("<td>" + myDate + "</td>");            //关注日期
  document.write("<td>" + totalChange +"%</td>");       //累计涨跌
  document.write("<td>" + forecastPrice +"</td></tr>"); //目标价格

}


