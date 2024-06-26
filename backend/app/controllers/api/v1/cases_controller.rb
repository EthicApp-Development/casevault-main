
class Api::V1::CasesController < ApplicationController
  before_action :set_case, only: %i[ show update destroy ]
  before_action :authenticate_user_from_token!
  # GET /cases
  def index
 
    @cases = Case.where("visibility = ? OR user_id = ?", Case.visibilities[:public_status], params[:user_id])

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
    if @case.public_status? || @case.unlisted_status?
      render_case
    elsif @case.private_status? && @case.user_id == params[:user_id].to_i
      render_case
    else
      render_unauthorized
    end
  end

  def get_searched_cases 
    search_param = params[:search] 
    @cases = Case.where("(visibility = ? OR user_id = ?) AND (title LIKE ? OR description LIKE ?)", 
    Case.visibilities[:public_status], params[:user_id], "%#{search_param}%", "%#{search_param}%") 
    cases_with_images = @cases.map do |c| 
      if c.main_image.attached? 
        c.as_json.merge(main_image_url: url_for(c.main_image)) 
      else 
        c.as_json.merge(main_image_url: nil) 
      end 
    end 
    render json: {info: cases_with_images, include: [:images, :documents, :audios, :videos]} 
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

    def render_case
      case_json = @case.as_json(include: {
        images: { only: [:title, :description], methods: :image_url },
        documents: { only: [:title, :description], methods: :document_url },
        audios: { only: [:title, :url], methods: :file_url },
        videos: { only: [:id, :url, :title, :description] },
        tags: { only: [:name, :id] }
      })
  
      if @case.main_image.attached?
        case_json.merge!(main_image_url: url_for(@case.main_image))
      else
        case_json.merge!(main_image_url: nil)
      end
  
      render json: case_json
    end
  
    def render_unauthorized
      render json: { error: 'Unauthorized' }, status: :unauthorized
    end

    # Only allow a list of trusted parameters through.
    def case_params
      params.require(:case).permit(:user_id,:visibility, :text, :title, :description, :body, :main_image, images_attributes: [:id, :title, :description, :_destroy, :file], documents_attributes: [:id, :title, :description, :_destroy, :file], audios_attributes: [:id, :title, :url, :description, :_destroy, :file], videos_attributes: [:id, :title, :url, :_destroy])
    end
end