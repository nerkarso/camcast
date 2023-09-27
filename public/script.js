const CASTER_ID = '3d086243-cc7e-4c3a-a060-a5ad27a59726';
const peerCaster = new Peer(CASTER_ID);
const peerSubscriber = new Peer();
const overlay = document.getElementById('overlay');

if (IS_CASTER) {
  // Hide overlay
  overlay.style.display = 'none';
  // Get webcam
  navigator.mediaDevices.getUserMedia({ video: true, audio: false }).then((stream) => {
    addVideoStream(stream, true);
    peerCaster.on('connection', (conn) => {
      conn.on('open', () => {
        // Call the subscribers
        peerCaster.call(conn.peer, stream);
      });
    });
  });
}

peerSubscriber.on('call', (call) => {
  call.on('stream', (stream) => {
    addVideoStream(stream);
  });
  if (IS_RECEIVER) {
    call.answer(null);
  }
});

peerSubscriber.on('open', () => {
  // Connect to the caster so that they will call us
  peerSubscriber.connect(CASTER_ID);
});

overlay.addEventListener('click', () => {
  const video = document.getElementById('#cast');
  if (video && overlay && IS_RECEIVER) {
    video.play();
    overlay.style.display = 'none';
  }
});

function addVideoStream(stream, autoplay) {
  const video = document.createElement('video');
  video.id = '#cast';
  video.srcObject = stream;

  video.addEventListener('loadedmetadata', () => {
    if (autoplay) {
      video.play();
    }
    if (overlay) {
      overlay.innerText = 'Click to play';
    }
  });

  document.body.prepend(video);
}
