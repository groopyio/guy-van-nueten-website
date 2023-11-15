## Introduction

This README provides guidance on managing the MP3 files in the `public/audio` folder of the music website repository for Guy van Nueten. It includes instructions for updating ID3 tags, adding or removing MP3 files, updating the `audio_list.json` file, and how to commit these changes using GitHub Desktop.

## Setting Up GitHub Desktop

1. **Download and Install GitHub Desktop:**

   - Visit the [GitHub Desktop download page](https://desktop.github.com/) and download the installer.
   - Follow the installation instructions.

2. **Cloning the Repository:**
   - Open GitHub Desktop and sign in with your GitHub account.
   - Go to `File > Clone Repository` and select the repository for Guy van Nueten's music website.
   - Choose a local path on your computer to save the repository and click `Clone`.

## Managing MP3 Files with Mp3tag

1. **Download and Install Mp3tag:**

   - Download Mp3tag from [here](https://www.mp3tag.de/en/download.html).
   - Follow the installation instructions.

2. **Editing ID3 Tags for MP3 Files:**

   - Open Mp3tag and navigate to the `public/audio` folder in the cloned repository.
   - Select an MP3 file to edit.

   **For Live Performances:**

   - Use the following tag structure:
     - Title: `{TITLE} ({COMPOSER})`
     - Add a custom tag `LIVE`: `{location}, {date}`
     - Comment: `Live at {LIVE}`

   **For Non-Live Tracks:**

   - Use the following tag structure:
     - Title: `{TITLE} ({COMPOSER})`
     - Artist: `{ARTIST}`
     - Add a custom tag `CONTENT_TYPE`: `{CONTENT_TYPE}`
     - Year: `{YEAR}`
     - Publisher: `{PUBLISHER}`

3. **Adding New MP3s:**

   - To add a new MP3, place it in the `public/audio` folder.
   - Edit its ID3 tags following the steps above.
   - Update `audio_list.json` as described in the next section.

4. **Deleting MP3s:**
   - Remove the MP3 file from the `public/audio` folder.
   - Update `audio_list.json` accordingly.

## Updating audio_list.json

1. **Modifying the JSON File:**

   - Open `audio_list.json` located in `/public`.

   **On Adding a New Song:**

   - Add a new object to the `files` array with the format:
     ```
     {
       "filename": "new-song.mp3",
       "genres": ["genre1", "genre2"],
       "album": "album-name.jpeg"
     }
     ```

   **On Deleting a Song:**

   - Remove the corresponding object from the `files` array.

2. **Adding New Album Images:**
   - Place the new album image file in the `/public` folder.
   - Update the `album` field in the `audio_list.json` file accordingly.

## Committing Changes with GitHub Desktop

1. **Reviewing Changes:**

   - Open GitHub Desktop. Changes made in the local repository will appear.
   - Review the list of changed files.

2. **Committing Changes:**

   - Enter a summary of the changes in the `Summary` field.
   - Optionally, add more details in the `Description` field.
   - Click `Commit to main` (or the name of your branch).

3. **Pushing Changes to GitHub:**
   - Click the `Push origin` button to upload your changes to the GitHub repository.

## Reporting Issues or Feature Requests

1. **Creating an Issue on GitHub:**
   - In the GitHub repository, click on `Issues`.
   - Click `New Issue`.
   - Provide a title and a detailed description of the bug or feature request.
   - Click `Submit new issue`.

## Conclusion

These instructions should guide you through managing the MP3 files and related data for Guy van Nueten's music website. For any additional help, feel free to create an issue in the GitHub repository.
