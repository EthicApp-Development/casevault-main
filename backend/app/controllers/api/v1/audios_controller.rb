class Api::V1::AudiosController < ApplicationController
    before_action :set_case

    # GET /cases/:case_id/audios
    def index
        @audios = @case.audios
        audios_with_urls = @audios.map { |audio| audio.attributes.merge(file_url: audio.file_url) }
        render json: audios_with_urls
    end

    # POST /cases/:case_id/audios
    def create
        @audio = @case.audios.build(audio_params)
        if @audio.save
            render json: @audio.attributes.merge(file_url: @audio.file_url), status: :created
        else
            render json: @audio.errors, status: :unprocessable_entity
        end
    end

    # PATCH /cases/:case_id/audios/:id
    def update
        @audio = @case.audios.find(params[:id])
        if @audio.update(audio_params)
            render json: @audio
        else
            render json: @audio.errors, status: :unprocessable_entity
        end
    end

    # DELETE /cases/:case_id/audios/:id
    def destroy
        @audio = @case.audios.find(params[:id])
        @audio.destroy
        head :no_content
    end

    private

    def set_case
        @case = Case.find(params[:case_id])
    end

    def audio_params
        params.require(:audio).permit(:title, :url, :file)
    end
end
