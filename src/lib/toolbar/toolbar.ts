import * as forgo from 'forgo';
import Emitter from '../emitter/emitter';

/** https://w3c.github.io/input-events/#interface-InputEvent-Attributes */
export enum InputType {
  insertText = 'insertText',
  insertReplacementText = 'insertReplacementText',
  insertLineBreak = 'insertLineBreak',
  insertParagraph = 'insertParagraph',
  insertOrderedList = 'insertOrderedList',
  insertUnorderedList = 'insertUnorderedList',
  insertHorizontalRule = 'insertHorizontalRule',
  insertFromYank = 'insertFromYank',
  insertFromDrop = 'insertFromDrop',
  insertFromPaste = 'insertFromPaste',
  insertFromPasteAsQuotation = 'insertFromPasteAsQuotation',
  insertTranspose = 'insertTranspose',
  insertCompositionText = 'insertCompositionText',
  insertLink = 'insertLink',
  deleteWordBackward = 'deleteWordBackward',
  deleteWordForward = 'deleteWordForward',
  deleteSoftLineBackward = 'deleteSoftLineBackward',
  deleteSoftLineForward = 'deleteSoftLineForward',
  deleteEntireSoftLine = 'deleteEntireSoftLine',
  deleteHardLineBackward = 'deleteHardLineBackward',
  deleteHardLineForward = 'deleteHardLineForward',
  deleteByDrag = 'deleteByDrag',
  deleteByCut = 'deleteByCut',
  deleteContent = 'deleteContent',
  deleteContentBackward = 'deleteContentBackward',
  deleteContentForward = 'deleteContentForward',
  historyUndo = 'historyUndo',
  historyRedo = 'historyRedo',
  formatBold = 'formatBold',
  formatItalic = 'formatItalic',
  formatUnderline = 'formatUnderline',
  formatStrikeThrough = 'formatStrikeThrough',
  formatSuperscript = 'formatSuperscript',
  formatSubscript = 'formatSubscript',
  formatJustifyFull = 'formatJustifyFull',
  formatJustifyCenter = 'formatJustifyCenter',
  formatJustifyRight = 'formatJustifyRight',
  formatJustifyLeft = 'formatJustifyLeft',
  formatIndent = 'formatIndent',
  formatOutdent = 'formatOutdent',
  formatRemove = 'formatRemove',
  formatSetBlockTextDirection = 'formatSetBlockTextDirection',
  formatSetInlineTextDirection = 'formatSetInlineTextDirection',
  formatBackColor = 'formatBackColor',
  formatFontColor = 'formatFontColor',
  formatFontName = 'formatFontName'
}

export type ToolbarEvents = {
  edit: (editable: boolean) => void;
};

export default class Toolbar extends Emitter<ToolbarEvents> {
  private readonly _id: string;
  private readonly _plainTypes: string[];
  private _editable: boolean;

  private _handleEdit() {
    this._editable = !this._editable;

    this.emit('edit', this._editable);
  }

  private _handleBeforeInput(event: InputEvent) {
    if (!this._plainTypes.includes(event.inputType)) return event.preventDefault();
  }

  private _handlePaste(event: ClipboardEvent) {
    event.preventDefault();

    const raw = event.clipboardData?.getData('text');
    if (!raw) return;

    const selection = window.getSelection();
    if (!selection?.rangeCount) return;

    selection.deleteFromDocument();
    selection.getRangeAt(0).insertNode(document.createTextNode(raw));
    selection.collapseToEnd();
  }

  get editProps() {
    return {
      'aria-pressed': this._editable,
      'aria-controls': this._id,
      'onclick': () => this._handleEdit()
    };
  }

  get headingProps() {
    return {
      id: this._id,
      contenteditable: this._editable,
      onbeforeinput: (event: InputEvent) => this._handleBeforeInput(event),
      onpaste: (event: ClipboardEvent) => this._handlePaste(event)
    };
  }

  constructor() {
    super();

    this._id = crypto.randomUUID();
    this._editable = false;
    this._plainTypes = [
      InputType.insertText,
      InputType.deleteContent,
      InputType.deleteByCut,
      InputType.deleteContentBackward,
      InputType.deleteContentForward,
      InputType.historyUndo,
      InputType.historyRedo
    ];
  }
}