package com.rss.framework.business;

import java.io.File;
import java.io.StringReader;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.StringTokenizer;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;

import org.apache.log4j.Logger;
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;
import org.xml.sax.InputSource;

import com.rss.framework.util.XMLBuilder;

public final class JavaBeanAdapter {

	private static final Logger logger = Logger.getLogger(JavaBeanAdapter.class);

	/** Characters that need conversion to entities in XML. */
	private static String SPECIAL_CHARS = "\"<>&";

	/**
	 * Map providing correlation between special characters and corresponding
	 * entities.
	 */
	private static java.util.Hashtable specialCharsMap = new java.util.Hashtable();

	static {
		// Initialeze special character Map.
		specialCharsMap.put("<", "&lt;");
		specialCharsMap.put(">", "&gt;");
		specialCharsMap.put("\"", "&quot;");
		specialCharsMap.put("\'", "&apos;");
		specialCharsMap.put("&", "&amp;");
	}

	/**
	 * Returns passed in string with all the special characters dissalowed in
	 * XML attributes and elements replaced with the corresponding entities.
	 * 
	 * @param aStr
	 *            String that possibly contains characters that have to be
	 *            escaped.
	 */
	public static String xmlize(String aStr) {
		if (aStr == null) {
			return "";
		}
		StringTokenizer st = new StringTokenizer(aStr, SPECIAL_CHARS, true);
		StringBuffer sb = new StringBuffer();

		while (st.hasMoreTokens()) {
			String token = st.nextToken();

			if (SPECIAL_CHARS.indexOf(token) >= 0) {
				sb.append((String) specialCharsMap.get(token));

			} else {
				sb.append(token);
			}
		}
		return sb.toString();
	}

	public static Document buildDOMFromFile(File pFile) {
		logger.info("***************FUNCTION [buildDOMFromFile] START*****************");
		Document doc = null;
		try {
			DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
			factory.setValidating(false);
			factory.setIgnoringElementContentWhitespace(true);
			DocumentBuilder builder = factory.newDocumentBuilder();
			doc = builder.parse(pFile);

		} catch (Exception pException) {
		}
		logger.info("***************FUNCTION [buildDOMFromFile] END*****************");
		return doc;

	}

	public static Document buildDomFromXMLString(String xmlString) {
		logger.info("***************FUNCTION [buildDomFromXMLString] START*****************");
		Document doc = null;
		try {
			DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
			factory.setValidating(false);
			factory.setIgnoringElementContentWhitespace(true);
			DocumentBuilder builder = factory.newDocumentBuilder();
			StringReader sr = new StringReader(removeXMLStringSpace(xmlString));
			doc = builder.parse(new InputSource(sr));

		} catch (Exception ex) {
			logger.info("IOException : " + ex.getMessage());
			ex.printStackTrace();
		} finally {
			logger.info("***************FUNCTION [buildDomFromXMLString] END*****************");
		}
		return doc;

	}

	public final static String removeXMLStringSpace(String xmlString) {
//		xmlString = xmlString.replaceAll("\n", "");
		xmlString = xmlString.replaceAll("\t", "");
//		xmlString = xmlString.replaceAll("\\s{1,}", " ");
		xmlString = xmlString.replaceAll("> <", "><");
		xmlString.trim();
		return xmlString;
	}

	public final static String getNodeType(Node pNode) {
		String type;
		switch (pNode.getNodeType()) {
		case Node.ELEMENT_NODE:
			type = "Element";
			break;
		case Node.ATTRIBUTE_NODE:
			type = "Attribute";
			break;
		case Node.TEXT_NODE:
			type = "Text";
			break;
		case Node.CDATA_SECTION_NODE:
			type = "CData section";
			break;
		case Node.ENTITY_REFERENCE_NODE:
			type = "Entity reference";
			break;
		case Node.PROCESSING_INSTRUCTION_NODE:
			type = "Processing instruction";
			break;
		case Node.COMMENT_NODE:
			type = "Comment";
			break;
		case Node.DOCUMENT_NODE:
			type = "Document";
			break;
		case Node.DOCUMENT_TYPE_NODE:
			type = "Document type";
			break;
		case Node.DOCUMENT_FRAGMENT_NODE:
			type = "Document fragment";
			break;
		case Node.NOTATION_NODE:
			type = "Notiation";
			break;
		default:
			type = "Unknown";
			break;
		}
		return type;
	}

	public static String buildMessageFromObjectList(List<BusinessObjectEntity> objectList) {
		logger.info("***************FUNCTION [buildMessageFromObjectList] START*****************");
		XMLBuilder builder = new XMLBuilder();
		if (objectList != null && objectList.size() > 0) {
			//String objectID = objectList.get(0).getObjectID();
			builder.addStartTag("response");
			for (BusinessObjectEntity object : objectList) {
				builder.addXML(buildXMLFromObject(object));
			}
			builder.addEndTag("response");
		}
		logger.info("***************FUNCTION [buildMessageFromObjectList] END*****************");
		return builder.getResult();
	}
/*
	public static String buildMessageFromObject(BusinessObjectEntity entity) {
		logger.info("***************FUNCTION [buildMessageFromObject] START*****************");
		XMLBuilder builder = new XMLBuilder();
		if (entity != null) {
			builder.addStartTag(entity.getObjectID() + "List");
			builder.addXML(buildXMLFromObject(entity));
			builder.addEndTag(entity.getObjectID() + "List");
		}
		logger.info("***************FUNCTION [buildMessageFromObject] END*****************");
		return builder.getResult();
	}*/

