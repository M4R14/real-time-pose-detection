const skeletonMarker = (keypoints, ctx) => {
    console.log(keypoints);
    keypoints.forEach(point => {
        const { position, part } = point;
        // ctx.font = "12px Arial";
        // ctx.fillText(part, position.x + 10, position.y + 5);
        ctx.fillRect(position.x, position.y, 2, 2);
    });

    const markerLine = (formStr, toStr, color) => {
    const form = keypoints.find(kp => kp.part == formStr);
    const to = keypoints.find(kp => kp.part == toStr);

    ctx.beginPath();
    ctx.moveTo(form.position.x, form.position.y);
    ctx.lineTo(to.position.x, to.position.y);
    ctx.strokeStyle = color;
    ctx.lineWidth = 10
    ctx.stroke();
    };

    markerLine("rightShoulder", "rightHip", "#5F4B8B");
    markerLine('rightHip', "leftHip", "#88B04B");
    markerLine('rightHip', "rightKnee", "#45B5AA");
    markerLine('rightKnee', "rightAnkle", "#0f4c81");
    markerLine('rightShoulder', "rightElbow", "#9bb7d4");
    markerLine('rightElbow', "rightWrist", "#BF1932");
    
    markerLine('leftShoulder', "rightShoulder", "#5F4B8B");
    markerLine('leftShoulder', "leftHip", "#88B04B");
    markerLine('leftShoulder', "leftElbow", "#45B5AA");
    markerLine('leftElbow', "leftWrist", "#0f4c81");
    markerLine('leftHip', "leftKnee", "#9bb7d4");
    markerLine('leftKnee', "leftAnkle", "#BF1932");
}

window.skeletonMarker = skeletonMarker
