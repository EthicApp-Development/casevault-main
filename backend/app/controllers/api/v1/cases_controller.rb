
class Api::V1::CasesController < ApplicationController
  before_action :set_case, only: %i[ show update destroy ]

  # GET /cases
  def index
    @cases = Case.all

    cases_with_images = @cases.map do |c|
      if c.main_image.attached?
        c.as_json.merge(main_image_url: url_for(c.main_image))
      else
        c.as_json.merge(main_image_url: nil)
      end
    end

    render json: {info: cases_with_images, include: [:images, :documents, :audios, :videos]}
  end

  # GET /cases/1
  def show
    case_json = @case.as_json(include: {
      images: { only: [:title, :description], methods: :image_url },
      documents: { only: [:id, :title, :description], methods: :document_url },
      audios: { only: [:title, :url], methods: :file_url },
      videos: { only: [:id, :url, :title, :description]},
      tags: {only: [:name,:id]}
    })
  
    if @case.main_image.attached?
      case_json.merge!(main_image_url: url_for(@case.main_image))
    else
      case_json.merge!(main_image_url: nil)
    end
  
    render json: case_json
  end
  

  # POST /cases
  def create
    @case = Case.new(case_params)
    if @case.save
      render json: {info: @case, status: :created, location: @case}
    else
      render json: @case.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /cases/1
  def update
    if @case.update(case_params)
      render json: @case
    else
      render json: @case.errors, status: :unprocessable_entity
    end
  end

  # DELETE /cases/1
  def destroy
    @case.destroy!
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_case
      @case = Case.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def case_params
      params.require(:case).permit(:user_id, :text, :title, :description, :body, :main_image, images_attributes: [:id, :title, :description, :_destroy, :file], documents_attributes: [:id, :title, :description, :_destroy, :file], audios_attributes: [:id, :title, :url, :description, :_destroy, :file], videos_attributes: [:id, :title, :url, :_destroy])
    end
end