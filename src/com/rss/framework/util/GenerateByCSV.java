package com.rss.framework.util;

import java.io.*;
import java.sql.*;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class GenerateByCSV {
     Map<String,String> en_ch_map;
     Map<String,String> en_type;
     List<String> en_name;
     String head_en;//英文表名
     String head_ch;//中文表名
     Connection conn;
     Statement stmt;

    public GenerateByCSV(){
        this.en_ch_map = new HashMap<String, String>();
        this.en_type = new HashMap<String, String>();
        this.en_name = new ArrayList<String>();
        try {
            this.conn = DriverManager.getConnection("jdbc:sqlserver://152.136.52.249:1433;databaseName=IPM_dev;", "sa", "BGabc123456");
            this.stmt = conn.createStatement();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    public void createDatabaseByCSV(String csv_file){
        String create_sql = "";
        try {
            BufferedReader in = new BufferedReader(new InputStreamReader(new FileInputStream(csv_file),"UTF-8"));
            int row_no = 0;
            String head = in.readLine();
            head_ch = head.split("/")[0];
            head_en = head.split("/")[1].split(";")[0].toUpperCase();
            create_sql += "CREATE TABLE "+head_en+"("+head_en+"UID"+" VARCHAR(32) primary key";
            String clomuns = in.readLine();
            String col = null;
            while((col = in.readLine())!= null){
                String chineseCol = col.split(";")[0];
                String englishCol = col.split(";")[1];
                String type = col.split(";")[2];
                en_ch_map.put(englishCol,chineseCol);
                en_name.add(englishCol);
                en_type.put(englishCol,type);
                create_sql+=","+englishCol+" "+ type;
            }
            create_sql +=")";
            System.out.println(create_sql);
            ResultSet rs = stmt.executeQuery(create_sql);
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
    public void createHtml(){
        BufferedWriter out = null;
        try {
            String dir  = new File(".").getCanonicalPath();
            out = new BufferedWriter(new OutputStreamWriter(new FileOutputStream(dir+"\\web\\"+head_en+".jsp"),"UTF-8"));
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
        try {
            out.write("<%@ page language=\"java\" contentType=\"text/html; charset=UTF-8\" pageEncoding=\"UTF-8\" %>\n" +
                    "<%@page import=\"com.rss.framework.business.*\" %>\n" +
                    "<%@page import=\"java.util.*\" %>\n" +
                    "\n" +
                    "<!DOCTYPE html PUBLIC \"-//W3C//DTD HTML 4.01 Transitional//EN\" \"http://www.w3.org/TR/html4/loose.dtd\">\n" +
                    "<html>\n" +
                    "<head>\n" +
                    "    <meta http-equiv=\"Content-Type\" content=\"text/html; charset=UTF-8\">\n" +
                    "    <meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\">\n" +
                    "    <title>"+head_ch+"</title>\n" +
                    "    <meta name=\"description\" content=\"这是一个 index 页面\">\n" +
                    "    <meta name=\"keywords\" content=\"index\">\n" +
                    "    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no\">\n" +
                    "    <meta name=\"renderer\" content=\"webkit\">\n" +
                    "    <meta http-equiv=\"Cache-Control\" content=\"no-siteapp\"/>\n" +
                    "    <link rel=\"icon\" type=\"image/png\" href=\"assets/i/favicon.png\">\n" +
                    "    <link rel=\"apple-touch-icon-precomposed\" href=\"assets/i/app-icon72x72@2x.png\">\n" +
                    "    <meta name=\"apple-mobile-web-app-title\" content=\"Amaze UI\"/>\n" +
                    "    <link rel=\"stylesheet\" href=\"assets/css/amazeui.min.css\"/>\n" +
                    "    <link rel=\"stylesheet\" href=\"assets/css/admin.css\">\n" +
                    "    <link rel=\"stylesheet\" href=\"IC_css/Communal.css\">\n" +
                    "    <script src=\"assets/js/jquery.min.js\"></script>\n" +
                    "    <script src=\"assets/js/app.js\"></script>\n" +
                    "    <script src=\"IC_js/NagivationBar.js\"></script>\n" +
                    "\n" +
                    "    <!--[if lt IE 9]>\n" +
                    "    <script src=\"http://libs.baidu.com/jquery/1.11.1/jquery.min.js\"></script>\n" +
                    "    <script src=\"http://cdn.staticfile.org/modernizr/2.8.3/modernizr.js\"></script>\n" +
                    "    <script src=\"assets/js/polyfill/rem.min.js\"></script>\n" +
                    "    <script src=\"assets/js/polyfill/respond.min.js\"></script>\n" +
                    "    <script src=\"assets/js/amazeui.legacy.js\"></script>\n" +
                    "    <![endif]-->\n" +
                    "\n" +
                    "    <!--[if (gte IE 9)|!(IE)]><!-->\n" +
                    "    <script src=\"assets/js/amazeui.min.js\"></script>\n" +
                    "    <!--<![endif]-->\n" +
                    "\n" +
                    "\n" +
                    "    <script src=\"IC_js/Communal.js\"></script>\n" +
                    "    <script type=\"text/javascript\" src=\"IC_js/"+head_en+".js\"></script>\n" +
                    "\n" +
                    "</head>\n" +
                    "<!--[if lte IE 9]><p class=\"browsehappy\">升级你的浏览器吧！ <a href=\"http://se.360.cn/\" target=\"_blank\">升级浏览器</a>以获得更好的体验！</p>\n" +
                    "<![endif]-->\n");

            out.write("\n" +
                    "\n" +
                    "<body id=\"is_body\">\n" +
                    "<%int pageNo = 0, totalPages = 0, pageSize = 0, totalRecords = 0;%>\n" +
                    "<%@include file=\"TopBar.jsp\" %>\n" +
                    "\n" +
                    "<div class=\"am-cf admin-main\">\n" +
                    "    <%@include file=\"NagivationBar.jsp\" %>\n" +
                    "    <div class=\" admin-content\">\n" +
                    "        <div class=\"daohang\">\n" +
                    "            <ul>\n" +
                    "                <li>\n" +
                    "                    <button type=\"button\" class=\"am-btn am-btn-default am-radius am-btn-xs\"> 首页</button>\n" +
                    "                </li>\n" +
                    "                <li>\n" +
                    "                    <button type=\"button\" class=\"am-btn am-btn-default am-radius am-btn-xs\">商品管理<a\n" +
                    "                            href=\"javascript: void(0)\" class=\"am-close am-close-spin\" data-am-modal-close=\"\">×</a>\n" +
                    "                    </button>\n" +
                    "                </li>\n" +
                    "                <li>\n" +
                    "                    <button type=\"button\" class=\"am-btn am-btn-default am-radius am-btn-xs\">订单管理<a\n" +
                    "                            href=\"javascript: void(0)\" class=\"am-close am-close-spin\" data-am-modal-close=\"\">×</a>\n" +
                    "                    </button>\n" +
                    "                </li>\n" +
                    "                <li>\n" +
                    "                    <button type=\"button\" class=\"am-btn am-btn-default am-radius am-btn-xs\">实时监控<a\n" +
                    "                            href=\"javascript: void(0)\" class=\"am-close am-close-spin\" data-am-modal-close=\"\">×</a>\n" +
                    "                    </button>\n" +
                    "                </li>\n" +
                    "            </ul>\n" +
                    "        </div>\n");

            out.write("\n" +
                    "        <div class=\"admin-biaogelist\">\n" +
                    "            <div class=\"listbiaoti am-cf\">\n" +
                    "                <ul class=\"am-icon-flag on\">"+head_ch+"</ul>\n" +
                    "                <dl class=\"am-icon-home\" style=\"float: right;\"> 当前位置： 首页 > <a href=\"#\">商品列表</a></dl>\n" +
                    "            </div>\n" +
                    "\n" +
                    "            <div id=\"search_block\" class=\"am-btn-toolbars am-btn-toolbar is-search-bar\">\n" +
                    "                <ul>\n" +
                    "                    <li>\n" +
                    "                        <select id=\"deptType_select\"\n" +
                    "                                data-am-selected=\"{btnWidth: 120, btnSize: 'sm', btnStyle: 'default'}\">\n" +
                    "                            <optgroup label=\"部门类型选择\">\n" +
                    "                                <option value=\"\">全部类型</option>\n" +
                    "                                <%\n" +
                    "                                    if (request.getSession().getAttribute(\"prepareResponse\") != null) {\n" +
                    "                                        String message = request.getSession().getAttribute(\"prepareResponse\").toString();\n" +
                    "\n" +
                    "                                        ArrayList<BusinessObjectEntity> entityList = JavaBeanAdapter.getBusinessObjectListFromMessage(message);\n" +
                    "                                %>\n" +
                    "                                <%\n" +
                    "                                    for (int index = 0; index < entityList.size(); index++) {\n" +
                    "                                        BusinessObjectEntity entity = entityList.get(index);\n" +
                    "\n" +
                    "                                %>\n" +
                    "                                <option value=\"<%=entity.getAttributeValue(\"paramValues\") %>\"><%=entity.getAttributeValue(\"paramValues\") %>\n" +
                    "                                </option>\n" +
                    "                                <%\n" +
                    "                                        }\n" +
                    "                                    }\n" +
                    "                                %>\n" +
                    "\n" +
                    "                            </optgroup>\n" +
                    "                        </select>\n" +
                    "                    </li>\n" +
                    "\n" +
                    "                    <li>\n" +
                    "                        <span class=\"is-input-title\">部门名称:</span>\n" +
                    "                        <input id=\"deptName_input\" type=\"text\" class=\"am-input-sm is-search-input\" placeholder=\"部门搜索\">\n" +
                    "                    </li>\n" +
                    "\n" +
                    "                    <li>\n" +
                    "                        <button class=\"am-btn am-btn-xs am-radius  am-btn-success\" id=\"dept_list_search\">查询</button>\n" +
                    "                        <button class=\"am-btn am-btn-xs am-radius  am-btn-success\">打印</button>\n" +
                    "                    </li>\n" +
                    "\n" +
                    "                </ul>\n" +
                    "            </div>\n");

            out.write("\n" +
                    "            <form class=\"am-form am-g\">\n" +
                    "                <table id=\"data_table\" width=\"100%\"\n" +
                    "                       class=\"is-info-table am-table am-table-bordered am-table-radius am-table-striped\">\n" +
                    "                    <thead>\n" +
                    "                    <tr class=\"am-success\">\n" +
                    "                        <th class=\"table-check\"><input type=\"checkbox\" id=\"check-all\"/></th>\n" +
                    "                        <th class=\"table-title\" >编号</th>\n" +
                    "                        <th class=\"table-id am-text-center\" hidden=\"hidden\">UID</th>\n");
            for(String col_en:en_name){
                out.write("                        <th class=\"table-title\">"+en_ch_map.get(col_en)+"</th>\n");
            }
            out.write("                    </tr>\n" +
                    "                    </thead>\n" +
                    "                    <tbody>\n" +
                    "                    <tr hidden=\"true\">\n" +
                    "                        <td><input type=\"checkbox\" id=\"hidden_check\"/></td>\n" +
                    "                        <td contenteditable=\"true\"></td>\n" +
                    "                        <td class=\"am-text-center\" hidden=\"hidden\"></td>\n");
            for(String col_en:en_name){
                out.write("                        <td contenteditable=\"true\"></td>\n");
            }
            out.write("                    </tr>\n" +
                    "\n" +
                    "\n" +
                    "                    <%\n" +
                    "                        if (request.getAttribute(\"serviceResponse\") != null && !request.getAttribute(\"serviceResponse\").equals(\"<error>没有记录！</error>\")) {\n" +
                    "                            String message = request.getAttribute(\"serviceResponse\").toString();\n" +
                    "                            ArrayList<BusinessObjectEntity> entityList = JavaBeanAdapter.getBusinessObjectListFromMessage(message);\n" +
                    "                    %>\n" +
                    "                    <%\n" +
                    "                        for (int index = 0; index < entityList.size(); index++) {\n" +
                    "                            BusinessObjectEntity entity = entityList.get(index);\n" +
                    "                            if (index == 0) {\n" +
                    "                                System.out.println(\"页数设置\");\n" +
                    "                                pageNo = Integer.parseInt(entity.getPageNo());\n" +
                    "                                System.out.println(\"pageNo:\" + pageNo);\n" +
                    "                                totalPages = Integer.parseInt(entity.getTotalPages());\n" +
                    "                                System.out.println(\"totalPages:\" + entity.getTotalPages());\n" +
                    "                                totalRecords = Integer.parseInt(entity.getTotalRecords());\n" +
                    "                                System.out.println(\"totalRecords:\" + totalRecords);\n" +
                    "                                pageSize = Integer.parseInt(entity.getPageSize());\n" +
                    "                                System.out.println(\"pageSize:\" + pageSize);\n" +
                    "                            }\n" +
                    "                    %>\n" +
                    "                    <tr>\n" +
                    "                        <td><input type=\"checkbox\"/></td>\n" +
                    "                        <td class=\"am-text-center\">14</td>\n");
            out.write("                        <td contenteditable=\"true\" hidden=\"hidden\"><%=entity.getAttributeValue(\""+head_en+"UID\") %>\n" +
                    "                        </td>\n");
            for(String col_en:en_name){
                out.write("                        <td contenteditable=\"true\"><%=entity.getAttributeValue(\""+col_en+"\")!=null ?entity.getAttributeValue(\""+col_en+"\"):\"\"%>\n" +
                        "                        </td>\n");
            }
            out.write("                    </tr>\n" +
                    "                    <%\n" +
                    "                            }\n" +
                    "                        }\n" +
                    "                    %>\n" +
                    "\n" +
                    "\n" +
                    "                    </tbody>\n" +
                    "                </table>\n" +
                    "\n" +
                    "                <div class=\"am-btn-group am-btn-group-xs\">\n" +
                    "                    <button id=\"button-delete\" type=\"button\" class=\"am-btn am-btn-default\"><span\n" +
                    "                            class=\"am-icon-trash\"></span> 删除\n" +
                    "                    </button>\n" +
                    "                    <button id=\"button-add\" type=\"button\" class=\"am-btn am-btn-default\"><span\n" +
                    "                            class=\"am-icon-plus\"></span> 新增\n" +
                    "                    </button>\n" +
                    "                    <button id=\"button-modify\" type=\"button\" class=\"am-btn am-btn-default a\"><span\n" +
                    "                            class=\"am-icon-pencil-square-o\"></span>修改</button>\n" +
                    "                </div>\n" +
                    "\n" +
                    "                <ul id=\"is_page_count\" class=\"am-pagination am-fr\">\n" +
                    "                    <%\n" +
                    "                        int pageOfpage = 0;\n" +
                    "                        if (pageNo % 5 == 0) {\n" +
                    "                            pageOfpage = pageNo / 5;\n" +
                    "                        } else {\n" +
                    "                            pageOfpage = pageNo / 5 + 1;\n" +
                    "                        }\n" +
                    "\n" +
                    "                        if (pageOfpage > 1) {\n" +
                    "                    %>\n" +
                    "                    <li><a href=\"javascript:search(<%=(pageOfpage-1)*5%>)\">«</a></li>\n" +
                    "                    <%\n" +
                    "                    } else {\n" +
                    "                    %>\n" +
                    "                    <li class=\"am-disabled\"><a href=\"#\">«</a></li>\n" +
                    "                    <%\n" +
                    "                        }\n" +
                    "\n" +
                    "                        for (int i = (((pageOfpage - 1) * 5) + 1); i <= ((pageOfpage - 1) * 5 + 5); i++) {\n" +
                    "                            if (i <= totalPages) {\n" +
                    "                                if (i == pageNo) {\n" +
                    "                    %>\n" +
                    "                    <li class=\"am-active\"><a href=\"javascript:search(<%=i %>)\"><%=i %>\n" +
                    "                    </a></li>\n" +
                    "                    <%\n" +
                    "                    } else {\n" +
                    "                    %>\n" +
                    "                    <li><a href=\"javascript:search(<%=i%>)\"><%=i %>\n" +
                    "                    </a></li>\n" +
                    "                    <%\n" +
                    "                                }\n" +
                    "                            }\n" +
                    "                        }\n" +
                    "\n" +
                    "                        if ((pageOfpage) * 5 < totalPages) {\n" +
                    "                    %>\n" +
                    "                    <li><a href=\"javascript:search(<%=pageOfpage*5+1%>)\">»</a></li>\n" +
                    "                    <%\n" +
                    "                    } else {\n" +
                    "                    %>\n" +
                    "                    <li class=\"am-disabled\"><a href=\"#\">»</a></li>\n" +
                    "                    <%\n" +
                    "                        }\n" +
                    "                    %>\n" +
                    "                </ul>\n" +
                    "            </form>\n" +
                    "\n" +
                    "        </div>\n" +
                    "    </div>\n" +
                    "</div>\n");
            out.write("\n" +
                    "\n" +
                    "<div style=\"width:580px\" class=\"am-modal am-modal-alert\" tabindex=\"-1\" id=\"table_model\">\n" +
                    "    <div class=\"am-modal-dialog\">\n" +
                    "        <div class=\"am-modal-hd\" id=\"table_model_name\"></div>\n" +
                    "        <div class=\"am-modal-bd\">\n" +
                    "            <table class=\"is-info-modify\">\n" +
                    "                <tr hidden=\"hidden\">\n" +
                    "                    <td>UID</td>\n" +
                    "                    <td><input id=\""+head_en+"UID\"></td>\n" +
                    "                    </td>\n" +
                    "                </tr>\n");
            if(en_name.size()%2 != 0){
                out.write("                <tr>\n" +
                        "                    <td>编码</td>\n" +
                        "                    <td><input id=\"table_row_no\"></td>\n" +
                        "                    <td>"+en_ch_map.get(en_name.get(0))+"</td>\n" +
                        "                    <td><input id=\""+en_name.get(0)+"\"></td>\n" +
                        "                </tr>");
                for(int i =1 ; i<en_name.size();i+=2){
                    out.write("                <tr>\n" +
                            "                    <td>"+en_ch_map.get(en_name.get(i))+"</td>\n" +
                            "                    <td><input id=\""+en_name.get(i)+"\"></td>\n" +
                            "                    <td>"+en_ch_map.get(en_name.get(i+1))+"</td>\n" +
                            "                    <td><input id=\""+en_name.get(i+1)+"\"></td>\n" +
                            "                </tr>");
                }

            }else{
                out.write("                <tr>\n" +
                        "                    <td>编码</td>\n" +
                        "                    <td><input id=\"table_row_no\"></td>" +
                        "                    <td>"+en_ch_map.get(en_name.get(0))+"</td>\n" +
                        "                    <td><input id=\""+en_name.get(0)+"\"></td>\n" +
                        "                </tr>");
                for(int i =1 ; i<en_name.size()-1;i+=2){
                    out.write("                <tr>\n" +
                            "                    <td>"+en_ch_map.get(en_name.get(i))+"</td>\n" +
                            "                    <td><input id=\""+en_name.get(i)+"\"></td>\n" +
                            "                    <td>"+en_ch_map.get(en_name.get(i+1))+"</td>\n" +
                            "                    <td><input id=\""+en_name.get(i+1)+"\"></td>\n" +
                            "                </tr>\n");
                }
                out.write("                <tr>\n" +
                        "                    <td>"+en_ch_map.get(en_name.get(en_name.size()-1))+"</td>\n" +
                        "                    <td><input id=\""+en_name.get(en_name.size()-1)+"\"></td>\n" +
                        "                </tr>");

            }
            out.write("");
            out.write("            </table>\n" +
                    "        </div>\n" +
                    "        <div class=\"am-modal-footer\">\n" +
                    "            <span class=\"am-modal-btn\" id=\"button_sure\">确定</span>\n" +
                    "            <span class=\"am-modal-btn\">取消</span>\n" +
                    "        </div>\n" +
                    "    </div>\n" +
                    "</div>\n" +
                    "\n" +
                    "</body>\n" +
                    "</html>\n");
            out.flush();
            out.close();

        } catch (IOException e) {
            e.printStackTrace();
        }

    }
    public void createJs(){
        BufferedWriter out = null;
        try {
            String dir = new File(".").getCanonicalPath();
            out = new BufferedWriter(new OutputStreamWriter(new FileOutputStream(dir+"\\web\\IC_js\\"+head_en+".js"),"UTF-8"));
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
        try {
            out.write("/**\n" +
                    " *\n" +
                    " */\n" +
                    "\n" +
                    "$(document).ready(function () {\n" +
                    "\n" +
                    "    prepare();\n" +
                    "\n" +
                    "    /*设置编号*/\n" +
                    "    $(\"td.am-text-center\").each(function () {\n" +
                    "        var indexxx = $(this).closest('tr').index();\n" +
                    "        $(this).text(indexxx);\n" +
                    "    });\n" +
                    "\n" +
                    "\n" +
                    "    /*全选*/\n" +
                    "    $(\"#check-all\").click(function () {\n" +
                    "\n" +
                    "        $(\"input[type=checkbox]\").each(function () {\n" +
                    "            if (this.id != \"check-all\") {\n" +
                    "                this.checked = document.getElementById(\"check-all\").checked;\n" +
                    "            }\n" +
                    "        })\n" +
                    "        //var cc = $(\"input[type=checkbox][id!=check-all]\").attar(\"checked\");\n" +
                    "        //$(\"#check-all\").attr(\"checked\",cc);\n" +
                    "\n" +
                    "        $(\"#hidden_check\").attr(\"checked\", false);\n" +
                    "    })\n" +
                    "\n" +
                    "\n" +
                    "    /*查询*/\n" +
                    "    $(\"#dept_list_search\").click(function () {\n" +
                    "        var pageNo = 1;\n" +
                    "        search(pageNo);\n" +
                    "    })\n" +
                    "\n" +
                    "\n" +
                    "    /*删除所选*/\n" +
                    "    $(\"#button-delete\").click(function () {\n" +
                    "        alert(\"删除！\")\n" +
                    "        $(\"#delete_confirm\").modal();\n" +
                    "        // $(\"#delete_sure\").click(function () {\n" +
                    "            $(\"input[type=checkbox]\").each(function () {\n" +
                    "                    if (this.checked && this.id != \"check-all\") {//$(this).is(':checked')\n" +
                    "                        var tr = $(this).closest('tr');\n");
            out.write("                        var "+head_en+"UID=\"\";\n");
            for(String x: en_name){
                out.write("                        var "+x+"=\"\";\n");
            }
            out.write("\n" +
                    "                        $(tr).find(\"td\").each(function () {\n" +
                    "                            var x = $(this).text().split(\"\\n\")[0];\n" +
                    "                            if(x==\"null\"){\n" +
                    "                                x=\"\"\n" +
                    "                            }\n" +
                    "                            switch ($(this).index()) {\n" +
                    "                                case 2:\n" +
                    "                                    "+head_en+"UID=x;\n" +
                    "                                    break;\n");
            for(int i= 0;i<en_name.size();i++){
                out.write("                                case "+(i+3)+":\n" +
                        "                                    "+en_name.get(i)+"=x;\n" +
                        "                                    break;\n");
            }
            out.write("                            }\n" +
                    "                        })\n");
            String request = "\"<BasicDAS><"+head_en+" operation='delete'><"+head_en+"UID>\" + "+head_en+"UID + \"</"+head_en+"UID>\"\n";
            for(String x:en_name){
                request+="                            +\"<"+x+">\"+"+x+"+\"</"+x+">\"\n";
            }
            request+="                            +\"</"+head_en+">"+"</BasicDAS>\"";
            out.write("                        var request = "+request+"\n");

            out.write("                        var dataToSend = \"clientPage="+head_en+"&&serviceRequest=\" + request;\n" +
                    "                        $.ajax({\n" +
                    "                            type: \"POST\",\n" +
                    "                            url: \"/rssWeb/DataServiceServlet\",\n" +
                    "                            data: dataToSend,\n" +
                    "                            success: function (data, textStatus, jqXHR) {\n" +
                    "                                // tr.remove();\n" +
                    "                                prepare();\n" +
                    "                                /*重新排序*/\n" +
                    "                                $(\"td.am-text-center\").each(function () {\n" +
                    "                                    var indexxx = $(this).closest('tr').index();\n" +
                    "                                    $(this).text(indexxx);\n" +
                    "                                });\n"+
                    "                            }\n" +
                    "                        });\n");

            out.write("                    }\n" +
                    "                    $(\"#check-all\").attr(\"checked\", false);\n" +
                    "                }\n" +
                    "            )\n" +
                    "\n" +
                    "            $(\"td.am-text-center\").each(function () {\n" +
                    "                var indexxx = $(this).closest('tr').index();\n" +
                    "                $(this).text(indexxx);\n" +
                    "            });\n" +
                    "        // });\n" +
                    "    })\n");

            out.write("\n" +
                    "\n" +
                    "    /*新增*/\n" +
                    "    $(\"#button-add\").click(function () {\n" +
                    "        $(\"#table_model\").find(\"input\").each(function () {\n" +
                    "            $(this).val(\"\");\n" +
                    "        })\n" +
                    "        $(\"#table_model_name\").html(\"信息添加\")\n" +
                    "\n" +
                    "        $(\"#table_row_no\").removeAttr(\"disabled\")\n" +
                    "        $(\"#table_row_no\").val($(\".is-info-table\").find(\"tbody\").find(\"tr\").last().index() + 1);\n" +
                    "        $(\"#table_row_no\").attr(\"disabled\", true);\n" +
                    "\n" +
                    "        $(\"#table_model\").modal();\n" +
                    "    })\n");
            out.write("\n" +
                    "    /*新增确认*/\n" +
                    "    $(\"#button_sure\").click(function () {\n");
            out.write("        var "+head_en+"UID = $(\"#"+head_en+"UID\").val();");
            for(String x:en_name){
                out.write("        var "+x+" = $(\"#"+x+"\").val();\n");
            }
            out.write("        var request=\"\"\n" +
                    "        if($(\"#table_model_name\").html() == \"信息添加\"){\n" +
                    "            request = \"<BasicDAS><"+head_en+" operation='save'>\"\n" +
                    "        }else if($(\"#table_model_name\").html() == \"信息修改\"){\n" +
                    "            request = \"<BasicDAS><"+head_en+" operation='update'><"+head_en+"UID>\"+"+head_en+"UID+\"</"+head_en+"UID>\"\n" +
                    "        }\n");
            request="";
            for(String x:en_name){
                request+="            +\"<"+x+">\" + "+x+" + \"</"+x+">\"\n";
            }
            request+="            + \"</"+head_en+"></BasicDAS>\";";
            out.write("        request =request  "+request+"\n");

            out.write("        var dataToSend = \"clientPage="+head_en+"&&serviceRequest=\" + request;\n" +
                    "\n" +
                    "        $.ajax({\n" +
                    "            type: \"POST\",\n" +
                    "            url: \"/rssWeb/DataServiceServlet\",\n" +
                    "            data: dataToSend,\n" +
                    "            success: function (data, textStatus, jqXHR) {\n" );
            out.write("                prepare();\n" +
                    "\n" +
                    "                /*重新排序*/\n" +
                    "                $(\"td.am-text-center\").each(function () {\n" +
                    "                    var indexxx = $(this).closest('tr').index();\n" +
                    "                    $(this).text(indexxx);\n" +
                    "                });\n" +
                    "\n" +
                    "            }\n" +
                    "        });\n" +
                    "    })\n" +
                    "\n" +
                    "    /*修改*/\n" +
                    "    $(\"#button-modify\").click(function () {\n" +
                    "        $(\"#table_model_name\").html(\"信息修改\")\n" +
                    "\n" +
                    "        $(\"#table_row_no\").removeAttr(\"disabled\")\n" +
                    "        var count = 0\n" +
                    "        $(\"input[type=checkbox]\").each(function () {\n" +
                    "            if (this.id != \"check-all\" && this.checked) {\n" +
                    "                count += 1\n" +
                    "            }\n" +
                    "        })\n" +
                    "        if(count >1){\n" +
                    "            alert(\"修改只能单条进行！\")\n" +
                    "            return false;\n" +
                    "        }else if (count <= 0){\n" +
                    "            alert(\"请选择需要修改的数据！\")\n" +
                    "            return false;\n" +
                    "        }\n" +
                    "\n" +
                    "        var tr\n" +
                    "        $(\"input[type=checkbox]\").each(function () {\n" +
                    "            if (this.id != \"check-all\" && this.checked) {\n" +
                    "                tr = this.parentNode.parentNode\n" +
                    "            }\n" +
                    "        })\n" +
                    "        $(tr).find(\"td\").each(function () {\n" +
                    "            var x = $(this).text().split(\"\\n\")[0];\n" +
                    "            if(x==\"null\"){\n" +
                    "                x=\"\"\n" +
                    "            }\n" +
                    "            switch ($(this).index()) {\n" +
                    "                case 1:\n" +
                    "                    $(\"#table_row_no\").val(x);\n" +
                    "                    break;\n" +
                    "                case 2:\n" +
                    "                   $(\"#"+head_en+"UID\").val(x);\n" +
                    "                    break;\n");
            for(int i=0;i<en_name.size();i++){
                out.write("                case "+(i+3)+":\n" +
                        "                    $(\"#"+en_name.get(i)+"\").val(x);\n" +
                        "                    break;\n");
            }
            out.write("            }\n" +
                    "        })\n" +
                    "        $(\"#table_row_no\").attr(\"disabled\", true);\n" +
                    "        $(\"#table_model\").modal();\n" +
                    "\n" +
                    "    })\n" +
                    "\n" +
                    "})\n" +
                    "\n" +
                    "function search(pageNo) {\n" +
                    "    var deptName = $(\"#deptName_input\").val();\n" +
                    "    var deptType = $(\"#deptType_select\").val();\n" +
                    "    var request = \"<BasicDAS><"+head_en+" pageSize='5' pageNo='\" + pageNo + \"'></"+head_en+"></BasicDAS>\";\n" +
                    "    var dataToSend = \"clientPage="+head_en+"&&serviceRequest=\" + request;\n" +
                    "    $.ajax({\n" +
                    "        type: \"POST\",\n" +
                    "        async: false,\n" +
                    "        url: \"/rssWeb/DataServiceServlet\",\n" +
                    "        data: dataToSend,\n" +
                    "        success: function (data) {\n" +
                    "            $(\"#data_table\").html($(data).find(\"#data_table\").html());\n" +
                    "            $(\"#is_page_count\").html($(data).find(\"#is_page_count\").html());\n" +
                    "            /*排序*/\n" +
                    "            $(\"td.am-text-center\").each(function () {\n" +
                    "                var indexxx = $(this).closest('tr').index();\n" +
                    "                $(this).text(indexxx);\n" +
                    "            });\n" +
                    "        },\n" +
                    "    });\n" +
                    "}\n" +
                    "\n" +
                    "\n" +
                    "function prepare() {\n" +
                    "    var request = \"<BasicDAS><"+head_en+" pageSize='5' pageNo='1'></"+head_en+"></BasicDAS>\";\n" +
                    "    var dataToSend = \"clientPage="+head_en+"&&serviceRequest=\" + request;\n" +
                    "    $.ajax({\n" +
                    "        type: \"POST\",\n" +
                    "        async: false,\n" +
                    "        url: \"/rssWeb/DataServiceServlet\",\n" +
                    "        data: dataToSend,\n" +
                    "        success: function (data) {\n" +
                    "            $(\"#data_table\").html($(data).find(\"#data_table\").html());\n" +
                    "            $(\"#is_page_count\").html($(data).find(\"#is_page_count\").html());\n" +
                    "        },\n" +
                    "    });\n" +
                    "\n" +
                    "}\n");

            out.flush();
            out.close();



        } catch (IOException e) {
            e.printStackTrace();
        }


    }

}
