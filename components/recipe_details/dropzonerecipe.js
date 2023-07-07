import React, {useEffect, useState} from 'react';
import {useDropzone} from 'react-dropzone';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const thumbsContainer = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  marginTop: 5
};

const thumb = {
  display: 'inline-flex',
  borderRadius: 5,
  border: '2px solid #96be2c',
  marginBottom: 8,
  marginRight: 15,
  width: 80,
  height: 80,
  padding: 4,
  boxSizing: 'border-box'
};

const thumbInner = {
  display: 'flex',
  minWidth: 0,
  overflow: 'hidden',
  justifyContent: 'center',
  width:'100%'
};

const img = {
  display: 'block',
  width: 'auto',
  height: '100%'
};


function Dropcustom(props) {
  const [files, setFiles] = useState([]);
  const {getRootProps, getInputProps} = useDropzone({
    accept: 'image/*',
    // maxFiles:2,
    onDrop: acceptedFiles => {
      setFiles(acceptedFiles.map(file => Object.assign(file, {
        preview: URL.createObjectURL(file)
      })));
    },
   
  });
  
  const thumbs = files.map(file => (
    <div className="set-file" style={thumb} key={file.name}>
      <button type="button"className="btn-danger remove-file">
        <i className="fa fa-close"></i>
      </button> 
      <button onClick={() => toggle()}  type="button"className="show-file">
        <i className="fa fa-plus"></i>
      </button> 
      <div style={thumbInner}>
        <img
          src={file.preview}
          style={img}
        />
      </div>
    </div>
  ));

  const {
    buttonLabel,
    className
  } = props;

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  useEffect(() => () => {
    // Make sure to revoke the data uris to avoid memory leaks
    files.forEach(file => URL.revokeObjectURL(file.preview));
  }, [files]);

  return (
    <>
      <aside style={thumbsContainer}>
        {thumbs}
      </aside>
      <div {...getRootProps({className: 'dropzone'})}>
        <input {...getInputProps()} />
        <p className="custom-dropzone mb-30"><span>Add files</span> or add file here</p>
      </div>

      <Modal size="lg" isOpen={modal} toggle={toggle} centered={true} className="preview-modal">
        <Button color="null" className="close-modal" onClick={toggle}>
          <img src="/assets/images/close-modal.png" width="18" height="18" className="img-fluid"/>
        </Button>
        <ModalBody className="text-center">
          <img src="/assets/images/big-cate1.png" className="img-fluid"/>
        </ModalBody>
      </Modal>
    </>
  );
}

export default Dropcustom