import React from 'react';
import { useState, useEffect } from 'react';
import { Container, Card } from 'reactstrap';
import dynamic from 'next/dynamic';

import { EditorState, ContentState } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
//React quill editor
import 'react-quill/dist/quill.snow.css';

const Editor = dynamic(
  () => import('react-draft-wysiwyg').then((mod) => mod.Editor),
  { ssr: false }
);

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

const htmlToDraft =
  typeof window === 'object' && require('html-to-draftjs').default;

const Structure = (props) => {
  const [content, setContent] = useState(EditorState.createEmpty());
  useEffect(() => {
    if (props.page === 'aboutUs') {
      let data = props.masterData.aboutUsText;
      if (data !== undefined) {
        setContent(
          EditorState.createWithContent(
            ContentState.createFromBlockArray(htmlToDraft(data))
          )
        );
      }
    }
    if (props.page === 'terms') {
      let data = props.masterData.termsAndConditionText;
      if (data !== undefined) {
        setContent(
          EditorState.createWithContent(
            ContentState.createFromBlockArray(htmlToDraft(data))
          )
        );
      }
    }
    if (props.page === 'privacyPolicy') {
      let data = props.masterData.privacyPolicyText;
      if (data !== undefined) {
        setContent(
          EditorState.createWithContent(
            ContentState.createFromBlockArray(htmlToDraft(data))
          )
        );
      }
    }
  }, [props]);

  const modules = {
    toolbar: false,
  };
  return (
    <div className='structure-2'>
      <Container fluid='md'>
        <Card className='main-card'>
          <div>
            {props.page === 'quilleditor' ? (
              <>
                {/* <ReactQuill
                  theme={'snow'}
                  value={props?.masterData?.aboutUsText}
                  modules={modules}
                  bounds={'.app'}
                  placeholder=''
                  readOnly
                /> */}
                <div className='quill edit'>
                  <div className='ql-container ql-snow'>
                    <div
                      className='ql-editor'
                      dangerouslySetInnerHTML={{
                        __html: props?.masterData?.aboutUsText,
                      }}
                    ></div>
                  </div>
                </div>
              </>
            ) : (
              <Editor
                editorState={content}
                toolbarClassName='toolbarClassName'
                wrapperClassName='wrapperClassName'
                editorClassName='editorClassName'
                readOnly={true}
                toolbarHidden={true}
              />
            )}
          </div>
        </Card>
      </Container>
    </div>
  );
};

export default Structure;
