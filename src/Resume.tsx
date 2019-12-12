import * as React from 'react';
import { saveAs } from 'file-saver';

import './css/index.css';
import './scss/custom.scss';
import 'react-quill/dist/quill.snow.css';

import loadComponent, { EditorMode } from './components/LoadComponent';
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
>>>>>>> dfea35f (Simplified loadComponent())
import { SelectedNodeProps, AddChild, Action } from './components/ResumeComponent';
>>>>>>> 759ed46 (Added HoverTracker)
import ResumeTemplateProvider from './components/ResumeTemplateProvider';
import { ResizableSidebarLayout, StaticSidebarLayout, DefaultLayout } from './components/controls/Layouts';
import Landing from './components/help/Landing';
import TopNavBar from './components/controls/TopNavBar';
import ResumeHotKeys from './components/controls/ResumeHotkeys';
import ResumeState, { ResumeSaveData } from './components/controls/ResumeState';
import StyleEditor from './components/controls/StyleEditor';
import Help from './components/help/Help';
import { isNullOrUndefined } from 'util';
import HoverTracker, { IdType } from './components/utility/HoverTracker';
import ResumeComponent from './components/LoadComponent';

class Resume extends React.Component<{}, ResumeState> {
    hovering: HoverTracker;
    style: HTMLStyleElement;
    unselect: Action;

    constructor(props) {
        super(props);

        // Custom CSS
        const head = document.getElementsByTagName("head")[0];
        this.style = document.createElement("style");
        this.style.innerHTML = "";
        head.appendChild(this.style);

        this.hovering = new HoverTracker();
        
        this.state = {
            children: [],
            css: "",
            mode: "landing",
            sectionTitlePosition: "top"
        };

        this.renderStyle();

        this.toggleMode = this.toggleMode.bind(this);

        /** Resume Nodes */
        this.addColumn = this.addColumn.bind(this);
        this.addSection = this.addSection.bind(this);
        this.addNestedChild = this.addNestedChild.bind(this);
        this.childMapper = this.childMapper.bind(this);
        this.updateData = this.updateData.bind(this);
        this.toggleEdit = this.toggleEdit.bind(this);

        /** Templates and Styling **/
        this.changeTemplate = this.changeTemplate.bind(this);
        this.renderStyle = this.renderStyle.bind(this);

        /** Load & Save */
        this.loadData = this.loadData.bind(this);
        this.saveFile = this.saveFile.bind(this);

        /** Cut & Paste */
        this.copyClipboard = this.copyClipboard.bind(this);
        this.pasteClipboard = this.pasteClipboard.bind(this);

        // Unselect the currently selected node
        this.unselect = () => { this.setState({ selectedNode: undefined }); };
    }

    /** Prevent component from being edited from the template changing screen */
    get isEditable(): boolean {
        return !this.isPrinting && !(this.state.mode === 'changingTemplate');
    }

    get isNodeSelected() : boolean {
        return !isNullOrUndefined(this.state.selectedNode);
    }

    get isPrinting(): boolean {
        return this.state.mode === 'printing';
    }

    get resumeClassName() {
        if (this.isPrinting) {
            return "resume-printing";
        }

        let classNames = ["ml-auto", "mr-auto", "mt-2"];
        return classNames.join(' ');
    }

    /** Return props related to hover/select functionality */
    get hoverProps() {
        return {
            // Add an ID to the set of nodes we are hovering over
            hoverInsert: (id: IdType) => {
                this.hovering.hoverOver(id);
                this.setState({
                    hoverNode: this.hovering.currentId
                });
            },

            // Remove an ID from the set of nodes we are hovering over
            hoverOut: (id: IdType) => {
                this.hovering.hoverOut(id);
                this.setState({
                    hoverNode: this.hovering.currentId
                });
            },

            // Determines if we are currently hovering over a node
            isHovering: this.hovering.isHovering,

            // Determines if a node is selectable or not
            isSelectBlocked: (id: IdType) => {
                return !arraysEqual(id, this.hovering.currentId);
            },

            // Returns true if the given node is currently selected
            isSelected: (uuid: string) => {
                return this.state.selectedNode ? uuid === this.state.selectedNode.uuid : false;
            },

            // Update the selected node
            updateSelected: (data?: SelectedNodeProps) => {
                this.setState({ selectedNode: data });
            },

            unselect: this.unselect
        }
    }

