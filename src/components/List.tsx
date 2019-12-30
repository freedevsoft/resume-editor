﻿import * as React from "react";
import TextField from "./controls/inputs/TextField";
import Container from "./Container";
import { process } from "./Helpers";
import ResumeNodeProps from "./ResumeNodeProps";

interface DescriptionItemProps extends ResumeNodeProps {
    term?: string;
}

export class DescriptionListItem extends React.PureComponent<DescriptionItemProps> {
    static readonly type = 'Description List Item';
    
    render() {
        const term = <TextField
            label="Term"
            onChange={this.props.updateData.bind(this, "term")}
            value={this.props.term}
            defaultText="Enter a term"
            displayProcessor={process}
        />

        const value = <TextField
            label="Value"
            onChange={this.props.updateData.bind(this, "value")}
            value={this.props.value || ""}
            defaultText="Enter a value"
            displayProcessor={process}
        />

        return <Container {...this.props} className="resume-definition">
            <dt>{term}</dt>
            <dd>{value}</dd>
        </Container>
    }
}

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