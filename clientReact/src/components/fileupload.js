import {useState} from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';

export const FileUpload = (props) => {
    const [files,setFiles] = useState({});
    const navigate = useNavigate();

    const onInput = (e) => {

        setFiles(e.target.files);
    }

    const onSubmit = (e) => {
        e.preventDefault();
        for (var index = 0; index < files.length; index++) {
            fileUpload(files[index]);  
        } 
    }

    const fileUpload = (file) => {
        console.log(file);
        // fetch('http://192.168.1.11:5000/upload-request', {
        //     method: 'POST',
        //     headers :{
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify({fileName: file.name})
        // }).then(res => res.json())
        // .then(data => console.log(data))
        const req = new XMLHttpRequest();
        const data = new FormData();
        data.append('file',file,file.name);
        req.open('POST','http://192.168.1.11:5000/upload',true);
        req.send(data);
        navigate(0);
    }

    return (
    <div>
        <input type="file" onChange={onInput} multiple/>
        <button onClick={onSubmit}>Upload</button>
    </div>
    )
}
