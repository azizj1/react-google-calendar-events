# React Component to Display Google Calendar Events
Many organizations house their events in a public Google Calendar. This component will allow them to elegantly display those events, search and filter events. Check out [MMWC](http://mmwconline.org) and their [events' page](http://mmwconline.org/events/) for a demo:

![](/readme-pics/demo.gif)

Events can include images or YouTube videos. To include an image, upload an image in a [public Google Drive folder](https://docs.google.com/document/d/1WgI8GMo47XU-RWgkDf4_m7P5hiTkiTCc4t06V9WIK2E/edit) (or check out [this](https://support.google.com/drive/answer/2494822?co=GENIE.Platform%3DDesktop&hl=en) and read up on 'Share a file publicly'), and then find it when adding an attachment to an event in a public calendar:

![](/readme-pics/add-attachment.png)

To include a YouTube video with the event, make the first line of the description a YouTube link. 

## What's Included in Repo
* All components that constitute the Google Calendar Events timeline above
* All components that constitute the events section at [MMWC homepage](http://mmwconline.org/)
* Calendar service to retrieve the events
* Model to represent a Google Calendar event
* All necessary CSS styles

## What's Not Included in Repo
* gulpfile.js or webpack.config.js - it's very specific to the website itself

