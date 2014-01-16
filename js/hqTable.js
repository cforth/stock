/******************************************************/
//根据股票行情数组来创建126股票数据接口的url请求
function urlMake(arr) {
  var url = "http://api.money.126.net/data/feed/";
  var length = arr.length;
  for(var i=0; i<length; i++) {
    url = url + arr[i][0] + ",";
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
      <tr id=\"sthead\">\
        <td>序号<\/td>\
        <td>股票代码<\/td>\
        <td>股票名称<\/td>\
        <td>当日涨幅%<\/td>\
        <td>当前价格<\/td>\
        <td>行业分类<\/td>\
        <td>关注日期<\/td>\
        <td>累计涨幅%<\/td>\
        <td>目标价(6个月)<\/td>\
        <td>溢价空间%<\/td>\
      <\/tr>");


  for(var i=0;i<arr.length;i++) {
    row = i + 1;
    id = arr[i][0];
    document.write("<tr>");
    document.write("<td id=\"" + name + "L" + i +"R0\">"+ row + "</td>");
    document.write("<td id=\"" + name + "L" + i +"R1\">"+ "--" + "</td>");
    document.write("<td id=\"" + name + "L" + i +"R2\">"+ " " + "</td>");
    document.write("<td id=\"" + name + "L" + i +"R3\">"+ 0.00 + "</td>");
    document.write("<td id=\"" + name + "L" + i +"R4\">"+ 0.00 + "</td>");
    document.write("<td id=\"" + name + "L" + i +"R5\">"+ arr[i][1] + "</td>");
    document.write("<td id=\"" + name + "L" + i +"R6\">"+ arr[i][2] + "</td>");
    document.write("<td id=\"" + name + "L" + i +"R7\">"+ 0.00 + "</td>");
    document.write("<td id=\"" + name + "L" + i +"R8\">"+ arr[i][4] + "</td>");
    document.write("<td id=\"" + name + "L" + i +"R9\">"+ 0.00 + "</td>");
    document.write("</tr>");
  }
  document.write("</table>");
}


//跟新表格中的行情数据
function tableMake(arr, data, name) {
  var length = arr.length;
  var id, changeNode, priceNode, totalChangeNode;
  
  //显示行情更新时间
  document.getElementById("stockTime").innerHTML ="网页版行情" + "(" + data[hqArr[0][0]]["update"] + ")";
  
  for(var i=0;i<length;i++) {
    //跟新相应格子中的数据
    id = hqArr[i][0];
    document.getElementById(name +"L" + i + "R1").innerHTML = "<a href=\"http:\/\/quotes.money.163.com\/" + id +".html\" target=\"_blank\">" + data[id]["symbol"] + "</a>"; 
    document.getElementById(name +"L" + i + "R2").innerHTML = data[id]["name"]; 
    document.getElementById(name +"L" + i + "R3").innerHTML = (data[id]["percent"] * 100).toFixed(2); 
    document.getElementById(name +"L" + i + "R4").innerHTML = (data[id]["price"]).toFixed(2); 
    document.getElementById(name +"L" + i + "R7").innerHTML = (((data[id]["price"] - hqArr[i][3]) / hqArr[i][3]) * 100).toFixed(2);
    document.getElementById(name +"L" + i + "R9").innerHTML = (((hqArr[i][4] - data[id]["price"]) / data[id]["price"]) * 100).toFixed(2);

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

    totalChangeNode = document.getElementById(name + "L" + i +"R7");
    if (totalChangeNode.innerHTML >= 0) {
      totalChangeNode.style.color = "red";
    }
    else {
      totalChangeNode.style.color = "green";
    }
  
  }

}


//根据json数据更新股票行情,其中使用到了全局数组hqArr
function stockArrayMake(data) {
  
  tableMake(hqArr, data, "gdzq");  

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


//根据json数据更新指数行情,其中使用到了全局数组indexArr
function indexArrayMake(data) {
  
  indexMake(indexArr, data, "index");  

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
