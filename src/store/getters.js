export const joints = (state) => {
  const arr = state.robot.info.axis;
  console.log('robot', state.robot);
  if (arr && (arr.length > 0)) {
    const values = arr.map(str => Number(str));
    console.log('arr posi print:', values.length);
    console.table(values);
    this.test = values[1];
    return values;
  }
  return [0, 0, 0, 0, 0, 0, 0];
};
export const jointss = () => {};
