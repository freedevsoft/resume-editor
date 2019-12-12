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

test('assignIDs Test', () => {
    const node = {
        type: 'FlexibleRow',
        children: [
            { type: 'FlexibleColumn' },
            { type: 'FlexibleColumn' }
        ]
    };

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
    node.children.forEach(
        (child) => {
            expect(child['uuid']).not.toBe(topId);
            expect(child['uuid']).toBeDefined();
        }
    );

    expect(node.children[0]['uuid']).not.toBe(node.children[1]['uuid']);
<<<<<<< HEAD
});

test('process Test', () => {
    const textWithNdash = "January 2014 -- December 2016"
    expect(process(textWithNdash)).toBe("January 2014 \u2013 December 2016");

    const textWithMdash = "January 2014 --- December 2016"
    expect(process(textWithMdash)).toBe("January 2014 \u2014 December 2016");
=======
    expect(!isNullOrUndefined(node['uuid']));
>>>>>>> 89b3b06 (ESLint fixes + added tests via ts-jest)
=======
>>>>>>> 82ce000 (Update Helpers.test.ts)
});