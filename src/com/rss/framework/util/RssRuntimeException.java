package com.rss.framework.util;

/**********************************************************
 * [系统名]      RSS平台</br>
 * [包　名]		com.rss.framework.util</br>
 * [文件名]		RssRuntimeException.java</br>
 * [功　能]		平台异常类
 * </br>
 *******************************************************</br>
 * REVISION      变更日期             变更人              变更内容</br>
 *******************************************************</br>
 * v1.00             2011-3-15           胡清河                创建</br>
 * v1.01             2013-6-28           祖佳宁                修改
 *
 ***********************************************************/
public class RssRuntimeException extends RuntimeException {

	/**
	 * serializable的静态终态 serialVersionUID 字段
	 */
	private static final long serialVersionUID = -1562967102934655294L;
	/**
	 * 异常消息
	 */
	private String errorMessage;

	/**
	 * 构造函数
	 */
	public RssRuntimeException() {
		super();
	}

	/**
	 * 构造函数
	 * @param errorMessage 异常消息
	 */
	public RssRuntimeException(String errorMessage) {
		super();
		this.errorMessage = errorMessage;
	}

	/**
	 * 构造函数
	 * @param t 异常
	 */
	public RssRuntimeException(Throwable t) {
		super(t);
	}

	/**
	 * 构造函数
	 * @param errorMessage 异常消息
	 * @param t 异常
	 */
	public RssRuntimeException(String errorMessage, Throwable t) {
		super(t);
		this.errorMessage = errorMessage;
	}

	public String getErrorMessage() {
		return errorMessage;
	}

	public void setErrorMessage(String errorMessage) {
		this.errorMessage = errorMessage;
	}

}
