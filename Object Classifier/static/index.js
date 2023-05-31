const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

async function fetchVideoFeed() {
    const response = await fetch("/video_feed_with_boolean");

    if (!response.ok) {
        console.error("Failed to fetch video feed");
        return;
    }

    processResponse(response);
}

async function processResponse(response) {
    const textDecoderStream = new TextDecoderStream();
    const reader = response.body.pipeThrough(textDecoderStream).getReader();
    let buffer = '';

    while (true) {
        const { done, value } = await reader.read();

        if (done) {
            break;
        }

        buffer += value;

        try {
            const start = buffer.indexOf('{');
            const end = buffer.indexOf('}', start);
            if (end === -1) {
                continue;
            }

            const json = buffer.slice(start, end + 1);
            buffer = buffer.slice(end + 1);

            const data = JSON.parse(json);

            const img = new Image();
            img.onload = () => {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            };

            if (data.boolean) {
                document.body.classList.add('capyground');
                playCapySounds();
            } else {
                document.body.classList.remove('capyground');
            }

            img.src = "data:image/jpeg;base64," + data.frame;
        } catch (error) {
            console.error(error);
        }

        setInterval(1000 / 60);
    }
}

async function playCapySounds() {
    return true;
}

document.getElementById('source-toggle').addEventListener('change', function () {
    var uploadInput = document.getElementById('video-upload');
    var submitButton = document.getElementById('submit-upload');

    if (this.value === 'upload') {
        uploadInput.style.display = 'block';
        submitButton.style.display = 'block';
    } else {
        uploadInput.style.display = 'none';
        submitButton.style.display = 'none';
        document.getElementById("source").submit();
    }
});

fetchVideoFeed();
