﻿import * as React from "react";
import loadComponent, { EditorMode } from "./LoadComponent";
import { deleteAt, moveUp, moveDown } from "./Helpers";

export interface SelectedComponentProps {
    unselect?: Action;
}

export interface ResumeComponentProps {
    id: string;
    mode: EditorMode;
    isFirst: boolean;
    isLast: boolean;

    isHidden?: boolean;
    isEditing?: boolean;
    isSelected?: boolean;
    value?: string;
    children?: Array<object>;

    unselect: Action;
    updateSelected: (data: SelectedComponentProps) => void;

    addChild?: ((idx: number, node: object) => void) | ((node: object) => void);
    moveUp?: ((idx: number) => void) | (() => void);
    moveDown?: ((idx: number) => void) | (() => void);
    deleteChild?: ((idx: number) => void) | (() => void);
    toggleEdit?: ((idx: number) => void) | (() => void);
    updateData?: ((idx: number, key: string, data: any) => void) | ((key: string, data: any) => void);
}

export interface ResumeState {
    isHovering?: boolean;
    isSelected?: boolean;
}

export type Action = (() => void);
export type AddChild = ((node: object) => void);
export type UpdateChild = ((key: string, data: any) => void);

// Represents a component that is part of the user's resume
export default class ResumeComponent<
    P extends ResumeComponentProps=ResumeComponentProps, S extends ResumeState=ResumeState>
    extends React.Component<P, S> {
    constructor(props: P) {
        super(props);

        this.addDescriptionList = this.addDescriptionList.bind(this);
        this.addEntry = this.addEntry.bind(this);
        this.addList = this.addList.bind(this);
        this.addParagraph = this.addParagraph.bind(this);

        this.updateDataEvent = this.updateDataEvent.bind(this);
        this.addNestedChild = this.addNestedChild.bind(this);
        this.deleteNestedChild = this.deleteNestedChild.bind(this);
        this.toggleEdit = this.toggleEdit.bind(this);
        this.toggleNestedEdit = this.toggleNestedEdit.bind(this);
        this.toggleHidden = this.toggleHidden.bind(this);
        this.updateNestedData = this.updateNestedData.bind(this);
        this.setSelected = this.setSelected.bind(this);
        this.unselect = this.unselect.bind(this);
    }

    /** Get the class name for the main container */
    get className(): string {
        let classes = new Array<string>();

        if (!this.isPrinting && (this.state.isHovering || this.state.isSelected)) {
            classes.push('resume-selected');
        }

        if (this.props.isHidden) {
            classes.push('resume-hidden');
        }

        return classes.join(' ');
    }

    get isPrinting() : boolean {
        return this.props.mode == 'printing';
    }

    componentWillUnmount() {
        // Since the node is being deleted, remove callback to this node's unselect
        // method from <Resume /> to prevent memory leaks
        if (this.state && this.state.isSelected) {
            this.props.updateSelected({ unselect: undefined });
        }
    }

    addChild(data: object) {
        if (this.props.addChild as AddChild) {
            (this.props.addChild as AddChild)(data);
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

    renderChildren() {
        if (this.props.children as Array<object>) {
            return <React.Fragment>{
                (this.props.children as Array<object>).map((elem, idx, arr) =>
                    <React.Fragment key={idx}>
                        {loadComponent(elem, idx, arr.length,
                            {
                                mode: this.props.mode,
                                addChild: (this.addNestedChild.bind(this, idx) as (node: object) => void),
                                moveDown: (this.moveNestedChildDown.bind(this, idx) as Action),
                                moveUp: (this.moveNestedChildUp.bind(this, idx) as Action),
                                deleteChild: (this.deleteNestedChild.bind(this, idx) as Action),
                                toggleEdit: (this.toggleNestedEdit.bind(this, idx) as () => void),
                                updateData: (this.updateNestedData.bind(this, idx) as (key: string, data: any) => void),
                                unselect: this.props.unselect,
                                updateSelected: this.props.updateSelected
                            },
                            this.props.id
                        )}
                    </React.Fragment>)
            }
            </React.Fragment>
        }

        return <React.Fragment />
    }

    toggleHidden() {
        this.updateData('isHidden', !this.props.isHidden);
    }

    setSelected() {
        if (!this.state.isSelected) {
            this.setState({ isSelected: true });

            // Unselect the previous component
            this.props.unselect();

            // Pass this node's unselect back up to <Resume />
            this.props.updateSelected({
                unselect: this.unselect.bind(this)
            });
        }
    }

    unselect() {
        this.setState({
            isSelected: false
        });
    }

    getSelectTriggerProps() {
        return {
            onClick: this.setSelected,
            onMouseEnter: () => {
                // Don't select anything in "print" mode
                if (!this.isPrinting) {
                    this.setState({ isHovering: true });
                }
            },
            onMouseLeave: () => { this.setState({ isHovering: false }) }
        };
    }

    // Get the buttons for editing a menu
    getEditingMenu() : any {
        return <></>
    }

    // Actually render the editing controls after checking that
    // they should be rendered
    renderEditingMenu() {
        if (!this.isPrinting) {
            const menu = this.getEditingMenu();
            if (menu) {
                return this.getEditingMenu();
            }
        }

        return <></>
    }
}