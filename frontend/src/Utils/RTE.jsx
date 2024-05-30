import React, { Component } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { useCaseContext } from '../CreationCases/CreateCase';

function RTE() {
    const { text, setText } = useCaseContext();

    const handleCKEditorChange = (event, editor) => {
        const data = editor.getData();
        setText(data);
    };

    const initialData = text || '<br><br>';

    return (
        <div>
            <CKEditor
                editor={ClassicEditor}
                data={initialData}
                onChange={handleCKEditorChange}
            />
        </div>
    );
}

export default RTE;
