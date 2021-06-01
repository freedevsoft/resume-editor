import { BasicResumeNode } from "../utility/Types";
import { assuredHeader } from "./Assured";
import RichText from "../RichText";
import Divider from "../Divider";
import getDefaultCss from "./CssTemplates";
import CssNode from "../utility/CssTree";


export function assuredCoverLetterNodes(): Array<BasicResumeNode> {
    let now = new Date();
    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ];
    let month = months[now.getMonth()];

    let date = `${month} ${now.getDate()}, ${now.getFullYear()}`;

    return [
        assuredHeader(),
        {
            type: Divider.type,
            htmlId: "content",
            childNodes: [
                {
                    type: RichText.type, 
                    value: date,
                    htmlId: "date"
                },
                {
                    type: RichText.type,
                    value: "Dear Hiring Manager,",
                    htmlId: "salutation"
                },
                {
                    type: RichText.type,
                    htmlId: "body",
                    value: `<p>What do you think of when you think of reliable? In 
an age of planned obsolescence, it's hard to find any good examples. 
</p>

<p>But I want to change that, which is why I am applying to this
position. My name is Vu Dung, and I'm a senior smart contract developer who has rich experience with ReactJS, Solidity, Web3.0
</p>

<p>As a team lead at Boeing, I oversaw a talented multi-national
group of engineers responsible for creating mission critical software for 
the 737 MAX 8 jet. As a result of our efforts, we were able to 
create a revolutionary new commercial airliner that still passed
stringent Federal Aviation Administration testing. It is a plane
that I would let my family fly on, especially my in-laws.
</p>

<p>I am committed to helping great companies like yours build great products.
I look forward to hearing from you soon.</p>`
                },
                {
                    type: RichText.type,
                    htmlId: "closing",
                    value: `<p>Sincerely,</p><p><p>Vu dung</p>`
                }
            ]
        }
    ];
}

export function assuredCoverLetterCss() {
    let css = getDefaultCss().setProperties([
        ["font-family", "var(--sans-serif)"],
        ["font-size", "11pt"]
    ]);

    /** Header */
    const header = css.mustFindNode("Header").setProperties([
        ["background", "#eeeeee"],
        ["padding", "var(--edge-margin)"],
        ["padding-bottom", "var(--large-spacing)"],
    ]).setProperties([["margin-right", "auto"]], 'Title Group'
    ).add('Rich Text', {
        'text-align': 'right',
        'font-size': '10pt'
    }, '.rich-text');

    /** Contact Information */
    let contact = css.add("Contact Information", {
        "grid-template-columns": "1fr 30px",
        "grid-column-gap": "var(--small-spacing)",
        "margin-left": "var(--spacing)",
        "width": "auto",
        "height": "auto",
    }, "#contact, #social-media");

    contact.add('Icon', {
        'height': '24px',
        'vertical-align': 'middle'
    }, 'svg.icon, img.icon');

    /** Letter */
    let content = css.add("#content", {
        "font-family": "var(--serif)",
        "font-size": "12pt",
        "line-height": "1.6",
        "padding-left": "var(--edge-margin)",
        "padding-right": "var(--edge-margin)"
    }, '#content');

    content.add("Paragraph", {
        "padding-top": "1em",
    }, "p").add(":first-of-type", {
        "padding-top": "0"
    });

    css.add("#date", {
        "margin-top": "2em",
    }, "#date");

    css.add("#salutation", {
        "margin-top": "2em"
    }, "#salutation");

    css.add("#body", {
        "margin-top": "2em"
    }, "#body");

    css.add("#closing", {
        "margin-top": "2em"
    }, "#closing").add("Signature", {
        "height": "80px"
    }, "img");

    return css;
}