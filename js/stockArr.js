/*
  从2014年7月开始恢复股票池的发布。
*/

var historyArr = new Array (
/*  达成日期     股票代码  股票名称  初始价格  目标价格  达成价  累计涨幅%  行业分类   关注日期     总计天数  */
  ["2015-04-08", "300113", "顺网科技", "39.81", "50.00", "55.74", "40.02", "计算机", "2015-04-01", "8"],
  ["2015-04-08", "300074", "华平股份", "21.37", "30.00", "30.15", "41.09", "通信行业", "2015-03-23", "17"],
  ["2015-04-08", "000001", "平安银行", "14.99", "17.00", "17.92", "19.55", "银行业", "2015-03-16", "24"],
  ["2015-04-08", "600809", "山西汾酒", "21.45", "22.50", "23.29", "8.58", "食品饮料", "2015-01-30", "69"],
  ["2015-04-08", "600309", "万华化学", "16.08", "24.50", "24.67", "53.42", "化工", "2014-08-27", "225"],
  ["2015-04-08", "600401", "海润光伏", "9.79", "11.00", "13.09", "33.71", "造纸印刷", "2014-08-27", "225"],
  ["2015-04-08", "600585", "海螺水泥", "17.59", "23.80", "23.89", "35.82", "建材", "2014-08-25", "227"],
  ["2015-04-08", "002317", "众生药业", "21.48", "25.50", "28.99", "34.96", "医药生物", "2014-08-06", "246"],
  ["2015-04-08", "002565", "上海绿新", "8.64", "10.60", "11.07", "28.12", "造纸印刷", "2014-07-07", "276"],
  ["2015-04-03", "000877", "天山股份", "10.63", "12.50", "13.00", "22.30", "建材", "2015-03-23", "15"],
  ["2015-04-03", "002563", "森马服饰", "43.45", "51.50", "52.79", "21.50", "纺织服装", "2015-03-23", "15"],
  ["2015-04-03", "002071", "长城影视", "20.96", "25.00", "25.18", "20.13", "造纸印刷", "2015-03-16", "22"],
  ["2015-04-03", "002539", "新都化工", "24.97", "28.00", "31.48", "26.07", "基础化工", "2015-03-16", "22"],
  ["2015-04-03", "002631", "德尔家居", "19.73", "29.40", "35.30", "78.92", "家居用品", "2015-03-09", "29"],
  ["2015-04-03", "002372", "伟星新材", "16.62", "21.06", "21.27", "27.98", "基础化工", "2015-02-10", "56"],
  ["2015-04-03", "002537", "海立美达", "21.66", "32.70", "33.06", "52.63", "机械行业", "2015-02-10", "56"],
  ["2015-04-03", "300100", "双林股份", "13.52", "18.00", "19.90", "47.19", "汽车 ", "2015-01-29", "68"],
  ["2015-04-03", "600277", "亿利能源", "9.07", "11.50", "11.95", "31.75", "化工", "2015-01-26", "71"],
  ["2015-04-03", "002085", "万丰奥威", "32.97", "45.00", "49.23", "49.32", "汽车", "2015-01-26", "71"],
  ["2015-04-03", "600335", "国机汽车", "20.59", "26.00", "27.36", "32.88", "机械行业", "2015-01-13", "84"],
  ["2015-04-03", "000670", "盈方微", "10.87", "14.30", "14.65", "34.77", "制造业", "2014-12-30", "98"],
  ["2015-04-03", "600211", "西藏药业", "35.30", "43.07", "43.86", "24.25", "医药生物", "2014-12-22", "106"],
  ["2015-04-03", "002416", "爱施德", "13.69", "18.40", "19.95", "45.73", "批发零售", "2014-12-16", "112"],
  ["2015-04-03", "300064", "豫金刚石", "7.05", "9.60", "11.61", "64.68", "机械行业", "2014-12-01", "127"],
  ["2015-04-03", "002453", "天马精化", "7.74", "9.00", "10.17", "31.40", "化工", "2014-11-18", "140"],
  ["2015-04-03", "002185", "华天科技", "14.32", "17.90", "18.98", "32.54", "电子行业", "2014-11-18", "140"],
  ["2015-04-03", "002331", "皖通科技", "15.95", "20.00", "20.27", "27.08", "计算机", "2014-10-31", "158"],
  ["2015-04-03", "002595", "豪迈科技", "28.37", "40.00", "50.30", "77.30", "机械行业", "2014-10-08", "181"],
  ["2015-04-03", "002412", "汉森制药", "18.41", "20.65", "21.41", "16.30", "医药生物", "2014-09-22", "197"],
  ["2015-04-03", "000882", "华联股份", "3.30", "4.68", "4.92", "49.09", "房地产", "2014-08-27", "223"],
  ["2015-03-26", "000599", "青岛双星", "8.64", "12.00", "12.51", "44.79", "基础化工", "2015-03-23", "4"],
  ["2015-03-26", "600588", "用友网络", "37.00", "43.00", "48.37", "30.73", "计算机", "2015-01-30", "56"],
  ["2015-03-26", "000798", "中水渔业", "10.04", "13.00", "13.32", "32.67", "农林牧渔", "2014-11-18", "129"],
  ["2015-03-26", "002041", "登海种业", "31.68", "38.15", "39.31", "24.08", "农林牧渔", "2014-08-21", "218"],
  ["2015-03-26", "002683", "宏大爆破", "24.68", "35.00", "35.68", "44.57", "化工", "2014-07-24", "246"],
  ["2015-03-23", "300295", "三六五网", "140.60", "175.00", "183.92", "30.81", "互联网", "2015-03-16", "8"],
  ["2015-03-23", "002392", "北京利尔", "13.66", "16.20", "16.21", "18.67", "钢铁行业", "2015-03-04", "20"],
  ["2015-03-23", "002462", "嘉事堂", "35.36", "41.00", "42.50", "20.19", "医药生物", "2015-02-12", "40"],
  ["2015-03-23", "002641", "永高股份", "10.69", "13.50", "15.80", "47.80", "制造业", "2015-02-10", "42"],
  ["2015-03-23", "002324", "普利特", "25.41", "30.00", "31.50", "23.97", "化工", "2015-01-30", "53"],
  ["2015-03-23", "600426", "华鲁恒升", "11.03", "12.00", "12.30", "11.51", "化工", "2015-01-28", "55"],
  ["2015-03-23", "002727", "一心堂", "47.73", "57.00", "58.75", "23.09", "批发零售", "2014-11-04", "140"],
  ["2015-03-23", "002437", "誉衡药业", "25.96", "31.60", "31.97", "23.15", "医药生物", "2014-10-20", "155"],
  ["2015-03-23", "300066", "三川股份", "15.59", "19.00", "20.55", "31.82", "机械行业", "2014-10-15", "160"],
  ["2015-03-23", "600584", "长电科技", "11.40", "16.00", "16.54", "45.09", "电子行业", "2014-09-30", "175"],
  ["2015-03-23", "002536", "西泵股份", "25.82", "30.00", "31.80", "23.16", "汽车", "2014-09-26", "179"],
  ["2015-03-23", "600256", "广汇能源", "8.98", "9.50", "9.55", "6.35", "基础化工", "2014-08-29", "207"],
  ["2015-03-23", "000915", "山大华特", "26.46", "35.00", "36.78", "39.00", "医药生物", "2014-07-25", "242"],
  ["2015-03-19", "002325", "洪涛股份", "12.60", "17.50", "18.46", "46.51", "建筑工程", "2015-03-16", "4"],
  ["2015-03-19", "002135", "东南网架", "6.52", "9.00", "9.06", "38.96", "建筑工程", "2015-02-25", "23"],
  ["2015-03-19", "002178", "延华智能", "18.80", "24.20", "24.94", "32.66", "计算机", "2015-02-12", "36"],
  ["2015-03-19", "300136", "信维通信", "20.47", "25.50", "27.15", "32.63", "通信行业", "2014-12-22", "88"],
  ["2015-03-19", "600500", "中化国际", "9.58", "11.00", "11.09", "15.76", "化工", "2014-12-16", "94"],
  ["2015-03-19", "000599", "青岛双星", "6.71", "7.50", "8.20", "22.21", "化工", "2014-10-31", "140"],
  ["2015-03-19", "300074", "华平股份", "17.00", "20.50", "21.37", "25.71", "通信行业", "2014-07-14", "249"],
  ["2015-03-17", "002405", "四维图新", "29.38", "32.37", "32.74", "11.44", "计算机", "2015-03-04", "14"],
  ["2015-03-17", "600970", "中材国际", "11.29", "14.50", "14.52", "28.61", "建筑工程", "2015-02-12", "34"],
  ["2015-03-17", "002098", "浔兴股份", "18.62", "21.00", "22.20", "19.23", "纺织服装", "2015-01-26", "51"],
  ["2015-03-17", "300199", "翰宇药业", "32.90", "39.00", "39.80", "20.97", "医药生物", "2014-12-15", "93"],
  ["2015-03-17", "002254", "泰和新材", "11.63", "13.50", "14.03", "20.64", "化工", "2014-10-31", "138"],
  ["2015-03-17", "300326", "凯利泰", "31.22", "36.75", "37.69", "20.72", "制造业", "2014-08-27", "203"],
  ["2015-03-17", "000568", "泸州老窖", "18.90", "21.70", "22.61", "19.63", "食品饮料", "2014-08-08", "222"],
  ["2015-03-16", "300075", "数字政通", "45.41", "53.00", "54.30", "19.58", "计算机", "2015-03-04", "13"],
  ["2015-03-16", "300253", "卫宁软件", "99.79", "120.00", "127.56", "27.83", "软件服务", "2015-01-28", "48"],
  ["2015-03-16", "002470", "金正大", "29.54", "37.80", "38.48", "30.26", "化工", "2014-12-15", "92"],
  ["2015-03-16", "002073", "软控股份", "13.32", "16.00", "16.09", "20.80", "计算机", "2014-10-31", "137"],
  ["2015-03-16", "002038", "双鹭药业", "41.28", "50.50", "50.78", "23.01", "医药生物", "2014-08-21", "208"],
  ["2015-03-16", "002597", "金禾实业", "15.70", "18.00", "18.81", "19.81", "食品饮料", "2014-08-20", "209"],
  ["2015-03-13", "300135", "宝利沥青", "11.25", "13.00", "13.03", "15.82", "石油化工", "2015-01-30", "43"],
  ["2015-03-13", "002154", "报 喜 鸟", "10.91", "12.60", "13.21", "21.08", "纺织服装", "2015-01-28", "45"],
  ["2015-03-13", "002553", "南方轴承", "11.80", "18.00", "18.94", "60.51", "汽车", "2015-01-13", "60"],
  ["2015-03-13", "002619", "巨龙管业", "23.07", "28.80", "29.35", "27.22", "制造业", "2014-09-22", "173"],
  ["2015-03-13", "002327", "富安娜", "13.08", "16.80", "17.01", "30.05", "纺织服装", "2014-08-21", "205"],
  ["2015-03-11", "002503", "搜于特", "23.30", "25.60", "25.63", "10.00", "纺织服装", "2015-03-11", "1"],
  ["2015-03-11", "002329", "皇氏集团", "26.40", "30.80", "31.71", "20.11", "食品饮料", "2015-02-04", "36"],
  ["2015-03-11", "002559", "亚威股份", "19.22", "24.00", "24.09", "25.34", "机械行业", "2014-08-20", "204"],
  ["2015-03-10", "600601", "方正科技", "5.41", "6.40", "6.43", "18.85", "计算机", "2014-11-04", "127"],
  ["2015-03-10", "000789", "万年青", "9.93", "13.50", "13.77", "38.67", "建材", "2014-09-03", "189"],
  ["2015-03-10", "601098", "中南传媒", "14.38", "20.00", "20.28", "41.03", "传播文化", "2014-08-29", "194"],
  ["2015-03-10", "002104", "恒宝股份", "12.98", "17.20", "17.73", "36.59", "电子行业", "2014-08-27", "196"],
  ["2015-03-10", "002603", "以岭药业", "31.47", "33.95", "34.09", "8.33", "医药生物", "2014-08-27", "196"],
  ["2015-03-10", "300113", "顺网科技", "27.43", "32.00", "34.21", "24.72", "计算机", "2014-08-21", "202"],
  ["2015-03-10", "600826", "兰生股份", "18.63", "25.00", "25.21", "35.32", "批发零售", "2014-08-19", "204"],
  ["2015-03-06", "002516", "江苏旷达", "21.02", "24.75", "25.17", "19.74", "纺织服装", "2014-11-19", "108"],
  ["2015-03-05", "002397", "梦洁家纺", "9.73", "11.20", "11.69", "20.14", "纺织服装", "2015-01-19", "46"],
  ["2015-03-05", "002465", "海格通信", "20.49", "24.00", "24.26", "18.40", "通信行业", "2015-01-13", "52"],
  ["2015-03-05", "300262", "巴安水务", "20.30", "27.60", "27.74", "36.65", "建筑业", "2014-12-25", "71"],
  ["2015-03-05", "300167", "迪威视讯", "16.53", "18.00", "18.60", "12.52", "通信行业", "2014-09-22", "165"],
  ["2015-03-05", "000876", "新 希 望", "13.96", "19.11", "19.48", "39.54", "农林牧渔", "2014-08-29", "189"],
  ["2015-03-05", "002410", "广联达", "26.44", "31.85", "32.31", "22.20", "计算机", "2014-07-01", "248"],
  ["2015-03-04", "300179", "四方达", "13.13", "15.95", "17.13", "30.46", "基础化工", "2015-02-10", "23"],
  ["2015-03-04", "300310", "宜通世纪", "17.41", "20.00", "20.43", "17.35", "通信设备", "2015-02-04", "29"],
  ["2015-03-04", "002612", "朗姿股份", "27.46", "30.40", "31.83", "15.91", "制造业", "2015-01-29", "35"],
  ["2015-03-04", "600446", "金证股份", "72.05", "85.00", "86.83", "20.51", "计算机", "2015-01-29", "35"],
  ["2015-03-04", "002030", "达安基因", "24.80", "28.00", "35.83", "44.48", "医药生物", "2015-01-26", "38"],
  ["2015-03-04", "000807", "云铝股份", "5.86", "7.21", "7.91", "34.98", "有色金属", "2015-01-19", "45"],
  ["2015-03-04", "000960", "锡业股份", "17.35", "20.00", "20.49", "18.10", "有色金属", "2015-01-13", "51"],
  ["2015-03-04", "002605", "姚记扑克", "17.13", "22.00", "23.08", "34.73", "其他行业", "2015-01-13", "51"],
  ["2015-03-04", "300291", "华录百纳", "32.60", "46.55", "48.28", "48.10", "传播文化", "2014-12-25", "70"],
  ["2015-03-04", "300166", "东方国信", "31.70", "38.50", "43.25", "36.44", "计算机", "2014-12-16", "79"],
  ["2015-03-04", "300289", "利德曼", "31.51", "37.60", "37.89", "20.25", "制造业", "2014-12-15", "80"],
  ["2015-03-04", "300212", "易华录", "32.71", "44.00", "48.94", "49.62", "计算机", "2014-12-15", "80"],
  ["2015-03-04", "002215", "诺 普 信", "10.24", "13.00", "13.20", "28.91", "化工", "2014-10-31", "125"],
  ["2015-03-04", "600240", "华业地产", "7.19", "10.50", "11.14", "54.94", "房地产", "2014-10-31", "125"],
  ["2015-03-04", "002572", "索菲亚", "24.04", "27.00", "28.80", "19.80", "造纸印刷", "2014-10-31", "125"],
  ["2015-03-04", "600398", "海澜之家", "10.83", "13.60", "13.66", "26.13", "纺织服装", "2014-10-27", "129"],
  ["2015-03-04", "002658", "雪迪龙", "25.64", "31.20", "39.99", "55.97", "制造业", "2014-10-24", "132"],
  ["2015-03-04", "300298", "三诺生物", "43.90", "44.48", "45.00", "2.51", "医药生物", "2014-09-22", "164"],
  ["2015-03-04", "300020", "银江股份", "27.90", "38.00", "42.50", "52.33", "计算机", "2014-08-12", "205"],
  ["2015-03-04", "600305", "恒顺醋业", "16.40", "19.50", "19.87", "21.16", "食品饮料", "2014-08-12", "205"],
  ["2015-03-04", "600323", "瀚蓝环境", "12.72", "16.25", "16.53", "29.95", "水电燃气", "2014-08-12", "205"],
  ["2015-03-04", "002396", "星网锐捷", "26.98", "31.50", "33.90", "25.65", "通信行业", "2014-08-11", "206"],
  ["2015-03-04", "002340", "格林美", "12.79", "16.45", "17.24", "34.79", "电力设备", "2014-08-11", "206"],
  ["2015-03-04", "002303", "美盈森", "13.10", "18.30", "21.79", "66.34", "造纸印刷", "2014-07-29", "219"],
  ["2015-03-04", "300003", "乐普医疗", "19.84", "29.00", "30.30", "52.72", "医药生物", "2014-07-23", "225"],
  ["2015-03-04", "002672", "东江环保", "26.20", "38.00", "42.99", "64.08", "环保", "2014-07-22", "226"],
  ["2015-03-04", "002281", "光迅科技", "33.09", "42.00", "42.89", "29.62", "通信行业", "2014-07-17", "231"],
  ["2015-03-04", "300299", "富春通信", "12.60", "16.00", "16.23", "28.81", "通信行业", "2014-07-15", "233"],
  ["2015-03-04", "002444", "巨星科技", "10.55", "14.00", "14.50", "37.44", "机械行业", "2014-07-10", "238"],
  ["2015-02-26", "002631", "德尔家居", "8.95",  "13.20", "16.82", "87.93", "家居用品", "2014-07-09", "233"],
  ["2015-02-26", "002364", "中恒电气", "21.89", "22.50", "26.25", "19.92", "电力设备", "2014-10-31", "119"],
  ["2015-02-26", "300315", "掌趣科技", "15.83", "20.00", "22.35", "41.19", "软件服务", "2014-08-25", "186"],
  ["2015-02-26", "002555", "顺荣三七", "45.90", "54.00", "59.00", "28.54", "汽车",     "2014-12-15", "74"],
  ["2015-02-26", "002108", "沧州明珠", "18.48", "20.00", "21.61", "16.94", "化工",     "2014-08-14", "197"],
  ["2015-02-26", "002601", "佰利联",   "22.08", "25.50", "26.99", "22.24", "化工",     "2014-08-21", "190"],
  ["2015-02-26", "002325", "洪涛股份", "8.68",  "12.00", "12.60", "45.16", "建筑",     "2014-07-16", "226"],
  ["2015-02-26", "600518", "康美药业", "14.47", "20.80", "21.74", "50.24", "医药生物", "2014-08-28", "183"],
  ["2015-02-05", "300170", "汉得信息", "13.52", "16.00", "20.64", "52.66", "计算机",   "2014-08-25", "165"],
  ["2015-02-05", "300271", "华宇软件", "47.25", "50.75", "55.45", "17.35", "软件服务", "2015-01-19", "18"],
  ["2015-02-05", "300312", "邦讯技术", "19.50", "26.00", "28.01", "43.64", "软件服务", "2014-08-18", "172"],
  ["2015-02-05", "300010", "立思辰",   "25.54", "26.86", "28.27", "10.69", "计算机",   "2015-02-04", "2"],
  ["2015-02-05", "300295", "三六五网", "86.80", "125.00","129.98","49.75", "信息技术", "2014-12-30", "38"],
  ["2015-02-05", "002304", "洋河股份", "63.65", "81.80", "82.48", "29.58", "食品饮料", "2014-09-30", "129"],
  ["2015-01-28", "002539", "新都化工", "15.90", "18.00", "20.95", "31.76", "化工",     "2014-10-28", "93"],
  ["2015-01-28", "002385", "大北农",   "13.69", "15.90", "17.74", "29.58", "农林牧渔", "2014-08-27", "155"],
  ["2015-01-28", "300005", "探路者",   "18.20", "21.60", "23.41", "28.63", "纺织服装", "2014-12-15", "45"],
  ["2015-01-28", "601801", "皖新传媒", "17.22", "18.50", "19.93", "15.74", "传播文化", "2014-11-22", "68"],
  ["2015-01-28", "603555", "贵人鸟",   "22.41", "25.00", "26.05", "16.24", "纺织服装", "2015-01-26", "3"],
  ["2015-01-28", "002266", "浙富控股", "7.46",  "8.70",  "9.09",  "21.85", "电力设备", "2014-07-03", "210"],
  ["2015-01-28", "600079", "人福医药", "27.32", "29.25", "30.50", "11.64", "医药生物", "2014-08-18", "164"],
  ["2015-01-28", "000635", "英 力 特", "10.16", "12.00", "12.38", "21.85", "化工",     "2014-08-15", "167"],
  ["2015-01-28", "600438", "通威股份", "10.08", "10.60", "10.84", "7.54",  "农林牧渔", "2014-09-03", "148"],
  ["2015-01-28", "002223", "鱼跃医疗", "27.42", "30.00", "30.48", "11.16", "医药生物", "2014-08-04", "178"],
  ["2015-01-28", "002521", "齐峰新材", "9.88",  "12.60", "12.76", "29.15", "造纸印刷", "2014-08-11", "171"],
  ["2015-01-26", "002081", "金 螳 螂", "14.16", "20.00", "25.38", "79.88", "建筑",     "2014-07-01", "210"],
  ["2015-01-26", "300002", "神州泰岳", "15.44", "18.90", "22.50", "42.81", "通信行业", "2014-10-31", "88"],
  ["2015-01-26", "002095", "生 意 宝", "33.00", "45.00", "52.00", "57.58", "计算机",   "2014-12-15", "43"],
  ["2015-01-26", "002372", "伟星新材", "14.02", "16.20", "17.74", "26.53", "化工",     "2014-10-28", "91"],
  ["2015-01-26", "000063", "中兴通讯", "13.50", "18.40", "20.05", "48.52", "通信行业", "2014-07-16", "195"],
  ["2015-01-26", "300015", "爱尔眼科", "26.35", "30.50", "32.66", "23.95", "医药生物", "2014-08-15", "165"],
  ["2015-01-26", "600783", "鲁信创投", "26.82", "30.47", "32.57", "21.44", "制造业",   "2015-01-13", "14"]
);

