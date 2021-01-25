import * as fs from "fs";
import * as pdfLib from "pdf-lib";

import { outlinePdfFactory } from "@lillallol/outline-pdf";
import { rejectIfPathExistsFactory } from "./rejectIfPathExistsFactory";
import { throwIfPathDoesNotEndWithPdf } from "./throwIfPathDoesNotEndWithPdf";

/**
 * @description Adds outline to an outline-less pdf.
 * @example
 * await outlinePdf({
 *     loadPath: "absolute/or/relative/path/to/pdf/to/outline.pdf",
 *     savePath: "absolute/or/relative/path/to/save/outlined.pdf",
 *     // first column  : page number
 *     //                 negative for collapsing outline
 *     // second column : outline depth
 *     // third column  : outline title
 *     outline: `
 *           1||some title
 *          12|-|some title
 *         -30|--|some title
 *          34|---|some title
 *          35|---|some title
 *          60|--|some title
 *          67|-|some title
 *          80||some title
 *     `,
 * });
 */
export async function outlinePdfCjs(_: {
    /**
     * @description Absolute or relative path to the outline-less pdf you want to add outline.
     */
    loadPath: string;
    /**
     * @description Absolute or relative path to where the newly created outlined pdf will be saved.
     */
    savePath: string;
    /**
     * @description A string representation of the outline.
     * @example
     * // first column  : page number
     * //                 negative for collapsing outline
     * // second column : outline depth
     * // third column  : outline title
     * `
     *    1||some title
     *   12|-|some title
     *  -30|--|some title
     *   34|---|some title
     *   35|---|some title
     *   60|--|some title
     *   67|-|some title
     *   80||some title
     * `
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
