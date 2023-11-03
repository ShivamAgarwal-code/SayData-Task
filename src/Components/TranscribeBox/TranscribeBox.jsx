import React from 'react'
import { useState,useEffect,useRef } from 'react';
import { FileUploader } from "react-drag-drop-files";
import './style.css';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import LoadingBar from "react-top-loading-bar";
function TranscribeBox(props) { {/*Transcribe Box Form user can click or drag and drop file using react-drag-drop-files module. It is fully 
functional form*/}
const [isLoading,setisLoading]=useState(false);
const [checked, setChecked] = useState(false);
    const [text,setText]=useState("The maximum file size is 1GB for audio and 10GB for videos.Supported formats: mp3, mp4, wav, caf, aiff, avi, rmvb, flv, m4a, mov, wmv, wma, webm");
    const [content,setContent]=useState("Click to upload");
    const [transcription, setTranscription] = useState("");
    const [drag,setDrag]=useState("or drag and drop");
    const fileTypes = ["MP3","MP4","WAV","CAF","AIFF","AVI","RMVB","FLV","M4A","MOV","WMV","WMA","WEBM"];
    const [TransFile,setTransFile]=useState(null);
    const loadingRef = useRef(null);

    useEffect(() => {
        if (isLoading) {
            loadingRef.current?.continuousStart();
        } else {
            loadingRef.current?.complete();
        }
    }, [isLoading]);

    const handleTranscribeSubmit=async ()=>{
      setisLoading(true);
        if(!checked){
          toast("Speaker Identification needed");
          return;
        }
      if(TransFile==null){
       toast("File Needed");
        return;
      }
      console.log(TransFile[0]);
      if (TransFile) {
        const formData = new FormData();
        formData.append("audio", TransFile[0]);
        try {
          const response = await axios.post(
          "https://sanyam-saydata-server.onrender.com/transcribe",
            formData
          );
          setTranscription(response.data.transcription);
        } catch (error) {
          console.error(error);
        }
      }

    };
    const add=(TransFile)=>{
      const newRecord = {
        name: TransFile[0].name,
        type:TransFile[0].type,
        transcription:transcription,
        size:(TransFile[0].size/1048576).toFixed(2)+" MB",
    dateCreated: new Date().toLocaleString(),
    duration:Math.floor(Math.random() * 300),
  };
  props.setTranscriptionRecords([...props.transcriptionRecords, newRecord]);
  
  props.onClick();
    }
    const handleFileChange=(file)=>{
      setTransFile(file);
      const newText="Name: "+file[0].name+" Size: "+(file[0].size/1048576).toFixed(2)+" MB";
      setText(newText);
   setContent("Uploaded");
   setDrag("File");

    };
    useEffect(() => {
      if (TransFile && transcription) {
        setisLoading(false);
        const newNotification=`Transcription of ${TransFile[0].name} completed`;
        props.setNotificationRecords([...props.notificationRecords,newNotification]);
        toast("File Transcription Completed");
        add(
        TransFile
        );
      }
    }, [transcription]);
    const stack2=(
      <div className="Upload-Box">
      <div className="Upload-Box-Content">
        <div className="Upload-Icon">
          <svg xmlns="http://www.w3.org/2000/svg" style={{
            width: "49.106px",
            height: "48px",
            flexShrink: "0", display: "flex", justifyContent: "center", alignItems: "center"
          }} width="51" height="49" viewBox="0 0 51 49" fill="none">
            <ellipse cx="25.5" cy="24.5" rx="24.5531" ry="24" fill="#E0EDFF" />
          </svg>
          <div className="cloud">
            <svg xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: "0" }} width="25" height="25" viewBox="0 0 25 25" fill="none">
              <path d="M8.40782 16.5922L12.5 12.5M12.5 12.5L16.5922 16.5922M12.5 12.5V21.7074M20.6844 17.3522C21.934 16.3201 22.7305 14.7588 22.7305 13.0115C22.7305 9.90398 20.2113 7.38479 17.1037 7.38479C16.8802 7.38479 16.671 7.26816 16.5575 7.07556C15.2234 4.81166 12.7603 3.2926 9.94239 3.2926C5.70479 3.2926 2.26953 6.72786 2.26953 10.9655C2.26953 13.0792 3.12424 14.9933 4.50689 16.381" stroke="#0048AD" stroke-width="2.30186" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </div>
        </div>
        <div className="Upload-Box-Text">
          <div className="Upload-Box-Text-Content">
            <div className="label" onClick={()=>{ setText("The maximum file size is 1GB for audio and 10GB for videos.Supported formats: mp3, mp4, wav, caf, aiff, avi, rmvb, flv, m4a, mov, wmv, wma");
   setContent("Click to upload");
   setDrag("or drag and drop");}}>{content}</div>
            <div className="Normal-Text">{drag}</div>
          </div>
          <div className="Supporting-Text">{text}</div>
        </div>
      </div>
    </div>
    );
  return (
    <>
      <LoadingBar color="#006aff" ref={loadingRef} />
    <Toaster />
                <div className="Transcribe-Box">
            <div className="Transcribe-header">
              <span className='Transcribe-Text'>Transcribe File</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none"  onClick={() => (props.onClick ? props.onClick() : "")}>
                <path d="M7.55086 5.63616C7.16033 5.24563 6.52717 5.24563 6.13664 5.63616C5.74612 6.02668 5.74612 6.65984 6.13664 7.05037L11.0864 12.0001L6.13664 16.9499C5.74612 17.3404 5.74612 17.9736 6.13664 18.3641C6.52717 18.7546 7.16033 18.7546 7.55086 18.3641L12.5006 13.4143L17.4504 18.3641C17.8409 18.7546 18.474 18.7546 18.8646 18.3641C19.2551 17.9736 19.2551 17.3404 18.8646 16.9499L13.9148 12.0001L18.8646 7.05037C19.2551 6.65984 19.2551 6.02668 18.8646 5.63616C18.474 5.24563 17.8409 5.24563 17.4504 5.63616L12.5006 10.5859L7.55086 5.63616Z" fill="black" />
              </svg>
            </div>
            <div className="Transcribe-Dropdown">
              <div className="Transcribe-Dropdown-Text">Transcription Language</div>
              <div className="Transcribe-Dropdown-Box">
                <span className="Transcribe-Dropdown-Box-Text">English</span> {/*WE can add multiple languages but free api only support english */}
                <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 17 17" fill="none">
                  <path d="M2.37641 6.31882L7.58617 11.2221C8.09957 11.7053 8.90041 11.7053 9.41381 11.2221L14.6236 6.31882C14.8917 6.06648 14.9045 5.64456 14.6521 5.37645C14.3998 5.10833 13.9779 5.09555 13.7097 5.34789L8.49999 10.2512L3.29024 5.34789C3.02212 5.09554 2.6002 5.10833 2.34786 5.37645C2.09551 5.64456 2.1083 6.06648 2.37641 6.31882Z" fill="#667185" />
                </svg>
              </div>

            </div>
            <FileUploader
        multiple={true}
        name="file"
        handleChange={handleFileChange}
        types={fileTypes}
        label="Upload"
        children={stack2}
      />
            <div className="Import-Link-Box">
              <div className="Import-Link-Box-Text">Import from Link</div>
              <input type="text" id='Import-Link-Input' placeholder='Paste a Drobbox, Google Drive or Youtube URL here'/>
            </div>
            <div className="Transcribe-Control">
              <>
                <input type="checkbox" id="cb1" checked={checked} onChange={()=>setChecked(!checked)}/>
                <label for="cb1"></label>
              </>
              <div className="Transcribe-Control-Text">Speaker Identification</div>
            </div>
            <button className={`Transcribe-Button ${(TransFile==null||!checked)?"":"Button-active"}`} onClick={handleTranscribeSubmit}>Transcribe File</button>
          </div>
    </>
  )
}

export default TranscribeBox
