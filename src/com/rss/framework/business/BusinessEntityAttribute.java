package com.rss.framework.business;

/**********************************************************
 * [系统名]      RSS平台</br>
 * [包　名]		com.rss.framework.business</br>
 * [文件名]		BusinessEntityAttribute.java</br>
 * [功　能]		存储数据字段
 * </br>
 *******************************************************</br>
 * REVISION      变更日期             变更人              变更内容</br>
 *******************************************************</br>
 * v1.00             2011-3-15           胡清河                创建</br>
 * v1.01             2013-6-28           祖佳宁                修改
 *
 ***********************************************************/
public class BusinessEntityAttribute {
	/**
	 * 字段ID
	 */
	private String attributeID;
	/**
	 * 检索操作
	 * =，LIKE等
	 */
	private String operator;
	/**
	 * 字段值
	 */
	private Object attributeValue;

	public String getAttributeID() {
		return attributeID;
	}

	public void setAttributeID(String attributeID) {
		this.attributeID = attributeID;
	}

	public String getOperator() {
		return operator;
	}

	public void setOperator(String operator) {
		this.operator = operator;
	}

	public Object getAttributeValue() {
		return attributeValue;
	}

	public void setAttributeValue(Object attributeValue) {
		this.attributeValue = attributeValue;
	}
}
