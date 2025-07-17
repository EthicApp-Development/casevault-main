# app/services/youtube_service.rb
require 'net/http'
require 'json'
require 'uri'

class YoutubeService
  YT_REGEX = %r{(?:youtu\.be/|v/|e/|u/\w+/|embed/|watch\?v=|v=)([^#&?]{11})}x.freeze

  def initialize(url, title)
    @api_key = ENV.fetch("YOUTUBE_API_KEY")
    @video_id = extract_video_id(url)
    @titleFromFrontend = title
  end

  def fetch_data!
    uri = URI("https://www.googleapis.com/youtube/v3/videos")
    uri.query = URI.encode_www_form(part: "snippet", id: @video_id, key: @api_key)

    response = Net::HTTP.get_response(uri)
    raise "YouTube API request failed: #{response.code}" unless response.is_a?(Net::HTTPSuccess)

    data = JSON.parse(response.body)
    raise "Video not found" if data["items"].empty?

    snippet = data["items"][0]["snippet"]

    {
      id: @video_id,
      title: @titleFromFrontend.present? ? @titleFromFrontend : snippet["title"],
      description: snippet["description"]
    }
  end

  private

  def extract_video_id(url)
    url[YT_REGEX, 1] || raise("No se pudo obtener el ID del video de YouTube.")
  end
end