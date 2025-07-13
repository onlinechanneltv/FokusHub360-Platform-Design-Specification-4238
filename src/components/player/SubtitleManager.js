```javascript
class SubtitleManager {
  constructor(videoElement) {
    this.video = videoElement;
    this.tracks = [];
    this.activeTrack = null;
  }

  addTrack(track) {
    const { src, label, srcLang } = track;

    // Create track element
    const trackElement = document.createElement('track');
    trackElement.kind = 'subtitles';
    trackElement.label = label;
    trackElement.srclang = srcLang;
    trackElement.src = src;

    // Add to video
    this.video.appendChild(trackElement);
    this.tracks.push(trackElement);

    return trackElement;
  }

  setTrack(trackLabel) {
    // Disable all tracks
    this.tracks.forEach(track => {
      track.mode = 'disabled';
    });

    // Enable selected track
    if (trackLabel) {
      const track = this.tracks.find(t => t.label === trackLabel);
      if (track) {
        track.mode = 'showing';
        this.activeTrack = track;
      }
    } else {
      this.activeTrack = null;
    }
  }

  // Load WebVTT subtitles
  async loadVTT(url) {
    try {
      const response = await fetch(url);
      const text = await response.text();
      return this.parseVTT(text);
    } catch (error) {
      console.error('Failed to load subtitles:', error);
      throw error;
    }
  }

  // Parse WebVTT content
  parseVTT(vttContent) {
    const cues = [];
    const lines = vttContent.trim().split('\n');
    let currentCue = null;

    lines.forEach((line, index) => {
      if (index === 0 && line.includes('WEBVTT')) {
        return;
      }

      // Parse timecode
      if (line.includes('-->')) {
        const [start, end] = line.split('-->').map(timeCode => {
          const [minutes, seconds] = timeCode.trim().split(':');
          return parseInt(minutes) * 60 + parseFloat(seconds);
        });

        currentCue = { start, end, text: '' };
        cues.push(currentCue);
      } 
      // Add text to current cue
      else if (currentCue && line.trim()) {
        currentCue.text += (currentCue.text ? '\n' : '') + line.trim();
      }
    });

    return cues;
  }

  // Style subtitles
  styleSubtitles(options = {}) {
    const style = document.createElement('style');
    style.textContent = `
      ::cue {
        background-color: ${options.backgroundColor || 'rgba(0, 0, 0, 0.8)'};
        color: ${options.color || 'white'};
        font-family: ${options.fontFamily || 'Arial'};
        font-size: ${options.fontSize || '1em'};
        padding: ${options.padding || '0.2em 0.5em'};
      }
    `;
    document.head.appendChild(style);
  }
}

export default SubtitleManager;
```