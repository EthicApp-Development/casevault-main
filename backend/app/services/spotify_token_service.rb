# app/services/spotify/token_service.rb
require "base64"
require "net/http"

class SpotifyTokenService
  TOKEN_KEY = "spotify_access_token".freeze
  TIME_TO_LIVE = 3500

  class << self
    def call
      cached_token || fetch_and_store
    end

    private

    def cached_token
      token = $redis.get(TOKEN_KEY)
      return if token.blank?

      token
    end

    def fetch_and_store
      token = request_new_token
      $redis.set(TOKEN_KEY, token, ex: TIME_TO_LIVE)
      token
    end

    def request_new_token
      uri = URI("https://accounts.spotify.com/api/token")
      req = Net::HTTP::Post.new(uri)
      req["Authorization"] = "Basic #{encoded_credentials}"
      req.set_form_data(grant_type: "client_credentials")

      res  = Net::HTTP.start(uri.hostname, uri.port, use_ssl: true) { |http| http.request(req) }

      body = JSON.parse(res.body)
      raise StandardError, body["error_description"] if res.code.to_i >= 400

      body["access_token"]
    end

    def encoded_credentials
      creds = "#{Rails.configuration.x.spotify.client_id}:" \
              "#{Rails.configuration.x.spotify.client_secret}"
      Base64.strict_encode64(creds)
    end
  end
end
