class TagImageOperation {
  constructor(
    public readonly imageName: string,
    public readonly tag: string,
    public readonly from: TagImageOperation | null,
    public readonly remote?: string,
  ) {}

  get fullTag() {
    if (this.isRemoteAvailable()) {
      return `${this.remote}/${this.imageName}:${this.tag}`;
    }

    return `${this.imageName}:${this.tag}`;
  }

  private isRemoteAvailable() {
    return this.remote && this.remote.length > 0;
  }
}

export default TagImageOperation;
