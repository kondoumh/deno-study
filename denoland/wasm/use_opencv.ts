import { cv, cvTranslateError } from "https://deno.land/x/opencv@v4.3.0-10/mod.ts";
import Jimp from "npm:jimp";

const imageSource = await Jimp.read("./image-sample.png");
const imageTemplate = await Jimp.read("./image-sample-template.png");

let src = cv.matFromImageData(imageSource.bitmap);
let templ = cv.matFromImageData(imageTemplate.bitmap);
let processedImage = new cv.Mat();
let mask = new cv.Mat();

cv.matchTemplate(src, templ, processedImage, cv.TM_CCOEFF_NORMED, mask);
cv.threshold(processedImage, processedImage, 0.999, 1, cv.THRESH_BINARY);
processedImage.convertTo(processedImage, cv.CV_8UC1);

let contours = new cv.MatVector();
let hierarchy = new cv.Mat();

cv.findContours(processedImage, contours, hierarchy, cv.RETR_EXTERNAL, cv.CHAIN_APPROX_SIMPLE);
for (let i = 0; i < contours.size(); ++i) {
    let countour = contours.get(i).data32S; // Contains the points
    let x = countour[0];
    let y = countour[1];
    
    let color = new cv.Scalar(0, 255, 0, 255);
    let pointA = new cv.Point(x, y);
    let pointB = new cv.Point(x + templ.cols, y + templ.rows);
    cv.rectangle(src, pointA, pointB, color, 2, cv.LINE_8, 0);
}

new Jimp({
    width: src.cols,
    height: src.rows,
    data: src.data
}).write("template-matching.png");
