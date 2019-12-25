import * as React from "react";

<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
/** Represents resume prop properties and methods passed
 *  from the top down
 * */
export interface ResumePassProps {
    uuid: string;
    mode: EditorMode;
<<<<<<< HEAD
    isFirst: boolean;
    isLast: boolean;

    isHidden?: boolean;
    isEditing?: boolean
<<<<<<< HEAD
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
=======
>>>>>>> 759ed46 (Added HoverTracker)
    value?: string;
    children?: Array<object>;
=======
>>>>>>> ce7f5fa (Simplified ResumeComponent props)

    deleteChild: Action;
    hoverOver: (id: IdType) => void;
    hoverOut: (id: IdType) => void;
    isHovering: (id: IdType) => boolean;
    isSelected: (id: string) => boolean;
    isSelectBlocked: (id: IdType) => boolean;
    moveUp: Action;
    moveDown: Action;
    unselect: Action;
    updateData: (key: string, data: any) => void;
    updateSelected: (data?: SelectedNodeProps) => void;

    addChild?: AddChild;
    toggleEdit?: Action;
}

<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
export interface ResumeComponentState {
    isSelected?: boolean;
}

>>>>>>> e511b7e (Fine tuned select/hover logic)
=======
>>>>>>> ab2636b (Cleaned up selection logic)
=======
export interface ResumeNodeProps extends BasicNodeProps, ResumePassProps {
    isFirst: boolean;
    isLast: boolean;
=======
import FlexibleRow, { FlexibleColumn } from "./FlexibleRow";
=======
>>>>>>> 8bb6e81 (Yuge upgrades (#7))
import Section, { SectionProps } from "./Section";
=======
import Section from "./Section";
>>>>>>> c60ff9c (Add CSS Grid (and other goodies...) (#8))
import Entry, { BasicEntryProps } from "./Entry";
import DescriptionList, { DescriptionListItem } from "./List";
import RichText from "./RichText";
import Header from "./Header";
import { ResumeNodeProps, ResumePassProps } from "./ResumeNodeBase";
import { IdType } from "./utility/HoverTracker";
<<<<<<< HEAD
>>>>>>> cfdfcd6 (Rename)
=======
import { BasicResumeNode } from "./utility/NodeTree";
import Row from "./Row";
import Column from "./Column";
<<<<<<< HEAD
>>>>>>> 8bb6e81 (Yuge upgrades (#7))
=======
import Grid from "./Grid";
<<<<<<< HEAD
>>>>>>> 6efd4ed (Added Grid and made MappedTextFields controlled)
=======
import Icon from "./Icon";
>>>>>>> c60ff9c (Add CSS Grid (and other goodies...) (#8))

export type EditorMode = 'normal'
    | 'landing'
    | 'help'
    | 'changingTemplate'
    | 'printing';

interface ResumeComponentProps extends ResumePassProps {
    index: number;       // The n-th index of this node relative to its parent
    numSiblings: number; // Number of siblings this node has
    parentId?: IdType;   // The id of the parent node
}

<<<<<<< HEAD
>>>>>>> ce7f5fa (Simplified ResumeComponent props)
export type Action = (() => void);
export type AddChild = ((node: object) => void);
export type UpdateChild = ((key: string, data: any) => void);

// Represents a node that is part of the user's resume
export default class ResumeNodeBase<P
    extends ResumeNodeProps=ResumeNodeProps> extends React.PureComponent<P> {
    constructor(props: P) {
        super(props);
        
        this.addDescriptionList = this.addDescriptionList.bind(this);
        this.addEntry = this.addEntry.bind(this);
        this.addList = this.addList.bind(this);
        this.addParagraph = this.addParagraph.bind(this);
        this.addSection = this.addSection.bind(this);

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

    /** Returns hover/select trigger props */
    get selectTriggerProps() {
        if (!this.isEditable) {
            return {};
        }

        return {
            onClick: this.setSelected,
            onMouseEnter: () => this.props.hoverOver(this.props.id),
            onMouseLeave: () => this.props.hoverOut(this.props.id)
        };
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

        newChildren[idx]['children'].push(assignIds(node));
        this.updateData("children", newChildren);
    }

    /**
     * Delete a grandchild
     * @param idx       Index of the parent of the node to be deleted
     * @param gchildIdx Index of the grandchild to be deleted
     */
    deleteNestedChild(idx: number) {
        let replChildren = this.props.children as Array<object>;
        if (replChildren) {
            // Replace node's children with new list of children that excludes deleted node
            this.updateData("children", deleteAt(replChildren, idx));
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
        this.props.updateData(key, data);
    }

    updateDataEvent(key: string, event: any) {
        this.updateData(key, event.target.value);
    }

<<<<<<< HEAD
    childMapper(elem: object, idx: number, arr: object[]) {
        const uniqueId = elem['uuid'];

<<<<<<< HEAD
        return <React.Fragment key={uniqueId}>
<<<<<<< HEAD
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
=======
            {loadComponent({
                ...elem,
                uuid: uniqueId,
                mode: this.props.mode,
                addChild: (this.addNestedChild.bind(this, idx) as (node: object) => void),
                isHovering: this.props.isHovering,
                isSelected: this.props.isSelected,
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
            idx, arr.length,
            this.props.id)}
>>>>>>> dfea35f (Simplified loadComponent())
        </React.Fragment>
=======
        const props = {
            ...elem,
            uuid: uniqueId,
            mode: this.props.mode,
            addChild: (this.addNestedChild.bind(this, idx) as (node: object) => void),
            isHovering: this.props.isHovering,
            isSelected: this.props.isSelected,
            isSelectBlocked: this.props.isSelectBlocked,
            hoverInsert: this.props.hoverInsert,
            hoverOut: this.props.hoverOut,
            moveDown: (this.moveNestedChildDown.bind(this, idx) as Action),
            moveUp: (this.moveNestedChildUp.bind(this, idx) as Action),
            deleteChild: (this.deleteNestedChild.bind(this, idx) as Action),
            toggleEdit: (this.toggleNestedEdit.bind(this, idx) as () => void),
            updateData: (this.updateNestedData.bind(this, idx) as (key: string, data: any) => void),
            unselect: this.props.unselect,
            updateSelected: this.props.updateSelected,

            index: idx,
            numChildren: arr.length,

            // Crucial for generating IDs so hover/select works properly
            parentId: this.props.id
        };

        return <ResumeComponent key={uniqueId} {...props} />
>>>>>>> fb61a5c (Changed loadComponent into a render function)
    }

=======
>>>>>>> ce7f5fa (Simplified ResumeComponent props)
    renderChildren() {
        const children = this.props.children as Array<object>;
        if (children) {
            return children.map((elem: object, idx: number, arr: object[]) => {
                const uniqueId = elem['uuid'];
                const props = {
                    ...elem,
                    uuid: uniqueId,
                    mode: this.props.mode,
                    addChild: this.addNestedChild.bind(this, idx),
                    isHovering: this.props.isHovering,
                    isSelected: this.props.isSelected,
                    isSelectBlocked: this.props.isSelectBlocked,
                    hoverOver: this.props.hoverOver,
                    hoverOut: this.props.hoverOut,
                    moveDown: this.moveNestedChildDown.bind(this, idx),
                    moveUp: this.moveNestedChildUp.bind(this, idx),
                    deleteChild: this.deleteNestedChild.bind(this, idx),
                    toggleEdit: this.toggleNestedEdit.bind(this, idx),
                    updateData: this.updateNestedData.bind(this, idx),
                    unselect: this.props.unselect,
                    updateSelected: this.props.updateSelected,

                    index: idx,
                    numChildren: arr.length,

                    // Crucial for generating IDs so hover/select works properly
                    parentId: this.props.id
                };

                return <ResumeComponent key={uniqueId} {...props} />
            })
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
                deleteChild: this.props.deleteChild,
                getData: this.getData,
                toggleEdit: this.props.toggleEdit as Action
            });
        }
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
=======
/**
 * Factory for loading a resume node from a JavaScript object
 */
export default function ResumeComponent(props: ResumeComponentProps) {
    const parentId = props.parentId;
    const index = props.index;

    let newProps = {
        ...props,

        // Generate unique IDs for component
        id: parentId ? [...parentId, index] : [index],
        isLast: index === props.numSiblings - 1
    } as ResumeNodeProps;
    
    switch (props.type) {
        case DescriptionList.type:
            return <DescriptionList {...newProps} />;
        case DescriptionListItem.type:
            return <DescriptionListItem {...newProps} />;
        case Grid.type:
            return <Grid {...newProps} />;
        case Column.type:
            return <Column {...newProps} />;
        case Row.type:
            return <Row {...newProps} />;
        case Header.type:
            return <Header {...newProps} />
        case Section.type:
            return <Section {...newProps} />;
        case Entry.type:
            return <Entry {...newProps} />;
        case RichText.type:
            return <RichText {...newProps} />;
        case Icon.type:
            return <Icon {...newProps} />
        default:
            return <React.Fragment></React.Fragment>
>>>>>>> cfdfcd6 (Rename)
    }
}

export interface NodeInformation {
    text: string;
    node: BasicResumeNode;
}

/** Stores schema information */
export class ComponentTypes {

    /**
     * Given a type return what children its allowed to have
     * @param type Type of resume node
     */
    static childTypes(type: string) : string | Array<string> {
        switch (type) {
            case Grid.type:
                return [
                    Row.type,
                    Column.type,
                    Section.type,
                    Icon.type,
                    Entry.type,
                    RichText.type,
                    AliasTypes.BulletedList,
                    DescriptionList.type
                ];
            case Row.type:
                return Column.type;
            case Column.type:
                return [
                    Row.type,
                    Grid.type,
                    Section.type,
                    Entry.type,
                    RichText.type,
                    AliasTypes.BulletedList,
                    DescriptionList.type
                ]
            case DescriptionList.type:
                return DescriptionListItem.type;
            case Entry.type:
                return [
                    AliasTypes.BulletedList,
                    DescriptionList.type,
                    RichText.type
                ];
            case Header.type:
                return [
                    Entry.type,
                    RichText.type,
                    AliasTypes.BulletedList,
                    DescriptionList.type,
                    Grid.type
                ];
            case RichText.type:
                return [];
            case Section.type:
                return [
                    Section.type,
                    Entry.type,
                    RichText.type,
                    AliasTypes.BulletedList,
                    DescriptionList.type,
                    Grid.type,
                    Row.type
                ]
            default:
                return [
                    Section.type,
                    Entry.type,
                    RichText.type,
                    AliasTypes.BulletedList,
                    DescriptionList.type
                ];
        }
    }

    /**
     * Given a node type return its corresponding path in the 
     * CSS settings
     * @param type
     */
    static cssName(type: string) : string[] {
        switch (type) {
            case DescriptionList.type:
                return ['Description List'];
            case DescriptionListItem.type:
                return ['Description List'];
            case RichText.type:
                return ['Rich Text'];
            case Column.type:
                return [Row.type, Column.type];
            default:
                return [type];
        }
    }

    /**
     * Given a type retrieve its JSON representation
     * @param type
     */
    static defaultValue(type: string) : NodeInformation {
        switch (type) {
            case AliasTypes.BulletedList:
                return {
                    text: 'Bulleted List',
                    node: {
                        type: RichText.type,
                        value: '<ul><li></li></ul>'
                    }
                }
            case Column.type:
                return {
                    text: Column.type,
                    node: {
                        type: Column.type
                    }
                }
            case DescriptionList.type:
                return {
                    text: 'Description List',
                    node: {
                        type: DescriptionList.type,
                        children: [
                            {
                                type: DescriptionListItem.type
                            }
                        ]
                    }
                }
            case DescriptionListItem.type:
                return {
                    text: 'Description List Item',
                    node: { type: DescriptionListItem.type }
                }
            case Entry.type:
                return {
                    text: 'Entry',
                    node: {
                        type: Entry.type,
                        title: [''],
                        subtitle: ['']
                    } as BasicEntryProps
                }
            case Grid.type:
                return {
                    text: 'Grid',
                    node: {
                        type: Grid.type
                    }
                }
            case RichText.type:
                return {
                    text: 'Rich Text',
                    node: {
                        type: RichText.type
                    }
                }
            case Row.type:
                return {
                    text: Row.type,
                    node: {
                        type: Row.type,
                        children: [
                            { type: Column.type },
                            { type: Column.type }
                        ]
                    }
                }
            case Section.type:
                return {
                    text: Section.type,
                    node: {
                        type: Section.type
                    }
                }
            case Icon.type:
                return {
                    text: Icon.type,
                    node: {
                        type: Icon.type
                    }
                }
            default:
                throw new Error(`Couldn't find information for component named ${type}`);
        }
    }

    /**
     * Whether or not it makes sense to "edit" a type
     * @param type
     */
    static isEditable(type: string) {
        let editable = new Set([
            Section.type, RichText.type, Header.type, DescriptionListItem.type, Entry.type
        ]);

        return editable.has(type);
    }
}

class AliasTypes {
    static readonly BulletedList = 'Bulleted List';
}