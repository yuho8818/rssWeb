package com.rss.framework.test;

import com.rss.framework.business.BusinessObjectEntity;
import com.rss.framework.business.JavaBeanAdapter;
import org.w3c.dom.Document;

import java.util.ArrayList;

public class back2frontTest {
    public static void main(String[] args) {
        String response = "<response><Sewage_Info pageSize=\"5\" pageNo=\"1\" totalRecords=\"2\" totalPages=\"1\"><Sewage_InfoUID>2567DC139B134C038D62A48D8E94B7FB</Sewage_InfoUID><dischargeArea>东之门</dischargeArea><dischargeDate>2019-05-12</dischargeDate><dischargePlace>西直门</dischargePlace><dischargeVolume>12.0</dischargeVolume><registrant>俞果</registrant><registerDate>2019-05-12</registerDate><cod>223.1</cod><acIDHeavyMetal>2.0</acIDHeavyMetal><alkalineHeavyMetal>2.0</alkalineHeavyMetal><checkPerson>俞果</checkPerson><checkDate>2019-05-13</checkDate><recycleDate>2019-05-14</recycleDate><recyclePeople>张三</recyclePeople><operator>张三</operator><operatorDate>2019-05-13</operatorDate><useDevice>戴尔</useDevice><result>OK</result></Sewage_Info><Sewage_Info pageSize=\"5\" pageNo=\"1\" totalRecords=\"2\" totalPages=\"1\"><Sewage_InfoUID>34E45143570744B7A14F521218D2F82A</Sewage_InfoUID><dischargeArea>删除测试</dischargeArea></Sewage_Info></response>";
        ArrayList<BusinessObjectEntity> entityList = JavaBeanAdapter.getBusinessObjectListFromMessage(response);
        System.out.println(entityList);
        Document doc = JavaBeanAdapter.buildDomFromXMLString(response);
        System.out.println(doc);

    }
}
