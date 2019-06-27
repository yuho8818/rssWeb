package com.rss.framework;

import com.rss.framework.util.GenerateByCSV;

import java.io.File;

public class ProjectInit {
    public static void main(String[] args) {

        String[] tableList = {"EquipEnv_Info.csv"};
//        "Complaints_Info.csv","Correct_Info.csv","EquipEnv_Info.csv","InternalAudit_Info.csv","ManagementReview_Info.csv",
//                "OutsIDeAudit_Info.csv","PersonalHealth_Info.csv","QualityControl_Info.csv",
//                "SafeTrain_Info.csv","SatisfactionSurvey_Info.csv","Sewage_Info.csv",
//                "SoildChemical_Info.csv","SpecialEquipment_Info.csv","Unstatisfied_Info.csv"
        GenerateByCSV u;
        for(String s:tableList){
            u = new GenerateByCSV();
            try{
                String dir = new File(".").getCanonicalPath();
                u.createDatabaseByCSV(dir+"\\table\\"+s);
            }
            catch(Exception e){
                e.printStackTrace();
            }
            u.createHtml();
            u.createJs();
        }

    }
}
