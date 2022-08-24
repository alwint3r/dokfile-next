import BuildProfile from "./build-profile";

class Dokfile {
  private imageName: string;
  private remoteUrl?: string;
  private profiles: BuildProfile[];

  constructor(imageName: string, profiles: BuildProfile[], remoteUrl?: string) {
    if (!this.hasOnlyOneLatestProfile(profiles)) {
      throw Error(
        "Build profiles should contain at least one profile marked as latest"
      );
    }

    this.imageName = imageName;
    this.profiles = profiles;
    this.remoteUrl = remoteUrl;
  }

  setRemoteUrl(remoteUrl: string) {
    this.remoteUrl = remoteUrl;
  }

  getProfiles() {
    return this.profiles;
  }

  getImageName() {
    return this.imageName;
  }

  getRemoteUrl() {
    return this.remoteUrl;
  }

  isRemoteUrlAvailable() {
    return this.remoteUrl && this.remoteUrl.length > 0;
  }

  private hasOnlyOneLatestProfile(profiles: BuildProfile[]) {
    const latestProfiles = profiles.filter(
      (profile) => profile.isMarkedAsLatest()
    );

    return latestProfiles.length == 1;
  }
}

export default Dokfile;
