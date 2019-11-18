import * as React from 'react';
import Entry from './components/Entry';
import ChildHolder from './components/ChildHolder';
import Section from './components/Section';
import Title from './components/Title';
import Paragraph from './components/Paragraph';
import { Container, ContainerState } from './components/Container';
import loadComponent from './components/LoadComponent';

interface PageState {
    children: Array<object>;
    customCss: string;
}

const resumeData = [
    {
        type: 'FlexibleRow',
        children: [
            {
                type: 'Title',
                value: 'Vincent La'
            },
            {
                type: 'Paragraph',
                value: 'Email: vincela9@hotmail.com\nPhone: 123-456-7890'
            }
        ]
    },
    {
        type: 'Section',
        title: 'Objective',
        children: [
            {
                type: 'Paragraph',
                value: 'To conquer the world.'
            }
        ]
    },
    {
        type: 'Section',
        title: 'Education',
        children: [
            {
                type: 'Entry'
            }
        ]
    }
    
];
/*
                    <Title value="Vincent La" />
                    <Paragraph value="Email: vincela9@hotmail.com
                        Phone: 123-456-7890" />
                </FlexibleRow>,
                <Section title="Objective">
                    <Paragraph value="To conquer the world." />
                </Section>,
                <Section title="Education">
                    <Entry />
                </Section>
*/

class Resume extends React.Component<{}, PageState> {
    style: HTMLStyleElement;

    constructor(props) {
        super(props);

        // Custom CSS
        const head = document.getElementsByTagName("head")[0];
        this.style = document.createElement("style");
        this.style.innerHTML = "";
        head.appendChild(this.style);

        this.state = {
            children: resumeData,
            customCss: `body {
    width: 70vw;
    margin: 1em auto 1em auto;
    font-family: Tahoma, sans-serif;
    font-size: 10pt;
}

body * {
    margin: 0;
}

h1, h2, h3, h4 {
    font-family: Georgia, serif;
}

h2 { border-bottom: 1px solid; }

section {
    margin-bottom: 1.5em;
}`
        };

        this.renderStyle();

        // this.addSection = this.addSection.bind(this);
        this.addChild = this.addChild.bind(this);
        this.updateData = this.updateData.bind(this);
        this.toggleEdit = this.toggleEdit.bind(this);
        this.renderStyle = this.renderStyle.bind(this);
        this.onStyleChange = this.onStyleChange.bind(this);
    }

    /*
    addSection() {
        this.setState({
            children: this.state.children.addChild({
                type: 'Section',
                title: 'Add title here'
            })
        });
    }
    */

    // Update custom CSS
    onStyleChange(event) {
        this.setState({
            customCss: event.target.value,
        });
    }

    // Push style changes to browser
    renderStyle() {
        this.style.innerHTML = this.state.customCss;
    }

    addChild(idx: number, node: object) {
        this.state.children[idx]['children'].push(node);

        this.setState({
            children: this.state.children
        });
    }

    updateData(idx: number, key: string, data: any) {
        this.state.children[idx][key] = data;

        this.setState({
            children: this.state.children
        });
    }

    toggleEdit(idx: number) {
        console.log("Toggle edit received", idx);
        let currentValue = this.state.children[idx]['isEditing'];
        this.state.children[idx]['isEditing'] = !currentValue;

        this.setState({
            children: this.state.children
        });
    }

    render() {
        console.log(this.state.children);
        // <button style={{}} onClick={this.addSection}>Add Section</button>

        return <React.Fragment>
            {this.state.children.map((elem, idx) =>
                <React.Fragment key={idx}>
                    {loadComponent(elem, {
                        addChild: this.addChild.bind(this, idx),
                        toggleEdit: this.toggleEdit.bind(this, idx),
                        updateData: this.updateData.bind(this, idx)
                    })}
                </React.Fragment>)
            }

            <div>
                <h2>Style Editor</h2>
                <textarea onChange={this.onStyleChange} value={this.state.customCss} />
                <button onClick={this.renderStyle}>Update</button>
            </div>
        </React.Fragment>
    }
}

export default Resume;