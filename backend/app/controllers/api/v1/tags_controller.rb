class Api::V1::TagsController < ApplicationController
    before_action :set_case, only: [:index,:destroy,:add_tag]

    # Define a rate limit, e.g., 5 requests per minute
    RATE_LIMIT = 5
    RATE_LIMIT_PERIOD = 60 # in seconds

    def index
        @tags = @case.tags
        render json: @tags, status: :ok
    end

    def destroy
        @tag = @case.tags.find(params[:id])
        @case.tags.destroy(@tag)
        render json: @case.tags, status: :ok
    end

    def all_tags
        @tags = Tag.all
        render json: @tags, status: :ok
    end

    def get_searched_tags
        search_param = params[:search]
        @tags = Tag.where("name LIKE ?", "%#{search_param}%")
        if @current_user&.track_tag_searches
            @tags.each do |tag|
                UserSearchedTag.track_tag_search(@current_user, tag)
            end
        end
        render json: { info: @tags }
    end

    def add_tag
        @tag = Tag.find(params[:tag_id])
        if @case.tags.count >= Rails.application.config.x.limit_case_tags_to
            render json: { errors: [{error_code: 'tag_limit_exceeded', message: 'Un caso no puede tener más de 6 etiquetas'}] }, status: :unprocessable_entity
        else
            # Add the tag to the case if it's not already added
            @case.tags << @tag unless @case.tags.include?(@tag)
            render json: @case.tags, status: :ok
        end
    end

    def create
        @tag = Tag.new(tag_params)
        if @tag.save
            render json: @tag, status: :ok
        else
            render json: @tag.errors, status: :unprocessable_entity
        end
    end

    private

    def set_case
        @case = Case.find(params[:case_id])
    end

    def tag_params
        params.require(:tag).permit(:name)
    end
end
