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
import ObservableResumeNodeTree from './components/utility/ObservableResumeNodeTree';

/** These props are only used for testing */
export interface ResumeProps {
    mode?: EditorMode;
    nodes?: Array<ResumeNode>;
    css?: CssNode;
    rootCss?: CssNode;
}

export interface ResumeState {
    css: CssNode;
    rootCss: CssNode;
    childNodes: Array<ResumeNode>;
    mode: EditorMode;
    unsavedChanges: boolean;

    activeTemplate?: string;
    clipboard?: ResumeNode;
    hoverNode?: IdType;
    isEditingSelected: boolean;
    selectedNode?: IdType;
}

class Resume extends React.Component<ResumeProps, ResumeState> {
    /** Stores IDs of nodes that were targeted by a single click */
    private clicked = new Array<IdType>();

    private nodes = new ObservableResumeNodeTree();
    private css: CssNode;
    private rootCss: CssNode;
    private style = document.createElement("style");
    private resumeRef = React.createRef<HTMLDivElement>();

    constructor(props: ResumeProps) {
        super(props);

        // Custom CSS
        const head = document.getElementsByTagName("head")[0];
        head.appendChild(this.style);

        this.css = props.css || new CssNode("Resume CSS", {}, "#resume");
        this.rootCss = props.rootCss || new CssNode(":root", {}, ":root");
        this.nodes.childNodes = props.nodes || [];
        
        this.state = {
            css: this.css,
            rootCss: this.rootCss,
            childNodes: props.nodes || [],
            isEditingSelected: false,
            mode: props.mode || "landing",
            unsavedChanges: false
        };

        this.nodes.subscribe(this.onNodeUpdate.bind(this));
        this.handleClick = this.handleClick.bind(this);
        this.print = this.print.bind(this);
        this.toggleMode = this.toggleMode.bind(this);

        /** Resume Nodes */
        this.addCssClasses = this.addCssClasses.bind(this);
        this.addHtmlId = this.addHtmlId.bind(this);
        this.addChild = this.addChild.bind(this);
        this.updateData = this.updateData.bind(this);
        this.deleteSelected = this.deleteSelected.bind(this);
        this.updateSelected = this.updateSelected.bind(this);

        /** Templates and Styling **/
        this.loadTemplate = this.loadTemplate.bind(this);
        this.renderSidebar = this.renderSidebar.bind(this);
        this.renderCssEditor = this.renderCssEditor.bind(this);

        /** Load & Save */
        this.exportHtml = this.exportHtml.bind(this);
        this.loadData = this.loadData.bind(this);
        this.saveLocal = this.saveLocal.bind(this);
        this.saveFile = this.saveFile.bind(this);
    }

    /** Returns true if we are actively editing a resume */
    get isEditing(): boolean {
        return this.state.mode === 'normal'
            || this.state.mode === 'help';
    }

    get isPrinting(): boolean {
        return this.state.mode === 'printing';
    }

    /** Return props related to hover/select functionality */
    private get selectedNodeProps() {
        return {
            // Update list of clicked nodes
            clicked: (id: IdType) => { this.clicked.push(id) },

            // The UUID of the currently selected node
            selectedUuid: this.selectedNode ? this.selectedNode.uuid : undefined,
        }
    }

    /** Retrieve the selected node **/
    get selectedNode() {
        return this.state.selectedNode ?
            this.nodes.getNodeById(this.state.selectedNode) : undefined;
    }

    /** Return resume stylesheet */
    get stylesheet() {
        return `${this.state.rootCss.stylesheet()}\n\n${this.state.css.stylesheet()}`;
    }

    /**
     * Update stylesheets
     * @param prevProps
     */
    componentDidUpdate(_prevProps, prevState: ResumeState) {
        if (this.state.css !== prevState.css || this.state.rootCss !== prevState.css) {
            this.style.innerHTML = this.stylesheet;
        }

        // Reset "editing selected" when selected node changes
        if (this.state.selectedNode !== prevState.selectedNode &&
            this.state.isEditingSelected) {
            this.setState({ isEditingSelected: false });
        }
    }

