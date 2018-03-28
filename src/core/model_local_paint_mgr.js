const path = require('path')

const LocalPaintMgr = {};
const self = LocalPaintMgr;

self.visible = {
  text: false,
  setting: false,
  pattern: false,
  projs: false,
  icons: false,
};

self.curDialogProjInputText = '';
self.dialogErrorTips = '';

self.projTypeSelected = 'outline'; // outline gray

self.projList = [];
self.curProj = null;

self.createProj = (params) => {
  return {
    uuid: params.uuid,
    created: params.created,
  }
};

self.remoteProjs2Local = (dict) => {
  if (dict.code !== 0) {
    console.log('datas is not right');
    return;
  }
  self.projList = [];
  const datas = dict.data;
  const projs = [];
  let index = 0;
  for (let i = 0; i < datas.length; i += 1) {
    const data = datas[i];
    if (data.path.indexOf('app.json') > 0) {
      // projs.map((item) => {
      //   return it
      // });
      const dirname = path.dirname(data.path);
      data.uuid = data.path;
      data.name = path.basename(dirname);
      data.created = data.ctime;
      data.index = index;
      projs.push(data);
      index += 1;
    }
  }
  self.projList = projs;
};

self.selectedIcon = null;

// const SVG_LIST2 = require.context('../assets/svg/shapes2', false, /\.svg$/);
// const SVG_LIST1 = require.context('../assets/svg/shapes1', false, /\.svg$/);

self.shapes1 = [
  require('./../assets/svg/shapes1/01Rectangle.svg'),
  require('./../assets/svg/shapes1/02Oval.svg'),
  require('./../assets/svg/shapes1/03Triangle.svg'),
  require('./../assets/svg/shapes1/04Polygon5.svg'),
  require('./../assets/svg/shapes1/05Polygon6.svg'),
  require('./../assets/svg/shapes1/06Polygon8.svg'),
  require('./../assets/svg/shapes1/07Star.svg'),
  require('./../assets/svg/shapes1/08Star4.svg'),
  require('./../assets/svg/shapes1/09Star6.svg'),
  require('./../assets/svg/shapes1/10rhombus.svg'),
  require('./../assets/svg/shapes1/11trapezoid.svg'),
  require('./../assets/svg/shapes1/12cylinder.svg'),
  require('./../assets/svg/shapes1/13arcstar.svg'),
  require('./../assets/svg/shapes1/14Star12.svg'),
  require('./../assets/svg/shapes1/15dialog4.svg'),
  require('./../assets/svg/shapes1/16dialog3.svg'),
  require('./../assets/svg/shapes1/17dialog.svg'),
  require('./../assets/svg/shapes1/18dialog2.svg'),
  require('./../assets/svg/shapes1/19supoface-invert.svg'),
  require('./../assets/svg/shapes1/20supoface.svg'),
];

