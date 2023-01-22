import { useState } from 'react';
import styled from 'styled-components';
import { Editor, EditorState, RichUtils, ContentState, convertToRaw } from 'draft-js';

const Container = styled.div`
  border: 2px solid #808080;
  background-color: #fff;
`;

const EditorOptions = styled.div`
  padding: 4px;
  border-bottom: 2px solid #808080;
  margin-bottom: 4px;
`;

const EditorWrapper = styled.div`
  padding: 4px;
  background-color: #fff;
`;

export const IssueEditor = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const handleKeyCommand = (command: any) => {
    const newEditorState = RichUtils.handleKeyCommand(editorState, command);
    if (newEditorState) {
      setEditorState(newEditorState);
      return 'handled';
    }
    return 'not-handled';
  };

  const toggleBlockType = (blockType: any) => {
    setEditorState(RichUtils.toggleBlockType(editorState, blockType));
  };

  const toggleInlineStyle = (inlineStyle: any) => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, inlineStyle));
  };

  const toggleCode = () => {
    setEditorState(RichUtils.toggleCode(editorState));
  };

  const handleSubmit = () => {
    const contentState = editorState.getCurrentContent();
    const rawContent = convertToRaw(contentState);
    // Send the rawContent to the backend here
    console.log('rawContent: ', rawContent);
  };

  // @ts-ignore
  const handleUpload = (e) => {
    // handle image or emoji upload here
  };

  return (
    <Container>
      <EditorOptions>
        <button onClick={() => toggleInlineStyle('BOLD')}>
          <i className="fas fa-bold">B</i>
        </button>
        <button onClick={() => toggleInlineStyle('ITALIC')}>
          <i className="fas fa-italic">I</i>
        </button>
        <button onClick={() => toggleInlineStyle('UNDERLINE')}>
          <i className="fas fa-underline">U</i>
        </button>
        <button onClick={() => toggleInlineStyle('STRIKETHROUGH')}>
          <i className="fas fa-strikethrough">S</i>
        </button>
        <button onClick={() => toggleCode()}>
          <i className="fas fa-code">C</i>
        </button>
        <button onClick={() => toggleBlockType('unordered-list-item')}>
          <i className="fas fa-list-ul">UL</i>
        </button>
        <button onClick={() => toggleBlockType('ordered-list-item')}>
          <i className="fas fa-list-ol">OL</i>
        </button>
        <button onClick={handleUpload}>
          <i className="fas fa-image">Img</i>
        </button>
        <button onClick={handleSubmit}>Submit</button>
      </EditorOptions>
      <EditorWrapper>
        <Editor
          editorState={editorState}
          handleKeyCommand={handleKeyCommand}
          onChange={setEditorState}
        />
      </EditorWrapper>
    </Container>
  );
};
