
const GlobalConstant = {};
const self = GlobalConstant;
window.GlobalConstant = self;

self.VERSION = {version: 'xarm7'};

// xArm cmd
self.CMD_ID_GET_POINT_POSE = 'xarm_get_joint_pose';
self.CMD_ID_GET_TCP_POSE = 'xarm_get_tcp_pose';
self.CMD_ID_GET_VERSION = 'xarm_get_version';
self.CMD_ID_GET_STATE = 'xarm_get_state';

// python file cmd
self.FILE_ID_LIST_DIR = 'list_dir';
self.FILE_ID_CREATE_DIR = 'create_dir';
self.FILE_ID_CREATE_FILE = 'create_file';
self.FILE_ID_DELETE_DIR = 'delete_dir';
self.FILE_ID_DELETE_FILE = 'delete_file';
self.FILE_ID_CHANGE_NAME = 'change_name';
self.FILE_ID_GET_FILE = 'get_file';

self.FILE_ID_AUTOCOMPLETE_PYTHON = 'autocomplete_python';
self.FILE_ID_RUN_PIP_COMMAND = 'run_pip_command';
self.FILE_ID_RUN_PYTHON_SCRIPT = 'run_python_script';
self.FILE_ID_STOP_PYTHON_SCRIPT = 'stop_python_script';

self.DEBUG_SET_BEART = 'debug_set_beart';

export default self;