// self.shapes2 = [
//   alien.svg'),
//   ambulance.svg'),
//   angry.svg'),
//   astronaut.svg'),
//   axe.svg'),
//   bigtruck.svg'),
//   boat.svg'),
//   bonnet.svg'),
//   brochette.svg'),
//   bus.svg'),
//   candy.svg'),
//   caravan.svg'),
//   chasis.svg'),
//   chicken.svg'),
//   comet.svg'),
//   compass.svg'),
//   construction_block.svg'),
//   construction_cone.svg'),
//   crazy.svg'),
//   crying.svg'),
//   crying01.svg'),
//   dead.svg'),
//   defroster.svg'),
//   dice.svg'),
//   doors_open.svg'),
//   e_car.svg'),
//   earth.svg'),
//   embarrassed.svg'),
//   embarrassed01.svg'),
//   engine.svg'),
//   evil.svg'),
//   firetruck.svg'),
//   flag.svg'),
//   flattire.svg'),
//   forklifts.svg'),
//   freeze.svg'),
//   fried_egg.svg'),
//   friendly.svg'),
//   fries.svg'),
//   fuel.svg'),
//   gear.svg'),
//   guards.svg'),
//   guards02.svg'),
//   halfmoon.svg'),
//   handicapcar.svg'),
//   happiness.svg'),
//   happiness01.svg'),
//   happy.svg'),
//   happy01.svg'),
//   happy02.svg'),
//   headlight.svg'),
//   hilarious.svg'),
//   hot_dog.svg'),
//   icecream.svg'),
//   indifferent.svg'),
//   indifferent01.svg'),
//   inlove.svg'),
//   inlove01.svg'),
//   Instrumentcuster.svg'),
//   jeep.svg'),
//   jetski.svg'),
//   key.svg'),
//   kiss.svg'),
//   knife.svg'),
//   laddertruck.svg'),
//   laughing.svg'),
//   leaf.svg'),
//   leaf02.svg'),
//   licence.svg'),
//   limousine.svg'),
//   littlestar.svg'),
//   lollipop.svg'),
//   lowridecar.svg'),
//   map.svg'),
//   master.svg'),
//   meat.svg'),
//   mini.svg'),
//   minicar.svg'),
//   monstertruck.svg'),
//   moon.svg'),
//   moonrover.svg'),
//   motor.svg'),
//   motorbike.svg'),
//   mushroom.svg'),
//   naughty.svg'),
//   nerd.svg'),
//   nerd01.svg'),
//   oil.svg'),
//   parking.svg'),
//   pedals.svg'),
//   policecar.svg'),
//   quad.svg'),
//   radio.svg'),
//   ramen.svg'),
//   retrocar.svg'),
//   roadlanes.svg'),
//   roadroller.svg'),
//   robot.svg'),
//   robota.svg'),
//   robotb.svg'),
//   robotc.svg'),
//   sad.svg'),
//   sad02.svg'),
//   satelite.svg'),
//   saturn.svg'),
//   sausage.svg'),
//   scared.svg'),
//   schoolbus.svg'),
//   scooter.svg'),
//   seatbelt.svg'),
//   servicevan.svg'),
//   shoes.svg'),
//   simulationcar.svg'),
//   skidloader.svg'),
//   smile.svg'),
//   snow.svg'),
//   snowbike.svg'),
//   solar_system.svg'),
//   solar_system2.svg'),
//   spaceship01.svg'),
//   spaceship02.svg'),
//   spaceship03.svg'),
//   spaceship04.svg'),
//   spaceship05.svg'),
//   spanner.svg'),
//   spechless.svg'),
//   sportscar.svg'),
//   start.svg'),
//   steeringwheel.svg'),
//   stop.svg'),
//   stress.svg'),
//   sun.svg'),
//   surprised.svg'),
//   suspect.svg'),
//   swat.svg'),
//   tank.svg'),
//   telescope.svg'),
//   temperature.svg'),
//   torch  .svg'),
//   torch.svg
//   towtruck.svg
//   tractor.svg
//   trafficlights.svg
//   trailer.svg
//   tram.svg
//   ufo.svg
//   upset.svg
//   uturn.svg
//   van.svg
//   warninglight.svg
//   water.svg
//   wind.svg
//   wink.svg
//   wink01.svg
//   wood.svg
//   xmastree.svg
// ];

self.icons01 = [
  require('./../assets/svg/01_EMOJI/angry.svg'),
  require('./../assets/svg/01_EMOJI/crazy.svg'),
  require('./../assets/svg/01_EMOJI/crying.svg'),
  require('./../assets/svg/01_EMOJI/crying01.svg'),
  require('./../assets/svg/01_EMOJI/dead.svg'),
  require('./../assets/svg/01_EMOJI/embarrassed.svg'),
  require('./../assets/svg/01_EMOJI/embarrassed01.svg'),
  require('./../assets/svg/01_EMOJI/evil.svg'),
  require('./../assets/svg/01_EMOJI/freeze.svg'),
  require('./../assets/svg/01_EMOJI/friendly.svg'),
  require('./../assets/svg/01_EMOJI/happiness.svg'),
  require('./../assets/svg/01_EMOJI/happiness01.svg'),
  require('./../assets/svg/01_EMOJI/happy.svg'),
  require('./../assets/svg/01_EMOJI/happy01.svg'),
  require('./../assets/svg/01_EMOJI/happy02.svg'),
  require('./../assets/svg/01_EMOJI/hilarious.svg'),
  require('./../assets/svg/01_EMOJI/indifferent.svg'),
  require('./../assets/svg/01_EMOJI/indifferent01.svg'),
  require('./../assets/svg/01_EMOJI/inlove.svg'),
  require('./../assets/svg/01_EMOJI/inlove01.svg'),
  require('./../assets/svg/01_EMOJI/kiss.svg'),
  require('./../assets/svg/01_EMOJI/laughing.svg'),
  require('./../assets/svg/01_EMOJI/naughty.svg'),
  require('./../assets/svg/01_EMOJI/nerd.svg'),
  require('./../assets/svg/01_EMOJI/nerd01.svg'),
  require('./../assets/svg/01_EMOJI/sad.svg'),
  require('./../assets/svg/01_EMOJI/sad02.svg'),
  require('./../assets/svg/01_EMOJI/scared.svg'),
  require('./../assets/svg/01_EMOJI/smile.svg'),
  require('./../assets/svg/01_EMOJI/spechless.svg'),
  require('./../assets/svg/01_EMOJI/stress.svg'),
  require('./../assets/svg/01_EMOJI/surprised.svg'),
  require('./../assets/svg/01_EMOJI/suspect.svg'),
  require('./../assets/svg/01_EMOJI/upset.svg'),
  require('./../assets/svg/01_EMOJI/wink.svg'),
  require('./../assets/svg/01_EMOJI/wink01.svg'),
];

