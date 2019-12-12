﻿import * as React from "react";
import loadComponent, { EditorMode } from "./LoadComponent";
import { deleteAt, moveUp, moveDown, deepCopy, assignIds } from "./Helpers";

export interface SelectedNodeProps {
    id: string;
    uuid: string;
    addChild?: AddChild;
    deleteChild: Action;
    getData: () => object;
    toggleEdit?: Action;
}

export interface ResumeComponentProps {
    id: string;   // Hierarchical ID based on the node's position in the resume; subject to change
    uuid: string; // Unique ID that never changes

    mode: EditorMode;
    isFirst: boolean;
    isLast: boolean;

    isHidden?: boolean;
    isEditing?: boolean
    isHovering: (id: string) => boolean;
<<<<<<< HEAD
<<<<<<< HEAD
    isSelected: (id: string) => boolean;
=======
    isSelected?: boolean;
>>>>>>> e511b7e (Fine tuned select/hover logic)
=======
    isSelected: (id: string) => boolean;
>>>>>>> ab2636b (Cleaned up selection logic)
    value?: string;
    children?: Array<object>;

    deleteChild: ((idx: number) => void) | (() => void);
    hoverInsert: (id: string) => void;
    hoverOut: (id: string) => void;
    toggleParentHighlight: (isHovering: boolean) => void;
    isSelectBlocked: (id: string) => boolean;
    moveUp: ((idx: number) => void) | (() => void);
    moveDown: ((idx: number) => void) | (() => void);
    unselect: Action;
    updateData: ((idx: number, key: string, data: any) => void) | ((key: string, data: any) => void);
    updateSelected: (data?: SelectedNodeProps) => void;

    addChild?: ((idx: number, node: object) => void) | ((node: object) => void);
    toggleEdit?: ((idx: number) => void) | (() => void);
}

<<<<<<< HEAD
<<<<<<< HEAD
=======
export interface ResumeComponentState {
    isSelected?: boolean;
}

>>>>>>> e511b7e (Fine tuned select/hover logic)
=======
>>>>>>> ab2636b (Cleaned up selection logic)
export type Action = (() => void);
export type AddChild = ((node: object) => void);
export type UpdateChild = ((key: string, data: any) => void);

