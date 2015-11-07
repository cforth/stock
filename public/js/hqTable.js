/******************************************************/
//根据股票行情数组来创建126股票数据接口的url请求
//利用arguments收集参数
function urlMake() {
  var url = "http://api.money.126.net/data/feed/";

  for (var i=0; i<arguments.length; i++) {
	for(var j=0; j<arguments[i].length; j++) {
		url += arguments[i][j][0] + ",";
	}
  }
  url += "money.api";

  return url;
}


//生成历史股票关注表格
function historyTableMake(name, arr) {
  var width = arr[0].length;
  var length = arr.length;
  document.write(
    "<table id=\"" + name + "Table\" class=\"sortable\"> \
        <caption> \
          已达成目标价的股票(" + length + "只) \
        </caption> \
         <tr>  \
           <th>达成日期</th> \
           <th>股票代码</th> \
           <th>股票名称</th> \
           <th>初始价格</th> \
           <th>目标价格</th> \
           <th>达成日收盘价</th> \
           <th>累计涨幅%</th> \
           <th>行业分类</th> \
           <th>关注日期</th> \
           <th>总计天数</th> \
         </tr>");
 
  for(var i=0; i<length; i++) {
    if(i < 20) {
      document.write("<tr>");
    }
    else {
      document.write("<tr class=\"lsgzdisplay\">");
    }

    for(var j=0; j<width; j++) {
      document.write("<td>" + arr[i][j] + "</td>");
    }
    document.write("</tr>");    
  }

  document.write("</table>");
}


//初始化指数行情表格
function emptyIndexMake(name, arr) {
  document.write("<table id=\"" + name + "Head\"> \
        <caption> \
          大盘指数 \
          <a href=\"\/stock\/comments.html\" style=\"float:right\">留言板<\/a> \
        <\/caption> \
        <tr> \
          <th colspan=\"3\">上证指数</th> \
          <th colspan=\"3\">深证成指</th> \
          <th colspan=\"3\">创业板指</th> \
          <th colspan=\"3\">沪深300指</th> \
        <\/tr> \
        <tr id=\"" + name + "Body\"> ");

  for(var i = 0; i < (arr.length) * 3; i++) {
    document.write("<td>--<\/td>");
  }
  
  document.write("<\/tr><\/table><br\/>");
}


//初始化股票行情表格，以股票代码作为每行的id。默认显示20条股票行情信息。
function emptyTableMake(name, arr) {
  var length = arr.length;
  document.write("<table id=\"" + name + "Table\" class=\"sortable\" >\
    <caption id=\"stockTime\">\
      网页版行情(" + length + "只) \
    <\/captain>\
      <tr>\
        <th>关注日期<\/th>\
        <th>股票代码<\/th>\
        <th>股票名称<\/th>\
        <th>当日涨跌%<\/th>\
        <th>当前价格<\/th>\
        <th>成交量(万)<\/th>\
        <th>行业分类<\/th>\
        <th class=\"yellow\">目标价(6个月)<\/th>\
        <th class=\"yellow\">日均涨跌%<\/th>\
        <th class=\"yellow\">累计涨跌%<\/th>\
        <th class=\"yellow\">溢价空间%<\/th>\
        <th class=\"yellow\">关注天数<\/th>\
        <th class=\"yellow\">评级<\/th>\
        <th class=\"yellow\">实时业绩<\/th>\
      <\/tr>");

  for(var i=0;i<length;i++) {
    if(i < 20) {
      document.write("<tr id=\"" + name + "Table" + arr[i][0] + "\">");
    }
    else {
      document.write("<tr class=\"hqtabledisplay\" id=\"" + name + "Table" + arr[i][0] + "\">");
    }

    document.write("<td>"+ arr[i][2] + "</td> \
      <td>"+ "--" + "</td> \
      <td>"+ " " + "</td> \
      <td>"+ 0.00 + "</td> \
      <td>"+ 0.00 + "</td> \
      <td>"+ 0.00 + "</td> \
      <td>"+ arr[i][1] + "</td> \
      <td>"+ arr[i][4] + "</td> \
      <td>"+ 0.00 + "</td> \
      <td>"+ 0.00 + "</td> \
      <td>"+ 0.00 + "</td> \
      <td>"+ 0 + "</td> \
      <td>"+ arr[i][5] + "</td> \
      <td>"+ "--" + "</td> \
    </tr>");
  }
  document.write("</table>");
}


//计算总涨幅
function totalChange(now, old) {
  return (now - old) * 100.0 / old;
}


//为了兼容IE浏览器日期对象，处理“2014-07-01”格式的日期字符串。
function newDate(str) { 
  str = str.split('-'); 
  var date = new Date(); 
  date.setUTCFullYear(str[0], str[1] - 1, str[2]); 
  date.setUTCHours(0, 0, 0, 0); 
  return date; 
}



//为了兼容IE浏览器日期对象，处理“2014/07/01 15:05:00”格式的日期字符串。
function stockNewDate(str) { 
  str = str.split(' ');
  str = str[0].split('/');
  var date = new Date(); 
  date.setUTCFullYear(str[0], str[1] - 1, str[2]); 
  date.setUTCHours(0, 0, 0, 0); 
  return date; 
}


