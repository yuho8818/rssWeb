package com.rss.framework.business;

import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.apache.commons.dbcp.BasicDataSource;
import org.apache.log4j.Logger;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowCallbackHandler;
import org.springframework.transaction.annotation.Transactional;

import com.rss.framework.util.ObjectUIDGenerater;
import com.rss.framework.util.OperationLogBean;
import com.rss.framework.util.PageSqlTool;
import com.rss.framework.util.RssRuntimeException;

@Transactional
/**********************************************************
 * [系统名]      RSS平台</br>
 * [包　名]		com.rss.framework.business</br>
 * [文件名]		BasicDataService.java</br>
 * [功　能]		响应前台请求的基础Service类
 * </br>
 *******************************************************</br>
 * REVISION      变更日期             变更人              变更内容</br>
 *******************************************************</br>
 * v1.00             2011-3-15           胡清河                创建</br>
 * v1.01             2013-6-28           祖佳宁                修改
 *
 ***********************************************************/
public class BasicDataService implements IDataService {
	
	/**
	 * serializable的静态终态 serialVersionUID 字段
	 */
	private static final long serialVersionUID = -3970600452257134597L;
	/**
	 * 数据库处理类
	 */
	private JdbcTemplate jdbcTemplate;
	/**
	 * MYSQL数据库的驱动名称
	 */
	private final static String DRIVER_CLASS_NAME_MYSQL = "com.mysql.jdbc.Driver";
	/**
	 * SQLSERVER数据库的驱动名称
	 */
	private final static String DRIVER_CLASS_NAME_SQLSERVER = "com.microsoft.sqlserver.jdbc.SQLServerDriver";
	/**
	 * ORACLE数据库的驱动名称
	 */
	private final static String DRIVER_CLASS_NAME_ORACLE = "oracle.jdbc.driver.OracleDriver";
	
	private final static String OPERATION_UPDATE = "更新";
	
	private final static String OPERATION_DELETE = "删除";
	/**
	 * log类
	 */
	private static final Logger logger = Logger.getLogger(BasicDataService.class);

	public JdbcTemplate getJdbcTemplate() {
		return jdbcTemplate;
	}

	public void setJdbcTemplate(JdbcTemplate jdbcTemplate) {
		this.jdbcTemplate = jdbcTemplate;
	}
	
	private String ip = "";
	private String mac = "";
	private String userID="";

	/**
	 * 默认执行方法
	 * @param message 前台传递的数据
	 * @return 处理结束后返回的数据
	 * @throws RssRuntimeException 异常
	 */
	public String execute(ArrayList<BusinessObjectEntity> entityList, String ip, String mac,String userID) throws RssRuntimeException {
		logger.info("***************FUNCTION [BasicDataService] START*****************");
		this.ip = ip;
		this.mac = mac;
		this.userID=userID;
		ArrayList<BusinessObjectEntity> newEntityList = new ArrayList<BusinessObjectEntity>();	
		if (entityList != null && entityList.size() > 0) {					
			for (BusinessObjectEntity entity : entityList) {
				String operation = entity.getOperation();
				if (entity.getSql()==null || entity.getSql().length()==0){					
					if ("save".equals(operation)) {
//						if (!checkEntityUnique(entity))
//							throw new RssRuntimeException("记录已存在");
						newEntityList.add(insertInstance(entity));
					} else if ("update".equals(operation)) {
						if (checkEntityUnique(entity)) 
							throw new RssRuntimeException("记录不存在");
						newEntityList.add(updateInstance(entity));
					} else if ("delete".equals(operation)) {
						if (checkEntityUnique(entity)) 
							throw new RssRuntimeException("记录不存在");
						newEntityList.add(deleteInstance(entity));
					} else 	newEntityList.addAll(findInstances(entity));
				}else{
					if ("query".equals(operation)){
						newEntityList.addAll(queryBySqlEntity(entity));
					}
					else if("saves".equals(operation)){
						String sql=entity.getSql();
						String[] tp=sql.split("\\?");
						String[] params=new String[tp.length-1];
						for(int i=0;i<params.length;i++)
							params[i]= new ObjectUIDGenerater().generate();
						newEntityList.add(updateBySqlEntity(entity, params));
					}
					else 
						newEntityList.add(updateBySqlEntity(entity, null));
				}
				
			}
			
		}
		
		if (newEntityList.size() == 0) {
			throw new RssRuntimeException("没有记录！");			
		}
		logger.info("***************FUNCTION [execute] END*****************");
		return JavaBeanAdapter.buildMessageFromObjectList(newEntityList);
	}
	
