import * as React from 'react';
import { saveAs } from 'file-saver';
import { ContextMenuTrigger } from "react-contextmenu";

import 'purecss/build/pure-min.css';
import 'react-quill/dist/quill.snow.css';
import './scss/index.scss';
import './fonts/icofont.min.css';

<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
import ResumeComponent, { EditorMode } from './components/ResumeComponent';
import { Button, ButtonToolbar, Nav } from 'react-bootstrap';
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
import { deleteAt, moveUp, moveDown, assignIds, deepCopy, pushArray } from './components/Helpers';
=======
import { deleteAt, moveUp, moveDown, assignIds, deepCopy } from './components/Helpers';
>>>>>>> 89b3b06 (ESLint fixes + added tests via ts-jest)
=======
import { deleteAt, moveUp, moveDown, assignIds, deepCopy, pushArray } from './components/Helpers';
>>>>>>> 88bb689 (Removed immutability-helper)
import { SelectedNodeProps, AddChild } from './components/ResumeComponent';
=======
import { deleteAt, moveUp, moveDown, assignIds, deepCopy, pushArray, arraysEqual } from './components/Helpers';
=======
import { deleteAt, moveUp, moveDown, assignIds, deepCopy, arraysEqual } from './components/Helpers';
<<<<<<< HEAD
>>>>>>> dfea35f (Simplified loadComponent())
import { SelectedNodeProps, AddChild, Action } from './components/ResumeComponent';
>>>>>>> 759ed46 (Added HoverTracker)
=======
import { SelectedNodeProps, AddChild, Action } from './components/ResumeNodeBase';
>>>>>>> cfdfcd6 (Rename)
import ResumeTemplateProvider from './components/ResumeTemplateProvider';
=======
import ResumeComponent, { EditorMode, ComponentTypes } from './components/ResumeComponent';
=======
import ResumeComponent, { EditorMode } from './components/ResumeComponent';
>>>>>>> 72f2dba (Improved dropdown menus + UI (#10))
=======
import ResumeComponentFactory from './components/ResumeComponent';
>>>>>>> 1ec9e42 (Consolidated a bunch of interfaces)
import { assignIds, deepCopy, arraysEqual } from './components/Helpers';
<<<<<<< HEAD
import ResumeTemplateProvider from './components/templates/ResumeTemplateProvider';
>>>>>>> 8bb6e81 (Yuge upgrades (#7))
=======
import ResumeTemplates from './components/templates/ResumeTemplates';
>>>>>>> 3a8b276 (Cleaned up Resume.tsx)
import { ResizableSidebarLayout, StaticSidebarLayout, DefaultLayout } from './components/controls/Layouts';
import Landing from './components/help/Landing';
import TopNavBar, { TopNavBarProps } from './components/controls/TopNavBar';
import ResumeHotKeys from './components/controls/ResumeHotkeys';
import Help from './components/help/Help';
import HoverTracker from './components/utility/HoverTracker';
import TopEditingBar, { EditingBarProps } from './components/controls/TopEditingBar';
import ResumeNodeTree from './components/utility/NodeTree';
import CssNode, { ReadonlyCssNode } from './components/utility/CssTree';
import PureMenu, { PureMenuLink, PureMenuItem } from './components/controls/menus/PureMenu';
import { Button } from './components/controls/Buttons';
import { SelectedNodeActions } from './components/controls/SelectedNodeActions';
import CssEditor, { makeCssEditorProps } from './components/utility/CssEditor';
import NodeTreeVisualizer from './components/utility/NodeTreeVisualizer';
import Tabs from './components/controls/Tabs';
import ResumeContextMenu from './components/controls/ResumeContextMenu';
import generateHtml from './components/utility/GenerateHtml';
import ComponentTypes from './components/schema/ComponentTypes';
import { IdType, NodeProperty, ResumeSaveData, ResumeNode, EditorMode, Globals } from './components/utility/Types';

export interface ResumeState {
    css: CssNode;
    rootCss: CssNode;
    childNodes: Array<ResumeNode>;
    mode: EditorMode;
    unsavedChanges: boolean;

    activeTemplate?: string;
    clipboard?: object;
    isEditingSelected: boolean;
    selectedNode?: IdType;
}

class Resume extends React.Component<{}, ResumeState> {
    hovering = new HoverTracker();
    nodes = new ResumeNodeTree();
    css = new CssNode("Resume CSS", {}, "#resume");
    rootCss = new CssNode(":root", {}, ":root");
    style: HTMLStyleElement;
    resumeRef = React.createRef<HTMLDivElement>();
    undo = new Array<Array<ResumeNode>>();
    redo = new Array<Array<ResumeNode>>();

    constructor(props) {
        super(props);

        // Custom CSS
        const head = document.getElementsByTagName("head")[0];
        this.style = document.createElement("style");
        this.style.innerHTML = "";
        head.appendChild(this.style);

        this.state = {
            css: this.css,
            rootCss: this.rootCss,
            childNodes: [],
            isEditingSelected: false,
            mode: "landing",
            unsavedChanges: false
        };
        
        this.handleClick = this.handleClick.bind(this);
        this.print = this.print.bind(this);
        this.toggleMode = this.toggleMode.bind(this);

        /** Resume Nodes */
        this.addCssClasses = this.addCssClasses.bind(this);
        this.addHtmlId = this.addHtmlId.bind(this);
        this.addChild = this.addChild.bind(this);
        this.updateData = this.updateData.bind(this);
        this.deleteSelected = this.deleteSelected.bind(this);
        this.moveSelectedUp = this.moveSelectedUp.bind(this);
        this.moveSelectedDown = this.moveSelectedDown.bind(this);
        this.updateSelected = this.updateSelected.bind(this);
        this.updateNodes = this.updateNodes.bind(this);
        this.undoChange = this.undoChange.bind(this);
        this.redoChange = this.redoChange.bind(this);

        /** Templates and Styling **/
        this.loadTemplate = this.loadTemplate.bind(this);
        this.renderSidebar = this.renderSidebar.bind(this);
        this.renderCssEditor = this.renderCssEditor.bind(this);

        /** Load & Save */
        this.exportHtml = this.exportHtml.bind(this);
        this.loadData = this.loadData.bind(this);
        this.saveLocal = this.saveLocal.bind(this);
        this.saveFile = this.saveFile.bind(this);

        /** Cut & Paste */
        this.copyClipboard = this.copyClipboard.bind(this);
        this.cutClipboard = this.cutClipboard.bind(this);
        this.pasteClipboard = this.pasteClipboard.bind(this);
    }

    /** Returns true if we are actively editing a resume */
    get isEditing(): boolean {
        return this.state.mode === 'normal'
            || this.state.mode === 'help'
            || (this.state.childNodes.length > 0);
    }

    get isPrinting(): boolean {
        return this.state.mode === 'printing';
    }

    /** Return props related to hover/select functionality */
    get selectedNodeProps() {
        return {
            // Add an ID to the set of nodes we are hovering over
            hoverOver: (id: IdType) => {
                this.hovering.hoverOver(id);
            },

            // Remove an ID from the set of nodes we are hovering over
            hoverOut: () => {
                this.hovering.hoverOut();
            },
            
            // Determines if a node is selectable or not
            isSelectBlocked: (id: IdType) => {
                return !arraysEqual(id, this.hovering.currentId);
            },

            selectedUuid: this.selectedNode ? this.selectedNode.uuid : undefined,

            // Update the selected node
            updateSelected: (id?: IdType) => {
                this.setState({ selectedNode: id });
            }
        }
    }

    /** Retrieve the selected node **/
    get selectedNode() {
        if (this.state.selectedNode) {
            return this.nodes.getNodeById(this.state.selectedNode);
        }

        return undefined;
    }

    /** Return resume stylesheet */
    get stylesheet() {
        return `${this.state.rootCss.stylesheet()}\n\n${this.state.css.stylesheet()}`;
    }

    /**
     * Update stylesheets
     * @param prevProps
     */
    componentDidUpdate(_prevProps, prevState) {
        if (this.state.css !== prevState.css) {
            this.style.innerHTML = this.stylesheet;
        }
    }

    /**
     * Handles clicks on the resume
     * @param event
     */
    handleClick(event: React.MouseEvent) {
        if (this.state.mode === 'changingTemplate') {
            this.toggleMode();
        } else {
            /** Edit the clicked element */
            this.setState({ isEditingSelected: true });
        }
    }
    
    /**
     * Switch into mode if not already. Otherwise, return to normal.
     * @param mode Mode to check
     */
    toggleMode(mode: EditorMode = 'normal') {
        const newMode = (this.state.mode === mode) ? 'normal' : mode;
        this.setState({ mode: newMode });
    }

    //#region Changing Templates
    loadTemplate(key = 'Integrity') {
        const template: ResumeSaveData = ResumeTemplates.templates[key];
        this.setState({ activeTemplate: key});
        this.loadData(template, 'changingTemplate');
    };

    renderTemplateChanger() {
        const templateNames = Object.keys(ResumeTemplates.templates);
        let navItems = templateNames.map((key: string) =>
            <PureMenuItem key={key} onClick={() => this.loadTemplate(key)}>
                <PureMenuLink>{key}</PureMenuLink>
            </PureMenuItem>
        );

        return (
            <>
                <PureMenu>
                    {navItems}
                </PureMenu>
                <Button onClick={() => this.toggleMode()}>Use this Template</Button>
            </>
        );
    }
    //#endregion

    //#region Creating/Editing Nodes
    addHtmlId(htmlId: string) {
        const currentNode = this.selectedNode as ResumeNode;
        if (currentNode) {
            let root = new CssNode(`#${htmlId}`, {}, `#${htmlId}`);
            let copyTree = this.css.findNode(
                ComponentTypes.cssName(currentNode.type)) as CssNode;

            if (copyTree) {
                root = copyTree.copySkeleton(`#${htmlId}`, `#${htmlId}`);
            }

            currentNode.htmlId = htmlId;
            this.css.addNode(root);
            this.setState({
                css: this.css.deepCopy(),
                childNodes: this.nodes.childNodes
            });
        }
    }

    addCssClasses(classes: string) {
        const currentNode = this.selectedNode as ResumeNode;
        if (currentNode) {
            currentNode.classNames = classes;
            this.setState({ childNodes: this.nodes.childNodes });
        }
    }

    updateNodes(callback: (nodes: ResumeNodeTree) => void) {
        this.undo.push(deepCopy(this.state.childNodes));
        callback(this.nodes);

        this.setState({
            childNodes: this.nodes.childNodes,
            unsavedChanges: true
        });
    }

    undoChange() {
        const prev = this.undo.pop();

        // prev.length > 0 avoids undoing the initial template load
        if (prev && prev.length > 0) {
            this.redo.push([...this.state.childNodes]);
            this.nodes.childNodes = prev;
            this.setState({
                childNodes: prev,
                unsavedChanges: true
            });
        }
    }

    redoChange() {
        const next = this.redo.pop();
        if (next) {
            this.updateNodes((nodes) => nodes.childNodes = next);
            this.setState({ unsavedChanges: true });
        }
    }

    /**
<<<<<<< HEAD
     * Add an immediate child
     * @param node Node to be added
     */
<<<<<<< HEAD
    addChild(node: object) {
<<<<<<< HEAD
<<<<<<< HEAD
        this.setState({
            children: [...this.state.children, assignIds(node)]
        });
=======
        // Generate UUIDs
        node = assignIds(node);

        this.state.children.push(node);
        this.setState({ children: this.state.children });
>>>>>>> 89b3b06 (ESLint fixes + added tests via ts-jest)
=======
        this.setState({
            children: [...this.state.children, assignIds(node)]
        });
>>>>>>> d13d2e6 (Avoid mutating state directly no. 1)
=======
    addChild<T extends BasicResumeNode>(node: T) {
<<<<<<< HEAD
        this.nodes.addChild(assignIds(node));
        this.setState({ children: this.nodes.children });
>>>>>>> 8bb6e81 (Yuge upgrades (#7))
=======
        this.updateNodes((nodes) => nodes.addChild(assignIds(node)));
>>>>>>> 72f2dba (Improved dropdown menus + UI (#10))
    }

    /**
=======
>>>>>>> 57585ae (Simplified some more interfaces)
     * Add node as a child to the node identified by id
     * @param id   Hierarchical id pointing to some node
     * @param node Node to be added
     */
<<<<<<< HEAD
<<<<<<< HEAD
    addNestedChild(idx: number, node: object) {
<<<<<<< HEAD
<<<<<<< HEAD
        const newChildren = [...this.state.children];
        if (!newChildren[idx]['children']) {
            newChildren[idx]['children'] = new Array<object>();
        }

        newChildren[idx]['children'].push(assignIds(node));

<<<<<<< HEAD
        this.setState({ children: newChildren });
=======
        let children = this.state.children[idx]['children'];

        // Generate UUIDs with assignIds()
        children.push(assignIds(node));
        this.setState({ children: this.state.children });
>>>>>>> 89b3b06 (ESLint fixes + added tests via ts-jest)
=======
        this.setState({
            children: update(this.state.children, {
                [idx]: {
                    children: children =>
                        update(children || new Array<object>(),
                            { $push: [ assignIds(node) ] })
            }})
        });
>>>>>>> e511b7e (Fine tuned select/hover logic)
=======
        const newChildren = [...this.state.children];
        pushArray(newChildren[idx]['children'], node);

        this.setState({ children: newChildren });
>>>>>>> 88bb689 (Removed immutability-helper)
=======
    addNestedChild(id: IdType, node: ResumeNode) {
=======
    addChild(id: IdType, node: ResumeNode) {
>>>>>>> 57585ae (Simplified some more interfaces)
        this.updateNodes((nodes) => nodes.addNestedChild(id, node));
    }

    deleteSelected() {
        const id = this.state.selectedNode as IdType;
        if (id) {
            this.updateNodes((nodes) => nodes.deleteChild(id));
            this.hovering.hoverOut();
            this.setState({ selectedNode: undefined });
        }
>>>>>>> 8bb6e81 (Yuge upgrades (#7))
    }

    updateData(id: IdType, key: string, data: any) {
        this.updateNodes((nodes) => nodes.updateChild(id, key, data));
    }

<<<<<<< HEAD
<<<<<<< HEAD
    updateData(idx: number, key: string, data: any) {
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 88bb689 (Removed immutability-helper)
        const newChildren = [...this.state.children];
        newChildren[idx][key] = data;

        this.setState({ children: newChildren });
<<<<<<< HEAD
=======
        this.setState({
            children: update(this.state.children, {
                [idx]: {
                    [key]: { $set: data }
                }
            })
        });
>>>>>>> e511b7e (Fine tuned select/hover logic)
=======
>>>>>>> 88bb689 (Removed immutability-helper)
    }

    toggleEdit(idx: number) {
        const currentValue = this.state.children[idx]['isEditing'];
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 88bb689 (Removed immutability-helper)
        const newChildren = [...this.state.children];
        newChildren[idx]['isEditing'] = !currentValue;

        this.setState({ children: newChildren });
<<<<<<< HEAD
=======
        this.setState({
            children: update(this.state.children, {
                [idx]: {
                    isEditing: isEditing =>
                        update(isEditing || false, { $set: !currentValue })
                }
            })
        });
>>>>>>> ab14583 (Update Resume.tsx)
=======
>>>>>>> 88bb689 (Removed immutability-helper)
=======
    updateSelected(key: string, data: string | string[] | boolean) {
=======
    updateSelected(key: string, data: NodeProperty) {
>>>>>>> de2d618 (Refactored top nav)
        const id = this.state.selectedNode as IdType;
        if (id) {
            this.updateNodes((nodes) => nodes.updateChild(id, key, data));
        }
    }

    get moveSelectedUpEnabled() {
        const id = this.state.selectedNode as IdType;
        return id && id[id.length - 1] > 0;
    }

    moveSelectedUp() {
        const id = this.state.selectedNode as IdType;
        if (this.moveSelectedUpEnabled) {
            this.updateNodes((nodes) => {
                this.setState({ selectedNode: nodes.moveUp(id) });
            });
        }
>>>>>>> 8bb6e81 (Yuge upgrades (#7))
    }

    get moveSelectedDownEnabled() {
        const id = this.state.selectedNode as IdType;
        return id && !this.nodes.isLastSibling(id);
    }

    moveSelectedDown() {
        const id = this.state.selectedNode as IdType;
        if (this.moveSelectedDownEnabled) {
            this.updateNodes((nodes) => {
                this.setState({ selectedNode: nodes.moveDown(id) });
            });
        }
    }
    //#endregion

    //#region Clipboard
    /** Copy the currently selected node */
    copyClipboard() {
        if (this.selectedNode) {
            this.setState({ clipboard: deepCopy(this.selectedNode) });
        }
    }

    cutClipboard() {
        // Implement as Copy + Delete
        if (this.selectedNode) {
            this.copyClipboard();
            this.deleteSelected();
        }
    }

    /** Paste whatever is currently in the clipboard */
    pasteClipboard() {
        // Default target: root
        let target: IdType = [];
        if (this.state.selectedNode) {
            target = this.state.selectedNode;
        }

        // UUIDs will be added in the method below
        this.addChild(target, deepCopy(this.state.clipboard));
    }
    //#endregion
<<<<<<< HEAD

    //#region Node Selection
    /** Determine if a node shouldn't be allowed to be selected */
    // TODO: Cache this value
    deepestHoverId(): string {
        /** Return the deepest hover node ID */
        const ids = Array.from(this.state.hovering);
        let depth = 0;
        let cand = "";
<<<<<<< HEAD

        for (let i in ids) {
            const id = ids[i];
            const currentDepth = id.split("-").length;

<<<<<<< HEAD
            if (currentDepth > depth) {
                depth = currentDepth;
                cand = id;
=======
            if (otherId.search(id) >= 0 && otherId !== id) {
                return true;
>>>>>>> 89b3b06 (ESLint fixes + added tests via ts-jest)
=======

        for (let i in ids) {
            const id = ids[i];
            const currentDepth = id.split("-").length;

            if (currentDepth > depth) {
                depth = currentDepth;
                cand = id;
>>>>>>> e511b7e (Fine tuned select/hover logic)
            }
        }

        return cand;
    }
    
    isSelectBlocked(id: string) {
<<<<<<< HEAD
<<<<<<< HEAD
        const otherId = this.deepestHoverId();
        return (id !== otherId) &&
            (id.split("-").length < otherId.split("-").length);
=======
        return id !== this.deepestHoverId();
=======
        const otherId = this.deepestHoverId();
        return (id !== otherId) &&
            (id.split("-").length < otherId.split("-").length);
>>>>>>> 5956af1 (Update Resume.tsx)
    }

    isSelected(uuid: string) {
        if (this.state.selectedNode) {
            return uuid === this.state.selectedNode.uuid;
        }

        return false;
    }

    isHovering(id: string) {
        return this.state.hovering.has(id);
>>>>>>> e511b7e (Fine tuned select/hover logic)
    }

<<<<<<< HEAD
    isSelected(uuid: string) {
        if (this.state.selectedNode) {
            return uuid === this.state.selectedNode.uuid;
        }

        return false;
    }

    isHovering(id: string) {
        return this.state.hovering.has(id);
    }

=======
>>>>>>> ab2636b (Cleaned up selection logic)
    unselect() {
        this.setState({ selectedNode: undefined });
    }

    updateSelected(data?: SelectedNodeProps) {
        this.setState({ selectedNode: data });
    }
    //#endregion

=======
    
>>>>>>> 759ed46 (Added HoverTracker)
    //#region Serialization
    exportHtml() {
        // TODO: Make this user defineable
        const filename = 'resume.html';
        let resumeHtml = this.resumeRef.current ? this.resumeRef.current.outerHTML : '';
        var blob = new Blob(
            [generateHtml(this.stylesheet, resumeHtml)],
            { type: "text/html;charset=utf-8" }
        );

        saveAs(blob, filename);
    }

    loadData(data: object, mode: EditorMode = 'normal') {
        let savedData = data as ResumeSaveData;
        this.updateNodes((nodes) => nodes.childNodes = assignIds(savedData.childNodes));
        this.css = CssNode.load(savedData.builtinCss);
        this.rootCss = CssNode.load(savedData.rootCss);

        this.setState({
            css: this.css.deepCopy(),
            mode: mode,
            rootCss: this.rootCss.deepCopy()
        })
    }

    loadLocal() {
        const savedData = localStorage.getItem(Globals.localStorageKey);
        if (savedData) {
            try {
                this.loadData(JSON.parse(savedData));
            }
            catch {
                // TODO: Show an error message
                console.log("Nope, that didn't work.");
            }
        }
    }

    dump(): ResumeSaveData {
        return {
            childNodes: this.state.childNodes,
            builtinCss: this.css.dump(),
            rootCss: this.rootCss.dump()
        };
    }

    saveLocal() {
        this.setState({ unsavedChanges: false });
        localStorage.setItem('experiencer', JSON.stringify(this.dump()));
    }

    // Save data to an external file
    saveFile(filename: string) {
        var blob = new Blob([JSON.stringify(this.dump())],
            {
                type: "text/plain;charset=utf-8"
            }
        );

        saveAs(blob, filename);
    }
    //#endregion

    //#region Helper Component Props
    get selectedNodeActions() : SelectedNodeActions {
        return {
            copyClipboard: this.copyClipboard,
            cutClipboard: this.cutClipboard,
            delete: this.deleteSelected,
            moveUp: this.moveSelectedUp,
            moveDown: this.moveSelectedDown,
            pasteClipboard: this.pasteClipboard
        }
    }

    get topMenuProps(): TopNavBarProps {
        let props = {
            exportHtml: this.exportHtml,
            isEditing: this.isEditing,
            loadData: this.loadData,
            mode: this.state.mode,
            new: this.loadTemplate,
            print: this.print,
            saveLocal: this.saveLocal,
            saveFile: this.saveFile,
            toggleHelp: () => this.toggleMode('help'),
            toggleLanding: () => this.setState({ mode: 'landing' })
        }
                    
        return props;
    }

    get editingBarProps() : EditingBarProps {
        return {
            ...this.selectedNodeActions,
            selectedNodeId: this.state.selectedNode,
            selectedNode: this.selectedNode,
            addHtmlId: this.addHtmlId,
            addCssClasses: this.addCssClasses,
            updateNode: this.updateSelected,
            addChild: this.addChild,
            moveUpEnabled: this.moveSelectedUpEnabled,
            moveDownEnabled: this.moveSelectedDownEnabled,
            unsavedChanges: this.state.unsavedChanges,
            unselect: () => this.setState({ selectedNode: undefined }),
            updateSelected: this.updateSelected,
            undo: this.undoChange,
            redo: this.redoChange,
            saveLocal: this.saveLocal
        }
    }

    get resumeHotKeysProps() {
        return {
            ...this.selectedNodeActions,
            undo: this.undoChange,
            redo: this.redoChange,
            togglePrintMode: () => this.toggleMode('printing'),
            reset: () => {
                this.setState({
                    mode: 'normal',
                    selectedNode: undefined
                });
            }
        }
    }

    print() {
        requestAnimationFrame(() => {
            const prevState = { ...this.state };

            this.setState({
                selectedNode: undefined,
                mode: 'printing'
            });

            window.print();

            this.setState(prevState);
        });
    }
    //#endregion

    renderSidebar() {
        let CssEditor = this.renderCssEditor;
        return <Tabs>
            <NodeTreeVisualizer key="Tree" childNodes={this.state.childNodes}
                selectNode={(id) => this.setState({ selectedNode: id })}
                selectedNode={this.state.selectedNode}
            />
            <CssEditor key="CSS" />
            <div key="Raw CSS">
                <pre>
                    <code>
                        {this.stylesheet}
                    </code>
                </pre>
            </div>
        </Tabs>
    }
    
    /** Gather all variable declarations in :root */
    makeCssEditorVarSuggestions(): Array<string> {
        let suggestions = new Array<string>();

        for (let k of this.rootCss.properties.keys()) {
            // Variable declaration
            if (k.slice(0, 2) === '--') {
                suggestions.push(`var(${k})`);
            }
        }
        
        return suggestions;
    }

    renderCssEditor() {
        const cssUpdateCallback = () => this.setState({ css: this.css.deepCopy() });
        const rootCssUpdateCallback = () => this.setState({ rootCss: this.rootCss.deepCopy() });

        if (this.selectedNode) {
            const rootNode = this.state.css.findNode(
                ComponentTypes.cssName(this.selectedNode.type)) as CssNode;

            let specificCssEditor = <></>
            if (this.selectedNode.htmlId && this.state.css.findNode([`#${this.selectedNode.htmlId}`])) {
                const specificRoot = this.state.css.findNode([`#${this.selectedNode.htmlId}`]) as CssNode;
                specificCssEditor = <CssEditor cssNode={new ReadonlyCssNode(specificRoot)}
                    {...makeCssEditorProps(this.css, cssUpdateCallback)} />
            }

            if (rootNode) {
                return <>
                    {specificCssEditor}
                    <CssEditor cssNode={new ReadonlyCssNode(rootNode)}
                        {...makeCssEditorProps(this.css, cssUpdateCallback)}
                    />
                </>
            }

            return <></>
        }
                
        return <>
            <CssEditor
                cssNode={new ReadonlyCssNode(this.state.rootCss)} autoCollapse={true}
                {...makeCssEditorProps(this.rootCss, rootCssUpdateCallback)} />
            <CssEditor
                cssNode={new ReadonlyCssNode(this.state.css)}
                autoCollapse={true}
                varSuggestions={this.makeCssEditorVarSuggestions()}
                {...makeCssEditorProps(this.css, cssUpdateCallback)} />
        </>
    }

    render() {
        const resume = <div id="resume-container">
            <ContextMenuTrigger id="resume-menu">
                <div id="resume" ref={this.resumeRef}
                    onClick={this.handleClick}
                    onContextMenu={() => this.setState({
                    selectedNode: this.hovering.currentId })}>
                    <ResumeHotKeys {...this.resumeHotKeysProps} />
                
                    {this.state.childNodes.map((elem, idx, arr) => {
                        const uniqueId = elem.uuid;
                        const props = {
                            ...elem,
                            mode: this.state.mode,
                            updateResumeData: this.updateData,
                            selectedNodeManagement: this.selectedNodeProps,

                            resumeIsEditing: this.state.isEditingSelected,
                            index: idx,
                            numSiblings: arr.length
                        };

                    return <ResumeComponentFactory key={uniqueId} {...props} />
                    })}
                </div>
            </ContextMenuTrigger>

            <ResumeContextMenu
                nodes={this.nodes}
                currentId={this.state.selectedNode}
                selectNode={(id) => this.setState({selectedNode: id})}
            />
        </div>
        
        const editingTop = this.isPrinting ? <></> : (
            <header id="app-header" className="no-print">
                <TopNavBar {...this.topMenuProps} />
                {this.isEditing ? <TopEditingBar {...this.editingBarProps} /> : <></>}
            </header>
        );

        // Render the final layout based on editor mode
        switch (this.state.mode) {
            case 'help':
                return <ResizableSidebarLayout
                    topNav={editingTop}
                    main={resume}
                    sideBar={<Help close={() => this.toggleMode()} />}
                />
            case 'changingTemplate':
                return <StaticSidebarLayout
                    topNav={editingTop}
                    main={resume}
                    sideBar={this.renderTemplateChanger()}
                />
            case 'landing':
                return <DefaultLayout
                    topNav={editingTop}
                    main={<Landing
                        loadLocal={() => { this.loadLocal() }}
                        new={this.loadTemplate}
                        loadData={this.loadData}
                    />
                    } />
            case 'printing':
                return resume;
            default:
                return <ResizableSidebarLayout
                    topNav={editingTop}
                    main={resume}
                    isPrinting={this.isPrinting}
                    sideBar={this.renderSidebar()}
            />
        }
    }
}

export default Resume;