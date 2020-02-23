const video = document.querySelector('video');
    const display = document.querySelector('canvas');

    const img = document.createElement('img');
    const canvas = document.createElement('canvas');

    const constraints = {
        video:  true,
        // video: {
        //     width: 640,
        //     height: 480
        // }
    };

    navigator.mediaDevices.getUserMedia(constraints)
        .then((stream) => {video.srcObject = stream});

    const marker = (keypoints, ctx) => {
        keypoints.forEach(point => {
            const { position, part } = point;
            // ctx.font = "12px Arial";
            ctx.fillText(part, position.x + 10, position.y + 5);
            ctx.fillRect(position.x, position.y, 5, 5);
        })
    }

    const estimateMultiplePoses = () => {
        posenet.load()
        .then(function(net){
            console.log('estimateMultiplePoses .... ');
            return net.estimateMultiplePoses(img, {
                flipHorizontal: false,
                maxDetections: 2,
                scoreThreshold: 0.6,
                nmsRadius: 20})
        }).then(function(poses){
            console.log('got Poses .... ', poses);
            display.width = img.width;
            display.height = img.height;
            var ctx = display.getContext("2d");
            ctx.fillStyle = "#FF0000";

            poses.forEach(element => skeletonMarker(element.keypoints, ctx));
        })
    }

    setInterval(() => {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        canvas.getContext('2d').drawImage(video, 0, 0);

        const dataImge = canvas.toDataURL('image/webp');
        img.src = dataImge;
        estimateMultiplePoses();
    }, 100)