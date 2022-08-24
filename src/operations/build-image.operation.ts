import Build from "../dokfile/build";
import TagImageOperation from "./tag-image.operation";

class BuildImageOperation {
  public readonly tagOperation: TagImageOperation;

  constructor(
    public readonly imageName: string,
    public readonly tag: string,
    public readonly build: Build
  ) {
    this.tagOperation = new TagImageOperation(imageName, tag, null);
  }

  get target() {
    return `${this.imageName}:${this.tag}`;
  }
}

export default BuildImageOperation;
