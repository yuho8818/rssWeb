package com.rss.framework.runtime;

import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.util.ArrayList;

import org.apache.log4j.Logger;
import org.springframework.beans.BeansException;
import org.springframework.context.ApplicationContext;

import com.rss.framework.business.BusinessObjectEntity;
import com.rss.framework.business.JavaBeanAdapter;
import com.rss.framework.util.RssRuntimeException;

/**********************************************************
 * [系统名]      RSS平台</br>
 * [包　名]		com.rss.framework.runtime</br>
 * [文件名]		RuntimeEngine.java</br>
 * [功　能]		平台引擎
 * </br>
 *******************************************************</br>
 * REVISION      变更日期             变更人              变更内容</br>
 *******************************************************</br>
 * v1.00             2011-3-15           胡清河                创建</br>
 * v1.01             2013-6-28           祖佳宁                修改
 *
 ***********************************************************/
public class RuntimeEngine {

    /**
     * log类
     */
    private static final Logger logger = Logger.getLogger(RuntimeEngine.class);
    /**
     * 前台请求的Service对象
     */
    private Object serviceObject = null;

    /**
     * 前台传递过来的参数
     */
    private Object[] operationArguments = null;

    private Class[] argsClass = null;

    /**
     * 构造函数
     *
     * @param ctx           加载bean的类
     * @param service       前台请求的Service名
     * @param operationName 前台请求的方法名
     * @param bizData       前台传递的数据
     */
    public RuntimeEngine(ApplicationContext ctx, String message, String ip, String mac, String userID) {
        logger.info("***************FUNCTION [RuntimeEngine] START*****************");
        System.out.println(message);
        ArrayList<BusinessObjectEntity> entityList = JavaBeanAdapter.getBusinessObjectListFromMessage(message);
        if (entityList != null && entityList.size() > 0) {
            String service = entityList.get(0).getService();
            try {
                serviceObject = ctx.getBean(service);
                if (serviceObject == null)
                    serviceObject = ctx.getBean("BasicDAS");
                operationArguments = new Object[4];
                operationArguments[0] = entityList;
                operationArguments[1] = ip;
                operationArguments[2] = mac;
                operationArguments[3] = userID;
                argsClass = new Class[4];
                argsClass[0] = ArrayList.class;
                argsClass[1] = String.class;
                argsClass[2] = String.class;
                argsClass[3] = String.class;
            } catch (BeansException e) {
                throw new RssRuntimeException("服务组件" + service + "没有注册！");
            }
            logger.info("***************FUNCTION [RuntimeEngine] END*****************");

        }
    }

    /**
     * 动态加载Service
     *
     * @return 处理完请求之后的返回结果
     * @throws Exception 异常
     */
    public String invokeService() throws Exception {
        logger.info("***************FUNCTION [invokeService] START*****************");
        Class serviceClass = serviceObject.getClass();
        Method operation = serviceClass.getMethod("execute", argsClass);
        Object result = null;
        try {
            result = operation.invoke(serviceObject, operationArguments);
        } catch (Exception e) {
            System.out.println(e);
            String msg = null;
            if (e instanceof InvocationTargetException) {
                Throwable targetEx = ((InvocationTargetException) e)
                        .getTargetException();
                if (targetEx != null) {
                    msg = targetEx.getMessage();
                }
            } else {
                msg = e.getMessage();
            }
            System.out.println(msg);
            e.printStackTrace();
        }
        if (result != null) {
            logger.info("****result:" + result.toString() + "****");
            logger.info("***************FUNCTION [invokeService] END*****************");
            return result.toString();
        } else {
            logger.info("***************FUNCTION [invokeService] END*****************");
            return null;
        }
    }

}
