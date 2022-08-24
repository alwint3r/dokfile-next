import Ajv from "ajv/dist/2020";
import Build from "./build";
import BuildProfile from "./build-profile";
import Dokfile from "./dokfile";

import addAjvFormats from "ajv-formats";

const schema = {
  type: "object",
  properties: {
    image_name: {
      type: "string",
    },
    remote_url: {
      type: "string",
    },
    profiles: {
      type: "array",
      items: {
        type: "object",
        properties: {
          id: {
            type: "string",
          },
          asLatest: {
            type: "boolean",
            default: false,
          },
          build: {
            type: "object",
            properties: {
              dockerfile: {
                type: "string",
                default: "Dockerfile",
              },
              args: {
                type: "object",
                patternProperties: {
                  ".*": { type: "string" },
                },
                default: {},
              },
            },
          },
        },
        required: ["id", "build"],
      },
    },
  },
  required: ["imageName", "profiles"],
};

class DokfileFactory {
  static fromJson(json: string) {
    const parsed: any = JSON.parse(json);
    const validate = addAjvFormats(new Ajv()).compile(schema);

    if (!validate(parsed)) {
      console.log(validate.errors);
      throw new Error("Invalid Dokfile content.");
    }

    const profiles: any[] = parsed.profiles as any[];
    const buildProfiles = profiles.map(
      (profile) =>
        new BuildProfile(
          profile.id,
          new Build(profile.build.dockerfile, profile.build.args),
          profile.asLatest
        )
    );

    const dokfile = new Dokfile(parsed.imageName as string, buildProfiles);

    if (parsed.remoteUrl) {
      dokfile.setRemoteUrl(parsed.remoteUrl as string);
    }

    return dokfile;
  }
}

export default DokfileFactory;
