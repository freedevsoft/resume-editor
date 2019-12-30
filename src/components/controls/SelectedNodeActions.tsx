﻿import { Action } from "../utility/Types";

/** Things you can do with a selected node */
export interface SelectedNodeActions {
    delete: Action;
    moveUp: Action;
    moveDown: Action;

    /** Editing */
    copyClipboard: Action;
    cutClipboard: Action;
    pasteClipboard: Action;
}