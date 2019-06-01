package com.rss.framework.util;

import org.springframework.jdbc.core.JdbcTemplate;

import java.io.*;
import java.sql.SQLException;
import java.sql.Statement;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

public class GenerateHtmlByDatabase {
    private JdbcTemplate jdbcTemplate;
    private final static String DRIVER_CLASS_NAME_SQLSERVER = "com.microsoft.sqlserver.jdbc.SQLServerDriver";

    public static List<String> getColumns(String tableName){
        Connection conn;
        Statement stmt;
        ResultSet rs;
        String url = "jdbc:sqlserver://152.136.52.249:1433;databaseName=IPM_dev;";
        String sql = "Select Name FROM SysColumns Where id=Object_Id("+"\'"+tableName+"\'"+")";
        List<String> columnsName = new ArrayList<String>();

        try {
            // 连接数据库
            conn = DriverManager.getConnection(url, "sa", "BGabc123456");
            // 建立Statement对象
            stmt = conn.createStatement();
            /**
             * Statement createStatement() 创建一个 Statement 对象来将 SQL 语句发送到数据库。
             */
            // 执行数据库查询语句
            rs = stmt.executeQuery(sql);
            /**
             * ResultSet executeQuery(String sql) throws SQLException 执行给定的 SQL
             * 语句，该语句返回单个 ResultSet 对象
             */
            while (rs.next()) {
                columnsName.add(rs.getString("Name"));
            }
            if (rs != null) {
                rs.close();
                rs = null;
            }
            if (stmt != null) {
                stmt.close();
                stmt = null;
            }
            if (conn != null) {
                conn.close();
                conn = null;
            }
        } catch (SQLException e) {
            e.printStackTrace();
            System.out.println("数据库连接失败");
        }
        return columnsName;
    }

