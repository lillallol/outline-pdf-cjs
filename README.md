## Table of contents

-   [Description](#description)
-   [Installation](#installation)
-   [Example](#example)
-   [License](#license)

## Description

Like [@lillallol/outline-pdf](https://www.npmjs.com/package/@lillallol/outline-pdf) but with a higher level API that takes advantage of the node file system.

## Installation

```bash
npm install @lillallol/outline-pdf-cjs
```

## Example

```ts
import { outlinePdfCjs } from "@lillallol/outline-pdf";

await outlinePdfCjs({
    loadPath: "path/to/pdf/to/outline.pdf",
    savePath: "path/to/save/outlined.pdf",
    // first column  : page number
    //                 negative for collapsing outline
    // second column : outline depth
    // third column  : outline title
    outline: `
         1||Title 1
         2|-|Title 2
        -3|--|Title 3
         4|---|Title 4
         5|---|Title 5
         6|-|Title 6
         7||Title 7
    `,
});
```

## License

[MIT](https://github.com/lillallol/outline-pdf-cjs/blob/master/LICENSE)
