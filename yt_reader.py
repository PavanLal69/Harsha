import sys
from youtube_transcript_api import YouTubeTranscriptApi
from urllib.parse import urlparse, parse_qs

def extract_video_id(url):
    """Extracts the video ID from a YouTube URL."""
    parsed_url = urlparse(url)
    if parsed_url.hostname == 'youtu.be':
        return parsed_url.path[1:]
    if parsed_url.hostname in ('www.youtube.com', 'youtube.com'):
        if parsed_url.path == '/watch':
            p = parse_qs(parsed_url.query)
            return p.get('v', [None])[0]
        if parsed_url.path.startswith('/embed/'):
            return parsed_url.path.split('/')[2]
        if parsed_url.path.startswith('/v/'):
            return parsed_url.path.split('/')[2]
    return url # Return as-is if it might already be an ID

def get_transcript(video_url):
    try:
        video_id = extract_video_id(video_url)
        if not video_id:
            return "Could not extract video ID from URL."
        
        transcript_list = YouTubeTranscriptApi.get_transcript(video_id)
        
        # Combine the text
        full_text = " ".join([entry['text'] for entry in transcript_list])
        return full_text
        
    except Exception as e:
        return f"Error fetching transcript: {e}"

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python yt_reader.py <youtube_url>")
        sys.exit(1)
        
    url = sys.argv[1]
    print(f"Fetching transcript for: {url}\n")
    print(get_transcript(url))
