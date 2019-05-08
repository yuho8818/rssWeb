package com.rss.framework.util;

import com.rss.framework.business.JavaBeanAdapter;

/*
 * (c) 2001 Reconfigurable System Solution.  All rights reserved.  Confidential and Proprietary Information.
 */

/**
 * This <b>"builder"</b> provides a utility of building well-formed XML
 * documents.
 * 
 * <pre>
 * 
 *     &lt;b&gt;Typical usage:&lt;/b&gt;
 * 
 *   XMLUtil.XMLBuilder xmlBuilder = XMLUtil.createXMLBuilder();
 * 
 *   // --------------------------------------------
 *   // Code Fragment 1: Creating empty element
 *   // --------------------------------------------
 *   xmlBuilder.addBeginOfStartTag(&quot;AnEmptyElement&quot;)
 *             .addOptionalAttribute(&quot;anOptionalAttribute&quot;, &quot;anOptionalAttributeValue&quot;)
 *             .addRequiredAttribute(&quot;aRequiredAttribute&quot;, &quot;aRequiredAttributeValue&quot;)
 *             .addEmptyElementEndTag();
 * 
 *   // --------------------------------------------
 *   // Code Fragment 2: Creating non-empty element
 *   // --------------------------------------------
 *   xmlBuilder.addBeginOfStartTag(&quot;AnElement&quot;)
 *             .addRequiredAttribute(&quot;aRequiredAttribute&quot;, &quot;aRequiredAttributeValue&quot;)
 *             .addEndOfStartTag();
 * 
 *   // Add element inside another element
 *   xmlBuilder.addBeginOfStartTag(&quot;AnElementChildElement&quot;)
 *             .addRequiredAttribute(&quot;aRequiredAttribute1&quot;, &quot;aRequiredAttributeValue1&quot;)
 *             .addEndOfStartTag().
 *             .addEndTag(&quot;AnElementChildElement&quot;);
 * 
 *   // Close the outher element tag
 *   xmlBuilder.adEndTag(&quot;AnElement&quot;);
 * 
 *   // ------------------------------------------------------
 *   // Code Fragment 3: Getting builder results.
 *   // ------------------------------------------------------
 *   String xml = xmlBuilder.getResult();
 * </pre>
 * 
 * <p>
 * <b>Notes:</b>
 * <ul>
 * <li> Instances of the class should be only creatde through call of
 * {@link JavaBeanAdapter#createXMLBuilder} or
 * {@link JavaBeanAdapter#createXMLBuilder(int)} methods. </li>
 * <li> Default buffer size used by the builder is 128. This can be overriden by
 * using {@link JavaBeanAdapter#createXMLBuilder(int)} factory method </li>
 * <li> This class is not Thread-safe. </li>
 * <li> Currently does not support creation of the text content as a part of the
 * element, may be included in the future releases. </li>
 * <li> Does not ensure wel-formedness of the built XML document (doe not
 * interract with any XML processor). </li>
 * </ul>
 * </p>
 */
public class XMLBuilder {

	/** Default buffer size for the builder. */
	private static int BUFFER_SIZE = 512;

	/** Buffer maintaining current state of the builder. */
	private StringBuffer buffer;

	/**
	 * Constructs the builder with default buffer size.
	 */
	public XMLBuilder() {
		this(BUFFER_SIZE);
	}

	/**
	 * Constructs the builder with specified buffer size.
	 * 
	 * @param aBufferSize
	 *            Size of the bulder's buffer.
	 */
	public XMLBuilder(int aBufferSize) {
		buffer = new StringBuffer(aBufferSize);
	}

	/**
	 * Adds <b>'<'<code>anElementName</code></b>, which signifies the
	 * beginning of an element.
	 * 
	 * @param anElementName
	 *            Name of the element that this methods begins to build.
	 * @return XMLBuilder, used for chaining calls for convenience.
	 * 
	 * @see #addEndOfStartTag
	 * @see #addEmptyElementEndTag
	 * @see #addEndTag
	 */
	public XMLBuilder addBeginOfStartTag(String anElementName) {
		buffer.append('<').append(anElementName);

		return this;
	}

	/**
	 * Adds <b>'/>'</b> to the currently accumulated by the bulder content.
	 * 
	 * @return XMLBuilder, used for chaining calls for convenience.
	 * @see #addBeginOfStartTag
	 */
	public XMLBuilder addEmptyElementEndTag() {
		buffer.append("/>");

		return this;
	}