	private ArrayList<BusinessObjectEntity> queryBySqlEntity(BusinessObjectEntity entity) {
		logger.info("***************FUNCTION [queryBySql] START*****************");
		final ArrayList<BusinessObjectEntity> result = new ArrayList<BusinessObjectEntity>();
		final BusinessObjectEntity sqlEntity= entity;
		jdbcTemplate.query(entity.getSql(), new RowCallbackHandler() {
			public void processRow(ResultSet rs) throws SQLException {
				BusinessObjectEntity newEntity = new BusinessObjectEntity();
				newEntity.setObjectID(sqlEntity.getObjectID());
				BusinessEntityAttribute attr;
				ResultSetMetaData meta = rs.getMetaData();
				for (int index = 1; index <= meta.getColumnCount(); index++) {
					attr = new BusinessEntityAttribute();
					attr.setAttributeID(meta.getColumnName(index));
						attr.setAttributeValue(rs.getObject(index));
						newEntity.addAttribute(attr);
				}
				Object[] params = new Object[1];
				params[0] = newEntity.getAttributeValue(sqlEntity.getObjectID() + "UID");
				/*if (sqlEntity.getChildList()!=null && sqlEntity.getChildList().size()>0){
					for (BusinessObjectEntity childEntity:sqlEntity.getChildList()){
						newEntity.addChildList(queryBySql(childEntity.getSql(), params));
						result.add(newEntity);
					}					
				}*/
				result.add(newEntity);
			}
		});
		logger.info("***************FUNCTION [queryBySql] END*****************");
		return result;
	}
	/**
	 * 执行查询
	 * @param sql 查询用的SQL语句
	 * @param params SQL语句中需要的参数
	 * @return 查询所得的数据结果
	 */
	private ArrayList<BusinessObjectEntity> queryBySql(String sql, Object[] params) {
		logger.info("***************FUNCTION [queryBySql] START*****************");
		final ArrayList<BusinessObjectEntity> result = new ArrayList<BusinessObjectEntity>();
		jdbcTemplate.query(sql, params, new RowCallbackHandler() {
			public void processRow(ResultSet rs) throws SQLException {
				BusinessObjectEntity newEntity = new BusinessObjectEntity();
				newEntity.setObjectID("result");
				BusinessEntityAttribute attr;
				ResultSetMetaData meta = rs.getMetaData();
				for (int index = 1; index <= meta.getColumnCount(); index++) {
					attr = new BusinessEntityAttribute();
					attr.setAttributeID(meta.getColumnName(index));
					attr.setAttributeValue(rs.getObject(index));
					newEntity.addAttribute(attr);
				}
				result.add(newEntity);
			}
		});
		logger.info("***************FUNCTION [queryBySql] END*****************");
		return result;
	}
	/**
	 * 支持更新带子表的数据
	 * @param entity 更新条件实体对象
	 * @return 更新结果
	 */
	private BusinessObjectEntity updateBySqlEntity(BusinessObjectEntity entity,Object[]params) {
		logger.info("***************FUNCTION [updateBySql] START*****************");
		BusinessObjectEntity newEntity = new BusinessObjectEntity();
		newEntity.setObjectID(entity.getObjectID());
		newEntity.setSql(entity.getSql());
		int updateRowsNum=0;
		if (params == null)
			updateRowsNum=jdbcTemplate.update(entity.getSql());
		else 
			updateRowsNum = jdbcTemplate.update(entity.getSql(), params);		
		newEntity.setMessage(entity.getOperation()+updateRowsNum+"条记录");		
		if (entity.getChildList()!=null && entity.getChildList().size()>0){
			for (BusinessObjectEntity childEntity:entity.getChildList()){
				Object[] childParams = new Object[1];
				childParams[0] = newEntity.getAttributeValue(entity.getObjectID() + "UID");				
				newEntity.addChild(updateBySqlEntity(childEntity, childParams));
				
			}					
		}
		
		logger.info("***************FUNCTION [queryBySql] END*****************");
		return newEntity;
	}
	
	

	
	/**
	 * 检查数据唯一性
	 * @param entity 数据集
	 * @return 是否唯一
	 */
	private boolean checkEntityUnique(BusinessObjectEntity entity) {
		logger.info("***************FUNCTION [checkEntityUnique] START*****************");
		ArrayList<String> uniques = entity.getUniqueList();
		
			Object objectUID = entity.getAttributeValue(entity.getObjectID() + "UID");
			String sql = "select count(*) rsCount from " + entity.getObjectID();
			if (objectUID == null) {
				sql += " where " + entity.getObjectID() + "UID is not ?";
			} else {
				sql += " where " + entity.getObjectID() + "UID != ? ";
			}
			int k=0;
			if (uniques != null && uniques.size() > 0) {
				k=uniques.size();
				sql+=" and ";
			}
			Object[] params = new Object[k + 1];
			params[0] = objectUID;
			for (int index = 0; index < uniques.size(); index++) {
				sql += uniques.get(index) + "=?";
				params[index + 1] = entity.getAttributeValue(uniques.get(index));
				if (index != uniques.size() - 1) {
					sql += " and ";
				}
			}
			logger.info("****CHECK SQL:" + sql + "****");
			String paramsLog = "****params:[";
			for (int i = 0; i < params.length; i++) {
				if (i != params.length - 1) {
					paramsLog += params[i] + ",";
				} else {
					paramsLog += params[i];
				}
			}
			paramsLog += "]****";
			logger.info(paramsLog);
			int count = jdbcTemplate.queryForInt(sql, params);
			if (count > 0) {
				logger.info("***************FUNCTION [checkEntityUnique] END*****************");
				return false;
			}
		
		logger.info("***************FUNCTION [checkEntityUnique] END*****************");
		return true;
	}

