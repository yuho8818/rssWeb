package com.rss.framework.runtime;

import java.io.IOException;
import java.io.InputStreamReader;
import java.io.LineNumberReader;
import java.io.PrintWriter;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletConfig;
import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;


import org.apache.log4j.Logger;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.FileSystemXmlApplicationContext;
import org.springframework.jdbc.core.JdbcTemplate;

import com.rss.framework.business.BusinessObjectEntity;
import com.rss.framework.business.JavaBeanAdapter;
import com.rss.framework.util.ApplicationInitVariables;
import com.rss.framework.util.RssRuntimeException;

/**********************************************************
 * [系统名] RSS平台</br> [包　名] com.rss.framework.runtime</br> [文件名]
 * HttpChannelListener.java</br> [功　能] 监听前台以HTTP协议方式连接的Servlet </br> </br>
 * REVISION 变更日期 变更人 变更内容</br> </br> v1.00 2011-3-15 胡清河 创建</br> v1.01 2013-6-28
 * 祖佳宁 修改
 *
 ***********************************************************/
public class HttpChannelListener extends HttpServlet {

    /**
     * log类
     */
    private static final Logger logger = Logger.getLogger(HttpChannelListener.class);
    /**
     * serializable的静态终态 serialVersionUID 字段
     */
    private static final long serialVersionUID = 5724542229660458609L;
    /**
     * 加载bean的类
     */
    private ApplicationContext ctx = null;

    /**
     * 响应前台的请求
     *
     * @param request  请求对象
     * @param response 响应对象
     * @throws ServletException 异常
     * @throws IOException      异常
     */
    public void service(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        Date start_time = new Date();
        JdbcTemplate jdbcTemplat;
        logger.info("***************FUNCTION [service] START*****************");
        request.setCharacterEncoding("utf-8");
        String clientPage = request.getParameter("clientPage");
        String message = request.getParameter("serviceRequest");
        if (message == null)
            return;
        logger.info("****client request:" + message + "****");
        String clientIp = this.getRemoteAddress(request);
        Date sec_time = new Date();
        System.out.println(sec_time.getTime() - start_time.getTime());
        String clientMac = this.getMACAddress(clientIp);
        Date thi_time = new Date();
        System.out.println(thi_time.getTime() - start_time.getTime());
        Object userObject = request.getSession().getAttribute("userID");
        String userID = userObject != null ? userObject.toString() : "unKown";
        RuntimeEngine runtime = new RuntimeEngine(ctx, message, clientIp, clientMac, userID);

        String serviceResult = null;
        try {
            serviceResult = runtime.invokeService();
        } catch (Exception e) {
            logger.info("【异常堆栈信息】:", e);
            if (e.getCause() instanceof RssRuntimeException) {
                serviceResult = "<error>" + ((RssRuntimeException) e.getCause()).getErrorMessage() + "</error>";
            } else {
                serviceResult = "<error>系统运行时异常，请联系系统管理员！</error>";
            }
            logger.info("【异常信息】:" + serviceResult);
        }
        response.setContentType("text/xml");
        response.setCharacterEncoding("utf-8");
        //	PrintWriter out = response.getWriter();
        //out.print(serviceResult);
        try {
            ArrayList<BusinessObjectEntity> entityList = JavaBeanAdapter.getBusinessObjectListFromMessage(message);
            String operation = entityList.get(0).getOperation();
            if (operation != null) {
                request.setAttribute("serviceResponse", null);
            } else {
                if (serviceResult != null) {
                    request.setAttribute("serviceResponse", serviceResult);
                    System.out.println("serviceResponse" + serviceResult);
                } else
                    request.setAttribute("serviceResponse", "<response></response>");
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

        ServletContext tmp = getServletContext();
//		PrintWriter out = response.getWriter();
//		out.write(serviceResult);
        RequestDispatcher dipather = request.getRequestDispatcher("/" + clientPage + ".jsp");
        dipather.forward(request, response);
        Date end_time = new Date();
        long time_diff = end_time.getTime() - start_time.getTime();
        System.out.println(time_diff);
        logger.info("***************FUNCTION [service] END*****************");
    }

    /**
     * 初始化方法
     *
     * @param config 配置对象
     * @throws ServletException 异常
     */
    public void init(ServletConfig config) throws ServletException {
        super.init(config);
        logger.info("***************FUNCTION [init] START*****************");

        // try{
        ctx = new FileSystemXmlApplicationContext(config.getServletContext().getRealPath("/") + "/WEB-INF/classes/config/applicationContext.xml");
        ApplicationInitVariables.setAPPLICATION_CONTEXT_PATH(config.getServletContext().getRealPath("/"));
        // SocketServer server=(SocketServer)ctx.getBean("socketServer");
        // server.service(ctx);
        /*
         * }catch(IOException e){
         * 	e.printStackTrace();
         * }
         */
        logger.info("***************FUNCTION [init] END*****************");
    }

    public String getRemoteAddress(HttpServletRequest request) {
        String ip = request.getHeader("x-forwarded-for");
        if (ip == null || ip.length() == 0 || ip.equalsIgnoreCase("unknown"))
            ip = request.getHeader("Proxy-Client-IP");

        if (ip == null || ip.length() == 0 || ip.equalsIgnoreCase("unknown"))
            ip = request.getHeader("WL-Proxy-Client-IP");

        if (ip == null || ip.length() == 0 || ip.equalsIgnoreCase("unknown"))
            ip = request.getRemoteAddr();

        return ip;
    }

    public String getMACAddress(String ip) {
        String str = "";
        String macAddress = "";
	/*	try {
			Process p = Runtime.getRuntime().exec("nbtstat -A " + ip);
			InputStreamReader ir = new InputStreamReader(p.getInputStream());
			LineNumberReader input = new LineNumberReader(ir);
			for (int i = 1; i < 100; i++) {
				str = input.readLine();
				if (str != null) {
					if (str.indexOf("MAC Address") > 1) {
						macAddress = str.substring(str.indexOf("MAC Address") + 14, str.length());
						break;
					}
				}
			}
		} catch (IOException e) {
			e.printStackTrace(System.out);
		}*/
        return macAddress;
    }

}
