
import LocalParamsSetting from './model_local_params_setting';
import LocalDeviceInfo from './model_local_device_info';
import LocalDeviceStatus from './model_local_device_status';
import LocalTeach from './model_local_teach';
import Robot from './model_local_robot';
import LocalProjTree from './model_local_proj_tree';
import LocalAppsMgr from './model_local_apps_mgr';


const Model = {};
Model.localParamsSetting = LocalParamsSetting;
Model.localDeviceInfo = LocalDeviceInfo;
Model.localDeviceStatus = LocalDeviceStatus;
Model.localTeach = LocalTeach;
Model.robot = Robot;
Model.localProjTree = LocalProjTree;
Model.localAppsMgr = LocalAppsMgr;

export default Model;
