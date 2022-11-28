type BuildArgs = Record<string, string>;
type ExtraArgs = Array<string>;

class Build {
  constructor(
    private dockerfile: string,
    private args: BuildArgs,
    private extraArgs: ExtraArgs = []
  ) {
    if (!this.dockerfile) {
      this.dockerfile = "Dockerfile";
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

  getExtraArgs() {
    return this.extraArgs;
  }
}

export default Build;
