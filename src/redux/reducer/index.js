import { combineReducers } from "redux";
import employeeReducer from "./employeeReducer";
import userReducer from "./usersReducer";
import companyReducer from "./companyReducer";
import vehicalsReducers from "./vehicalsReducers";
import offersReducers from "./offersReducer";
import driversReducer from "./driversReducer";
import ridesReducers from "./ridesReducers";
import goodsReducers from "./goodsReducer";
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
  users: userReducer,
  company: companyReducer,
  contactCompany: contactCompanyReducer,
  property: propertyReducer,
  propertyTemplate: propertyTemplateReducer,
  propertyFollowUp: propertyFollowUpReducer,
  vehicals: vehicalsReducers,
  drivers: driversReducer,
  rides: ridesReducers,
  offers: offersReducers,
  goods: goodsReducers,
  auth: authReducer,
  salary: salaryReducer,
  employeeCount: employeeCountReducer,
});
