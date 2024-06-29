export class State {
  constructor() {}
  state = null;
  cb = null;
  setUpdate = (arg) => {
    this.state = arg;
    this.cb();
  };
  subscribe = (callback) => {
    this.cb = callback;
    return () => {
      this.cb = null;
    };
  };
  getSnapshot = () => {
    return this.state;
  };
}