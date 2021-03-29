import { combineReducers } from "redux";
import employeeReducer from "./employeeReducer";
import companyReducer from "./companyReducer";
import generalReducer from "./generalReducer";
import authReducer from "./authReducer";
import taskReducer from "./taskReducer";
import salaryReducer from "./salaryReducer";
import employeeCountReducer from "./employeeCountReducer";
import companyGeneralReducer from "./companyGeneralReducer";
import profileReducer from "./profileReducer";
import taskTimerReducer from "./taskTimerReducer";
import userContactReducer from "./userContactReducer"
import bubbleTimerReducer from "./bubbleTimerReducer";
import propertyReducer from "./propertyReducer";
import propertyTemplateReducer from "./propertyTemplateReducer";
import contactCompanyReducer from "./contactCompanyReducer";
import propertyFollowUpReducer from "./propertyFollowUpReducer";
export default combineReducers({
  allEmployees: employeeReducer,
  taskTimer: taskTimerReducer,
  tasks: taskReducer,
  bubbleTimer: bubbleTimerReducer,
  userContacts: userContactReducer,
  general: generalReducer,
  profile: profileReducer,
  companyGeneral: companyGeneralReducer,
  company: companyReducer,
  contactCompany: contactCompanyReducer,
  property: propertyReducer,
  propertyTemplate: propertyTemplateReducer,
  propertyFollowUp: propertyFollowUpReducer,
  auth: authReducer,
  salary: salaryReducer,
  employeeCount: employeeCountReducer,
});