    // Push style changes to browser
    renderStyle() {
        this.style.innerHTML = this.state.css;
    }

    /**
     * Render the nodes of this resume
     * @param elem An object with resume component data
     * @param idx  Index of the object
     * @param arr  Array of component data
     */
    childMapper(elem: object, idx: number, arr: object[]) {
        const uniqueId = elem['uuid'];
        const props = {
            ...elem,
            uuid: uniqueId,
            mode: this.state.mode,
            addChild: this.addNestedChild.bind(this, idx),
            moveUp: this.moveUp.bind(this, idx),
            moveDown: this.moveDown.bind(this, idx),
            deleteChild: this.deleteChild.bind(this, idx),
            toggleEdit: this.toggleEdit.bind(this, idx),
            updateData: this.updateData.bind(this, idx),
            ...this.hoverProps,

            index: idx,
            numChildren: arr.length
        };

        return <ResumeComponent key={uniqueId} {...props} />
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
    changeTemplate() {
        const key = 'Traditional 1';
        const template = ResumeTemplateProvider.templates[key]();

        this.setState({
            activeTemplate: key,
            mode: 'changingTemplate',
            ...template
        });

        this.style.innerHTML = template.css;
    }

    renderTemplateChanger() {
        const loadTemplate = (key: string) => {
            this.setState({
                activeTemplate: key,
                ...ResumeTemplateProvider.templates[key]()
            });

            // Update loaded CSS
            this.renderStyle();
        };

        const templateNames = Object.keys(ResumeTemplateProvider.templates);
        let navItems = templateNames.map((key: string) =>
            <Nav.Item key={key}>
                <Nav.Link eventKey={key} onClick={() => loadTemplate(key)}>
                    {key}
                </Nav.Link>
            </Nav.Item>);

        return <div className="ml-2 mr-2 mt-2 mb-2" style={{ maxWidth: "300px", width: "30%" }}>
            <Nav variant="pills"
                activeKey={this.state.activeTemplate}
                className="flex-column mb-2">
                {navItems}
            </Nav>
            <Button onClick={() => this.toggleMode()}>Use this Template</Button>
        </div>
    }
    //#endregion

    //#region Creating/Editing Nodes
    addSection() {
        this.addChild({
            type: 'Section',
            headerPosition: this.state.sectionTitlePosition
        });
    }

    addColumn() {
        this.addChild({
            type: 'FlexibleRow',
            children: [
                { type: 'FlexibleColumn' },
                { type: 'FlexibleColumn' }
            ]
        });
    }

    /**
     * Add an immediate child
     * @param node Node to be added
     */
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
    }

