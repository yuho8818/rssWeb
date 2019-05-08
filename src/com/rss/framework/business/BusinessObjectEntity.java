package com.rss.framework.business;

import java.util.ArrayList;

/**********************************************************
 * [系统名]      RSS平台</br>
 * [包　名]		com.rss.framework.business</br>
 * [文件名]		BusinessObjectEntity.java</br>
 * [功　能]		存储数据库中数据的公共bean类
 * </br>
 *******************************************************</br>
 * REVISION      变更日期             变更人              变更内容</br>
 *******************************************************</br>
 * v1.00             2011-3-15           胡清河                创建</br>
 * v1.01             2013-6-28           祖佳宁                修改
 *
 ***********************************************************/
public class BusinessObjectEntity {
	/**
	 * 表名
	 */
	private String objectID;
	
	/**
	 * 数据服务组件名
	 */
	private String service;
	
	/**
	 * 请求数据库表的操作
	 */
	private String operation;
	/**
	 * 请求数据库表的操作的SQL
	 */
	private String sql;
	/**
	 * 单页显示的数据条数
	 */
	
	private String message;
	/**
	 * 数据库表操作结果
	 */
	
	private String pageSize = "-1";
	/**
	 * 页码
	 */
	private String pageNo = "1";
	/**
	 * 数据总条数
	 */
	private String totalRecords = "0";
	/**
	 * 总页数
	 */
	private String totalPages = "0";
	/**
	 * 排序条件
	 */
	private String orderBy;
	
	private boolean isSaveLog = false;

	/**
	 * 主表数据
	 */
	private ArrayList<BusinessEntityAttribute> attributeList;
	/**
	 * 子表数据
	 */
	private ArrayList<BusinessObjectEntity> childList;
	/**
	 * 唯一性检查字段列表
	 */
	private ArrayList<String> uniqueList;

	public BusinessObjectEntity() {
		attributeList = new ArrayList<BusinessEntityAttribute>();
		uniqueList = new ArrayList<String>();
	}

	public ArrayList<BusinessEntityAttribute> getAttributeList() {
		return attributeList;
	}

	public String getObjectID() {
		return objectID;
	}

	public void setObjectID(String objectID) {
		this.objectID = objectID;
	}

	public void addAttribute(BusinessEntityAttribute attr) {
		attributeList.add(attr);
	}

	public void setAttribute(int index, BusinessEntityAttribute attr) {
		attributeList.set(index, attr);
	}

	public ArrayList<BusinessObjectEntity> getChildList() {
		return childList;
	}

	public void addChild(BusinessObjectEntity child) {
		if (childList == null)
			childList = new ArrayList<BusinessObjectEntity>();
		childList.add(child);
	}

	public void addChildList(ArrayList<BusinessObjectEntity> newChildList) {
		if (childList == null)
			childList = new ArrayList<BusinessObjectEntity>();
		childList.addAll(newChildList);
	}

	public void setChild(int index, BusinessObjectEntity child) {
		if (childList == null)
			childList = new ArrayList<BusinessObjectEntity>();
		childList.set(index, child);
	}

	public ArrayList<String> getUniqueList() {
		return uniqueList;
	}
	
	public void addUnique(String unique) {
		if (uniqueList == null) {
			uniqueList = new ArrayList<String>();
		}
		uniqueList.add(unique);
	}
	
	public void addUniqueList(ArrayList<String> newUniqueList) {
		if (uniqueList == null) {
			uniqueList = new ArrayList<String>();
		}
		uniqueList.addAll(newUniqueList);
	}
	
	public void setUnique(int index, String unique) {
		if (uniqueList == null) {
			uniqueList = new ArrayList<String>();
		}
		uniqueList.set(index, unique);
	}

	public Object getAttributeValue(String attrID) {
		for (BusinessEntityAttribute attr : attributeList) {
			if (attr.getAttributeID().equals(attrID)) {
				return attr.getAttributeValue();
			}
		}
		return null;
	}

	public void removeAttributeByID(String attrID) {
		if (attributeList.size() != 0) {
			for (BusinessEntityAttribute attr : attributeList) {
				if (attr.getAttributeID().equals(attrID)) {
					attributeList.remove(attr);
					break;
				}
			}
		}
	}

	public String getPageSize() {
		return pageSize;
	}

	public void setPageSize(String pageSize) {
		this.pageSize = pageSize;
	}

	public String getPageNo() {
		return pageNo;
	}

	public void setPageNo(String pageNo) {
		this.pageNo = pageNo;
	}

	public String getTotalRecords() {
		return totalRecords;
	}

	public void setTotalRecords(String totalRecords) {
		this.totalRecords = totalRecords;
	}

	public String getSql() {
		return sql;
	}

	public void setSql(String sql) {
		this.sql = sql;
	}
	public String getOperation() {
		if (operation==null || operation.length()==0)
			operation= getOperationFormSql();
		return operation;
	}

	public void setOperation(String operation) {
		this.operation = operation;
	}

	public String getOrderBy() {
		return orderBy;
	}

	public void setOrderBy(String orderBy) {
		this.orderBy = orderBy;
	}

	public String getTotalPages() {
		return totalPages;
	}

	public void setTotalPages(String totalPages) {
		this.totalPages = totalPages;
	}
	
	public boolean isSaveLog() {
		return isSaveLog;
	}

	public void setSaveLog(boolean isSaveLog) {
		this.isSaveLog = isSaveLog;
	}

	private String getOperationFormSql(){
		String operation=null;
		if (sql!=null){
	        if (sql.toLowerCase().indexOf(" insert ")>=0) 
	        	operation= "save";
	       else if (sql.toLowerCase().indexOf(" update ")>=0) 
	    	    operation= "update";
	       else if (sql.toLowerCase().indexOf(" delete ")>=0) 
	   	       operation= "delete";
	       else if (sql.toLowerCase().indexOf(" select ")>=0) 
	   	       operation= "query";
		}
       return operation;
	}

	public String getService() {
		return service;
	}

	public void setService(String service) {
		this.service = service;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	

}
