import mongoose from 'mongoose';
  const { Schema } = mongoose;

  const blogSchema = new Schema({
    firstName:  String,
    lastName: String,
    email:   String,
    username: String,
    portfolio: [String],
    /*
    All categories:
    * CG_BD_BF - Board of Directors/Board Functions 
    * CG_BD_BS - Board of Directors/Board Structure 
    * CG_BD_CP - Board of Directors/Compensation Policy 
    * CG_In_VS - Integration/Vision and Strategy 
    * CG_Sh_SR - Shareholders /Shareholder Rights 
    * Ec_Ma_Pe - Margins /Performance 
    * Ec_Pr_SL - Profitability /Shareholder Loyalty 
    * Ec_Re_CL - Revenue /Client Loyalty 
    * En_En_ER - Emission Reduction 
    * En_En_PI - Product Innovation
    * En_En_RR - Resource Reduction
    * So_Cu_PR - Customer /Product Responsibility 
    * So_So_Co - Society /Community 
    * So_So_HR - Society /Human Rights 
    * So_Wo_DO - Workforce /Diversity and Opportunity 
    * So_Wo_EQ - Workforce /Employment Quality 
    * So_Wo_HS - Workforce /Health & Safety 
    * So_Wo_TD - Workforce /Training and Development 
    */
    preferences: {
      type: Array,
      'default': [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3]
    }
  });