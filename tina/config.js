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
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
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
          allowedActions: {
            create: false,
            delete: false,
          },
        },
        fields: [
          {
            label: "Files",
            name: "files",
            type: "object",
            list: true,
            ui: {
              itemProps: (item) => {
                return { label: item?.title };
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
              },
              {
                label: "Youtube",
                name: "youtube",
                type: "string",
              },
              {
                label: "Filename",
                name: "filename",
                type: "string",
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
