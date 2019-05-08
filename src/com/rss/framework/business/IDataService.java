package com.rss.framework.business;

import java.util.ArrayList;

import org.springframework.jdbc.core.JdbcTemplate;

import com.rss.framework.util.RssRuntimeException;

public interface IDataService {
	public JdbcTemplate getJdbcTemplate();
	public void setJdbcTemplate(JdbcTemplate jdbcTemplate);
	public String execute(ArrayList<BusinessObjectEntity> entityList, String ip, String mac, String userID) throws RssRuntimeException;

}