	/**
	 * 数据插入操作
	 * @param entity 数据
	 * @return 插入的数据
	 */
	private BusinessObjectEntity insertInstance(BusinessObjectEntity entity) {
		logger.info("***************FUNCTION [insertInstance] START*****************");
		String objectUID = entity.getObjectID() + "UID";
		BusinessEntityAttribute attr = new BusinessEntityAttribute();
		attr.setAttributeID(objectUID);
		String objectUIDValue = new ObjectUIDGenerater().generate();
		attr.setAttributeValue(objectUIDValue);
		entity.addAttribute(attr);
		ArrayList<BusinessEntityAttribute> attrList = entity.getAttributeList();
		String firstSql = "insert into " + entity.getObjectID() + " (";
		String secondSql = " values(";
		Object[] params = new Object[attrList.size()];
		for (int index = 0; index < attrList.size(); index++) {
			attr = attrList.get(index);
			firstSql += attr.getAttributeID();
			secondSql += "?";
			params[index] = attr.getAttributeValue();
			if (index != attrList.size() - 1) {
				firstSql += ",";
				secondSql += ",";
			}
		}
		firstSql += ")";
		secondSql += ")";
		logger.info("****INSERT SQL:" + firstSql + secondSql + "****");
		String paramsLog = "****params:[";
		for (int i = 0; i < params.length; i++) {
			if (i != params.length - 1) {
				paramsLog += params[i] + ",";
			} else {
				paramsLog += params[i];
			}
		}
		paramsLog += "]****";
		logger.info(paramsLog);
		jdbcTemplate.update(firstSql + secondSql, params);
		ArrayList<BusinessObjectEntity> childList = entity.getChildList();
		if (childList != null && childList.size() > 0) {
			OperationLogBean childOperationLog = new OperationLogBean();
			childOperationLog.setUserID(userID);
			childOperationLog.setLoginIp(this.ip);
			childOperationLog.setLoginMac(this.mac);
			childOperationLog.setTableName(entity.getObjectID());
			childOperationLog.setType(OPERATION_UPDATE);
			childOperationLog.setCreateDate(new Date());
			childOperationLog.setDataKey(objectUIDValue);
			this.insertOperationLog(childOperationLog);

			BusinessObjectEntity child;
			for (int index = 0; index < childList.size(); index++) {
				child = childList.get(index);
				attr = new BusinessEntityAttribute();
				attr.setAttributeID(objectUID);
				attr.setAttributeValue(entity.getAttributeValue(objectUID));
				child.removeAttributeByID(objectUID);
				child.addAttribute(attr);
				child = insertInstance(child);
				entity.setChild(index, child);
			}
		}
		logger.info("***************FUNCTION [insertInstance] END*****************");
		return entity;
	}

