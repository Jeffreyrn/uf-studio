
export default {
  servo_on_off:{ group:'P1',name:'Servo ON/OFF',unit:'-',address:256,current_value:0,default_value:0,max:1,min:0,sign:true,width:16,input:0,in_eeprom:0 },
  control_mode:{ group:'P1',name:'Control Mode',unit:'-',address:257,current_value:0,default_value:0,max:1,min:0,sign:false,width:16,input:0,in_eeprom:0 },
  motor_direction:{ group:'P1',name:'Motor Direction',unit:'-',address:258,current_value:0,default_value:0,max:1,min:0,sign:false,width:16,input:0,in_eeprom:1 },

  position_kp:{ group:'P2',name:'Position Kp',unit:'-',address:512,current_value:0,default_value:0,max:100,min:0,sign:false,width:16,input:0,in_eeprom:1 },
  position_forward_kp:{ group:'P2',name:'Position Forward Kp',unit:'0.1%',address:512,current_value:0,default_value:0,max:100,min:0,sign:false,width:16,input:0,in_eeprom:1 },
  position_forward_tc:{ group:'P2',name:'Position Forward Tc',unit:'ms',address:514,current_value:0,default_value:0,max:100,min:0,sign:false,width:16,input:0,in_eeprom:1 },
  speed_kp:{ group:'P2',name:'Speed Kp',unit:'0.1',address:258,current_value:0,default_value:0,max:100,min:0,sign:false,width:16,input:0,in_eeprom:1 },
  speed_ki:{ group:'P2',name:'Speed Ki',unit:'0.1',address:258,current_value:0,default_value:0,max:100,min:0,sign:false,width:16,input:0,in_eeprom:1 },

  position_acc_time:{ group:'P3',name:'Position Acc Time',unit:'ms',address:258,current_value:0,default_value:0,max:100,min:0,sign:false,width:16,input:0,in_eeprom:1 },
  position_dec_time:{ group:'P3',name:'Position Dec Time',unit:'ms',address:258,current_value:0,default_value:0,max:100,min:0,sign:false,width:16,input:0,in_eeprom:1 },
  position_smooth_time:{ group:'P3',name:'Position Smooth Time',unit:'ms',address:258,current_value:0,default_value:0,max:100,min:0,sign:false,width:16,input:0,in_eeprom:1 },
  position_maximum_time:{ group:'P3',name:'Position Maximum Time',unit:'ms',address:258,current_value:0,default_value:0,max:100,min:0,sign:false,width:16,input:0,in_eeprom:1 },
  position_complete_value:{ group:'P3',name:'Position Complete Value',unit:'pulse',address:258,current_value:0,default_value:0,max:100,min:0,sign:false,width:16,input:0,in_eeprom:1 },

  speed_reference:{ group:'P4',name:'Speed Reference',unit:'r/min',address:258,current_value:0,default_value:0,max:100,min:0,sign:false,width:16,input:0,in_eeprom:1 },
  speed_reference_filter_time:{ group:'P4',name:'Speed Reference Filter Time',unit:'r/min',address:258,current_value:0,default_value:0,max:100,min:0,sign:false,width:16,input:0,in_eeprom:1 },
  Speed_feedback_filter_time:{ group:'P4',name:'Speed Feedback Filter Time',unit:'r/min',address:258,current_value:0,default_value:0,max:100,min:0,sign:false,width:16,input:0,in_eeprom:1 },
  speed_limit:{ group:'P4',name:'Speed Limit',unit:'r/min',address:258,current_value:0,default_value:0,max:100,min:0,sign:false,width:16,input:0,in_eeprom:1 },

  torque_reference:{ group:'P5',name:'Torque Reference',unit:'0.01%',address:258,current_value:0,default_value:0,max:100,min:0,sign:false,width:16,input:0,in_eeprom:1 },

  device_id:{ group:'P6',name:'Device ID',unit:'0.01%',address:258,current_value:0,default_value:0,max:100,min:0,sign:false,width:16,input:0,in_eeprom:1 },
  baud_rate:{ group:'P6',name:'BaudRate',unit:'-',address:258,current_value:0,default_value:0,max:100,min:0,sign:false,width:16,input:0,in_eeprom:1 },
  parity:{ group:'P6',name:'Parity',unit:'0.01%',address:258,current_value:0,default_value:0,max:100,min:0,sign:false,width:16,input:0,in_eeprom:1 },

  position_command:{ group:'P7',name:'Position Command',unit:'Pulse',address:258,current_value:0,default_value:0,max:100,min:0,sign:false,width:16,input:0,in_eeprom:1 },

  hardware_version:{ group:'P8',name:'Hardware Version',unit:'-',address:258,current_value:0,default_value:0,max:100,min:0,sign:false,width:16,input:0,in_eeprom:1 },
  software_version:{ group:'P8',name:'Software Version',unit:'-',address:258,current_value:0,default_value:0,max:100,min:0,sign:false,width:16,input:0,in_eeprom:1 },
  encoder_type:{ group:'P8',name:'Encoder Type',unit:'-',address:258,current_value:0,default_value:0,max:100,min:0,sign:false,width:16,input:0,in_eeprom:1 },
  encoder_lines:{ group:'P8',name:'Encoder Lines',unit:'-',address:258,current_value:0,default_value:0,max:100,min:0,sign:false,width:16,input:0,in_eeprom:1 },
  motor_initial_position:{ group:'P8',name:'Motor Initial Position',unit:'-',address:258,current_value:0,default_value:0,max:100,min:0,sign:false,width:16,input:0,in_eeprom:1 },

  power_level:{ group:'P9',name:'Power Level',unit:'-',address:258,current_value:0,default_value:0,max:100,min:0,sign:false,width:16,input:0,in_eeprom:1 },
}
