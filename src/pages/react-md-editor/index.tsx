import React, { useState } from "react";
import MDEditor from '@uiw/react-md-editor';



export default function Editor() {

    const [value, setValue] = useState("**Hello world!!!**");
    return (
      <div className="container">
        <MDEditor
          value={value}
          onChange={(value) => setValue(value || "")}
          height={700}
          highlightEnable={true}
        />
        <MDEditor.Markdown source={value} style={{ whiteSpace: 'pre-wrap' }} />
      </div>
    );
}
