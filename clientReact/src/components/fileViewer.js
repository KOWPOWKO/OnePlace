import React from 'react';
import '../style/viewer.css';

export const FileViewer = (props) => {
  return (
    <div dangerouslySetInnerHTML={props.html}/>

  )
}