self.icons02 = [
  require('./../assets/svg/02_Automobile/ambulance.svg'),
  require('./../assets/svg/02_Automobile/bigtruck.svg'),
  require('./../assets/svg/02_Automobile/boat.svg'),
  require('./../assets/svg/02_Automobile/bus.svg'),
  require('./../assets/svg/02_Automobile/caravan.svg'),
  require('./../assets/svg/02_Automobile/chasis.svg'),
  require('./../assets/svg/02_Automobile/construction_block.svg'),
  require('./../assets/svg/02_Automobile/construction_cone.svg'),
  require('./../assets/svg/02_Automobile/defroster.svg'),
  require('./../assets/svg/02_Automobile/dice.svg'),
  require('./../assets/svg/02_Automobile/doors_open.svg'),
  require('./../assets/svg/02_Automobile/e_car.svg'),
  require('./../assets/svg/02_Automobile/engine.svg'),
  require('./../assets/svg/02_Automobile/firetruck.svg'),
  require('./../assets/svg/02_Automobile/flattire.svg'),
  require('./../assets/svg/02_Automobile/forklifts.svg'),
  require('./../assets/svg/02_Automobile/fuel.svg'),
  require('./../assets/svg/02_Automobile/gear.svg'),
  require('./../assets/svg/02_Automobile/handicapcar.svg'),
  require('./../assets/svg/02_Automobile/headlight.svg'),
  require('./../assets/svg/02_Automobile/Instrumentcuster.svg'),
  require('./../assets/svg/02_Automobile/jeep.svg'),
  require('./../assets/svg/02_Automobile/jetski.svg'),
  require('./../assets/svg/02_Automobile/key.svg'),
  require('./../assets/svg/02_Automobile/laddertruck.svg'),
  require('./../assets/svg/02_Automobile/licence.svg'),
  require('./../assets/svg/02_Automobile/limousine.svg'),
  require('./../assets/svg/02_Automobile/lowridecar.svg'),
  require('./../assets/svg/02_Automobile/mini.svg'),
  require('./../assets/svg/02_Automobile/minicar.svg'),
  require('./../assets/svg/02_Automobile/monstertruck.svg'),
  require('./../assets/svg/02_Automobile/motor.svg'),
  require('./../assets/svg/02_Automobile/motorbike.svg'),
  require('./../assets/svg/02_Automobile/oil.svg'),
  require('./../assets/svg/02_Automobile/parking.svg'),
  require('./../assets/svg/02_Automobile/pedals.svg'),
  require('./../assets/svg/02_Automobile/policecar.svg'),
  require('./../assets/svg/02_Automobile/quad.svg'),
  require('./../assets/svg/02_Automobile/radio.svg'),
  require('./../assets/svg/02_Automobile/retrocar.svg'),
  require('./../assets/svg/02_Automobile/roadlanes.svg'),
  require('./../assets/svg/02_Automobile/roadroller.svg'),
  require('./../assets/svg/02_Automobile/schoolbus.svg'),
  require('./../assets/svg/02_Automobile/scooter.svg'),
  require('./../assets/svg/02_Automobile/seatbelt.svg'),
  require('./../assets/svg/02_Automobile/servicevan.svg'),
  require('./../assets/svg/02_Automobile/simulationcar.svg'),
  require('./../assets/svg/02_Automobile/skidloader.svg'),
  require('./../assets/svg/02_Automobile/snowbike.svg'),
  require('./../assets/svg/02_Automobile/spanner.svg'),
  require('./../assets/svg/02_Automobile/sportscar.svg'),
  require('./../assets/svg/02_Automobile/steeringwheel.svg'),
  require('./../assets/svg/02_Automobile/stop.svg'),
  require('./../assets/svg/02_Automobile/swat.svg'),
  require('./../assets/svg/02_Automobile/tank.svg'),
  require('./../assets/svg/02_Automobile/temperature.svg'),
  require('./../assets/svg/02_Automobile/towtruck.svg'),
  require('./../assets/svg/02_Automobile/tractor.svg'),
  require('./../assets/svg/02_Automobile/trafficlights.svg'),
  require('./../assets/svg/02_Automobile/trailer.svg'),
  require('./../assets/svg/02_Automobile/tram.svg'),
  require('./../assets/svg/02_Automobile/uturn.svg'),
  require('./../assets/svg/02_Automobile/van.svg'),
  require('./../assets/svg/02_Automobile/warninglight.svg'),
];

