import { Link} from 'react-router-dom'
export const DirectoryContent = (props) => {

    return (
    <ul>
    {
    
    props.files.directories.map((fileObject,i) => {
        return (
        <li key = {fileObject}>
            <Link to={fileObject}>{fileObject}</Link>
        </li>
        ); 
    })
    }
    {
    props.files.files.map((fileObject,i) => {
        return (
        <li key = {fileObject} >
            <div onClick={(e) => props.action(fileObject,props.location)}>{fileObject}</div>
        </li>
        ); 
    }) 
    }
    </ul>

  )
}