	/**
	 * 更新数据操作
	 * @param entity 数据
	 * @return 更新后的数据
	 */
	private BusinessObjectEntity updateInstance(BusinessObjectEntity entity) {
		logger.info("***************FUNCTION [updateInstance] START*****************");
		String objectUID = entity.getObjectID() + "UID";
		ArrayList<BusinessEntityAttribute> attrList = entity.getAttributeList();
		String sql = "update " + entity.getObjectID() + " set ";
		Object[] params = new Object[attrList.size() + 1];
		BusinessEntityAttribute attr;
		for (int index = 0; index < attrList.size(); index++) {
			attr = attrList.get(index);
			sql += attr.getAttributeID() + "=?";
			params[index] = attr.getAttributeValue();
			if (index != attrList.size() - 1) {
				sql += " , ";
			}
		}
		sql += " where " + objectUID + "=?";
		params[attrList.size()] = entity.getAttributeValue(objectUID);
		logger.info("****UPDATE SQL:" + sql + "****");
		String paramsLog = "****params:[";
		for (int i = 0; i < params.length; i++) {
			if (i != params.length - 1) {
				paramsLog += params[i] + ",";
			} else {
				paramsLog += params[i];
			}
		}
		paramsLog += "]****";
		logger.info(paramsLog);
		jdbcTemplate.update(sql, params);
		
		boolean isSaveLog = entity.isSaveLog();
		if (isSaveLog) {
			OperationLogBean operationLog = new OperationLogBean();
			operationLog.setUserID(entity.getAttributeValue("lastModifyMan").toString());
			operationLog.setLoginIp(this.ip);
			operationLog.setLoginMac(this.mac);
			operationLog.setTableName(entity.getObjectID());
			operationLog.setType(OPERATION_UPDATE);
			operationLog.setCreateDate(new Date());
			operationLog.setDataKey(entity.getAttributeValue(objectUID).toString());
			this.insertOperationLog(operationLog);
		}
		ArrayList<BusinessObjectEntity> childList = entity.getChildList();
		if (childList != null && childList.size() > 0) {
			String tableName = "";
			String oldTableName = "";
			for (BusinessObjectEntity child : childList) {
				tableName = child.getObjectID();
				if (!tableName.equals(oldTableName)) {
					String deleteSql = "delete from " + tableName + " where " + objectUID + " = '" + entity.getAttributeValue(objectUID) + "'";
					logger.info("****DELETE SQL:" + deleteSql + "****");
					jdbcTemplate.update(deleteSql);
				}
				attr = new BusinessEntityAttribute();
				attr.setAttributeID(objectUID);
				attr.setAttributeValue(entity.getAttributeValue(objectUID));
				child.removeAttributeByID(objectUID);
				child.addAttribute(attr);
				
				String childObjectUID = child.getObjectID() + "UID";
				child.removeAttributeByID(childObjectUID);
				
				insertInstance(child);
				
				oldTableName = child.getObjectID();
			}
		}
		logger.info("***************FUNCTION [updateInstance] END*****************");
		return entity;
	}

	/**
	 * 删除数据操作
	 * @param entity 数据
	 * @return 删除的数据
	 */
	private BusinessObjectEntity deleteInstance(BusinessObjectEntity entity) {
		logger.info("***************FUNCTION [deleteInstance] START*****************");
		ArrayList<BusinessObjectEntity> childList = entity.getChildList();
		if (childList != null && childList.size() > 0) {
			for (BusinessObjectEntity child : childList) {
				deleteInstance(child);
			}
		}
		String objectUID = entity.getObjectID() + "UID";
		String sql = "delete from " + entity.getObjectID() + " where " + objectUID + "=?";
		Object[] params = new Object[] { entity.getAttributeValue(objectUID) };
		logger.info("****DELETE SQL:" + sql + "****");
		String paramsLog = "****params:[";
		for (int i = 0; i < params.length; i++) {
			if (i != params.length - 1) {
				paramsLog += params[i] + ",";
			} else {
				paramsLog += params[i];
			}
		}
		paramsLog += "]****";
		logger.info(paramsLog);
		jdbcTemplate.update(sql, params);
		
		boolean isSaveLog = entity.isSaveLog();
		if (isSaveLog) {
			OperationLogBean operationLog = new OperationLogBean();			
			operationLog.setUserID(userID);
			operationLog.setLoginIp(this.ip);
			operationLog.setLoginMac(this.mac);
			operationLog.setTableName(entity.getObjectID());
			operationLog.setType(OPERATION_DELETE);
			operationLog.setCreateDate(new Date());
			operationLog.setDataKey(entity.getAttributeValue(objectUID).toString());
			this.insertOperationLog(operationLog);
		}
		
		logger.info("***************FUNCTION [deleteInstance] END*****************");
		return entity;
	}

