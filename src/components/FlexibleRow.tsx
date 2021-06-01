﻿import * as React from "react";
import ResumeComponent from "./ResumeComponent";
import { ButtonGroup, Dropdown, DropdownButton, Button } from "react-bootstrap";
import { DeleteButton, UpButton, DownButton } from "./Buttons";

export class FlexibleColumn extends ResumeComponent {
<<<<<<< HEAD
<<<<<<< HEAD
=======
    constructor(props) {
        super(props);

        this.state = {
            isSelected: false
        };
    }

>>>>>>> e511b7e (Fine tuned select/hover logic)
=======
>>>>>>> ab2636b (Cleaned up selection logic)
    /** Get the index of this column */
    get position(): number {
        return this.props.id[this.props.id.length - 1];
    }

    get className(): string {
        let positionClsName = 'column-' + this.position;
        return [positionClsName, 'flex-col', super.className].join(' ');
    }

    getEditingMenu() {
        if (this.isSelected) {
            return <ButtonGroup size="sm">
                <DropdownButton as={ButtonGroup} title="Add" id="add-options" size="sm">
                    <Dropdown.Item onClick={this.addSection}>Section</Dropdown.Item>
                    <Dropdown.Item onClick={this.addList}>Bulleted List</Dropdown.Item>
                    <Dropdown.Item onClick={this.addDescriptionList}>Description List</Dropdown.Item>
                    <Dropdown.Item onClick={this.addParagraph}>Paragraph</Dropdown.Item>
                </DropdownButton>
                <DeleteButton {...this.props} extended={true} />
                <UpButton {...this.props} extended={true} />
                <DownButton {...this.props} extended={true} />
            </ButtonGroup>
        }
    }

    /** Returns a "handle" which can be used to select the column itself and not the columns it contains */
    renderGrabHandle() {
<<<<<<< HEAD
<<<<<<< HEAD
        if (this.displayBorder && !this.isSelected) {
=======
        if (this.displayBorder) {
>>>>>>> e511b7e (Fine tuned select/hover logic)
=======
        if (this.displayBorder && !this.isSelected) {
>>>>>>> 88bb689 (Removed immutability-helper)
            return <div className="column-grab-handle-container">
                <div className="d-flex align-items-center column-grab-handle">
                    Click here to select column
                </div>
            </div>
        }

        return <></>
    }

    render() {
        let helperText = <></>;
        if (this.isEmpty && !this.props.isSelected) {
            helperText = <span>Column {this.position}: Click to select and add content</span>
        }

        return <div {...this.getSelectTriggerProps()} className={this.className} style={{ minWidth: "100px", minHeight: "100px" }}>
            {this.renderEditingMenu()}
            <div>
                {this.renderGrabHandle()}
                {this.renderChildren()}
                {helperText}
            </div>
        </div>
    }
}

export default class FlexibleRow extends ResumeComponent {
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
        this.addColumn = this.addColumn.bind(this);
    }

    get className(): string {
        return ['flex-row', 'flex-spread', super.className].join(' ');
    }

    addColumn() {
        this.addChild({
            type: 'FlexibleColumn'
        });
    }

    getEditingMenu() {
        if (this.isSelected) {
            return <ButtonGroup size="sm">
                <Button onClick={this.addColumn}>Add Column</Button>
                <DeleteButton {...this.props} extended={true} />
                <UpButton {...this.props} extended={true} />
                <DownButton {...this.props} extended={true} />
            </ButtonGroup>
        }
    }

    /** Returns a "handle" which can be used to select the row itself and not the columns it contains */
    renderGrabHandle() {
<<<<<<< HEAD
<<<<<<< HEAD
        if (this.displayBorder && !this.isSelected) {
=======
        if (this.displayBorder) {
>>>>>>> e511b7e (Fine tuned select/hover logic)
=======
        if (this.displayBorder && !this.isSelected) {
>>>>>>> 88bb689 (Removed immutability-helper)
            return <div className="row-grab-handle-container">
                <div className="d-flex align-items-center row-grab-handle">
                    Click here to select row
                </div>
            </div>
        }

        return <></>
    }
    
    render() {
        return <div {...this.getSelectTriggerProps()}>
            {this.renderEditingMenu()}
            <div className={this.className} style={{ width: "100%", minWidth: "100px", minHeight: "100px" }}>
                {this.renderGrabHandle()}
                {this.renderChildren()}
            </div>
        </div>
    }
}