	/**
	 * Adds <b>'>'</b>, which signifies the end of the start tag.
	 * 
	 * @param anElementName
	 *            Name of the element that this methods begins to build.
	 * @return XMLBuilder, used for chaining calls for convenience.
	 * 
	 * @see #addBeginOfStartTag
	 */
	public XMLBuilder addEndOfStartTag() {
		buffer.append('>');

		return this;
	}

	/**
	 * Adds <b>'</'<code>anElementName</code>'>'</b> to the accumulated by
	 * the builder content.
	 * 
	 * @param anElementName
	 *            Name of the element being defined.
	 * @return XMLBuilder, used for chaining calls for convenience.
	 * @see #addBeginOfStartTag
	 */
	public XMLBuilder addEndTag(String anElementName) {
		buffer.append("</").append(anElementName).append('>');

		return this;
	}

	/**
	 * Adds <b><code>anAttrName</code> '=' anAttrValue</b> to the
	 * accumulated by the builder content, if <code>anAttrValue</code> is
	 * <code>null</code> or its length is zero, nothing is added.
	 * 
	 * @param anAttrName
	 *            Name of the attribute being defined.
	 * @param anAttrValue
	 *            Value of the attribute being defined, can be <code>null</code>.
	 * 
	 * @return XMLBuilder, used for chaining calls for convenience.
	 */
	public XMLBuilder addOptionalAttribute(String anAttrName, String anAttrValue) {

		if (anAttrValue == null || anAttrValue.length() == 0) {
			return this;
		}

		basicAddAttribute(anAttrName, anAttrValue);

		return this;
	}

	/**
	 * Adds <b><code>anAttrName</code> '=' anAttrValue</b> to the
	 * accumulated by the builder content. If the attribute value specified is
	 * <code>null</code> empty value is specified, and attribute is included
	 * in the bulder content.
	 * 
	 * @param anAttrName
	 *            Name of the attribute being defined.
	 * @param anAttrValue
	 *            Value of the attribute being defined, can be <code>null</code>.
	 * 
	 * @return XMLBuilder, used for chaining calls for convenience.
	 */
	public XMLBuilder addRequiredAttribute(String anAttrName, String anAttrValue) {
		basicAddAttribute(anAttrName, anAttrValue);

		return this;
	}

	/**
	 * Adds an element start tag which looks like <b>'<'<code>anElementName</code>'>'</b>
	 * to the accumulated by the builder content.
	 * 
	 * @param anElementName
	 *            Name of the element being defined.
	 * @return XMLBuilder, used for chaining calls for convenience.
	 * @see #addBeginOfStartTag
	 */
	public XMLBuilder addStartTag(String anElementName) {
		buffer.append("<").append(anElementName).append('>');

		return this;
	}

	/**
	 * Appends the passed text to the currently accumulated by the bulder
	 * content. Automatically calls <code>xmlize</code> on the passed String.
	 * 
	 * @param theText
	 *            The string to be 'xmlized' add added to the current builder
	 *            content. May be null.
	 * 
	 * @return XMLBuilder, used for chaining calls for convenience.
	 */
	public XMLBuilder addText(String theText) {

		if (theText != null) {
			buffer.append(JavaBeanAdapter.xmlize(theText));
		}

		return this;
	}

	/**
	 * Appends the passed XML to the currently accumulated by the bulder
	 * content. Since the text is assumed to be XML, all special characters are
	 * assumed to have been already escaped. No processing on the passed text is
	 * done at all. It is simply appended to the builder's current content.
	 * 
	 * @param theText
	 *            The string appended to the builder's content. May be null.
	 * 
	 * @return XMLBuilder, used for chaining calls for convenience.
	 */
	public XMLBuilder addXML(String theXML) {

		if (theXML != null) {
			buffer.append(theXML);
		}

		return this;
	}

	/**
	 * Returns rusults of bulding XML document
	 */
	public String getResult() {
		return buffer.toString();
	}

	/**
	 * Helper function used for adding attribute to the current builder content.
	 * 
	 * @param anAttrName
	 *            Name of the attribute being defined.
	 * @param anAttrValue
	 *            Value of the attribute being defined, can be <code>null</code>.
	 */
	private void basicAddAttribute(String anAttrName, String anAttrValue) {
		buffer.append(' ').append(anAttrName).append("=\"").append(JavaBeanAdapter.xmlize(anAttrValue)).append('"');
	}
}