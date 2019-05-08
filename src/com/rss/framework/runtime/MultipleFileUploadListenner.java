package com.rss.framework.runtime;

import java.io.File;
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
 * [文件名]		MultipleFileUploadListenner.java</br>
 * [功　能]		监听多个文件上传的Servlet
 * </br>
 *******************************************************</br>
 * REVISION      变更日期             变更人              变更内容</br>
 *******************************************************</br>
 * v1.00             2011-3-15           胡清河                创建</br>
 * v1.01             2013-6-28           祖佳宁                修改
 *
 ***********************************************************/
public class MultipleFileUploadListenner extends HttpServlet {
	
	/**
	 * serializable的静态终态 serialVersionUID 字段
	 */
	private static final long serialVersionUID = 5425836142860976977L;
	/**
	 * 定义文件的上传路径
	 */
	private String uploadPath = "";
	/**
	 * 上传文件的大小最大100M
	 */
	private int maxPostSize = 100 * 1024 * 1024;

	/**
	 * 构造函数
	 */
	public MultipleFileUploadListenner() {
		super();
	}

	/**
	 * 摧毁函数
	 */
	public void destroy() {
		super.destroy();

	}

	/**
	 * 响应上传时间
	 * @param request 请求对象
	 * @param response 响应对象
	 * @throws ServletException 异常
	 * @throws IOException 异常
	 */
	protected void processRequest(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
//		request.setCharacterEncoding("UTF-8");
//		response.setCharacterEncoding("UTF-8");
		String path = request.getParameter("path");
		path = path.replace("/", "\\");
		uploadPath = request.getRealPath("/") + path + "\\";
//		System.out.println(uploadPath + "<-UpLoadPath");
		response.setContentType("text/html;charset=UTF-8");
		// 保存文件到服务器中
		DiskFileItemFactory factory = new DiskFileItemFactory();
		factory.setSizeThreshold(4096);
		ServletFileUpload upload = new ServletFileUpload(factory);
		upload.setHeaderEncoding("utf-8");
		upload.setSizeMax(maxPostSize);
		try {
			File f = new File(uploadPath);
			if (!f.exists()) {
				f.mkdirs();
			}
			List fileItems = upload.parseRequest(request);
			Iterator iter = fileItems.iterator();
			while (iter.hasNext()) {
				FileItem item = (FileItem) iter.next();
				if (!item.isFormField()) {
					String name = item.getName();
//					System.out.println(name);
					try {
						item.write(new File(uploadPath + name));
//						response.getWriter().write("上传成功。");
					} catch (Exception e) {
						e.printStackTrace();
						response.getWriter().write(e.getMessage());
					}
				}
			}
		} catch (FileUploadException e) {
			e.printStackTrace();
			response.getWriter().write(e.getMessage());
			System.out.println(e.getMessage() + "结束");
		}
	}

	protected void doGet(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
//		request.setCharacterEncoding("UTF-8");
//		response.setCharacterEncoding("UTF-8");
		processRequest(request, response);
	}

	protected void doPost(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
//		request.setCharacterEncoding("UTF-8");
//		response.setCharacterEncoding("UTF-8");
		processRequest(request, response);

	}

	public String getServletInfo() {
		return "Short description";
	}

}
