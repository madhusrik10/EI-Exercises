// Adapter Pattern: Media Player

// Target Interface
interface MediaPlayer {
    play(audioType: string, fileName: string): void;
}

// Adaptee
class VlcPlayer {
    playVlc(fileName: string): void {
        console.log(`Playing VLC file: ${fileName}`);
    }
}

// Adapter
class VlcPlayerAdapter implements MediaPlayer {
    private vlcPlayer: VlcPlayer;

    constructor(vlcPlayer: VlcPlayer) {
        this.vlcPlayer = vlcPlayer;
    }

    play(audioType: string, fileName: string): void {
        if (audioType === 'vlc') {
            this.vlcPlayer.playVlc(fileName);
        } else {
            console.log('Error: Unsupported audio type.');
        }
    }
}

// Client Code
const vlcPlayer = new VlcPlayer();
const mediaPlayer: MediaPlayer = new VlcPlayerAdapter(vlcPlayer);

mediaPlayer.play('vlc', 'example.vlc'); // Output: Playing VLC file: example.vlc

// created an adapter that allows an incompatible interface to be used as a target interface.
// The VlcPlayer class has a method playVlc that is incompatible with the MediaPlayer interface.
// The VlcPlayerAdapter class adapts the VlcPlayer class to the MediaPlayer interface, allowing it to be used by client code that expects a MediaPlayer