self.icons03 = [
  require('./../assets/svg/03_Fastfood/brochette.svg'),
  require('./../assets/svg/03_Fastfood/candy.svg'),
  require('./../assets/svg/03_Fastfood/chicken.svg'),
  require('./../assets/svg/03_Fastfood/fried_egg.svg'),
  require('./../assets/svg/03_Fastfood/fries.svg'),
  require('./../assets/svg/03_Fastfood/hot_dog.svg'),
  require('./../assets/svg/03_Fastfood/icecream.svg'),
  require('./../assets/svg/03_Fastfood/lollipop.svg'),
  require('./../assets/svg/03_Fastfood/meat.svg'),
  require('./../assets/svg/03_Fastfood/ramen.svg'),
  require('./../assets/svg/03_Fastfood/sausage.svg'),
];

self.icons04 = [
  require('./../assets/svg/04_Outdoor/axe.svg'),
  require('./../assets/svg/04_Outdoor/bonnet.svg'),
  require('./../assets/svg/04_Outdoor/compass.svg'),
  require('./../assets/svg/04_Outdoor/earth.svg'),
  require('./../assets/svg/04_Outdoor/halfmoon.svg'),
  require('./../assets/svg/04_Outdoor/knife.svg'),
  require('./../assets/svg/04_Outdoor/leaf.svg'),
  require('./../assets/svg/04_Outdoor/leaf02.svg'),
  require('./../assets/svg/04_Outdoor/littlestar.svg'),
  require('./../assets/svg/04_Outdoor/map.svg'),
  require('./../assets/svg/04_Outdoor/mushroom.svg'),
  require('./../assets/svg/04_Outdoor/shoes.svg'),
  require('./../assets/svg/04_Outdoor/snow.svg'),
  require('./../assets/svg/04_Outdoor/sun.svg'),
  require('./../assets/svg/04_Outdoor/water.svg'),
  require('./../assets/svg/04_Outdoor/wind.svg'),
  require('./../assets/svg/04_Outdoor/wood.svg'),
  require('./../assets/svg/04_Outdoor/xmastree.svg'),
];

self.icons05 = [
  require('./../assets/svg/05_Starwar/guards.svg'),
  require('./../assets/svg/05_Starwar/guards02.svg'),
  require('./../assets/svg/05_Starwar/master.svg'),
  require('./../assets/svg/05_Starwar/robota.svg'),
  require('./../assets/svg/05_Starwar/robotb.svg'),
  require('./../assets/svg/05_Starwar/robotc.svg'),
];

self.icons06 = [
  require('./../assets/svg/06_Universe/alien.svg'),
  require('./../assets/svg/06_Universe/astronaut.svg'),
  require('./../assets/svg/06_Universe/comet.svg'),
  require('./../assets/svg/06_Universe/flag.svg'),
  require('./../assets/svg/06_Universe/moon.svg'),
  require('./../assets/svg/06_Universe/moonrover.svg'),
  require('./../assets/svg/06_Universe/robot.svg'),
  require('./../assets/svg/06_Universe/satelite.svg'),
  require('./../assets/svg/06_Universe/saturn.svg'),
  require('./../assets/svg/06_Universe/solar_system.svg'),
  require('./../assets/svg/06_Universe/solar_system2.svg'),
  require('./../assets/svg/06_Universe/spaceship01.svg'),
  require('./../assets/svg/06_Universe/spaceship02.svg'),
  require('./../assets/svg/06_Universe/spaceship03.svg'),
  require('./../assets/svg/06_Universe/spaceship04.svg'),
  require('./../assets/svg/06_Universe/spaceship05.svg'),
  require('./../assets/svg/06_Universe/start.svg'),
  require('./../assets/svg/06_Universe/telescope.svg'),
  require('./../assets/svg/06_Universe/ufo.svg'),
];

self.emotions = [
  {
    name: 'shape',
    list: self.shapes1,
  },
  {
    name: 'emoji',
    list: self.icons01,
  },
  {
    name: 'automobile',
    list: self.icons02,
  },
  {
    name: 'fastfood',
    list: self.icons03,
  },
  {
    name: 'outdoor',
    list: self.icons04,
  },
  {
    name: 'starwar',
    list: self.icons05,
  },
  {
    name: 'universe',
    list: self.icons06,
  },
];

// SVG_LIST2.keys() = data.map((key) => { return SVG_LIST2[key]; });

export default self;
