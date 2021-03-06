
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
// paint cmd
self.PAINT_OUTLINE_PRINT = 'start_outline_printing';
self.PAINT_GREYSCALE_PRINT = 'start_grayscale_printing';
self.PAINT_STOP_PRINT = 'xarm_stop_printing';
self.PAINT_GET_ZERO_CONFIG = 'get_zeropoint_config';
self.PAINT_MOVE_LINE = 'xarm_move_line';

self.exampleData = {"objects":[{"type":"path-group","originX":"left","originY":"top","left":350,"top":70,"width":34,"height":34,"fill":"","stroke":null,"strokeWidth":1,"strokeDashArray":null,"strokeLineCap":"butt","strokeLineJoin":"miter","strokeMiterLimit":10,"scaleX":4.41,"scaleY":4.41,"angle":0,"flipX":false,"flipY":false,"opacity":1,"shadow":null,"visible":true,"clipTo":null,"backgroundColor":"","fillRule":"nonzero","globalCompositeOperation":"source-over","transformMatrix":null,"paths":[{"type":"rect","originX":"left","originY":"top","left":26,"top":56,"width":32,"height":32,"fill":"","stroke":"#000","strokeWidth":1,"strokeDashArray":null,"strokeLineCap":"butt","strokeLineJoin":"miter","strokeMiterLimit":10,"scaleX":1,"scaleY":1,"angle":0,"flipX":false,"flipY":false,"opacity":1,"shadow":null,"visible":true,"clipTo":null,"backgroundColor":"","fillRule":"evenodd","globalCompositeOperation":"source-over","transformMatrix":[1,0,0,1,-25,-55],"rx":0,"ry":0}]}],"background":"#ECEFF1"};

// app cmd
self.APPSTORE_GET_APPS = 'get_apps';
self.APPSTORE_GET_LOCAL_APPS = 'get_local_apps';
self.APPSTORE_APP_INSTALL = 'app_install';
self.APPSTORE_APP_UNINSTALL = 'app_uninstall';
self.APPSTORE_APP_REMOVE = 'app_remove';
self.APPSTORE_APP_CREATE = 'app_create';
self.APPSTORE_APP_RENAME = 'app_rename';
self.APPSTORE_APP_UPLOAD = 'app_upload';
self.APP_RUN_PYTHON = 'app_run_python_project';
self.APP_RUN_TEACH = 'start_play_recording'; // 'app_run_teach_project';
self.APP_STOP_TEACH = 'stop_play_recording';
self.APP_GET_XML = 'get_app_xml';
self.APP_GET_INSERT_XML = 'get_insert_app_xml';

self.DEBUG_SET_BEART = 'set_beart';

// setting cmd
self.SETTING_GET_LOG_INFO = 'get_log_info';
self.SETTING_CHECK_SOFTWARE_UPDATE = 'check_software_update';
self.SETTING_START_SOFTWARE_UPDATE = 'start_software_update';
self.SETTING_GET_DEVICE_INFO = 'get_device_info';
self.SETTING_GET_STUDIO_INFO = 'get_studio_info';

self.userId = 'test';

export default self;