    public static void createJSP(String tableName,List<String> columnsName){
        try {
            BufferedWriter out = new BufferedWriter(new OutputStreamWriter(new FileOutputStream("C:\\Users\\yuho\\IdeaProjects\\rssWeb\\web\\"+tableName+".jsp"),"UTF-8"));
            out.write("<%@ page language=\"java\" contentType=\"text/html; charset=UTF-8\" pageEncoding=\"UTF-8\"%>\n");
            out.write("<%@page import=\"com.rss.framework.business.*\"%>\n");
            out.write("<%@page import=\"java.util.*\" %>\n");
            out.write("<!DOCTYPE html PUBLIC \"-//W3C//DTD HTML 4.01 Transitional//EN\" \"http://www.w3.org/TR/html4/loose.dtd\">\n");
            out.write("<html>\n");
            out.write("<head>\n");
            out.write("<meta http-equiv=\"Content-Type\" content=\"text/html; charset=UTF-8\">\n");
            out.write("<meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\">\n");
            out.write("<title>"+tableName+"</title>\n");
            out.write("<meta name=\"description\" content=\"这是一个 index 页面\">\n" +
                    "<meta name=\"keywords\" content=\"index\">\n" +
                    "<meta name=\"viewport\" content=\"width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no\">\n" +
                    "<meta name=\"renderer\" content=\"webkit\">\n" +
                    "<meta http-equiv=\"Cache-Control\" content=\"no-siteapp\" />\n" +
                    "<link rel=\"icon\" type=\"image/png\" href=\"assets/i/favicon.png\">\n" +
                    "<link rel=\"apple-touch-icon-precomposed\" href=\"assets/i/app-icon72x72@2x.png\">\n" +
                    "<meta name=\"apple-mobile-web-app-title\" content=\"Amaze UI\" />\n" +
                    "<link rel=\"stylesheet\" href=\"assets/css/amazeui.min.css\"/>\n" +
                    "<link rel=\"stylesheet\" href=\"assets/css/admin.css\">\n" +
                    "<link rel=\"stylesheet\" href=\"IC_css/共用.css\">\n" +
                    "<script src=\"assets/js/jquery.min.js\"></script>\n" +
                    "<script src=\"assets/js/app.js\"></script>\n" +
                    "<script src=\"IC_js/侧导航栏.js\"></script>\n");
            out.write("\n" +
                    "<!--[if lt IE 9]>\n" +
                    "<script src=\"http://libs.baidu.com/jquery/1.11.1/jquery.min.js\"></script>\n" +
                    "<script src=\"http://cdn.staticfile.org/modernizr/2.8.3/modernizr.js\"></script>\n" +
                    "<script src=\"assets/js/polyfill/rem.min.js\"></script>\n" +
                    "<script src=\"assets/js/polyfill/respond.min.js\"></script>\n" +
                    "<script src=\"assets/js/amazeui.legacy.js\"></script>\n" +
                    "<![endif]--> \n" +
                    "\n" +
                    "<!--[if (gte IE 9)|!(IE)]><!--> \n" +
                    "<script src=\"assets/js/amazeui.min.js\"></script>\n" +
                    "<!--<![endif]-->\n" +
                    "\n" +
                    "\n" +
                    "<script src=\"IC_js/常规函数.js\"></script>\n" +
                    "<script type=\"text/javascript\" src=\"IC_js/"+tableName+".js\"></script>\n" +
                    "\n" +
                    "</head>\n" +
                    "\n" +
                    "<!--[if lte IE 9]><p class=\"browsehappy\">升级你的浏览器吧！ <a href=\"http://se.360.cn/\" target=\"_blank\">升级浏览器</a>以获得更好的体验！</p><![endif]-->\n" +
                    "\n" +
                    "\n" +
                    "<body id=\"is_body\">\n" +
                    " <%int pageNo=0,totalPages=0,pageSize=0,totalRecords=0;%>\n" +
                    "<%@include file=\"顶部栏.jsp\"%>\n" +
                    "\n" +
                    "<div class=\"am-cf admin-main\">\n" +
                    " <%@include file=\"侧导航栏.jsp\" %>\n");
            out.write(" <div class=\" admin-content\">\n" +
                    " \n" +
                    "      <div class=\"daohang\">\n" +
                    "\t\t\t<ul>\n" +
                    "\t\t\t\t<li><button type=\"button\" class=\"am-btn am-btn-default am-radius am-btn-xs\"> 首页 </li>\n" +
                    "\t\t\t\t<li><button type=\"button\" class=\"am-btn am-btn-default am-radius am-btn-xs\">商品管理<a href=\"javascript: void(0)\" class=\"am-close am-close-spin\" data-am-modal-close=\"\">×</a></button></li>\n" +
                    "\t\t\t\t<li><button type=\"button\" class=\"am-btn am-btn-default am-radius am-btn-xs\">订单管理<a href=\"javascript: void(0)\" class=\"am-close am-close-spin\" data-am-modal-close=\"\">×</a></button></li>\n" +
                    "\t\t\t\t<li><button type=\"button\" class=\"am-btn am-btn-default am-radius am-btn-xs\">实时监控<a href=\"javascript: void(0)\" class=\"am-close am-close-spin\" data-am-modal-close=\"\">×</a></button></li>\t\t\t\t\n" +
                    "\t\t\t</ul>\t\n" +
                    "       </div>\n");
            out.write("       \n" +
                    "      <div class=\"admin-biaogelist\">\n" +
                    "      \n" +
                    "         <div class=\"listbiaoti am-cf\">\n" +
                    "         <ul class=\"am-icon-flag on\">污水管理</ul>\n" +
                    "         <dl class=\"am-icon-home\" style=\"float: right;\"> 当前位置： 首页 > <a href=\"#\">商品列表</a></dl>           \n" +
                    "        </div>\n" +
                    "        \n");
            out.write("        <div id=\"search_block\" class=\"am-btn-toolbars am-btn-toolbar is-search-bar\">\n" +
                    "          <ul>\n" +
                    "            <li>\n" +
                    "            <select id=\"deptType_select\" data-am-selected=\"{btnWidth: 120, btnSize: 'sm', btnStyle: 'default'}\">\n" +
                    "              <optgroup label=\"部门类型选择\">\n" +
                    "              <option value=\"\">全部类型</option>\n" +
                    "            <%if(request.getSession().getAttribute(\"prepareResponse\")!=null){\n" +
                    "\t  \t     String message=request.getSession().getAttribute(\"prepareResponse\").toString();\n" +
                    "\t  \t     \n" +
                    "\t  \t     ArrayList<BusinessObjectEntity> entityList=JavaBeanAdapter.getBusinessObjectListFromMessage(message);   %>\n" +
                    "\t  \t     <%\t\t\n" +
                    "\t\t\tfor (int index=0;index<entityList.size();index++){\t\n" +
                    "\t\t\t\tBusinessObjectEntity entity=entityList.get(index);\t\n" +
                    "\t\t\t\t \n" +
                    "\t\t\t\t%>\n" +
                    "              <option value=\"<%=entity.getAttributeValue(\"paramValues\") %>\"><%=entity.getAttributeValue(\"paramValues\") %></option>\n" +
                    "              <%}\n" +
                    "              }%>   \n" +
                    "             \n" +
                    "              </optgroup>    \n" +
                    "              </select>\n" +
                    "            </li>\n" +
                    "            \n" +
                    "            <li>\n" +
                    "             <span class=\"is-input-title\" >部门名称:</span>\n" +
                    "             <input id=\"deptName_input\" type=\"text\" class=\"am-input-sm is-search-input\"  placeholder=\"部门搜索\">\n" +
                    "            </li>\n" +
                    "                       \n" +
                    "            <li>\n" +
                    "             <button class=\"am-btn am-btn-xs am-radius  am-btn-success\" id=\"dept_list_search\">查询</button> \n" +
                    "             <button class=\"am-btn am-btn-xs am-radius  am-btn-success\">打印</button> \n" +
                    "            </li>\n" +
                    "            \n" +
                    "          </ul>\n" +
                    "        </div>\n");

            out.write("        \n" +
                    "        \n" +
                    "        <form class=\"am-form am-g\">\n" +
                    "          <table id=\"data_table\"  width=\"100%\" class=\"is-info-table am-table am-table-bordered am-table-radius am-table-striped\">\n" +
                    "            <thead>\n" +
                    "            <tr class=\"am-success\">\n" +
                    "              <th class=\"table-check\"><input type=\"checkbox\" id=\"check-all\"/></th>\n" +
                    "                <th class=\"table-id am-text-center\" hidden=\"hidden\" >UID</th>\n");

            for(String column:columnsName ){
                out.write("              <th class=\"table-title\">"+column+"</th>\n");
            }

            out.write("              <th style=\"width:170px;\" class=\"table-set\">操作</th>          \n" +
                    "            </tr>\n" +
                    "          </thead>\n" +
                    "            <tbody>\n" +
                    "             <tr hidden=\"true\">\n" +
                    "               <td><input type=\"checkbox\" id=\"hidden_check\"/></td>\n" +
                    "               <td class=\"am-text-center\" hidden=\"hidden\"></td>\n");
            for(String column:columnsName ){
                out.write("               <td contenteditable=\"true\"></td>\n");
            }
            out.write("               <td><div class=\"am-btn-toolbar\">\n" +
                    "                    <div class=\"am-btn-group am-btn-group-xs\">\n" +
                    "                      <button type=\"button\"  class=\"am-btn am-btn-default am-btn-xs am-text-success am-round\"><span class=\"am-icon-search\"></span> </button>\n" +
                    "                      <button type=\"button\" onclick=modify_tr(this) class=\"am-btn am-btn-default am-btn-xs am-text-secondary am-round\"><span class=\"am-icon-pencil-square-o\"></span></button>\n" +
                    "                      <button type=\"button\" onclick=copy_tr(this)  class=\"am-btn am-btn-default am-btn-xs am-text-warning  am-round\"><span class=\"am-icon-copy\"></span></button>\n" +
                    "                      <button type=\"button\" onclick=delete_tr(this)   class=\"am-btn am-btn-default am-btn-xs am-text-danger am-round\"><span class=\"am-icon-trash-o\"></span></button>\n" +
                    "                    </div>\n" +
                    "                  </div></td>             \n" +
                    "             </tr>\n");
            out.write("          \n" +
                    "           \n" +
                    "            <%if(request.getAttribute(\"serviceResponse\")!=null&&!request.getAttribute(\"serviceResponse\").equals(\"<error>没有记录！</error>\")){\n" +
                    "\t  \t     String message=request.getAttribute(\"serviceResponse\").toString();\n" +
                    "\t  \t     ArrayList<BusinessObjectEntity> entityList=JavaBeanAdapter.getBusinessObjectListFromMessage(message);   %>\n" +
                    "\t  \t     <%\t\t\n" +
                    "\t\t\tfor (int index=0;index<entityList.size();index++){\n" +
                    "\t\t\t\tBusinessObjectEntity entity=entityList.get(index);\t\n" +
                    "\t\t\t\tif(index == 0){\n" +
                    "\t\t\t    System.out.println(\"页数设置\");\n" +
                    "\t\t\t    pageNo = Integer.parseInt(entity.getPageNo());\n" +
                    "\t\t\t    System.out.println(\"pageNo:\"+pageNo);\n" +
                    "\t\t\t    totalPages = Integer.parseInt(entity.getTotalPages());\n" +
                    "\t\t\t    System.out.println(\"totalPages:\"+entity.getTotalPages());\n" +
                    "\t\t\t    totalRecords = Integer.parseInt(entity.getTotalRecords());\n" +
                    "\t\t\t    System.out.println(\"totalRecords:\"+totalRecords);\n" +
                    "\t\t\t    pageSize = Integer.parseInt(entity.getPageSize());\n" +
                    "\t\t\t    System.out.println(\"pageSize:\"+pageSize);\n" +
                    "\t\t\t    }\t\n" +
                    "\t\t\t\t%>\n" +
                    "              <tr>\n" +
                    "              <td ><input type=\"checkbox\" /></td>\n" +
                    "              <td class=\"am-text-center\">14</td>\n");



            out.flush();
            out.close();
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }

    }

    public static void main(String[] args) {

        List<String> columnsName = getColumns("Correct_Info");

        createJSP("Correct_Info",columnsName);


    }
}

