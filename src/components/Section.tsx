import * as React from "react";
import ResumeNodeBase from "./ResumeNodeBase";
import ResumeTextField from "./controls/inputs/TextField";

/** Represents a section in a resume */
<<<<<<< HEAD
export default class Section extends ResumeNodeBase<SectionProps> {
    constructor(props: SectionProps) {
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
        this.rotateLeft = this.rotateLeft.bind(this);
        this.rotateRight = this.rotateRight.bind(this);
    }

=======
export default class Section extends ResumeNodeBase {
>>>>>>> c60ff9c (Add CSS Grid (and other goodies...) (#8))
    static readonly type = 'Section';
    
    render() {
        const title = <ResumeTextField
            onChange={this.updateData.bind(this, "value")}
            value={this.props.value || ''}
            label="Title"
            defaultText="Enter a title"
            {...this.textFieldProps}
        />

        let helperText = <></>
        if (this.isEmpty && !this.isSelected) {
            helperText = <p>This section is empty. Click here to select it and add content.</p>
        }

        return (
            <section className={this.className} id={this.props.htmlId} {...this.selectTriggerProps}>
                <h2>{title}</h2>
                <div className="content">
                    {this.renderChildren()}
                    {helperText}
                </div>
            </section>
        );
    }
}