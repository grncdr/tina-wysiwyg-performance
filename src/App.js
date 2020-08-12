import React, { useMemo } from "react";
import "./App.css";

import { TinaProvider, CMS, useForm, usePlugin } from "tinacms";
import {
  InlineForm,
  InlineBlocks,
  InlineText,
  BlocksControls,
} from "react-tinacms-inline";
import { InlineWysiwyg } from "react-tinacms-editor";

function App() {
  const cms = useMemo(() => new CMS({ enabled: true }), []);
  return (
    <TinaProvider cms={cms}>
      <div style={{ maxWidth: "40em", margin: "auto", marginTop: 50 }}>
        <TestForm />
      </div>
    </TinaProvider>
  );
}

const markdownSnippet = `
# hello world

Here is some markdown content. I'd like to test it.

- First item
- Second item
`;

const initialValues = {
  blocks: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1].map((_, i) => ({
    title: `section ${i}`,
    content: markdownSnippet,
    _template: "Markdown",
  })),
};

const Blocks = {
  Markdown: {
    Component: (props) => (
      <BlocksControls index={props.index}>
        <InlineText name="title">{null}</InlineText>
        <div style={{ marginBottom: 30 }} />
        <InlineWysiwyg name="content">{null}</InlineWysiwyg>
        <div style={{ marginBottom: 50 }}></div>
      </BlocksControls>
    ),
    template: {
      label: "Markdown",
      defaultItem: {
        title: "Foobar",
        markdown: markdownSnippet,
      },
      fields: [],
    },
  },
};

function TestForm() {
  const [modifiedValues, form] = useForm({ initialValues });
  usePlugin(form);

  return (
    <InlineForm form={form}>
      <InlineBlocks name="blocks" blocks={Blocks} />
    </InlineForm>
  );
}
export default App;
