package com.rss.framework.util;


import java.util.UUID;

/**********************************************************
 * [系统名]      RSS平台</br>
 * [包　名]		com.rss.framework.business</br>
 * [文件名]		ObjectUIDGenerater.java</br>
 * [功　能]		构造新增数据时的主键字段
 * </br>
 *******************************************************</br>
 * REVISION      变更日期             变更人              变更内容</br>
 *******************************************************</br>
 * v1.00             2011-3-15           胡清河                创建</br>
 * v1.01             2013-6-28           祖佳宁                修改
 *
 ***********************************************************/
public class ObjectUIDGenerater {
	
	/**
	 * 构造函数
	 */
    public ObjectUIDGenerater() {
    }

    /**
     * 生成主键
     * @return String 生成32位的随机数作为id
     */
    public String generate() {
        String uuid = UUID.randomUUID().toString();   //转化为String对象
        uuid = uuid.replace("-", "");
        return uuid.toUpperCase();
    }

}