	private static String buildXMLFromObject(BusinessObjectEntity object) {
		XMLBuilder builder = new XMLBuilder();
		if (object != null) {
			builder.addBeginOfStartTag(object.getObjectID());
			String sql = object.getSql();
			if (sql!= null)
				builder.addRequiredAttribute("sql", sql);
			
			String message = object.getMessage();
			if (message != null)
				builder.addRequiredAttribute("message", message);
			
			
			String pageSize = object.getPageSize();
			if (pageSize != null)
				builder.addRequiredAttribute("pageSize", pageSize);
			String pageNo = object.getPageNo();
			if (pageNo != null)
				builder.addRequiredAttribute("pageNo", pageNo);
			String totalRecords = object.getTotalRecords();
			if (totalRecords != null)
				builder.addRequiredAttribute("totalRecords", totalRecords);
			String totalPages = object.getTotalPages();
			if (totalPages != null)
				builder.addRequiredAttribute("totalPages", totalPages);
			builder.addEndOfStartTag();
			for (BusinessEntityAttribute attr : object.getAttributeList()) {
				if (attr.getAttributeValue() != null) {
					builder.addStartTag(attr.getAttributeID());
					builder.addText(attr.getAttributeValue().toString());
					builder.addEndTag(attr.getAttributeID());
				}
			}
			ArrayList<BusinessObjectEntity> childList = object.getChildList();
			if (childList != null && childList.size() > 0) {
				for (BusinessObjectEntity child : childList) {
					builder.addXML(buildXMLFromObject(child));
				}
			}
			builder.addEndTag(object.getObjectID());
		}
		return builder.getResult();
	}

	public static ArrayList<BusinessObjectEntity> getBusinessObjectListFromMessage(String message) {
		logger.info("***************FUNCTION [getBusinessObjectListFromMessage] START*****************");
		ArrayList<BusinessObjectEntity> result = new ArrayList<BusinessObjectEntity>();
		Document doc = buildDomFromXMLString(message);
		doc.normalize();
		Element root = doc.getDocumentElement();
		NodeList childNodes = root.getChildNodes();
		int tt=childNodes.getLength();
		for (int i = 0; i < childNodes.getLength(); i++) {
			//if(childNodes.item(i)instanceof Element){
				Element element = (Element) childNodes.item(i);
				result.add(getObjectFromElement(element,root.getNodeName()));
			//}
		}
		logger.info("***************FUNCTION [getBusinessObjectListFromMessage] END*****************");
		return result;
	}

