import * as fs from "fs";
import * as pdfLib from "pdf-lib";

import { outlinePdfFactory } from "@lillallol/outline-pdf";
import { rejectIfPathExistsFactory } from "./rejectIfPathExistsFactory";
import { throwIfPathDoesNotEndWithPdf } from "./throwIfPathDoesNotEndWithPdf";

/**
 * @description
 * Adds outline to an outline-less pdf.
 */
export async function outlinePdfCjs(_: {
    /**
     * @description
     * Absolute or relative path to the outline-less pdf you want to add outline.
     */
    loadPath: string;
    /**
     * @description
     * Absolute or relative path to where the newly created outlined pdf will be saved.
     */
    savePath: string;
    /**
     * @description
     * A string representation of the outline.
     * @example
     * // first column  : page number
     * //                 negative for collapsing outline
     * // second column : outline depth
     * // third column  : outline title
     * `
     *    1||title 1
     *   12|-|title 2
     *  -30|--|title 3
     *   34|---|title 4
     *   35|---|title 5
     *   60|--|title 6
     *   67|-|title 7
     *   80||title 8
     * `;
     */
    outline: string;
}): Promise<void> {
    const { loadPath, outline, savePath } = _;
    const rejectIfPathExists = rejectIfPathExistsFactory(fs);
    throwIfPathDoesNotEndWithPdf(loadPath);
    await rejectIfPathExists(savePath);

    const outlinePdf = outlinePdfFactory(pdfLib);

    await outlinePdf.loadPdf(fs.readFileSync(loadPath));
    outlinePdf.outline = outline;
    outlinePdf.applyOutlineToPdf();
    const pdf = await outlinePdf.savePdf();

    fs.writeFileSync(savePath, pdf);
}
