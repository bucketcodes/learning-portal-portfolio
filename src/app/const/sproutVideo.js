import Axios from "axios";

//API KEY: ff4e569ecc0d4dfd7be3c4590c7856ba
//URL: https://api.sproutvideo.com/v1/videos
//TYPE: POST

//FILE: source_video
//TITLE: title
//HIDE ON SITE: hide_on_site
//FOLDER TO STORE IN: folder_id
//DOWNLOAD: download_hd

//NOTES
// If you attempt to upload a video with a file extension we do not currently support, you will receive a response code of 415 - Unsupported Media Type. 
//The upload will not be processed and the response body will contain a list of the currently supported file extensions.
// If your plan has storage limits and the file you attempt to upload would put you over your limit, you will receive a response code of 413 - 
//Request Entity Too Large and the upload will not be processed.

//Experimental
const headers = {
    'Content-Type': 'application/json',
    'Authorization': 'JWT fefege...' ,
    'SproutVideo-Api-Key': 'ff4e569ecc0d4dfd7be3c4590c7856ba'
}

Axios.put('https://api.sproutvideo.com/v1/videos', {
    headers: headers,
    source_video: this.state.selectedFile,
    title: 'Testing Upload From API'
})