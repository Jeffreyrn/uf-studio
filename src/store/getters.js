export const joints = (state) => {
  const arr = state.robot.info.axis;
  // console.log('robot', state.robot);
  // const ANGLE_DIFF = [45.77, 0, 9.15, 85.42, 1.53, -91.53];
  if (arr && (arr.length > 0)) {
    const values = arr.map(str => Number(str));
    // console.log('arr posi print:', values.length);
    // console.log('ANGLE_DIFF:', ANGLE_DIFF);
    // console.table(values);
    this.test = values[1];
    return values;
  }
  return [0, 0, 0, 0, 0, 0, 0];
};

export const end = state => ({
  position: state.robot.info.position,
  orientation: state.robot.info.orientation,
});
