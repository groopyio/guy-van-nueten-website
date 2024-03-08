import { defineConfig } from "tinacms";

// Your hosting provider likely exposes this as an environment variable
const branch =
  process.env.GITHUB_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  "main";

export default defineConfig({
  branch,

  // Get this from tina.io
  clientId: "eac00539-07f1-4372-88d8-9ab5f192d2d1",
  // Get this from tina.io
  token: process.env.TINA_TOKEN,

  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  media: {
    tina: {
      mediaRoot: "",
      publicFolder: "public",
    },
  },

  // See docs on content modeling for more info on how to setup new content models: https://tina.io/docs/schema/
  schema: {
    collections: [
      {
        name: "samples",
        label: "Samples",
        path: "content/samples",
        format: "json",
        ui: {
          global: true,
          allowedActions: {
            create: false,
            delete: false,
          },
        },
        fields: [
          {
            label: "List",
            name: "list",
            type: "object",
            list: true,
            ui: {
              itemProps: (item) => {
                return { label: item?.filename };
              },
            },
            fields: [
              {
                label: "Title",
                name: "title",
                type: "string",
              },
              {
                label: "Composer",
                name: "composer",
                type: "string",
              },
              {
                label: "Origin",
                name: "origin",
                type: "string",
              },
              {
                label: "Project",
                name: "project",
                type: "string",
              },
              {
                label: "Year",
                name: "year",
                type: "string",
              },
              {
                label: "Artist",
                name: "artist",
                type: "string",
              },
              {
                label: "Album",
                name: "album",
                type: "string",
              },
              {
                label: "Publisher",
                name: "publisher",
                type: "string",
              },
              {
                label: "Venue Date",
                name: "venue_date",
                type: "string",
              },
              {
                label: "Spotify",
                name: "spotify",
                type: "string",
                ui: {
                  validate: (value) => {
                    if (value === "") return;
                    const urlPattern = new RegExp(
                      "^(https?:\\/\\/)?" + // protocol
                        "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name and extension
                        "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
                        "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
                        "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
                        "(\\#[-a-z\\d_]*)?$",
                      "i"
                    );
                    if (!urlPattern.test(value)) {
                      return "Please enter a valid URL.";
                    }
                  },
                },
              },
              {
                label: "Youtube",
                name: "youtube",
                type: "string",
                ui: {
                  validate: (value) => {
                    if (value === "") return;
                    const urlPattern = new RegExp(
                      "^(https?:\\/\\/)?" + // protocol
                        "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name and extension
                        "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
                        "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
                        "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
                        "(\\#[-a-z\\d_]*)?$",
                      "i"
                    );
                    if (!urlPattern.test(value)) {
                      return "Please enter a valid URL.";
                    }
                  },
                },
              },
              {
                label: "Filename",
                name: "filename",
                type: "image",
                ui: {
                  component: "image",
                  uploadDir: () => "/audio/",
                  format(value) {
                    return value && value.split("/").pop();
                  },
                  parse(value) {
                    return value && value.split("/").pop();
                  },
                  validate: (value) => {
                    if (!value.endsWith(".mp3")) {
                      return "The file must be an MP3 file.";
                    }
                  },
                },
              },
              {
                label: "Genres",
                name: "genres",
                type: "string",
                list: true,
                options: [
                  {
                    label: "Piano",
                    value: "piano",
                  },
                  {
                    label: "Electronic",
                    value: "electronic",
                  },
                  {
                    label: "Orchestral",
                    value: "orchestral",
                  },
                  {
                    label: "Song",
                    value: "song",
                  },
                  {
                    label: "Contemporary",
                    value: "contemporary",
                  },
                  {
                    label: "Old Styles",
                    value: "old_styles",
                  },
                  {
                    label: "Pop",
                    value: "pop",
                  },
                  {
                    label: "Live",
                    value: "live",
                  },
                  {
                    label: "Stage",
                    value: "stage",
                  },
                  {
                    label: "Film",
                    value: "film",
                  },
                  {
                    label: "Minimal",
                    value: "minimal",
                  },
                ],
              },
              {
                label: "Is Live",
                name: "is_live",
                type: "boolean",
              },
            ],
          },
        ],
      },
    ],
  },
});