    /**
     * Add a child for some child node of this resume
     * @param idx  Index of the child
     * @param node Grandchild to be added
     */
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
    }

    deleteChild(idx: number) {
        this.setState({
            children: deleteAt(this.state.children, idx)
        });
    }

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
    }

    // Move the child at idx up one position
    moveUp(idx: number) {
        this.setState({
            children: moveUp(this.state.children, idx)
        });
    }

    // Move the child at idx down one position
    moveDown(idx: number) {
        this.setState({
            children: moveDown(this.state.children, idx)
        });
    }
    //#endregion

    //#region Clipboard
    /** Copy the currently selected node */
    copyClipboard() {
        if (this.state.selectedNode) {
            const data = this.state.selectedNode.getData();
            this.setState({
                clipboard: data
            });
        }
    }

    /** Paste whatever is currently in the clipboard */
    pasteClipboard() {
        if (this.state.selectedNode && this.state.selectedNode.addChild) {
            let node = deepCopy(this.state.clipboard);

            // UUIDs will be added in the method below
            (this.state.selectedNode.addChild as AddChild)(node);
        }
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
    loadData(data: object) {
        let savedData = data as ResumeSaveData;
        this.setState({
            children: assignIds(savedData.children) as Array<object>,
            css: savedData.css as string,
            mode: 'normal'
        });

        // Actually load custom CSS
        this.renderStyle();
    }

    // Save data to an external file
    saveFile(filename: string) {
        const data: ResumeSaveData = {
            children: this.state.children,
            css: this.state.css
        };

        var blob = new Blob([JSON.stringify(data)],
            {
                type: "text/plain;charset=utf-8"
            }
        );

        saveAs(blob, filename);
    }
    //#endregion

    //#region Helper Component Props
    get toolbarProps() {
        const pasteEnabled = this.isNodeSelected && !isNullOrUndefined(this.state.clipboard);

        let props = {
            mode: this.state.mode,
            loadData: this.loadData,
            saveFile: this.saveFile,
            changeTemplate: this.changeTemplate,
            toggleHelp: () => this.toggleMode('help'),
            toggleLanding: () => this.setState({ mode: 'landing' }),
            toggleStyleEditor: () => this.toggleMode('editingStyle')
        }

        if (this.isNodeSelected) {
            props['copyClipboard'] = this.copyClipboard;
            props['unselect'] = this.unselect;
        }

        if (pasteEnabled) {
            props['pasteClipboard'] = this.pasteClipboard;
        }

        return props;
    }

    get resumeHotKeysProps() {
        return {
            copyClipboard: this.copyClipboard,
            pasteClipboard: this.pasteClipboard,
            togglePrintMode: () => this.toggleMode('printing'),
            reset: () => {
                this.unselect();
                this.setState({ mode: 'normal' });
            }
        }
    }

    get styleEditorProps() {
        const onStyleChange = (css: string) => {
            this.setState({ css: css });
        }
        const toggleStyleEditor = () => this.toggleMode('editingStyle');

        return {
            onStyleChange: onStyleChange,
            renderStyle: this.renderStyle,
            toggleStyleEditor: toggleStyleEditor,
            ...this.state
        }
    }

    //#endregion

    render() {
        const resumeToolbar = this.isEditable ? <ButtonToolbar>
            <Button className="mr-2" onClick={this.addSection}>Add Section</Button>
            <Button className="mr-2" onClick={this.addColumn}>Add Multi-Column Row</Button>
        </ButtonToolbar> : <></>

        const resume = <div id="resume" className={this.resumeClassName}>
            <ResumeHotKeys {...this.resumeHotKeysProps} {...this.state} />
            {this.state.children.map(this.childMapper)}

            {resumeToolbar}
        </div>

        const topNav = <TopNavBar {...this.toolbarProps} />

        let main = resume;
        let sidebar: JSX.Element;

        // Render the final layout based on editor mode
        switch (this.state.mode) {
            case 'editingStyle':
            case 'help':
                if (this.state.mode === 'editingStyle') {
                    sidebar = <StyleEditor {...this.styleEditorProps} />
                }
                else {
                    sidebar = <Help close={() => this.toggleMode()} />
                }

                return <ResizableSidebarLayout
                    topNav={topNav}
                    main={resume}
                    sideBar={sidebar}
                />
            case 'changingTemplate':
                return <StaticSidebarLayout
                    topNav={topNav}
                    main={resume}
                    sideBar={this.renderTemplateChanger()}
                />
            case 'landing':
                main = <Landing className={this.resumeClassName} />
            default:
                return <DefaultLayout
                    topNav={topNav}
                    main={main} />
        }
    }
}

export default Resume;