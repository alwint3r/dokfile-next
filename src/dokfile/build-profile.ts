import Build from "./build";

class BuildProfile {
  private id: string;
  private build: Build;
  private asLatest: boolean;

  constructor(
    id: string,
    build?: Build,
    asLatest: boolean = false
  ) {
    if (!id) {
      throw new Error("Build profile ID must be provided!");
    }

    if (!build) {
      this.build = new Build("Dockerfile", {});
    } else {
      this.build = build;
    }

    this.id = id;
    this.asLatest = asLatest;
  }

  getId() {
    return this.id;
  }

  getBuild() {
    return this.build;
  }

  isMarkedAsLatest() {
    return this.asLatest;
  }
}

export default BuildProfile;
