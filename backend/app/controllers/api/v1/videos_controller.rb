class Api::V1::VideosController < ApplicationController
    before_action :set_case

    # GET /cases/:id/videos
    def index
        @videos = @case.videos
        render json: {info: @videos, status: :success }
    end

    # POST /cases/:case_id/videos
    def create
        begin
            yt_service = YoutubeService.new(params[:video][:url], params[:video][:title])
            video_data = yt_service.fetch_data!

            @video = @case.videos.build(url: "https://www.youtube.com/embed/#{video_data[:id]}", title: video_data[:title])
            if @video.save
                render json: { info: @case.videos, status: :created }
            else
                render json: { info: @video.errors, status: :unprocessable_entity }
            end
        rescue => e
            render json: { info: e.message, status: :unprocessable_entity }
        end
    end

    # PATCH /cases/:case_id/videos/:id
    def update
        @video = @case.videos.find(params[:id])
        if @video.update(video_params)
            render json: @video
        else
            render json: @video.errors, status: :unprocessable_entity
        end
    end

    # DELETE /cases/:case_id/videos/:id
    def destroy
        @video = @case.videos.find(params[:id])
        @videos = @case.videos
        @video.destroy
        render json: {info: @videos, status: :success}
    end

    private

    def set_case
        @case = Case.find(params[:case_id])
    end

    def video_params
        params.require(:video).permit(:title, :url)
    end
end
