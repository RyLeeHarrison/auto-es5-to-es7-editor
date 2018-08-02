import * as React from "react";
import { Controlled as CodeMirror } from "react-codemirror2";
import SplitPane from "react-split-pane";
import lebab from 'lebab';

// import "codemirror/mode/javascript/javascript"
import "codemirror/mode/jsx/jsx";

import "codemirror/addon/hint/show-hint.js";
import "codemirror/addon/hint/anyword-hint";
import "codemirror/addon/hint/javascript-hint";

import "./theme.css";
import "./index.css";

const dummy_code = require('./dummy_code');

const common_options = {
  theme: "material",
  mode: 'jsx',
  autoCloseBrackets: true,
  cursorScrollMargin: 48,
  lineNumbers: true,
  lineWrapping: true,
  tabSize: 2,
  styleActiveLine: true,
  viewportMargin: 99,
}

const transformers = [
	"arrow", "for-of", "for-each", "arg-rest", "arg-spread",
	"obj-method", "obj-shorthand", "no-strict", "exponent", 
	"multi-var", "let", "class", "commonjs", "template",
	"default-param", "destruct-param", "includes"
]

export class StyledEditor extends React.Component {
  state = {
    jsValue: dummy_code,
    previewValue: this.transform(dummy_code)
  };

  jsxOptions = {
    ...common_options,
    ...this.props.jsxOptions
  };

  previewOptions = {
    readOnly: true,
    ...common_options,
    ...this.props.cssOptions
  }

  transform(value) {
    try {
      const { code, warnings } = lebab.transform(value, transformers);
      if (warnings) { console.log(warnings) }
      return code;
    } catch (err) { console.log(err) } 
  }

  onChange = (editor, data, value) => {
    this.setState({
      jsValue: value,
      previewValue: this.transform(value)
    })
  };

  render() {
    return (
      <React.Fragment>
        <SplitPane split="vertical" defaultSize="50%">
          <PureEditor
            name="js"
            value={this.state.jsValue}
            options={this.jsxOptions}
            onChange={this.onChange}
          />

          <PureEditor
            name="preview"
            value={this.state.previewValue}
            options={this.previewOptions}
          />
        </SplitPane>
      </React.Fragment>
    );
  }
}

class PureEditor extends React.PureComponent {
  render() {
    console.log(`rendering -> ${this.props.instance}`);

    return (
      <CodeMirror
        editorDidMount={editor => editor.autocomplete = (cm) => {
          cm.showHint({hint: CodeMirror.hint.anyword});
        }}
        value={this.props.value}
        options={this.props.options}
        onBeforeChange={this.props.onChange}
      />
    );
  }
}