// Represents a component that is part of the user's resume
export default class ResumeComponent<
    P extends ResumeComponentProps=ResumeComponentProps, S = {}>
    extends React.Component<P, S> {
    constructor(props: P) {
        super(props);

        this.addDescriptionList = this.addDescriptionList.bind(this);
        this.addEntry = this.addEntry.bind(this);
        this.addList = this.addList.bind(this);
        this.addParagraph = this.addParagraph.bind(this);
        this.addSection = this.addSection.bind(this);

        this.childMapper = this.childMapper.bind(this);

        this.addChild = this.addChild.bind(this);
        this.getData = this.getData.bind(this);
        this.updateDataEvent = this.updateDataEvent.bind(this);
        this.addNestedChild = this.addNestedChild.bind(this);
        this.deleteNestedChild = this.deleteNestedChild.bind(this);
        this.toggleEdit = this.toggleEdit.bind(this);
        this.toggleNestedEdit = this.toggleNestedEdit.bind(this);
        this.toggleHidden = this.toggleHidden.bind(this);
        this.updateNestedData = this.updateNestedData.bind(this);
        this.setSelected = this.setSelected.bind(this);
        this.getSelectTriggerProps = this.getSelectTriggerProps.bind(this);
    }

    /** Get the class name for the main container */
    get className(): string {
        let classes = new Array<string>();

        if (!this.isPrinting) {
            if (this.displayBorder) {
                classes.push('resume-hovering');
            }
            if (this.isSelected) {
                classes.push('resume-selected');
            }
        }

        if (this.props.isHidden) {
            classes.push('resume-hidden');
        }

        return classes.join(' ');
    }

    get displayBorder(): boolean {
<<<<<<< HEAD
<<<<<<< HEAD
        const isExcepted = ['FlexibleColumn', 'FlexibleRow'].indexOf(this.props['type']) >= 0;
        return this.isHovering && (!this.isSelectBlocked || isExcepted);
=======
        return this.isHovering && (!this.isSelectBlocked || this.props['type'] === 'FlexibleColumn');
>>>>>>> e511b7e (Fine tuned select/hover logic)
=======
        const isExcepted = ['FlexibleColumn', 'FlexibleRow'].indexOf(this.props['type']) >= 0;
        return this.isHovering && (!this.isSelectBlocked || isExcepted);
>>>>>>> decbbe6 (Update ResumeComponent.tsx)
    }

    /** Returns true if this node has no children */
    get isEmpty(): boolean {
        const children = this.props.children as Array<object>;
        if (children) {
            return children.length === 0;
        }

        return true;
    }

    get isHovering(): boolean {
        return this.props.isHovering(this.props.id) && !this.isPrinting;
    }

    /** Prevent component from being edited from the template changing screen */
    get isEditable(): boolean {
        return !this.isPrinting && !(this.props.mode === 'changingTemplate');
    }

    get isPrinting() : boolean {
        return this.props.mode === 'printing';
<<<<<<< HEAD
    }

    get isSelected(): boolean {
        return this.props.isSelected(this.props.uuid);
=======
>>>>>>> 89b3b06 (ESLint fixes + added tests via ts-jest)
    }

    get isSelected(): boolean {
        return this.props.isSelected(this.props.uuid);
    }

    /**
     * Returns true if we are directly hovering over one of this node's children.
     * The purpose of this is to avoid selecting multiple nodes at once.
     */
    get isSelectBlocked(): boolean {
        return this.props.isSelectBlocked(this.props.id);
    }

    componentWillUnmount() {
        // Since the node is being deleted, remove callback to this node's unselect
        // method from <Resume /> to prevent memory leaks
        if (this.isSelected) {
            // NOTE: This can cause issues if an item is unmounted because it has 
            // been vastly modified via render() but not deleted from the resume,
            // i.e. unselect functionality will not work correctly.
            //
            // When that starts happening, either make render() not return vastly 
            // different structures in different scenarios or refactor the select/unselect
            // system to handle this by keeping unselect() bindings fresh
            this.props.updateSelected(undefined);

            // Remove self from set of active hover IDs
            this.props.hoverOut(this.props.id);
        }
    }

    addChild(node: object) {
        if (this.props.addChild as AddChild) {
            (this.props.addChild as AddChild)(node);
        }
    }

    addParagraph() {
        this.addChild({
            type: "Paragraph",
            value: "Enter value here"
        });
    }

    addEntry() {
        this.addChild({
            type: "Entry"
        });
    }

    addDescriptionList() {
        this.addChild({
            type: 'DescriptionList',
            children: [{
                type: 'DescriptionListItem'
            }]
        });
    }

    addList() {
        this.addChild({
            type: 'List',
            children: [{
                type: 'ListItem'
            }]
        });
    }

    addSection() {
        this.addChild({
            type: 'Section'
        })
    }

    /**
     * Add a grandchild node to this component
     * @param idx  The parent of the node to be added (where the parent is a child of this component)
     * @param node JSON description of the node to be added
     */
    addNestedChild(idx: number, node: object) {
        let newChildren = this.props.children as Array<object>;
        if (!newChildren[idx]['children']) {
            newChildren[idx]['children'] = new Array<object>();
        }

        assignIds(node); // Generate UUIDs
        newChildren[idx]['children'].push(node);
        this.updateData("children", newChildren);
    }

    /**
     * Delete a grandchild
     * @param idx       Index of the parent of the node to be deleted
     * @param gchildIdx Index of the grandchild to be deleted
     */
    deleteNestedChild(idx: number) {
        let replChildren = this.props.children;
        if (replChildren as Array<object>) {
            // Replace node's children with new list of children that excludes deleted node
            this.updateData("children", deleteAt((replChildren as Array<object>), idx));
        }
    }

    // TODO: Just copy it from this child's parent's data
    /** Return an object representation of this item's essential attributes */
    getData() {
        let data = {
            children: deepCopy(this.props.children as Array<object>)
        };

        for (let k in this.props) {
            if (typeof(this.props[k]) == "string") {
                data[k] = this.props[k];
            }
        }

        return data;
    }

    moveNestedChildUp(idx: number) {
        let replChildren = this.props.children as Array<object>;
        if (replChildren) {
            // Replace node's children with new list of children that excludes deleted node
            this.updateData("children", moveUp(replChildren, idx));
        }
    }

    moveNestedChildDown(idx: number) {
        let replChildren = this.props.children as Array<object>;
        if (replChildren) {
            // Replace node's children with new list of children that excludes deleted node
            this.updateData("children", moveDown(replChildren, idx));
        }
    }

    toggleEdit(event: any) {
        if (this.props.toggleEdit as Action) {
            (this.props.toggleEdit as Action)();
        }
    }

    toggleNestedEdit(idx: number) {
        let currentChildData = this.props.children[idx]['isEditing'];
        this.updateNestedData(idx, "isEditing", !currentChildData);
    }
    
    updateNestedData(idx: number, key: string, data: any) {
        let newChildren = this.props.children as Array<object>;
        newChildren[idx][key] = data;
        this.updateData("children", newChildren);
    }

    updateData(key: string, data: string | boolean | object | Array<any>) {
        const updater = this.props.updateData as ((key: string, data: any) => void);
        if (updater) {
            updater(key, data);
        }
    }

    updateDataEvent(key: string, event: any) {
        this.updateData(key, event.target.value);
    }

    childMapper(elem: object, idx: number, arr: object[]) {
        const uniqueId = elem['uuid'];

        return <React.Fragment key={uniqueId}>
            {loadComponent(elem, idx, arr.length,
                {
                    uuid: uniqueId,
                    mode: this.props.mode,
                    addChild: (this.addNestedChild.bind(this, idx) as (node: object) => void),
                    isHovering: this.props.isHovering,
<<<<<<< HEAD
<<<<<<< HEAD
                    isSelected: this.props.isSelected,
=======
>>>>>>> e511b7e (Fine tuned select/hover logic)
=======
                    isSelected: this.props.isSelected,
>>>>>>> ab2636b (Cleaned up selection logic)
                    isSelectBlocked: this.props.isSelectBlocked,
                    hoverInsert: this.props.hoverInsert,
                    hoverOut: this.props.hoverOut,
                    moveDown: (this.moveNestedChildDown.bind(this, idx) as Action),
                    moveUp: (this.moveNestedChildUp.bind(this, idx) as Action),
                    deleteChild: (this.deleteNestedChild.bind(this, idx) as Action),
                    toggleEdit: (this.toggleNestedEdit.bind(this, idx) as () => void),
                    updateData: (this.updateNestedData.bind(this, idx) as (key: string, data: any) => void),
                    unselect: this.props.unselect,
                    updateSelected: this.props.updateSelected
                },
                this.props.id)}
        </React.Fragment>
    }

    renderChildren() {
        if (this.props.children as Array<object>) {
            return (this.props.children as Array<object>).map(this.childMapper)
        }

        return <React.Fragment />
    }

    toggleHidden() {
        this.updateData('isHidden', !this.props.isHidden);
    }

    setSelected() {
        // this.props.isSelectBlocked prevents a node from being selected if we are directly hovering
        // over one of its child nodes

        if (!this.isSelected && !this.isSelectBlocked) {
            // Unselect the previous component
            this.props.unselect();
            
            // Pass this node's unselect back up to <Resume />
            this.props.updateSelected({
                id: this.props.id,
                uuid: this.props.uuid,
                addChild: this.addChild,
                deleteChild: this.props.deleteChild as Action,
                getData: this.getData,
                toggleEdit: this.props.toggleEdit as Action
            });
        }
    }

    getSelectTriggerProps() {
        if (!this.isEditable) {
            return {};
        }

        return {
            onClick: this.setSelected,

            // Hover over
            onMouseEnter: () => {
                (this.props.hoverInsert as (id: string) => void)(this.props.id);
            },

            // Hover out
            onMouseLeave: () => {
                (this.props.hoverOut as (id: string) => void)(this.props.id);
            }
        };
    }

    // Get the buttons for editing a menu
    getEditingMenu() : any {
        return <></>
    }

    // Actually render the editing controls after checking that
    // they should be rendered
    renderEditingMenu() {
        if (this.isEditable) {
            const menu = this.getEditingMenu();
            if (menu) {
                return this.getEditingMenu();
            }
        }

        return <></>
    }
}