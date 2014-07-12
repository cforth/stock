/******************************************************/
//根据股票行情数组来创建126股票数据接口的url请求
function urlMake(iarr, harr) {
  var url = "http://api.money.126.net/data/feed/";
  var ilength = iarr.length;
  var hlength = harr.length;

  for(var i=0; i<ilength; i++) {
    url = url + iarr[i] + ",";
  }
  
  for(var i=0; i<hlength; i++) {
    url = url + harr[i][0] + ",";
  }
  url += "money.api";

  return url;
}


//初始化股票行情表格，并给每个单元格设置id，如第3行第2列，则此单元格id为name+“L2R1”
function emptyTableMake(name, arr) {
  var row, id;

  document.write("<table id=\"stocktable\" class=\"sortable\" >\
    <caption id=\"stockTime\">\
      网页版行情 \
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


  for(var i=0;i<arr.length;i++) {
    id = arr[i][0];
    document.write("<tr>");
    document.write("<td id=\"" + name + "L" + i +"R0\">"+ arr[i][2] + "</td>");
    document.write("<td id=\"" + name + "L" + i +"R1\">"+ "--" + "</td>");
    document.write("<td id=\"" + name + "L" + i +"R2\">"+ " " + "</td>");
    document.write("<td id=\"" + name + "L" + i +"R3\">"+ 0.00 + "</td>");
    document.write("<td id=\"" + name + "L" + i +"R4\">"+ 0.00 + "</td>");
    document.write("<td id=\"" + name + "L" + i +"R5\">"+ 0.00 + "</td>");
    document.write("<td id=\"" + name + "L" + i +"R6\">"+ arr[i][1] + "</td>");
    document.write("<td id=\"" + name + "L" + i +"R7\">"+ arr[i][4] + "</td>");
    document.write("<td id=\"" + name + "L" + i +"R8\">"+ 0.00 + "</td>");
    document.write("<td id=\"" + name + "L" + i +"R9\">"+ 0.00 + "</td>");
    document.write("<td id=\"" + name + "L" + i +"R10\">"+ 0.00 + "</td>");
    document.write("<td id=\"" + name + "L" + i +"R11\">"+ 0 + "</td>");
    document.write("<td id=\"" + name + "L" + i +"R12\">"+ arr[i][5] + "</td>");
    document.write("<td id=\"" + name + "L" + i +"R13\">"+ "--" + "</td>");
    document.write("</tr>");
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
function dailyGrade(nowDaily, old, target) {
  var dailyTarget = totalChange(target, old);
  var dailyTargetChange = dailyTarget / 180;
  var grade = nowDaily - dailyTargetChange;
  if(grade > 0 || grade ==0) {
    return "优秀";
  }
  else if(nowDaily > 0 || nowDaily == 0) {
    return "良好";
  }
  else {
    return "差评";
  }
}

//跟新表格中的行情数据
function tableMake(arr, data, name) {
  var length = arr.length;
  var id, days, daily, changeNode, priceNode, totalChangeNode, dailyChangeNode, change;
  
  //显示行情更新时间
  document.getElementById("stockTime").innerHTML ="网页版行情" + "(" + data[arr[0][0]]["update"] + ")";
  
  for(var i=0;i<length;i++) {
    //跟新相应格子中的数据
    id = arr[i][0];
    days = getDays(arr[i][2], data[id]["update"]);
    change = totalChange(data[id]["price"], arr[i][3]);
    daily = dailyChange(change, days);
    document.getElementById(name +"L" + i + "R1").innerHTML = "<a href=\"http:\/\/quotes.money.163.com\/" + id +".html\" target=\"_blank\">" + data[id]["symbol"] + "</a>"; 
    document.getElementById(name +"L" + i + "R2").innerHTML = data[id]["name"]; 
    document.getElementById(name +"L" + i + "R3").innerHTML = (data[id]["percent"] * 100).toFixed(2); 
    document.getElementById(name +"L" + i + "R4").innerHTML = (data[id]["price"]).toFixed(2); 
    document.getElementById(name +"L" + i + "R5").innerHTML = (data[id]["volume"] / 10000).toFixed(2); 
    document.getElementById(name +"L" + i + "R8").innerHTML = daily.toFixed(2); 
    document.getElementById(name +"L" + i + "R9").innerHTML = change.toFixed(2);
    document.getElementById(name +"L" + i + "R10").innerHTML = (((arr[i][4] - data[id]["price"]) / data[id]["price"]) * 100).toFixed(2);
    document.getElementById(name +"L" + i + "R11").innerHTML = days;
    document.getElementById(name +"L" + i + "R13").innerHTML = dailyGrade(daily, arr[i][3], arr[i][4]);

    //根据数据内容调整字体颜色
    changeNode = document.getElementById(name + "L" + i +"R3");
    priceNode = document.getElementById(name + "L" + i +"R4");
    if (changeNode.innerHTML >= 0) {
      changeNode.style.color = "red";
      priceNode.style.color = "red";
    }
    else {
      changeNode.style.color = "green";
      priceNode.style.color = "green";
    }

    totalChangeNode = document.getElementById(name + "L" + i +"R9");
    dailyChangeNode = document.getElementById(name + "L" + i +"R8");
    if (totalChangeNode.innerHTML >= 0) {
      totalChangeNode.style.color = "red";
      dailyChangeNode.style.color = "red";
    }
    else {
      totalChangeNode.style.color = "green";
      dailyChangeNode.style.color = "green";
    }
  
  }

}


//根据json数据更新指数与股票行情,其中使用到了全局数组indexArr与hqArr
function stockArrayMake(data) {
  
  indexMake(indexArr, data, "index");  
  tableMake(hqArr, data, "stock");  

}


/******************************************************/


//更新指数行情数据
function indexMake(arr, data, name) {
  var length = arr.length;
  var id, change, changeNode;

  for(var i=0;i<length;i++) {
    id = indexArr[i];
    document.getElementById(name + i).innerHTML = (data[id]["price"]).toFixed(2) + "&nbsp&nbsp&nbsp&nbsp" + (data[id]["updown"]).toFixed(2) + "&nbsp&nbsp&nbsp&nbsp" + (data[id]["percent"] * 100).toFixed(2) + "%"; 
    
    //根据数据内容调整字体颜色
    changeNode = document.getElementById(name + i);
    change = data[id]["updown"];
    if (change >= 0) {
      changeNode.style.color = "red";
    }
    else {
      changeNode.style.color = "green";
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
