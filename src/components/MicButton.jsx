

function MicButton() {
    const activateMicrophone = ( ) => {
        console.log("Submit")

        //Add microphone access
        navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
	        const mediaRecorder = new MediaRecorder(stream)
	        // You’ll add more code here later
        })


        //create a WebSocket connection
    }

    return(
        <button
            onClick={activateMicrophone}
            type='button'
            className='submit-button'>
            Voice 💬
        </button>
    );
}