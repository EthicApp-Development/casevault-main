
class Api::V1::CasesController < ApplicationController
  before_action :set_case, only: %i[ show update destroy ]

  # GET /cases
  def index
    @cases = Case.all

    render json: @cases, include: [:images, :documents, :audios, :videos]
  end

  # GET /cases/1
  def show
    render json: @case.as_json(include: {
      images: { only: [:title, :description], methods: :image_url },
      documents: { only: [:title, :description], methods: :document_url },
      audios: { only: [:title, :description], methods: :audio_url },
      videos: { only: [:title, :description]}
    })
  end

  # POST /cases
  def create
    @case = Case.new(case_params)

    if @case.save
      if params[:case][:images_attributes].present?
        images_params = params[:case][:images_attributes]
        images_params.each do |image_param|
          ImagesController.new.create(image_param.permit(:title, :description, :file))
        end
      end
      render json: @case, status: :created, location: @case
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
      params.require(:case).permit(:title, :description, :body, images_attributes: [:id, :title, :description, :_destroy, :file], documents_attributes: [:id, :title, :description, :_destroy, :file], audios_attributes: [:id, :title, :description, :_destroy, :file], videos_attributes: [:id, :url, :_destroy])
    end
end