	/**
	 * 查询数据操作
	 * @param entity 数据
	 * @return 查询的数据
	 */
	private ArrayList<BusinessObjectEntity> findInstances(BusinessObjectEntity entity) {
		logger.info("***************FUNCTION [findInstances] START*****************");
		final ArrayList<BusinessObjectEntity> result = new ArrayList<BusinessObjectEntity>();
		final String objectID = entity.getObjectID();
		if ("date".equals(objectID)) {
			result.add(this.getCurrentDateEntity());
			return result;
		}
		final ArrayList<BusinessObjectEntity> childList = entity.getChildList();
		ArrayList<BusinessEntityAttribute> attrList = entity.getAttributeList();
		BusinessEntityAttribute attr;
		String operator = "=";
		String selectSql = "select * from " + objectID;
		List<Object> paramList = new ArrayList<Object>();
		String condition = "";
		String orderBy = "";
		for (int index = 0; index < attrList.size(); index++) {
			attr = attrList.get(index);
			if (index == 0) {
				condition += " where ";
			}
			operator = attr.getOperator();
			if (operator == null || "".equals(operator)) {
				operator = "=";
			}
			if (!"in".equals(operator.trim()) && !"or".equals(operator.trim()) && !"whole".equals(operator.trim())) {
				condition += attr.getAttributeID() + " " + operator + " ?";
			}
			if ("like".equals(operator.trim())) {
				paramList.add("%" + attr.getAttributeValue() + "%");
			} else if ("in".equals(operator.trim())) {
				String tempValue = attr.getAttributeValue().toString();
				String[] tempValueArray = tempValue.split(",");
				condition += attr.getAttributeID() + " in (";
				for (int i = 0; i < tempValueArray.length; i++) {
					condition += " ? ";
					paramList.add(tempValueArray[i]);
					if (i != tempValueArray.length - 1) {
						condition += " , ";
					}
				}
				condition += " ) ";
			} else if ("or".equals(operator.trim())) {
				String tempValue = attr.getAttributeValue().toString();
				String[] tempValueArray = tempValue.split(",");
				condition += " ( ";
				for (int i = 0; i < tempValueArray.length; i++) {
					condition += attr.getAttributeID() + " = ? ";
					paramList.add(tempValueArray[i]);
					if (i != tempValueArray.length - 1) {
						condition += " or ";
					}
				}
				condition += " ) ";
			} else if ("whole".equals(operator.trim())) {
				condition += " ( ";
				condition += attr.getAttributeValue().toString();
				condition += " ) ";
			} else {
				paramList.add(attr.getAttributeValue());
			}
			if (index != attrList.size() - 1) {
				condition += " and ";
			}
		}

		Object[] params = new Object[paramList.size()];
		int valueIndex = 0;
		for (Object object : paramList) {
			params[valueIndex++] = object;
		}
		final PageSqlTool pageSqlTool = new PageSqlTool();
		String countSql = "select count(1) from (" + selectSql + condition + ") as total";
		logger.info("****QUERY SQL:" + countSql + "****");
		String paramsLog = "****params:[";
		for (int i = 0; i < params.length; i++) {
			if (i != params.length - 1) {
				paramsLog += params[i] + ",";
			} else {
				paramsLog += params[i];
			}
		}
		paramsLog += "]****";
		logger.info(paramsLog);
		int count = jdbcTemplate.queryForInt(countSql, params);
		String orderByString = entity.getOrderBy();
		if (orderByString != null && !"".equals(orderByString)) {
			orderBy += " order by " + orderByString;
		}
		pageSqlTool.setTotalRecords(count);
		pageSqlTool.setPageNo(Integer.parseInt(entity.getPageNo()));
		pageSqlTool.setPageSize(Integer.parseInt(entity.getPageSize()));
		pageSqlTool.setHsqString(selectSql);
		pageSqlTool.setCondition(condition);
		pageSqlTool.setOrderBy(orderBy);
		BasicDataSource dataSource = (BasicDataSource)(jdbcTemplate.getDataSource());
		String driverClassName = dataSource.getDriverClassName();
		String sql = "";
		if (DRIVER_CLASS_NAME_MYSQL.equals(driverClassName)) {
			sql = pageSqlTool.getMySqlPageSql();
		} else if (DRIVER_CLASS_NAME_SQLSERVER.equals(driverClassName)) {
			sql = pageSqlTool.getSqlserverPageSql(objectID);
			if (pageSqlTool.getPageSize() != -1)  {
				Object[] params1 = new Object[params.length * 2];
				System.arraycopy(params, 0, params1, 0, params.length);
				System.arraycopy(params, 0, params1, params.length, params.length);
				params = params1;
			}
		} else if (DRIVER_CLASS_NAME_ORACLE.equals(driverClassName)) {
			sql = pageSqlTool.getOraclePageSql();
		}
		logger.info("****QUERY SQL:" + sql + "****");
		String paramsLog1 = "****params:[";
		for (int i = 0; i < params.length; i++) {
			if (i != params.length - 1) {
				paramsLog1 += params[i] + ",";
			} else {
				paramsLog1 += params[i];
			}
		}
		paramsLog1 += "]****";
		logger.info(paramsLog1);
		jdbcTemplate.query(sql, params, new RowCallbackHandler() {
			public void processRow(ResultSet rs) throws SQLException {
				BusinessObjectEntity newEntity = new BusinessObjectEntity();
				newEntity.setObjectID(objectID);
				BusinessEntityAttribute attr;
				String objectUID = "";
				try {
					objectUID = rs.getString(objectID + "UID");
				} catch (SQLException e) {
				}
				ResultSetMetaData meta = rs.getMetaData();
				for (int index = 1; index <= meta.getColumnCount(); index++) {
					attr = new BusinessEntityAttribute();
					attr.setAttributeID(meta.getColumnName(index));
					attr.setAttributeValue(rs.getObject(index));
					newEntity.addAttribute(attr);
				}
				if (childList != null && childList.size() > 0) {
					for (BusinessObjectEntity child : childList) {
						attr = new BusinessEntityAttribute();
						attr.setAttributeID(objectID + "UID");
						attr.setAttributeValue(objectUID);
						child.removeAttributeByID(objectID + "UID");
						child.addAttribute(attr);
						newEntity.addChildList(findInstances(child));
					}
				}
				newEntity.setPageNo(pageSqlTool.getPageNo() + "");
				newEntity.setPageSize(pageSqlTool.getPageSize() + "");
				newEntity.setTotalRecords(pageSqlTool.getTotalRecords() + "");
				newEntity.setTotalPages(pageSqlTool.getTotalPages() + "");
				result.add(newEntity);
			}
		});
		logger.info("***************FUNCTION [findInstances] END*****************");
		return result;
	}
	
	
	private BusinessObjectEntity getCurrentDateEntity() {
		BusinessObjectEntity dateEntity = new BusinessObjectEntity();
		dateEntity.setObjectID("date");
		BusinessEntityAttribute attr = new BusinessEntityAttribute();
		attr.setAttributeID("curr_date");
		Date date = new Date();
		SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
		attr.setAttributeValue(formatter.format(date));
		dateEntity.addAttribute(attr);
		return dateEntity;
	}
	
	private void insertOperationLog(OperationLogBean operationLog) {
		String sql = "INSERT INTO operation_log (userID, loginIp, loginMac, tableName, " +
				"type, createDate, dataKey) VALUES (?, ?, ?, ?, ?, ?, ?)";
		Object[] params = new Object[7];
		params[0] = operationLog.getUserID();
		params[1] = operationLog.getLoginIp();
		params[2] = operationLog.getLoginMac();
		params[3] = operationLog.getTableName();
		params[4] = operationLog.getType();
		params[5] = operationLog.getCreateDate();
		params[6] = operationLog.getDataKey();
		

		
		jdbcTemplate.update(sql, params);
	}

}
