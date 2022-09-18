import { Link, useNavigate} from 'react-router-dom'
export const DirectoryContent = (props) => {

    const navigate = useNavigate();
    return (
    <>
        <table className='folder-content-table'>
            <thead>
                <tr className='table-header'>
                    <th>File</th>
                    <th>Type</th>
                    <th>File Size</th>
                    <th>Created Date</th>
                    <th className='last-table-head'>Local Path</th> 
                </tr>
            </thead>
            <tbody>
                <div className='padding-div'></div>
                {
                props.files.directories.map((fileObject,i) => {
                    return (
                    <tr className='directory-row-content' key = {fileObject.name} onClick={(e) => navigate(fileObject.name)} >
                        <td>{fileObject.name}</td>
                        <td>{fileObject.type}</td>
                        <td>{fileObject.size}</td>
                        <td>{fileObject.created}</td>
                        <td>{fileObject.path}</td>
                    </tr>
                    ); 
                }) 
                }
                {
                props.files.files.map((fileObject,i) => {
                    return (
                    <tr key = {fileObject.name} onClick={(e) => props.action(fileObject.name,props.location)}>
                        <td>{fileObject.name}</td>
                        <td>{fileObject.type}</td>
                        <td>{fileObject.size}</td>
                        <td>{fileObject.created}</td>
                        <td>{fileObject.path}</td>
                    </tr>
                    
                    ); 
                }) 
                }
            </tbody>

        </table>

    </>    
    
    

  )
}
