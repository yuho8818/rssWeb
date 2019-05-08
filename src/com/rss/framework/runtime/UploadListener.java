package com.rss.framework.runtime;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.Iterator;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.FileUploadException;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;

/**********************************************************
 * [系统名]      RSS平台</br>
 * [包　名]		com.rss.framework.runtime</br>
 * [文件名]		UploadListener.java</br>
 * [功　能]		监听文件上传的Servlet
 * </br>
 *******************************************************</br>
 * REVISION      变更日期             变更人              变更内容</br>
 *******************************************************</br>
 * v1.00             2011-3-15           胡清河                创建</br>
 * v1.01             2013-6-28           祖佳宁                修改
 *
 ***********************************************************/
public class UploadListener extends HttpServlet {

	/**
	 * serializable的静态终态 serialVersionUID 字段
	 */
	private static final long serialVersionUID = 6524152101170794430L;

	@Override
	protected void doPost(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
		String operation = request.getParameter("operation");
		if ("update".equals(operation)) {
			doUpdate(request, response);
		} else {
			doUpload(request, response);
		}
	}

	/**
	 * 将服务器上存储的文件移动至指定位置
	 * @param request 请求对象
	 * @param response 响应对象
	 * @throws ServletException 异常
	 * @throws IOException 异常
	 */
	protected void doUpdate(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
		String oldFilePath = new String(request.getParameter("oldFilePath")
				.getBytes("ISO8859-1"), "UTF-8");
		String newFilePath = new String(request.getParameter("newFilePath")
				.getBytes("ISO8859-1"), "UTF-8");
		String fileName = new String(request.getParameter("fileName").getBytes(
				"ISO8859-1"), "UTF-8");
		String path = this.getServletContext().getRealPath("/");
		if (newFilePath != null && !"".equals(newFilePath)) {
			File newFilePathFile = new File(path + newFilePath);
			if (!newFilePathFile.exists()) {
				newFilePathFile.mkdirs();
			}
		}
		this.copyFile(path + oldFilePath + "\\" + fileName, path + newFilePath + "\\" + fileName);
		this.delFile(path + oldFilePath + "\\" + fileName);
		File oldFilePathFile = new File(path + oldFilePath);
		String[] tempList = oldFilePathFile.list();
		if (tempList.length == 0) {
			oldFilePathFile.delete();
		}
		response.setContentType("text/plain");
		response.setCharacterEncoding("UTF-8");
		response.getWriter().write("MOVE FILE SUCCESS!");
	}

	/**
	 * 复制单个文件
	 * 
	 * @param oldPath
	 *            String 原文件路径 如：c:/fqf.txt
	 * @param newPath
	 *            String 复制后路径 如：f:/fqf.txt
	 * @return boolean
	 */
	private void copyFile(String oldPath, String newPath) {
		try {
			int bytesum = 0;
			int byteread = 0;
			File oldfile = new File(oldPath);
			if (oldfile.exists()) { // 文件存在时
				FileInputStream inStream = new FileInputStream(oldPath); // 读入原文件
				FileOutputStream fs = new FileOutputStream(newPath);
				byte[] buffer = new byte[1444];
				while ((byteread = inStream.read(buffer)) != -1) {
					bytesum += byteread; // 字节数 文件大小
//					System.out.println(bytesum);
					fs.write(buffer, 0, byteread);
				}
				inStream.close();
				fs.flush();
				fs.close();
			}
		} catch (Exception e) {
			System.out.println("复制单个文件操作出错");
			e.printStackTrace();
		}
	}
	
	  /** 
     * 删除文件 
     * @param filePathAndName String 文件路径及名称 如c:/fqf.txt 
     * @param fileContent String 
     */ 
   public void delFile(String filePathAndName) { 
       try { 
           String filePath = filePathAndName; 
           filePath = filePath.toString(); 
           File myDelFile = new File(filePath); 
           myDelFile.delete(); 
       } 
       catch (Exception e) { 
           System.out.println("删除文件操作出错"); 
           e.printStackTrace(); 
       } 

   } 

   /**
    * 上传文件
    * @param request 请求对象
    * @param response 响应对象
    * @throws ServletException 异常
    * @throws IOException 异常
    */
	protected void doUpload(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
		DiskFileItemFactory factory = new DiskFileItemFactory();
		ServletFileUpload fileUpload = new ServletFileUpload(factory);
		fileUpload.setHeaderEncoding("UTF-8");
		fileUpload.setSizeMax(1024 * 1025 * 1024);
		String uploadFilePath = null;
		try {
			request.setCharacterEncoding("UTF-8");
			List items = fileUpload.parseRequest(request);
			Iterator iter = items.iterator();
			while (iter.hasNext()) {
				FileItem item = (FileItem) iter.next();
				// isFormField方法用于判断FileItem类对象封装的数据是否属于一个普通表单字段，
				// 还是属于一个文件表单字段，如果是普通表单字段则返回true，否则返回false
				if (item.isFormField()) {
					String name = item.getFieldName();
					String value = item.getString("UTF-8");
					if ("uploadFilePath".equals(name)) {
						uploadFilePath = value;
						if (!uploadFilePath.endsWith("\\")) {
							uploadFilePath += "\\";
						}
					}
				} else {
					String fileName = item.getName();
					String path = this.getServletContext().getRealPath("/");
					if (uploadFilePath != null && !"".equals(uploadFilePath)) {
						path += uploadFilePath;
						File uploadedFilePath = new File(path);
						if (!uploadedFilePath.exists()) {
							uploadedFilePath.mkdirs();
						}
					}
					File uploadedFile = new File(path + fileName);
					item.write(uploadedFile);
				}
			}
		} catch (FileUploadException e) {
			e.printStackTrace();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

}
