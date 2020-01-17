import * as React from "react";
import TextField from "./controls/inputs/TextField";
import Container from "./Container";
import { process, deleteAt } from "./Helpers";
import ResumeComponentProps, { BasicResumeNode } from "./utility/Types";

interface DescriptionItemBase {
    term?: string;
    definitions?: string[];
}

export interface BasicDescriptionItemProps extends BasicResumeNode, DescriptionItemBase { };
interface DescriptionItemProps extends DescriptionItemBase, ResumeComponentProps { }

export class DescriptionListItem extends React.PureComponent<DescriptionItemProps> {
    static readonly type = 'Description List Item';
    
    getDefinitions() {
        const deleteField = (index: number) => {
            console.log("Deleter called");
            this.props.updateData('definitions',
                deleteAt(this.props.definitions || [], index)
            );
        };

        const updater = (index: number, text: string) => {
            let replDefs = this.props.definitions || [];

            // Replace contents
            replDefs[index] = text;
            this.props.updateData('definitions', replDefs);
        }

        const fields = this.props.definitions;
        if (fields) {
            return fields.map((text: string, index: number, arr: string[]) => {
                return <dd key={`${index}/${arr.length}`}>
                    <TextField
                        delete={() => deleteField(index)}
                        static={!this.props.isSelected}
                        onChange={(data: string) => updater(index, data)}
                        value={text}
                        defaultText="Enter a value"
                        displayProcessors={[process]}
                    />
                </dd>
            });
        }

        return <></>
    }

    render() {
        const term = <TextField
            label="Term"
            onChange={this.props.updateData.bind(this, "value")}
            value={this.props.value}
            defaultText="Enter a term"
            displayProcessors={[process]}
        />

        return <Container {...this.props} className="resume-definition">
            <dt>{term}</dt>
            {this.getDefinitions()}
        </Container>
    }
}

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
}