import React from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { useCaseContext } from '../CreationCases/CreateCase';
import './RTE.css';

function RTE() {
    const { text, setText } = useCaseContext();

    const handleCKEditorChange = (event, editor) => {
        const data = editor.getData();
        setText(data);
    };

    return (
        <div>
            <CKEditor
                editor={ClassicEditor}
                data={text}
                onChange={handleCKEditorChange}
            />
        </div>
    );
}

export default RTE;
