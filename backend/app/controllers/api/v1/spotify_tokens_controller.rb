# app/controllers/api/v1/spotify_tokens_controller.rb
class Api::V1::SpotifyTokensController < ApplicationController
  def show
    render json: { token: SpotifyTokenService.call }
  end
end