//计算关注股票的总计天数
function getDays(dayStr, nowDayStr) {
  return Math.round(((stockNewDate(nowDayStr)).getTime() - (newDate(dayStr)).getTime()) / 60 / 60 / 24 / 1000) + 1;
}


//计算日均涨幅
function dailyChange(change, days) {
  return change / days;
}

//计算实际日均与目标日均之间的差，返回优秀、良好、差评
function dailyGrade(nowDaily, old, target, price, days) {
  var dailyTarget = totalChange(target, old);
  var dailyTargetChange = dailyTarget / 180;
  var grade = nowDaily - dailyTargetChange;
  if(days > 180) {
    if(nowDaily > 0) {
      return "良好";
    }
    else {
      return "差评";
    }
  } 
  else {
    if(grade > 0 || grade == 0 || price > target) {
      return "优秀";
    }
    else if(grade < 0 && nowDaily > 0) {
      return "良好";
    }
    else {
      return "差评";
    }
  }
}


//使用Hash数组保存股票行情信息。
function stockDataMake(arr, data) {
  var stockId, days, change, daily;
  var stockData = new Array();
  for(var i = 0; i < arr.length; i++) {
    stockId = arr[i][0];
    days = getDays(arr[i][2], data[stockId]["update"]);
    //修复当日新增股票，但行情时间为昨日出现的bug。
    if (days < 1) {
      days = 1;
    }
    change = totalChange(data[stockId]["price"], arr[i][3]);
    daily = dailyChange(change, days);
    stockData[stockId] = new Array();
    stockData[stockId]["initDate"] = arr[i][2];
    stockData[stockId]["symbol"] = data[stockId]["symbol"];
    stockData[stockId]["name"] = data[stockId]["name"];
    stockData[stockId]["percent"] = (data[stockId]["percent"] * 100).toFixed(2);
    stockData[stockId]["price"] = (data[stockId]["price"]).toFixed(2);
    stockData[stockId]["volume"] = (data[stockId]["volume"] / 10000).toFixed(2);
    stockData[stockId]["daily"] = daily.toFixed(2);
    stockData[stockId]["change"] = change.toFixed(2);
    stockData[stockId]["space"] = (((arr[i][4] - data[stockId]["price"]) / data[stockId]["price"]) * 100).toFixed(2);
    stockData[stockId]["days"] = days;
    stockData[stockId]["grade"] = dailyGrade(daily, parseFloat(arr[i][3]), parseFloat(arr[i][4]), (data[stockId]["price"]).toFixed(2), days);
    stockData[stockId]["update"] = data[stockId]["update"];
  }
  return stockData;
}


//跟新表格中的行情数据
function tableMake(arr, stockData, name) {
  var length = arr.length;
  var goodNum = ordNum = badNum = overdue = 0;
  var id, days, trNode, oldPrice;
  
  for(var i=0;i<length;i++) {
    id = arr[i][0];
    trNode = document.getElementById(name +  "Table" + arr[i][0]);
    oldPrice = trNode.cells[4].innerHTML;
    trNode.cells[1].innerHTML = "<a href=\"http:\/\/quotes.money.163.com\/" + id +".html\" target=\"_blank\">" + stockData[id]["symbol"] + "</a>"; 
    trNode.cells[2].innerHTML = stockData[id]["name"]; 
    trNode.cells[3].innerHTML = stockData[id]["percent"]; 
    trNode.cells[4].innerHTML = stockData[id]["price"]; 
    trNode.cells[5].innerHTML = stockData[id]["volume"]; 
    trNode.cells[8].innerHTML = stockData[id]["daily"]; 
    trNode.cells[9].innerHTML = stockData[id]["change"];
    trNode.cells[10].innerHTML = stockData[id]["space"];
    trNode.cells[11].innerHTML = stockData[id]["days"];
    trNode.cells[13].innerHTML = stockData[id]["grade"];

    //根据数据内容调整字体颜色,根据价格升降显示背景色
    if (oldPrice != 0.0 && trNode.cells[4].innerHTML > oldPrice) {
      trNode.cells[4].style.backgroundColor = "#FEEEEE";
    }
    else if(trNode.cells[4].innerHTML < oldPrice) {
      trNode.cells[4].style.backgroundColor = "#EEFFED";
    }
    else {
      trNode.cells[4].style.backgroundColor = "#FFFFFF";
    }

    if (trNode.cells[3].innerHTML >= 0) {
      trNode.cells[3].style.color = "red";
      trNode.cells[4].style.color = "red";
    }
    else {
      trNode.cells[3].style.color = "green";
      trNode.cells[4].style.color = "green";
    }

    if (trNode.cells[9].innerHTML >= 0) {
      trNode.cells[9].style.color = "red";
      trNode.cells[8].style.color = "red";
    }
    else {
      trNode.cells[9].style.color = "green";
      trNode.cells[8].style.color = "green";
    }
    
    switch(stockData[id]["grade"]) {
    case "优秀":
      goodNum += 1;
      break;
    case "良好":
      ordNum += 1;
      break;
    case "差评":
      badNum += 1;
      break;
    }
  }
    
    goodNum = (goodNum * 100 / length).toFixed(2);
    ordNum =  (ordNum * 100 / length).toFixed(2);
    badNum =  (badNum * 100 / length).toFixed(2);

  //显示股票池业绩统计和行情更新时间
  document.getElementById("stockTime").innerHTML ="网页版行情(正在关注" + length + "只 优秀:" + goodNum +"% 良好:" + ordNum + "% 差评:" + badNum + "%) <span style=\"float:right\">" + stockData[arr[0][0]]["update"] + "</span>";
  

}


