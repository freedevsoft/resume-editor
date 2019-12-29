import * as React from "react";
import TextField from "./controls/inputs/TextField";
import ResumeNodeBase, { ResumeNodeProps } from "./ResumeNodeBase";

interface DescriptionItemProps extends ResumeNodeProps {
    term?: string;
}

export class DescriptionListItem extends ResumeNodeBase<DescriptionItemProps> {
    static readonly type = 'DescriptionListItem';

    get className() {
        return super.className + " resume-definition";
    }

    render() {
        const term = <TextField
            label="Term"
            onChange={this.updateData.bind(this, "term")}
            value={this.props.term}
            defaultText="Enter a term"
            {...this.textFieldProps}
        />

        const value = <TextField
            label="Value"
            onChange={this.updateData.bind(this, "value")}
            value={this.props.value || ""}
            defaultText="Enter a value"
            {...this.textFieldProps}
        />

        return <div className={this.className} {...this.selectTriggerProps}>
            <dt>{term}</dt>
            <dd>{value}</dd>
        </div>
    }
}

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
    static readonly type = 'DescriptionList';

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
        return <dl className={this.className} {...this.selectTriggerProps}>
            {this.renderChildren()}
        </dl>
    }
}