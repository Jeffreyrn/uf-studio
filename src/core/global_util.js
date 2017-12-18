
import Model from './model';
import SocketCom from './socket_com';
import NativeCom from './native_com';

const GlobalUtil = {};
window.GlobalUtil = GlobalUtil;
GlobalUtil.store = {};
GlobalUtil.model = Model;
GlobalUtil.socketCom = SocketCom;
GlobalUtil.nativeCom = NativeCom;

GlobalUtil.autoSizeScale = 0;

GlobalUtil.getMinWidth = () => {
  var min_width = Math.min(screen.width, screen.height);
  GlobalUtil.min_width = Math.min(min_width, 480);
  return GlobalUtil.min_width;
}

GlobalUtil.adaptSize = (x) => {
  return x * GlobalUtil.autoSizeScale;
}

GlobalUtil.fixSize = () => {
  // GlobalUtil.min_width = 480;
  const div = document.getElementById('index-page');
  div.style.width = GlobalUtil.min_width / 9.0 * 16.0 + 'px';
  div.style.height = GlobalUtil.min_width + 'px';
}

const args = {
    host: '192.168.1.166',
    port: '18333',
};

GlobalUtil.socketCom.close = () => {
  GlobalUtil.socketCom.socket_info.socket.close();
};

GlobalUtil.socketCom.open = () => {
  GlobalUtil.socketCom.init_socket(args);
  SocketCom.init_onopen = ( (evt) => {
  	console.log('onopen onopen onopen');
  	GlobalUtil.model.localDeviceStatus.xarm_connected = true;
  } );
  GlobalUtil.socketCom.init_onclose( (evt) => {
      GlobalUtil.model.localDeviceStatus.xarm_connected = false;
      console.log('onclose onclose onclose');
  } );
  GlobalUtil.socketCom.init_onerror( (evt) => {
      GlobalUtil.model.localDeviceStatus.xarm_connected = false;
      const temp_msg = JSON.parse(evt.data);
      console.log('onerror onerror onerror = ' + evt.data);
  } );
  GlobalUtil.socketCom.init_onmessage( (evt) => {
      const temp_msg = JSON.parse(evt.data);
      // console.log('onmessage onmessage onmessage = ' + evt.data);
      GlobalUtil.model.localDeviceInfo.handleReport(temp_msg);
      GlobalUtil.model.localDeviceStatus.handleReport(temp_msg);
      GlobalUtil.model.localParamsSetting.handleReport(temp_msg);
      if ('response' === temp_msg.type) {
          GlobalUtil.socketCom.response = evt.data;
      }
      GlobalUtil.socketCom.handleResponse(temp_msg);
  } );
};

GlobalUtil.socketCom.open();

GlobalUtil.getUrlParam = (lan) => {
    const reg = new RegExp("(^|&)" + lan + "=([^&]*)(&|$)", "i");
    const r = window.location.search.substr(1).match(reg);
    if (null == r || r.length < 2) {
        return '';
    }
    return unescape(r[2]);
};

export default GlobalUtil;
