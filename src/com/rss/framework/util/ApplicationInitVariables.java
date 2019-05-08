package com.rss.framework.util;

/**********************************************************
 * [系统名]      RSS平台</br>
 * [包　名]		com.rss.framework.util</br>
 * [文件名]		ApplicationInitVariables.java</br>
 * [功　能]		存储服务器路径的类
 * </br>
 *******************************************************</br>
 * REVISION      变更日期             变更人              变更内容</br>
 *******************************************************</br>
 * v1.00             2011-3-15           胡清河                创建</br>
 * v1.01             2013-6-28           祖佳宁                修改
 *
 ***********************************************************/
public class ApplicationInitVariables {
	
	/**
	 * 服务器路径
	 */
	private static String APPLICATION_CONTEXT_PATH;

	public static String getAPPLICATION_CONTEXT_PATH() {
		return APPLICATION_CONTEXT_PATH;
	}

	public static final void setAPPLICATION_CONTEXT_PATH(String application_context_path) {
		APPLICATION_CONTEXT_PATH = application_context_path;
	}
}
