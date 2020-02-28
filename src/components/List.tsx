import * as React from "react";
import TextField from "./controls/inputs/TextField";
import Container from "./Container";
import { process, deleteAt, moveUp, moveDown } from "./Helpers";
import ResumeComponentProps, { BasicResumeNode } from "./utility/Types";
import ResumeContext, { IResumeContext } from "./ResumeContext";

interface DescriptionItemBase {
    term?: string;
    definitions?: string[];
}

export interface BasicDescriptionItemProps extends BasicResumeNode, DescriptionItemBase { };
interface DescriptionItemProps extends DescriptionItemBase, ResumeComponentProps { }

export const DescriptionListItemType = "Description List Item";

/** Helper function for DescriptionListItem */
function getDefinitions(props: DescriptionItemProps, context: IResumeContext) {
    const moveFieldUp = (index: number) => {
        props.updateData('definitions', moveUp(props.definitions || [], index));
    };

    const moveFieldDown = (index: number) => {
        props.updateData('definitions', moveDown(props.definitions || [], index));
    };

    const deleteField = (index: number) => {
        props.updateData('definitions', deleteAt(props.definitions || [], index));
    };

    const updater = (index: number, text: string) => {
        let replDefs = props.definitions || [];

        // Replace contents
        replDefs[index] = text;
        props.updateData('definitions', replDefs);
    }

    const fields = props.definitions;
    if (fields) {
        const isSelected = context.selectedUuid === props.uuid;

        return fields.map((text: string, index: number, arr: string[]) => {
            const definitionOptions = [
                {
                    text: 'Delete',
                    action: () => deleteField(index)
                },
                {
                    text: 'Move Up',
                    action: () => moveFieldUp(index)
                },
                {
                    text: 'Move Down',
                    action: () => moveFieldDown(index)
                }
            ];

            return <dd key={`${index}/${arr.length}`}>
                <TextField
                    static={!isSelected}
                    onChange={(data: string) => updater(index, data)}
                    value={text}
                    defaultText="Enter a value"
                    contextMenuOptions={definitionOptions}
                    displayProcessors={[process]}
                />
            </dd>
        });
    }

    return <></>
}

<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
/** Represents a list component */
export default class List extends ResumeNodeBase<ListProps> {
    constructor(props) {
        super(props);

<<<<<<< HEAD
<<<<<<< HEAD
=======
        this.state = {
            isSelected: false
        };

>>>>>>> e511b7e (Fine tuned select/hover logic)
=======
>>>>>>> ab2636b (Cleaned up selection logic)
        this.addChild = this.addChild.bind(this);
        this.moveBullets = this.moveBullets.bind(this);
    }

    get moveText(): string {
        return this.props.isMoving ? "Done Moving" : "Move Items";
    }

    get hideText(): string {
        return this.props.isHidden ? "Show List" : "Hide List";
    }

    addChild() {
        if (this.props.addChild as AddChild) {
            (this.props.addChild as AddChild)({
                type: 'ListItem'
            });
=======
export class DescriptionList extends ResumeNodeBase {
=======
export default class DescriptionList extends ResumeNodeBase {
=======
export default class DescriptionList extends React.PureComponent<ResumeNodeProps> {
>>>>>>> 2d7c1e3 (Deleted ResumeNodeBase)
=======
export default class DescriptionList extends React.PureComponent<ResumeComponentProps> {
>>>>>>> 1ec9e42 (Consolidated a bunch of interfaces)
    static readonly type = 'Description List';

<<<<<<< HEAD
>>>>>>> aa40481 (Removed usage of Function.name which caused issues when minified)
    /** Returns a "handle" which can be used to select the column itself and not the columns it contains */
    renderGrabHandle() {
        if (this.isHovering && !this.isSelected) {
            return <div className="column-grab-handle-container">
                <div className="column-grab-handle">
                    Click here to select description list
                </div>
            </div>
>>>>>>> 8bb6e81 (Yuge upgrades (#7))
        }

        return <></>
    }

=======
>>>>>>> 72f2dba (Improved dropdown menus + UI (#10))
    render() {
        return <Container displayAs="dl" {...this.props}>
            {this.props.children}
        </Container>
    }
=======
export function DescriptionListItem(props: DescriptionItemProps) {
    const term = <TextField
        label="Term"
        onChange={(text: string) => { props.updateData("value", text) }}
        value={props.value}
        defaultText="Enter a term"
        displayProcessors={[process]}
    />

    return <ResumeContext.Consumer>
        {(context) => {
            return (
                <Container {...props} className="resume-definition">
                    <dt>{term}</dt>
                    {getDefinitions(props, context)}
                </Container>
            );
        }}
    </ResumeContext.Consumer>
}

export const DescriptionListType = "Description List";

export default function DescriptionList(props: ResumeComponentProps) {
    return <Container displayAs="dl" {...props}>
        {props.children}
    </Container>
>>>>>>> 6c435df (Patch 02/28/2020 (#17))
}