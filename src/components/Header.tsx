import * as React from "react";
import Row, { RowProps, BasicRowProps } from "./Row";
import ReactQuill from "react-quill";
import RichText from "./RichText";

interface HeaderBase {
    subtitle?: string;
}

<<<<<<< HEAD
export default class Header extends ResumeNodeBase<HeaderProps> {
    constructor(props: ResumeNodeProps) {
        super(props);

<<<<<<< HEAD
<<<<<<< HEAD
=======
        this.state = {
            isSelected: false
        }

>>>>>>> e511b7e (Fine tuned select/hover logic)
=======
>>>>>>> ab2636b (Cleaned up selection logic)
        this.orientColumn = this.orientColumn.bind(this);
        this.orientRow = this.orientRow.bind(this);
    }
=======
export interface BasicHeaderProps extends BasicRowProps, HeaderBase { };
export interface HeaderProps extends RowProps, HeaderBase { };
>>>>>>> 8bb6e81 (Yuge upgrades (#7))

export default class Header extends Row<HeaderProps> {
    get className(): string {
        let classNames = new Set(super.className.split(' '));
        classNames.delete('row');
        return Array.from(classNames).join(' ');
    }

    render() {
        let value = this.props.isEditing ? <ReactQuill
            modules={RichText.quillModules}
            value={this.props.value || ""}
            onChange={(text) => this.updateData("value", text)}
        /> : <h1 dangerouslySetInnerHTML={{ __html: this.props.value || "Enter a title" }} />;

        let subtitle = this.props.isEditing ? <ReactQuill
            modules={RichText.quillModules}
            value={this.props.subtitle || ""}
            onChange={(text) => this.updateData("subtitle", text)}
        /> : <h2 className="subtitle" dangerouslySetInnerHTML={{ __html: this.props.subtitle || "" }} />;

        return (
            <header className={this.className} style={this.style} {...this.selectTriggerProps}>
                {this.renderGrabHandle()}
                <hgroup>
                    {value}
                    {subtitle}
                </hgroup>
                {this.renderChildren()}
            </header>
        );
    }
}