    /**
     * Handles clicks on the resume
     * @param rightClick Whether or not the click was a right click
     */
    private handleClick(rightClick = false) {
        // We want to select the node with the longest ID, i.e.
        // the deepest node that was clicked
        let selectedNode: IdType = [];
        this.clicked.forEach((id) => {
            if (id.length > selectedNode.length) {
                selectedNode = id;
            }
        });

        // Reset list of clicked nodes
        this.clicked = new Array<IdType>();

        if (!rightClick && arraysEqual(selectedNode, this.state.selectedNode)) {
            // Double click on a node ==> edit the node
            this.setState({ isEditingSelected: true });
        }
        else {
            this.setState({ selectedNode: selectedNode });
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

    private renderTemplateChanger() {
        const templateNames = Object.keys(ResumeTemplates.templates);
        return (
            <div id="template-selector">
                <PureMenu>
                    {templateNames.map((key: string) =>
                        <PureMenuItem key={key} onClick={() => this.loadTemplate(key)}>
                            <PureMenuLink>{key}</PureMenuLink>
                        </PureMenuItem>
                    )}
                </PureMenu>
                <Button onClick={() => this.toggleMode()}>Use this Template</Button>
            </div>
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

    /**
     * Respond to ObservableResumeNodeTree's updates
     * @param nodes
     */
    private onNodeUpdate(nodes: ResumeNodeTree) {
        this.setState({
            childNodes: nodes.childNodes,
            unsavedChanges: true
        });
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
<<<<<<< HEAD
>>>>>>> 57585ae (Simplified some more interfaces)
        this.updateNodes((nodes) => nodes.addNestedChild(id, node));
=======
        this.nodes.addNestedChild(id, node);
>>>>>>> c4c33f1 (Made node manipulations more reliable)
    }

    deleteSelected() {
        const id = this.state.selectedNode as IdType;
        if (id) {
            this.nodes.deleteChild(id);
            this.setState({ selectedNode: undefined });
        }
>>>>>>> 8bb6e81 (Yuge upgrades (#7))
    }

    updateData(id: IdType, key: string, data: any) {
        this.nodes.updateChild(id, key, data);
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
            this.nodes.updateChild(id, key, data);
        }
    }

<<<<<<< HEAD
<<<<<<< HEAD
    get moveSelectedUpEnabled() {
        const id = this.state.selectedNode as IdType;
        return id && id[id.length - 1] > 0;
    }

    moveSelectedUp() {
        const id = this.state.selectedNode as IdType;
        if (this.moveSelectedUpEnabled) {
            this.setState({selectedNode: this.nodes.moveUp(id)});
        }
>>>>>>> 8bb6e81 (Yuge upgrades (#7))
=======
    get undoRedoProps() {
        return {
            undo: this.nodes.isUndoable ? this.nodes.undo : undefined,
            redo: this.nodes.isRedoable ? this.nodes.redo : undefined
        };
>>>>>>> faf7e3d (Cleaned up clipboard actions)
    }

    get moveSelectedProps() {
        const id = this.state.selectedNode as IdType;
        const moveSelectedDownEnabled = id && !this.nodes.isLastSibling(id);
        const moveSelectedUpEnabled = id && id[id.length - 1] > 0;

        return {
            moveUp: moveSelectedUpEnabled ?
                () => this.setState({ selectedNode: this.nodes.moveUp(id) }) :
                undefined,
            moveDown: moveSelectedDownEnabled ?
                () => this.setState({ selectedNode: this.nodes.moveDown(id) }) :
                undefined
        };
    }
    //#endregion

    //#region Clipboard
    /** Copy the currently selected node */
=======
>>>>>>> 0275062 (Cleaned up Resume.tsx)
    get clipboardProps() {
        const copyClipboard = () => {
            if (this.selectedNode) {
                this.setState({ clipboard: deepCopy(this.selectedNode) });
            }
        };

        return {
            copyClipboard: copyClipboard,
            cutClipboard: () => {
                if (this.selectedNode) {
                    copyClipboard();
                    this.deleteSelected();
                }
            },
            pasteClipboard: this.state.clipboard as ResumeNode ? () => {
                // Default target: root
                let target: IdType = [];
                if (this.state.selectedNode) {
                    target = this.state.selectedNode;

                    // UUIDs will be added in the method below
                    this.addChild(target, deepCopy(this.state.clipboard as ResumeNode));
                }
            } : undefined
        }
    }

    get undoRedoProps() {
        return {
            undo: this.nodes.isUndoable ? this.nodes.undo : undefined,
            redo: this.nodes.isRedoable ? this.nodes.redo : undefined
        };
    }

    get moveSelectedProps() {
        const id = this.state.selectedNode as IdType;
        const moveSelectedDownEnabled = id && !this.nodes.isLastSibling(id);
        const moveSelectedUpEnabled = id && id[id.length - 1] > 0;

        return {
            moveUp: moveSelectedUpEnabled ?
                () => this.setState({ selectedNode: this.nodes.moveUp(id) }) :
                undefined,
            moveDown: moveSelectedDownEnabled ?
                () => this.setState({ selectedNode: this.nodes.moveDown(id) }) :
                undefined
        };
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
        this.nodes.childNodes = assignIds(savedData.childNodes);
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
        saveAs(new Blob([JSON.stringify(this.dump())],
            { type: "text/plain;charset=utf-8" }), filename);
    }
    //#endregion

    //#region Helper Component Props
    private get selectedNodeActions() : SelectedNodeActions {
        return {
            ...this.clipboardProps,
            ...this.moveSelectedProps,
            delete: this.deleteSelected,
        }
    }

    private get topMenuProps(): TopNavBarProps {
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

    private get editingBarProps() : EditingBarProps {
        return {
            ...this.undoRedoProps,
            ...this.selectedNodeActions,
            selectedNodeId: this.state.selectedNode,
            selectedNode: this.selectedNode,
            addHtmlId: this.addHtmlId,
            addCssClasses: this.addCssClasses,
            addChild: this.addChild,
            unselect: () => this.setState({ selectedNode: undefined }),
            updateSelected: this.updateSelected,
            saveLocal: this.state.unsavedChanges ? this.saveLocal : undefined
        }
    }

    private get resumeHotKeysProps() {
        return {
            ...this.selectedNodeActions,
            ...this.undoRedoProps,
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

    private renderSidebar() {
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
            if (k.slice(0, 2) === '--') {
                suggestions.push(`var(${k})`);
            }
        }
        
        return suggestions;
    }

    private renderCssEditor() {
        const cssUpdateCallback = () => this.setState({ css: this.css.deepCopy() });
        const rootCssUpdateCallback = () => this.setState({ rootCss: this.rootCss.deepCopy() });

        if (this.selectedNode) {
            let generalCssEditor = <></>
            let specificCssEditor = <></>

            const rootNode = this.state.css.findNode(
                ComponentTypes.cssName(this.selectedNode.type)) as CssNode;
            if (rootNode) {
                generalCssEditor = <CssEditor cssNode={new ReadonlyCssNode(rootNode)}
                    isOpen={true}
                    {...makeCssEditorProps(this.css, cssUpdateCallback)}
                />
            }

            if (this.selectedNode.htmlId && this.state.css.findNode([`#${this.selectedNode.htmlId}`])) {
                const specificRoot = this.state.css.findNode([`#${this.selectedNode.htmlId}`]) as CssNode;
                specificCssEditor = <CssEditor cssNode={new ReadonlyCssNode(specificRoot)}
                    isOpen={true}
                    {...makeCssEditorProps(this.css, cssUpdateCallback)} />
            }

            return <>
                {specificCssEditor}
                {generalCssEditor}
            </>
        }
 
        return <>
            <CssEditor
                cssNode={new ReadonlyCssNode(this.state.rootCss)}
                isOpen={true}
                {...makeCssEditorProps(this.rootCss, rootCssUpdateCallback)} />
            <CssEditor
                cssNode={new ReadonlyCssNode(this.state.css)}
                isOpen={true}
                varSuggestions={this.makeCssEditorVarSuggestions()}
                {...makeCssEditorProps(this.css, cssUpdateCallback)} />
        </>
    }

    render() {
        const resume = <div id="resume-container">
            <ContextMenuTrigger id="resume-menu">
                <div id="resume" ref={this.resumeRef}
                    onClick={() => this.handleClick()}
                    onContextMenu={() => this.handleClick(true)}>
                <ResumeHotKeys {...this.resumeHotKeysProps} />
                
                {this.state.childNodes.map((elem, idx, arr) => {
                    const uniqueId = elem.uuid;
                    const props = {
                        ...elem,
                        mode: this.state.mode,
                        updateResumeData: this.updateData,
                        resumeIsEditing: this.state.isEditingSelected,
                        selectedNodeManagement: this.selectedNodeProps,

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
                    sidebar={<Help close={() => this.toggleMode()} />}
                />
            case 'changingTemplate':
                return <StaticSidebarLayout
                    topNav={editingTop}
                    main={resume}
                    sidebar={this.renderTemplateChanger()}
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
                    sidebar={this.renderSidebar()}
            />
        }
    }
}

export default Resume;