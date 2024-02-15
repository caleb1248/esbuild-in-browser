import MonacoEditor, { OnMount } from '@monaco-editor/react';
import React, { useRef, useState } from 'react';
import { format } from 'prettier';
// import Highlighter from 'monaco-jsx-highlighter';

import { Box, Button } from '@chakra-ui/react';
import './syntax.css';
import './code-editor.css';
interface CodeEditorProps {
  initialValue: string;
  onChange(value: string): void;
}

export const CodeEditor: React.FC<CodeEditorProps> = ({
  initialValue,
  onChange,
}) => {
  const [hoverState, setHoverState] = useState(false);

  const editorRef = useRef<any>();

  const onEditorDidMount: OnMount = (editor) => {
    editorRef.current = editor;
    editor.onDidChangeModelContent(() => {
      onChange(editor.getValue());
    });
  };
  function onFormatClick() {
    const unformatted = editorRef.current.getModel().getValue();
    format(unformatted, {
      parser: 'babel',
      useTabs: true,
      semi: false,
      singleQuote: true,
    })
      .then((result) => result.replace(/\n$/, ''))
      .then((formatted) => editorRef.current.setValue(formatted));
  }

  return (
    <Box
      width="100%"
      height="100%"
      className="editor-wrapper"
      onMouseEnter={() => setHoverState(true)}
      onMouseLeave={() => setHoverState(false)}
    >
      <Box pr={4} position="relative">
        <Button
          size="xs"
          variant="solid"
          colorScheme="blue"
          position="absolute"
          top={2}
          right={4}
          zIndex={1}
          onClick={onFormatClick}
          opacity={hoverState ? 1 : 0}
        >
          Format
        </Button>
      </Box>
      <MonacoEditor
        value={initialValue}
        height="100%"
        theme="vs-dark"
        language="javascript"
        onMount={onEditorDidMount}
        options={{
          wordWrap: 'on',
          minimap: {
            enabled: false,
          },
          showUnused: false,
          folding: false,
          lineNumbersMinChars: 3,
          fontSize: 16,
          scrollBeyondLastLine: false,
          automaticLayout: true,
          tabCompletion: 'on',
        }}
      />
    </Box>
  );
};