var indexArr = new Array("0000001","1399001","1399006","1399300");

var hqArr = new Array(
/* 股票代码   所属行业     关注日期   前日收盘价   目标价    评级 */
  ["1300136", "通信行业", "2015-04-08", "31.35",  "42.00",  "买入"],
  ["1002029", "纺织服装", "2015-04-08", "15.26",  "18.00",  "买入"],
  ["1002595", "机械行业", "2015-04-08", "55.33",  "70.00",  "买入"],
  ["1000902", "纺织服装", "2015-04-08", "24.93",  "30.00",  "买入"],
  ["1002539", "基础化工", "2015-04-08", "30.90",  "35.00",  "买入"],
  ["1002610", "制造业",   "2015-04-08", "29.90",  "33.60",  "增持"],
  ["1002183", "制造业",   "2015-04-08", "37.32",  "47.20",  "买入"],
  ["1002086", "农林牧渔", "2015-04-01", "16.28",  "18.06",  "买入"],
  ["1000726", "纺织服装", "2015-04-01", "14.00",  "16.80",  "买入"],
  ["1002612", "制造业",   "2015-04-01", "40.81",  "47.00",  "买入"],
  ["0600096", "基础化工", "2015-04-01", "14.90",  "18.00",  "买入"],
  ["1002588", "基础化工", "2015-04-01", "50.03",  "63.00",  "买入"],
  ["0600438", "农林牧渔", "2015-04-01", "10.84",  "12.20",  "增持"],
  ["1002299", "农林牧渔", "2015-04-01", "17.94",  "20.72",  "增持"],
  ["1002340", "电力设备", "2015-04-01", "19.01",  "21.00",  "买入"],
  ["1002042", "纺织服装", "2015-04-01", "7.94",   "8.90",   "增持"],
  ["0600597", "食品饮料", "2015-04-01", "19.84",  "26.50",  "买入"],
  ["1000798", "农林牧渔", "2015-04-01", "13.20",  "15.90",  "买入"],
  ["0600965", "农林牧渔", "2015-04-01", "13.05",  "15.75",  "买入"],
  ["1000789", "建材",     "2015-04-01", "16.86",  "18.70",  "买入"],
  ["0600801", "建材",     "2015-04-01", "11.97",  "15.60",  "买入"],
  ["0601328", "银行业",   "2015-04-01", "6.39",   "7.00",   "增持"],
  ["0601398", "银行业",   "2015-04-01", "4.86",   "5.27",   "买入"],
  ["1300066", "机械行业", "2015-04-01", "23.05",  "27.60",  "买入"],
  ["0601607", "医药生物", "2015-04-01", "22.72",  "27.00",  "买入"],
  ["1300310", "制造业",   "2015-04-01", "29.99",  "35.00",  "增持"],
  ["1002604", "制造业",   "2015-03-26", "17.41",  "20.00",  "买入"],
  ["1002154", "纺织服装", "2015-03-26", "15.50",  "18.00",  "买入"],
  ["0600970", "建筑工程", "2015-03-26", "15.50",  "23.00",  "买入"],
  ["1002073", "计算机",   "2015-03-23", "17.30",  "20.90",  "买入"],
  ["1002215", "化工",     "2015-03-23", "15.99",  "19.00",  "买入"],
  ["1000608", "房地产",   "2015-03-23", "5.51",   "8.20",   "买入"],
  ["0600449", "建材",     "2015-03-23", "12.68",  "16.40",  "买入"],
  ["1002234", "农林牧渔", "2015-03-23", "13.00",  "15.00",  "增持"],
  ["0601588", "房地产",   "2015-03-23", "5.18",   "7.80",   "买入"],
  ["0600199", "食品饮料", "2015-03-23", "11.63",  "15.60",  "买入"],
  ["0600804", "传播文化", "2015-03-23", "31.74",  "35.40",  "买入"],
  ["1002329", "食品饮料", "2015-03-23", "30.75",  "38.50",  "买入"],
  ["1300358", "制造业",   "2015-03-23", "36.15",  "66.40",  "买入"],
  ["1002135", "建筑工程", "2015-03-23", "9.22",  "11.00",  "买入"],
  ["0600518", "医药生物", "2015-03-17", "29.76",  "40.00",  "买入"],
  ["0600153", "批发零售", "2015-03-16", "10.76",  "15.50",  "买入"],
  ["1002465", "通信行业", "2015-03-16", "23.58",  "30.00",  "买入"],
  ["0600141", "基础化工", "2015-03-11", "15.87",  "20.00",  "买入"],
  ["0600502", "建筑工程", "2015-02-25", "12.85",  "16.50",  "买入"],
  ["1002095", "计算机",   "2015-02-25", "89.70",  "95.00",  "买入"],
  ["1002318", "钢铁行业", "2015-02-04", "41.18",  "60.00",  "买入"],
  ["0600373", "传播文化", "2015-02-04", "14.66",  "21.50",  "买入"],
  ["1000619", "建筑工程", "2015-02-04", "9.75",   "13.00",  "买入"],
  ["0601633", "汽车",     "2015-01-28", "46.13",  "60.00",  "买入"],
  ["0600172", "机械行业", "2015-01-26", "8.36",   "12.24",  "买入"],
  ["1002250", "化工",     "2015-01-13", "15.90",  "22.00",  "买入"],
  ["0601933", "批发零售", "2015-01-13", "8.57",   "12.26",  "买入"],
  ["1000800", "汽车",     "2015-01-13", "17.40",  "22.00",  "买入"],
  ["0600761", "机械行业", "2015-01-13", "14.62",  "23.40",  "买入"]
);