	private static BusinessObjectEntity getObjectFromElement(Element element,String service) {
		logger.info("***************FUNCTION [getObjectFromElement] START*****************");
		BusinessObjectEntity newEntity = new BusinessObjectEntity();
		newEntity.setObjectID(element.getNodeName());
		newEntity.setService(service);
		Node operationNode = element.getAttributes().getNamedItem("operation");
		if (operationNode != null) {
			newEntity.setOperation(operationNode.getNodeValue());
		}
		Node sqlNode = element.getAttributes().getNamedItem("sql");
		if (sqlNode != null) {
			newEntity.setSql(sqlNode.getNodeValue());
		}
		
		Node pageSizeNode = element.getAttributes().getNamedItem("pageSize");
		if (pageSizeNode != null) {
			newEntity.setPageSize(pageSizeNode.getNodeValue());
		}
		Node pageNoNode = element.getAttributes().getNamedItem("pageNo");
		if (pageNoNode != null) {
			newEntity.setPageNo(pageNoNode.getNodeValue());
		}
		Node totalRecordsNode = element.getAttributes().getNamedItem("totalRecords");
		if (totalRecordsNode != null) {
			newEntity.setTotalRecords(totalRecordsNode.getNodeValue());
		}
		Node totalPagesNode = element.getAttributes().getNamedItem("totalPages");
		if (totalPagesNode != null) {
			newEntity.setTotalPages(totalPagesNode.getNodeValue());
		}
		Node orderByNode = element.getAttributes().getNamedItem("orderBy");
		if (orderByNode != null) {
			newEntity.setOrderBy(orderByNode.getNodeValue());
		}
		Node uniqueNode = element.getAttributes().getNamedItem("unique");
		if (uniqueNode != null) {
			String[] uniqueArray = uniqueNode.getNodeValue().split(",");
			for (String unique : uniqueArray) {
				newEntity.addUnique(unique);
			}
		}
		Node isSaveLogNode = element.getAttributes().getNamedItem("isSaveLog");
		newEntity.setSaveLog(false);
		if (isSaveLogNode != null) {
			String isSaveLogFlag = isSaveLogNode.getNodeValue();
			if ("true".equals(isSaveLogFlag)) {
				newEntity.setSaveLog(true);
			}
		}
		NodeList attrNodes = element.getChildNodes();
		for (int i = 0; i < attrNodes.getLength(); i++) {
			Node attrNode = attrNodes.item(i);
			if (attrNode.hasChildNodes()) {
				Node firstNode = attrNode.getFirstChild();
				if (firstNode.getNodeType() == Node.ELEMENT_NODE) {
					newEntity.addChild(getObjectFromElement((Element) attrNode,service));
				} else if (firstNode.getNodeType() == Node.TEXT_NODE) {
					BusinessEntityAttribute attr = new BusinessEntityAttribute();
					Node typeNode = attrNode.getAttributes().getNamedItem("dataType");
					String dataType = null;
					if (typeNode != null) {
						dataType = typeNode.getNodeValue();
					}
					attr.setAttributeID(attrNode.getNodeName());
					String value = firstNode.getNodeValue();
					if (dataType == null || "string".equals(dataType)) {
						attr.setAttributeValue(value);
					} else if ("datetime".equals(dataType)) {
						SimpleDateFormat formatDate = new SimpleDateFormat("yyyy-MM-dd hh:mm:ss");
						try {
							attr.setAttributeValue(formatDate.parse(value));
						} catch (ParseException e) {
							e.printStackTrace();
						}
					} else if ("date".equals(dataType)) {
//						SimpleDateFormat formatDate = new SimpleDateFormat("yyyy-MM-dd");
//						try {
//							attr.setAttributeValue(formatDate.parse(value));
//						} catch (ParseException e) {
//							e.printStackTrace();
//						}
						attr.setAttributeValue(value);
					} else if ("int".equals(dataType)) {
						attr.setAttributeValue(Integer.parseInt(value));
					} else if ("double".equals(dataType)) {
						attr.setAttributeValue(Double.parseDouble(value));
					}
					
					Node operatorNode = attrNode.getAttributes().getNamedItem("operator");
					if (operatorNode != null) {
						attr.setOperator(operatorNode.getNodeValue());
					}
					newEntity.addAttribute(attr);
				}
			}
		}
		logger.info("***************FUNCTION [getObjectFromElement] END*****************");
		return newEntity;
	}

	/*public static BusinessObjectEntity getBusinessEntityFromSQLMessage(String message) {
		logger.info("***************FUNCTION [getSQLFromSQLMessage] START*****************");
		Document doc = buildDomFromXMLString(message);
		doc.normalize();
		Element root = doc.getDocumentElement();
		Node objectIDNode = root.getAttributes().getNamedItem("objectID");
		BusinessObjectEntity entity=new BusinessObjectEntity();
		if (objectIDNode != null) {			
			entity.setObjectID(objectIDNode.getNodeValue());		
			NodeList childNodes = root.getChildNodes();
			for (int i = 0; i < childNodes.getLength(); i++) {
				Element element = (Element) childNodes.item(i);
				if (element.getNodeName()==entity.getObjectID()){
					entity.setSql(element.getNodeValue());
					
				}else {
					BusinessObjectEntity child=new BusinessObjectEntity();
					child.setObjectID(element.getNodeName());
					child.setSql(element.getNodeValue());
					
					entity.addChild(child);
				}
				
			}
		}	
		logger.info("***************FUNCTION [getSQLFromSQLMessage] END*****************");
		return entity;
	}
	*/

	public static String buildAttributeMessageFromObjectList(List<BusinessObjectEntity> objectList) {
		logger.info("***************FUNCTION [buildAttributeMessageFromObjectList] START*****************");
		XMLBuilder builder = new XMLBuilder();
		if (objectList != null && objectList.size() > 0) {
			String objectID = objectList.get(0).getObjectID();
			builder.addStartTag(objectID + "List");
			for (BusinessObjectEntity object : objectList) {
				builder.addXML(buildAttributeXMLFromObject(object));
			}
			builder.addEndTag(objectID + "List");
		}
		logger.info("***************FUNCTION [buildAttributeMessageFromObjectList] END*****************");
		return builder.getResult();
	}
	
	private static String buildAttributeXMLFromObject(BusinessObjectEntity object) {
		XMLBuilder builder = new XMLBuilder();
		if (object != null) {
			builder.addBeginOfStartTag(object.getObjectID());
			for (BusinessEntityAttribute attr : object.getAttributeList()) {
				if (attr.getAttributeValue() != null) {
					builder.addRequiredAttribute(attr.getAttributeID(), attr.getAttributeValue().toString());
				}
			}
			builder.addEndOfStartTag();
			
			ArrayList<BusinessObjectEntity> childList = object.getChildList();
			if (childList != null && childList.size() > 0) {
				for (BusinessObjectEntity child : childList) {
					builder.addXML(buildAttributeXMLFromObject(child));
				}
			}
			builder.addEndTag(object.getObjectID());
		}
		return builder.getResult();
	}
}