package com.rss.framework.util;

/**********************************************************
 * [系统名]      RSS平台</br>
 * [包　名]		com.rss.framework.util</br>
 * [文件名]		PageSqlTool.java</br>
 * [功　能]		SQL工具类
 * </br>
 *******************************************************</br>
 * REVISION      变更日期             变更人              变更内容</br>
 *******************************************************</br>
 * v1.00             2011-3-15           胡清河                创建</br>
 * v1.01             2013-6-28           祖佳宁                修改
 *
 ***********************************************************/
public class PageSqlTool {
	
	/**
	 * SQL语句
	 */
	private String hsqString;
	/**
	 * 单页显示的数据条数
	 */
	private int pageSize = -1;
	/**
	 * 页码
	 */
	private int pageNo = 1;
	/**
	 * 数据总数
	 */
	private int totalRecords = 0;
	
	private String condition = "";
	
	private String orderBy = "";

	public void setPageSize(int pageSize) {
		this.pageSize = pageSize;
	}

	public void setPageNo(int pageNo) {
		this.pageNo = pageNo;
	}

	public int getPageNo() {
		return pageNo;
	}

	public void setTotalRecords(int records) {
		this.totalRecords = records;
	}

	public int getPageSize() {
		return this.pageSize;
	}

	public int getTotalRecords() {
		return this.totalRecords;
	}

	/**
	 * 获取开始行号
	 * @return 开始行号
	 */
	public int getStartRow() {
		pageSize = pageSize == 0 ? 200 : pageSize;
		pageNo = pageNo == 0 ? 1 : pageNo;
		return (pageNo - 1) * Math.abs(pageSize);
	}

	/**
	 * 获取总页数
	 * @return 总页数
	 */
	public int getTotalPages() {
		if (pageSize == -1) {
			return 1;
		}
		if (totalRecords != 0) {
			if (totalRecords < Math.abs(pageSize))
				return 1;
			if (totalRecords % Math.abs(pageSize) == 0)
				return totalRecords / Math.abs(pageSize);
			else
				return ((totalRecords - (totalRecords % Math.abs(pageSize))) / Math.abs(pageSize)) + 1;

		} else
			return 0;
	}

	public void setHsqString(String newString) {
		hsqString = newString;
	}

	public String getHsqString() {
		return hsqString;
	}

	/**
	 * 取得MySql数据库中分段截取数据的SQL语句
	 * @return 分页sql语句
	 */
	public String getMySqlPageSql() {
		String mySqlPageSql = hsqString + condition + orderBy;
		if (mySqlPageSql == null || "".equals(mySqlPageSql.trim())) {
			return mySqlPageSql;
		}
		if (pageSize != -1) {
			mySqlPageSql += " limit " + pageSize * (pageNo - 1) + " , " + pageSize;
		}
		return mySqlPageSql;
	}

	/**
	 * 取得SqlServer数据库中分段截取数据的SQL语句
	 * @param objectId 数据主键
	 * @return 分页sql语句
	 */
	public String getSqlserverPageSql(String objectId) {
		String sqlserverPageSql = hsqString;
		if (sqlserverPageSql == null || "".equals(sqlserverPageSql.trim())) {
			return sqlserverPageSql;
		}
		if (pageSize != -1) {
//			sqlserverPageSql = "select top " + pageSize + " * from ( " + sqlserverPageSql + " ) as useSql where " + id + " not in (select top " + pageSize * (pageNo - 1) + " " + id
//			+ " from (" + sqlserverPageSql + ") as useSql)";
			String whereCondition = " where ";
			if (condition == null || !"".equals(condition.trim())) {
				whereCondition = condition + " and ";
			}
			sqlserverPageSql = "select top " + pageSize + " * from " + objectId + " as useSql " + whereCondition + objectId + "UID not in " +
					"(select top " + pageSize * (pageNo - 1) + " " + objectId + "UID from " + objectId + " " + condition + " " + orderBy + ") "
					+ " " + orderBy;
		} else {
			sqlserverPageSql = hsqString + condition + orderBy;
		}
		return sqlserverPageSql;
	}

	/**
	 * 取得Oracle数据库中分段截取数据的SQL语句
	 * @return 分页sql语句
	 */
	public String getOraclePageSql() {
		String oraclePageSql = hsqString + condition + orderBy;
		if (oraclePageSql == null || "".equals(oraclePageSql.trim())) {
			return oraclePageSql;
		}
		if (pageSize != -1) {
			oraclePageSql = "select * from ( select row_.*, rownum rownum_ from ( " + oraclePageSql + " ) row_ where rownum <= " + pageSize * pageNo + ") where rownum_ > " + pageSize
					* (pageNo - 1);
		}
		return oraclePageSql;
	}

	public String getCondition() {
		return condition;
	}

	public void setCondition(String condition) {
		this.condition = condition;
	}

	public String getOrderBy() {
		return orderBy;
	}

	public void setOrderBy(String orderBy) {
		this.orderBy = orderBy;
	}

}
