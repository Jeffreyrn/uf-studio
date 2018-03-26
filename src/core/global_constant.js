
const GlobalConstant = {};
const self = GlobalConstant;
window.GlobalConstant = self;

self.VERSION = { version: 'xarm7' };
self.userId = 'test';

self.COMMON_PARAMS = {
  userId: self.userId,
  version: 'xarm7',
}

// xArm cmd
self.CMD_ID_GET_POINT_POSE = 'xarm_get_joint_pose';
self.CMD_ID_GET_TCP_POSE = 'xarm_get_tcp_pose';
self.CMD_ID_GET_VERSION = 'xarm_get_version';
self.CMD_ID_GET_STATE = 'xarm_get_state';

// python file cmd
self.FILE_ID_LIST_DIR = 'list_dir';
self.FILE_ID_CREATE_DIR = 'create_dir';
self.FILE_ID_CREATE_FILE = 'create_file';
self.FILE_ID_SAVE_FILE = 'save_file';
self.FILE_ID_DELETE_DIR = 'delete_dir';
self.FILE_ID_DELETE_FILE = 'delete_file';
self.FILE_ID_CHANGE_NAME = 'change_name';
self.FILE_ID_GET_FILE = 'get_file';
self.FILE_ID_GET_PROJ_FILES = 'get_project_files';

self.FILE_ID_AUTOCOMPLETE_PYTHON = 'autocomplete_python';
self.FILE_ID_RUN_PIP_COMMAND = 'run_pip_command';
self.FILE_ID_RUN_PYTHON_SCRIPT = 'run_python_script';
self.FILE_ID_STOP_PYTHON_SCRIPT = 'stop_python_script';

self.APPSTORE_GET_APPS = 'get_apps';
self.APPSTORE_GET_LOCAL_APPS = 'get_local_apps';
self.APPSTORE_APP_INSTALL = 'app_install';
self.APPSTORE_APP_UNINSTALL = 'app_uninstall';
self.APPSTORE_APP_REMOVE = 'app_remove';
self.APPSTORE_APP_CREATE = 'app_create';
self.APPSTORE_APP_RENAME = 'app_rename';
self.APPSTORE_APP_UPLOAD = 'app_upload';
self.APP_RUN_PYTHON = 'app_run_python_project';
self.APP_RUN_TEACH = 'app_run_teach_project';
self.APP_GET_XML = 'get_app_xml';

self.DEBUG_SET_BEART = 'debug_set_beart';

// setting cmd
self.SETTING_GET_LOG_INFO = 'get_log_info';
self.SETTING_CHECK_SOFTWARE_UPDATE = 'check_software_update';
self.SETTING_START_SOFTWARE_UPDATE = 'start_software_update';

self.userId = 'test';

export default self;
