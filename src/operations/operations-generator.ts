import Dokfile from "../dokfile/dokfile";
import BuildImageOperation from "./build-image.operation";
import PushImageOperation from "./push-image.operation";
import TagImageOperation from "./tag-image.operation";

class Operations {
  constructor(
    public readonly build: BuildImageOperation[],
    public readonly tag: TagImageOperation[],
    public readonly push: PushImageOperation[]
  ) {}
}

class OperationsGenerator {
  static fromDokfile(dokfile: Dokfile, tag: string): Operations {
    const buildOps: BuildImageOperation[] = [];
    const tagOps: TagImageOperation[] = [];
    const pushOps: PushImageOperation[] = [];

    const imageName = dokfile.getImageName();
    const remoteUrl = dokfile.getRemoteUrl();

    for (const profile of dokfile.getProfiles()) {
      const suffix = profile.getId();
      const fullTag = suffix === "default" ? tag : `${tag}-${suffix}`;
      const buildOp = new BuildImageOperation(
        imageName,
        fullTag,
        profile.getBuild()
      );
      buildOps.push(buildOp);

      if (profile.isMarkedAsLatest()) {
        const latest = new TagImageOperation(
          imageName,
          "latest",
          buildOp.tagOperation
        );
        tagOps.push(latest);

        if (dokfile.isRemoteUrlAvailable()) {
          tagOps.push(
            new TagImageOperation(imageName, "latest", latest, remoteUrl)
          );
        }
      }

      if (dokfile.isRemoteUrlAvailable()) {
        const tag = new TagImageOperation(
          imageName,
          fullTag,
          buildOp.tagOperation,
          remoteUrl
        );
        tagOps.push(tag);

        pushOps.push(new PushImageOperation(tag));
      }
    }

    return new Operations(buildOps, tagOps, pushOps);
  }
}

export default OperationsGenerator;
