let ladder = {
  step: 0,
  up() {
    this.step++;
    return this;
  },
  down() {
    this.step--;
  },
  showStep() {
    console.log(this.step)
  }
};

ladder.up().showStep();