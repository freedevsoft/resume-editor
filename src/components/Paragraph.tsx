import * as React from "react";
import * as Helpers from "./Helpers";
import ReactQuill from 'react-quill';
import EditButton, { DeleteButton, DownButton, UpButton } from "./controls/Buttons";
import ResumeNodeBase from "./ResumeNodeBase";
import { ButtonGroup } from "react-bootstrap";

export default class Paragraph extends ResumeNodeBase {
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
        this.updateDataEvent = this.updateDataEvent.bind(this);
    }

    get className(): string {
        let classNames = [super.className];
        if (this.isSelected) {
            classNames.push('flex-col');
        }

        return classNames.join(' ');
    }

    static quillModules = {
        toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            ['link'],
            [{ 'align': [] }],
            ['clean']
        ],
    };

    /**
     * Perform helpful text processing
     * @param text Text to be processed
     */
    static process(text?: string) {
        return Helpers.process(text);
    }

    getEditingMenu() {
        if (this.isSelected) {
            return <ButtonGroup size="sm">
                <EditButton {...this.props} extended={true} />
                <DeleteButton {...this.props} extended={true} />
                <UpButton {...this.props} extended={true} />
                <DownButton {...this.props} extended={true} />
            </ButtonGroup>
        }
    }

    render(): JSX.Element {
        let value = this.props.isEditing ? <ReactQuill
            modules={Paragraph.quillModules}
            value={this.props.value}
            onChange={((this.props.updateData as (key: string, data: any) => void).bind(this, "value") as (data: any) => void)}
        /> : <span className="resume-paragraph" dangerouslySetInnerHTML={{ __html: Paragraph.process(this.props.value) as string }} />;

        return <div className={this.className} {...this.selectTriggerProps}>
            {this.renderEditingMenu()}
            {value}
        </div>;
    }
}