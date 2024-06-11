class Api::V1::TagsController < ApplicationController
    before_action :set_case, only: [:index,:destroy,:add_tag]

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

    def add_tag
        @tag = Tag.find(params[:tag_id])
        @case.tags << @tag unless @case.tags.include?(@tag)
        render json: @case.tags, status: :ok
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
