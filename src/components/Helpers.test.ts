<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
﻿import { assignIds, process } from "./Helpers";
=======
﻿import { isNullOrUndefined } from "util";
import { assignIds } from "./Helpers";
>>>>>>> 89b3b06 (ESLint fixes + added tests via ts-jest)
=======
﻿import { assignIds } from "./Helpers";
>>>>>>> 82ce000 (Update Helpers.test.ts)
=======
﻿import { assignIds, process } from "./Helpers";
>>>>>>> bf506ab (Fixed issue with process())
=======
﻿import { assignIds, process, arraysEqual } from "./Helpers";
<<<<<<< HEAD
>>>>>>> c60ff9c (Add CSS Grid (and other goodies...) (#8))
=======
import { BasicResumeNode } from "./utility/NodeTree";
>>>>>>> 3dda565 (Fixed some failing tests)

test('assignIDs Test', async () => {
    const node = {
        type: 'FlexibleRow',
        childNodes: [
            { type: 'FlexibleColumn' },
            { type: 'FlexibleColumn' }
        ]
    } as BasicResumeNode;

    // Assign unique IDs
    assignIds(node);

    // Test
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 82ce000 (Update Helpers.test.ts)
    const topId = node['uuid'];
    expect(topId).toBeDefined();

    // Test that IDs are unique
<<<<<<< HEAD
    node.children.forEach(
        (child) => {
            expect(child['uuid']).not.toBe(topId);
            expect(child['uuid']).toBeDefined();
        }
    );

    expect(node.children[0]['uuid']).not.toBe(node.children[1]['uuid']);
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> bf506ab (Fixed issue with process())
=======
    expect(node.childNodes).toBeDefined();
    if (node.childNodes) {
        node.childNodes.forEach(
            (child) => {
                expect(child['uuid']).not.toBe(topId);
                expect(child['uuid']).toBeDefined();
            }
        );

        expect(node.childNodes[0]['uuid']).not.toBe(node.childNodes[1]['uuid']);
    }
>>>>>>> 3dda565 (Fixed some failing tests)
});

test('Helpers Test', async () => {
    let left = [0, 1, 0];
    let right = [0, 1, 1];

    expect(arraysEqual(left, right)).toBeFalsy();
});

test('process Test', async () => {
    const textWithNdash = "January 2014 -- December 2016"
    expect(process(textWithNdash)).toBe("January 2014 \u2013 December 2016");

    const textWithMdash = "January 2014 --- December 2016"
    expect(process(textWithMdash)).toBe("January 2014 \u2014 December 2016");
<<<<<<< HEAD
=======
    expect(!isNullOrUndefined(node['uuid']));
>>>>>>> 89b3b06 (ESLint fixes + added tests via ts-jest)
=======
>>>>>>> 82ce000 (Update Helpers.test.ts)
=======
>>>>>>> bf506ab (Fixed issue with process())
});