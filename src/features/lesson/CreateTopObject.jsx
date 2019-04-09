import React from "react";
import FileUploader from "react-firebase-file-uploader";
import { CircularProgress } from "@material-ui/core";
import Grid from '@material-ui/core/Grid'
import firebase from 'firebase'

function CreateTopObject({
  fileURL,
  handleReset,
  classes,
  selectedFileExt,
  isUploading,
  progress,
  handleUploadStart,
  handleUploadError,
  handleUploadSuccess,
  handleProgress
}) {
  return (
    <Grid item xs={12}>
      {fileURL && (
        <Grid item xs={12}>
          <div
            style={{
              
              display: "flex",
              position: "relative",
              flexDirection: "column",
              backgroundColor: "black",
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='30' viewBox='0 0 1000 120'%3E%3Cg fill='none' stroke='%23222' stroke-width='10' %3E%3Cpath d='M-500 75c0 0 125-30 250-30S0 75 0 75s125 30 250 30s250-30 250-30s125-30 250-30s250 30 250 30s125 30 250 30s250-30 250-30'/%3E%3Cpath d='M-500 45c0 0 125-30 250-30S0 45 0 45s125 30 250 30s250-30 250-30s125-30 250-30s250 30 250 30s125 30 250 30s250-30 250-30'/%3E%3Cpath d='M-500 105c0 0 125-30 250-30S0 105 0 105s125 30 250 30s250-30 250-30s125-30 250-30s250 30 250 30s125 30 250 30s250-30 250-30'/%3E%3Cpath d='M-500 15c0 0 125-30 250-30S0 15 0 15s125 30 250 30s250-30 250-30s125-30 250-30s250 30 250 30s125 30 250 30s250-30 250-30'/%3E%3Cpath d='M-500-15c0 0 125-30 250-30S0-15 0-15s125 30 250 30s250-30 250-30s125-30 250-30s250 30 250 30s125 30 250 30s250-30 250-30'/%3E%3Cpath d='M-500 135c0 0 125-30 250-30S0 135 0 135s125 30 250 30s250-30 250-30s125-30 250-30s250 30 250 30s125 30 250 30s250-30 250-30'/%3E%3C/g%3E%3C/svg%3E\")",
              border: "1px solid rgba(50,50,50,0.2)",
              borderRadius: 7,
              maxHeight: 500,
              minHeight: 200,
              justifyContent: "center",
              alignItems: "center",
              boxShadow: "2px 2px 4px rgba(0,0,0,0.2)"
            }}
          >
            <div onClick={handleReset} className={classes.cancel}>
              X
            </div>
            {selectedFileExt && selectedFileExt === "image" && (
              <img
                alt="pending"
                src={fileURL}
                style={{
                  width: "100%",
                  maxHeight: 500,
                  objectFit: "cover",
                  borderRadius: 7,
                  boxShadow: "2px 2px 4px rgba(0,0,0,0.2)"
                }}
              />
            )}
            {selectedFileExt && selectedFileExt === "video" && (
              <video
                style={{
                  margin: 'auto',
                  height: '500px',
                  width: 'auto',
                  borderRadius: 7,
                  boxShadow: "0px 0px 200px rgba(255,255,255,0.7)",
                }}
                controls={true}
              >
                <source src={fileURL} />
              </video>
            )}
          </div>
        </Grid>
      )}
      {!fileURL && (
        <Grid item xs={12}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              backgroundColor: "black",
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='30' viewBox='0 0 1000 120'%3E%3Cg fill='none' stroke='%23222' stroke-width='10' %3E%3Cpath d='M-500 75c0 0 125-30 250-30S0 75 0 75s125 30 250 30s250-30 250-30s125-30 250-30s250 30 250 30s125 30 250 30s250-30 250-30'/%3E%3Cpath d='M-500 45c0 0 125-30 250-30S0 45 0 45s125 30 250 30s250-30 250-30s125-30 250-30s250 30 250 30s125 30 250 30s250-30 250-30'/%3E%3Cpath d='M-500 105c0 0 125-30 250-30S0 105 0 105s125 30 250 30s250-30 250-30s125-30 250-30s250 30 250 30s125 30 250 30s250-30 250-30'/%3E%3Cpath d='M-500 15c0 0 125-30 250-30S0 15 0 15s125 30 250 30s250-30 250-30s125-30 250-30s250 30 250 30s125 30 250 30s250-30 250-30'/%3E%3Cpath d='M-500-15c0 0 125-30 250-30S0-15 0-15s125 30 250 30s250-30 250-30s125-30 250-30s250 30 250 30s125 30 250 30s250-30 250-30'/%3E%3Cpath d='M-500 135c0 0 125-30 250-30S0 135 0 135s125 30 250 30s250-30 250-30s125-30 250-30s250 30 250 30s125 30 250 30s250-30 250-30'/%3E%3C/g%3E%3C/svg%3E\")",
              border: "1px solid rgba(50,50,50,0.2)",
              borderRadius: 7,
              height: 400,
              justifyContent: "center",
              alignItems: "center",
              boxShadow: "2px 2px 4px rgba(0,0,0,0.2)"
            }}
          >
            {!isUploading && progress < 1 && (
              <div>
                <label
                  className="buttonHover"
                  style={{
                    padding: 10,
                    border: "1px solid rgba(0,0,0,0.2)",
                    borderRadius: 6,
                    pointer: "cursor",
                    fontWeight: 600,
                    backgroundColor: "#f2f2f2",
                    boxShadow: "1px 1px 2px rgba(0,0,0,0.1)"
                  }}
                >
                  Upload Image / Video
                  <FileUploader
                    hidden
                    accept="image/*,video/*"
                    name="selectedFile"
                    randomizeFilename
                    storageRef={firebase.storage().ref("images")}
                    onUploadStart={handleUploadStart}
                    onUploadError={handleUploadError}
                    onUploadSuccess={handleUploadSuccess}
                    onProgress={handleProgress}
                  />
                </label>
              </div>
            )}
            {progress > 0 && (
              <CircularProgress
                variant="static"
                value={progress}
                style={{ color: "white" }}
              />
            )}
          </div>
        </Grid>
      )}
    </Grid> 
  );
}

export default CreateTopObject;
