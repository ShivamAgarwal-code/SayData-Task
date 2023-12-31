import React,{useState} from 'react'
import '../style.css'
import toast, { Toaster } from 'react-hot-toast';
function Tablecell(props) {
  const [tempchecked,settempchecked]=useState(false);
    const downloadTxtFile = () => {
           toast("Downloading.....");
           const newNotification=`Downloading of ${props.item.name} completed`;
           props.setNotificationRecords([...props.notificationRecords,newNotification]);
        const element = document.createElement("a");
        const file = new Blob([props.item.transcription],
            { type: 'text/plain;charset=utf-8' });
        element.href = URL.createObjectURL(file);
        element.download = "Transcribed.txt";
        document.body.appendChild(element);
        element.click();
    }
    return (
        <>
        <Toaster></Toaster>
        <tr>
        <td><div className="check"><input type="checkbox" checked={tempchecked || props.allchecked} onChange={()=>{ settempchecked(!tempchecked);}} className='checkbox'/>{tempchecked&&(<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none" onClick={()=>{if(!props.savedRecords.includes(props.item))props.setSavedRecords([...props.savedRecords,props.item])}}>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M6.19048 0.833344C4.18228 0.833344 2.5 2.40869 2.5 4.41773V16.4957C2.5 19.0964 5.82609 20.0813 7.38988 18.1453L9.52061 15.5076C9.75901 15.2124 10.241 15.2124 10.4794 15.5076L12.6101 18.1453C14.1739 20.0813 17.5 19.0964 17.5 16.4957V4.41773C17.5 2.40869 15.8177 0.833344 13.8095 0.833344H6.19048ZM4.16667 4.41773C4.16667 3.38804 5.04276 2.50001 6.19048 2.50001H13.8095C14.9572 2.50001 15.8333 3.38804 15.8333 4.41773V16.4957C15.8333 17.3876 14.5698 17.919 13.9066 17.0981L11.7759 14.4603C10.8704 13.3393 9.12958 13.3393 8.22409 14.4603L6.09336 17.0981C5.43023 17.919 4.16667 17.3876 4.16667 16.4957V4.41773Z" fill="#4D4D4D" />
              </svg>)}</div></td>
            <td><div className="Tablecell">{props.item.name}</div></td>
            <td><div className="Tablecell">{props.item.type}</div></td>
            <td><div className="Tablecell">{props.item.duration}sec</div></td>
            <td><div className="Tablecell">{props.item.dateCreated}</div></td>
            <td><div className="Tablecell">{props.item.size}</div></td>
            <td><div className="Tablecell download" onClick={downloadTxtFile}> {props.item.transcription.length > 10
                ? props.item.transcription.substring(0, 10) + "..."
                : props.item.transcription}</div></td>
        </tr>
        </>
    )
}

export default Tablecell
