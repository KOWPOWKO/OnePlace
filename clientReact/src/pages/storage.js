import {  useEffect,useRef, useState } from 'react'
import {  useLocation } from 'react-router-dom'
import { DirectoryContent } from '../components/directorycontent';
import { FileUpload } from '../components/fileupload';
import { FileViewer } from '../components/fileViewer';
import '../style/storage.css';



export const Storage = () => {
  const isInitialRender = useRef(true);
  const location = useLocation();
  const [files,setFiles] = useState({'directories': [], 'files':[]});
  const [viewer, setViewer] = useState();

  const readFile = function readTextFile(file,path) {
    const extension = file.slice((file.lastIndexOf(".") - 1 >>> 0) + 2);
    const data = {
      'path': path,
      'file': file,
      'extension': extension
    } 
    
    return fetch('/content', {
      method: 'POST',
      mode:'cors',
      headers: {
        'Content-Type':'application/json',
      },
      body: JSON.stringify(data)
    })
    .then(res => res.text())
    .then(data => setViewer(data))
    .catch(err => console.log(err));
  }
  
  useEffect(() => {
    if (isInitialRender.current) {
      isInitialRender.current = false;
      return;
    }

    const sendLocation = {urlLocation: location};

    fetch('/storage', {
      method: 'POST',
      mode:'cors',
      headers: {
        'Content-Type':'application/json',
      },
      body: JSON.stringify(sendLocation)
    })
    .then(res => res.json())
    .then(data => setFiles(data))
    .catch(err => console.log(err));


  }, [location]);


  return (
    
    <div className='storage-container'>
      <div className='storage-navigator-1'></div>
      <div className='two-column-layout'>
        <div className='storage-navigator-2'></div>
        <div className='directories'>
          <DirectoryContent files={files} action={readFile} location={location}/>
        </div>
        <div id='storage-viewer'>
        {
          ((viewer) ? <FileViewer html = {{'__html':viewer}}/>: <div/>)
        }
        </div>
      </div>
      <FileUpload file='/upload'/>


      
      
    </div>
  )
}