//根据json数据更新指数与股票行情,其中使用到了全局数组historyArr, indexArr与hqArr
function stockArrayMake(data) {
  historyNum = historyArr.length;
  indexMake(indexArr, data, "index");  
  tableMake(hqArr, stockDataMake(hqArr, data), "stock");  

}


/******************************************************/


//更新指数行情数据
function indexMake(arr, data, name) {
  var length = arr.length;
  var id, change;
  var trNode = document.getElementById(name + "Body");

  for(var i=0, j=0;i<length;i++,j=j+3) {
    id = indexArr[i];
    change = data[id]["updown"];
    trNode.cells[j].innerHTML = (data[id]["price"]).toFixed(2); 
    trNode.cells[j+1].innerHTML = change.toFixed(2);
    trNode.cells[j+2].innerHTML = (data[id]["percent"] * 100).toFixed(2) + "%";
    
    //根据数据内容调整字体颜色
    if (change >= 0) {
      trNode.cells[j].style.color = "red";
      trNode.cells[j+1].style.color = "red";
      trNode.cells[j+2].style.color = "red";
    }
    else {
      trNode.cells[j].style.color = "green";
      trNode.cells[j+1].style.color = "green";
      trNode.cells[j+2].style.color = "green";
    }
  }
}


/******************************************************/


//根据json格式的股票或指数行情数据来更新表格，完美版。
var do_jsonp_id = 1;

function doJsonp(url, callback, timeout) {
  var name = "do_jsonp_callback_"+(do_jsonp_id++);
  var ele = document.createElement('script');
  var timer;

  window[name] = function() {
    //清理计时器
    window.clearTimeout(timer);
    //回调回调函数
    callback.apply(this, arguments);
    //清理元素
    ele.parentNode.removeChild(ele);
    //清理回调
    delete window[name];
  };

  url += ((url.indexOf("?") == -1) ? '?' : '&') + "callback=" + name;

  ele.src = url;

  //超时处理
  timer = window.setTimeout(function(){
    //清理元素
    ele.parentNode.removeChild(ele);
    //清理回调
    delete window[name];
  }, timeout||30000);

  //执行请求
  document.getElementsByTagName('head')[0].appendChild(ele);
}


/******************************************************/


// 对Date的扩展，将 Date 转化为指定格式的String 
// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符， 
// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字) 
// 例子： 
// (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423 
// (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18 
Date.prototype.Format = function(fmt) 
{ //author: meizz 
  var o = { 
    "M+" : this.getMonth()+1,                 //月份 
    "d+" : this.getDate(),                    //日 
    "h+" : this.getHours(),                   //小时 
    "m+" : this.getMinutes(),                 //分 
    "s+" : this.getSeconds(),                 //秒 
    "q+" : Math.floor((this.getMonth()+3)/3), //季度 
    "S"  : this.getMilliseconds()             //毫秒 
  }; 
  if(/(y+)/.test(fmt)) 
    fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length)); 
  for(var k in o) 
    if(new RegExp("("+ k +")").test(fmt)) 
  fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length))); 
  return fmt; 
}


//自动对已经达到目标价的股票，生成历史股票关注表格
function historyTableUpdate(data) {
  var d = new Date().Format("yyyy-MM-dd");
  stockData = stockDataMake(hqArr, data);
  var length = hqArr.length;
  var id;
  trNode = document.getElementById("historyTableUpdate");
  trNode.innerHTML = "";
  
  for(var i=0;i<length;i++) {
    id = hqArr[i][0];
    if(stockData[id]["space"] < 0) {
    trNode.innerHTML += "<p>";
    trNode.innerHTML += "  [\"" + d + "\", ";
    trNode.innerHTML += "\"" + stockData[id]["symbol"] + "\", ";
    trNode.innerHTML += "\"" + stockData[id]["name"] + "\", ";
    trNode.innerHTML += "\"" + hqArr[i][3] + "\", ";
    trNode.innerHTML += "\"" + hqArr[i][4] + "\", ";
    trNode.innerHTML += "\"" + stockData[id]["price"] + "\", "; 
    trNode.innerHTML += "\"" + stockData[id]["change"] + "\", ";
    trNode.innerHTML += "\"" + hqArr[i][1] + "\", ";
    trNode.innerHTML += "\"" + hqArr[i][2] + "\", ";
    trNode.innerHTML += "\"" + stockData[id]["days"] + "\"], ";
    trNode.innerHTML += "</p>";
    }
  } 
}
