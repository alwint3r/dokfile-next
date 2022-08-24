type BuildArgs = Record<string, string>;

class Build {
  constructor(private dockerfile: string, private args: BuildArgs) {
    if (!this.dockerfile) {
      this.dockerfile = 'Dockerfile';
    }

    if (!this.args) {
      this.args = {};
    }
  }

  getDockerfile() {
    return this.dockerfile;
  }

  getArgs() {
    return this.args;
  }
}

export default Build;
