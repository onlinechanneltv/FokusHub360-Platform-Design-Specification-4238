```jsx
// Update the video section in ParticipantFocusGroupDetail.jsx
import SecureVideoPlayer from '../../components/player/SecureVideoPlayer';

// ... inside the component ...

{responseStatus === 'accepted' && (
  <div className="mb-6">
    <h2 className="text-lg font-semibold text-gray-900 mb-3">Content Preview</h2>
    <SecureVideoPlayer
      src={focusGroup.contentUrl}
      drmConfig={{
        licenseServer: 'https://license.fokushub360.com/v1/license',
        drmSystem: 'widevine', // or 'fairplay' for Safari
      }}
      watermarkText={`FokusHub360 - ${focusGroup.title}`}
      subtitles={[
        {
          src: '/subtitles/en.vtt',
          label: 'English',
          srcLang: 'en'
        },
        {
          src: '/subtitles/es.vtt',
          label: 'Spanish',
          srcLang: 'es'
        }
      ]}
      preventScreenCapture={true}
      disableDownload={true}
      onTimeUpdate={(progress) => {
        console.log('Video progress:', progress);
      }}
      onComplete={() => {
        console.log('Video completed');
        // Handle completion, maybe show the questionnaire
      }}
      className="rounded-lg overflow-hidden shadow-lg"
    />
  </div>
)}
```