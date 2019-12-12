import * as React from "react";

import FlexibleRow, { FlexibleColumn } from "./FlexibleRow";
import Section, { SectionProps } from "./Section";
import Entry, { EntryProps } from "./Entry";
import List, { ListItem, DescriptionList, DescriptionListItem } from "./List";
import Paragraph from "./Paragraph";
import Header from "./Header";
import { ResumeNodeProps, ResumePassProps } from "./ResumeComponent";
import { IdType } from "./utility/HoverTracker";

export type EditorMode = 'normal'
    | 'landing'
    | 'help'
    | 'editingStyle'
    | 'changingTemplate'
    | 'printing';

<<<<<<< HEAD
interface ExtraProps {
    uuid: string;
    isHovering: (id: IdType) => boolean;
    toggleParentHighlight?: (isHovering: boolean) => void;
<<<<<<< HEAD
<<<<<<< HEAD
    isSelected: (id: string) => boolean;
<<<<<<< HEAD
=======
>>>>>>> e511b7e (Fine tuned select/hover logic)
=======
    isSelected: (id: string) => boolean;
>>>>>>> ab2636b (Cleaned up selection logic)
    isSelectBlocked: (id: string) => boolean;
=======
    isSelectBlocked: (id: IdType) => boolean;
>>>>>>> 759ed46 (Added HoverTracker)
    deleteChild: () => void;
    mode: EditorMode;
    unselect: () => void;
    updateSelected: (data?: SelectedNodeProps) => void;

    addChild?: (node: object) => void;
    hoverInsert?: (id: IdType) => void;
    hoverOut?: (id: IdType) => void;
    moveUp?: Action;
    moveDown?: Action;
    toggleEdit?: Action;
    updateData?: (key: string, data: any) => void;

    /// ????
    index: number;
    numChildren: number;
    parentId?: IdType;
=======
interface ResumeComponentProps extends ResumePassProps {
    index: number;       // The n-th index of this node relative to its parent
    numChildren: number; // How many total siblings this node has plus itself
    parentId?: IdType;   // The id of the parent node
>>>>>>> ce7f5fa (Simplified ResumeComponent props)
}

/**
 * Load a resume node from a JavaScript object
 */
export default function ResumeComponent(props: ResumeComponentProps) {
    const parentId = props.parentId;
    const index = props.index;

    let newProps = {
        ...props,

        // Generate unique IDs for component
        id: parentId ? [...parentId, index] : [index],
        isFirst: (index === 0),
        isLast: (index === props.numChildren - 1)
    } as ResumeNodeProps;
    
    switch (props['type']) {
        case 'DescriptionList':
            return <DescriptionList {...newProps} />;
        case 'DescriptionListItem':
            return <DescriptionListItem {...newProps} />;
        case 'FlexibleColumn':
            return <FlexibleColumn {...newProps} />;
        case 'FlexibleRow':
            return <FlexibleRow {...newProps} />;
        case 'Header':
            return <Header {...newProps} />
        case 'Section':
            return <Section {...newProps as SectionProps} />;
        case 'Entry':
            return <Entry {...newProps as EntryProps} />;
        case 'List':
            return <List {...newProps} />;
        case 'ListItem':
            return <ListItem {...newProps} />;
        case 'Paragraph':
            return <Paragraph {...newProps} />;
        default:
            return <React.Fragment></React.Fragment>
    }
}