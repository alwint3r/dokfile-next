import TagImageOperation from "./tag-image.operation";

class PushImageOperation {
  constructor(private tagOp: TagImageOperation) {
    if (!tagOp.remote) {
      throw new Error('Invalid tag operation! Remote is possibly null');
    }
  }

  get target() {
    return this.tagOp.fullTag;
  }
}

export default PushImageOperation;
