
class Api::V1::CasesController < ApplicationController
  before_action :set_case, only: %i[ show update destroy ]

  # GET /cases
  def index
  user_id = params[:user_id]
  @cases = Case.includes(:user, :case_ratings, :images, :documents, :audios, :videos).where("visibility = ? OR user_id = ?", Case.visibilities[:public_status], user_id)
  average_ratings = fetch_average_ratings
  cases_with_images = @cases.map do |c|
    case_json = c.as_json(include: [:images, :documents, :audios, :videos])
    case_json["main_image_url"] = c.main_image.attached? ? url_for(c.main_image) : nil
    case_json["saved"] = SavedCase.exists?(user_id: user_id, case_id: c.id)
    if c.user.present?
      case_json["user_info"] = {
        first_name: c.user.first_name,
        last_name: c.user.last_name
      }
    end

    case_json["average_rating"] = average_ratings[c.id]&.round(2)
    case_json
  end
  
  render json: { info: cases_with_images }
end


  def save_case
    user = User.find(params[:user_id])
    case_record = Case.find(params[:case_id])
    saved_case = SavedCase.new(user: user, case: case_record)
    if saved_case.save
      render json: {message: "caso guardado exitosamente"}, status: :ok
    else
      render json: {message: "No se pudo guardar el caso"}, status: :unprocessable_entity
    end
  end

  def unsave_case 
    @case = Case.find(params[:case_id]) 
    @user = User.find(params[:user_id]) 
    @saved_case = SavedCase.find_by(user_id: @user.id, case_id: @case.id) 
    if @saved_case 
      if @saved_case.destroy 
        render json: { message: 'Caso desguardado correctamente.' }, status: :ok 
      else 
        render json: { error: 'No se pudo desguardar el caso.' }, status: :unprocessable_entity 
      end 
    else 
      render json: { error: 'La asociación usuario-caso no existe.' }, status: :not_found 
    end 
  end

  def saved_by_user 
    @case = Case.find(params[:case_id]) 
    @user = User.find(params[:user_id]) 
    if @user.saved_cases.exists?(case_id: @case.id) 
      render json: { saved: true }, status: :ok 
    else 
      render json: { saved: false }, status: :ok 
    end 
  end

  # GET /cases/1
  def show
    cache_key = "case-viewed:user-#{@current_user.id}:case-#{@case.id}"
    if @case.public_status? || @case.unlisted_status? || (@case.private_status? && @case.user_id == params[:user_id].to_i)
      if $redis.exists(cache_key) == 0
        puts "Limiting case views update for: #{cache_key}"
        @case.increment!(:views)
        $redis.set(cache_key, "Visto", ex: 1.day.to_i)
      end
      render_case
    else
      render_unauthorized
    end
  end

  def get_saved_cases
    user_id = params[:user_id]
    saved_case_ids = SavedCase.where(user_id: user_id).pluck(:case_id)
    @cases = Case.where(id: saved_case_ids)
    average_ratings = fetch_average_ratings
    cases_with_images = @cases.map do |c|
      case_json = c.as_json
      case_json[:main_image_url] = c.main_image.attached? ? url_for(c.main_image) : nil
      saved = SavedCase.exists?(user_id: user_id, case_id: c.id)
      user_info = c.user.present? ? { first_name: c.user.first_name, last_name: c.user.last_name } : {}
      case_json.merge!(user_info: user_info, saved: saved)
      case_json["average_rating"] = average_ratings[c.id]&.round(2)
      case_json
    end
    
    render json: { saved_cases: cases_with_images }
  end

  def get_user_cases
    user_id = params[:user_id]
    @cases = Case.where(user_id: user_id)
    average_ratings = fetch_average_ratings
    cases_with_images = @cases.map do |c|
      case_json = c.as_json
      case_json[:main_image_url] = c.main_image.attached? ? url_for(c.main_image) : nil
      saved = SavedCase.exists?(user_id: user_id, case_id: c.id)
      user_info = c.user.present? ? { first_name: c.user.first_name, last_name: c.user.last_name } : {}
      case_json.merge!(user_info: user_info, saved: saved)
      case_json["average_rating"] = average_ratings[c.id]&.round(2)
      case_json
    end
    render json: { cases: cases_with_images }
  end

  def get_searched_cases
    search_param = params[:search]
    user_id = params[:user_id]
    if search_param.start_with?("#")
      
      # Búsqueda por tag
      tag_name = search_param[1..-1] # Eliminar el '#' del inicio del tag
      @cases = Case.joins(:tags)
                   .where(tags: { name: tag_name })
                   .where("(visibility = ? OR user_id = ?)",
                          Case.visibilities[:public_status], user_id)
    else
      # Búsqueda por título/descripción
      @cases = Case.where("(visibility = ? OR user_id = ?) AND (title LIKE ? OR description LIKE ?)",
                          Case.visibilities[:public_status], user_id, "%#{search_param}%", "%#{search_param}%")
    end
  
    # Mapear los casos encontrados para incluir la URL de la imagen principal si está adjunta
    cases_with_images = @cases.map do |c|
      case_json = c.as_json
      if c.main_image.attached?
        case_json.merge!(main_image_url: url_for(c.main_image))
      else
        case_json.merge!(main_image_url: nil)
      end
  
      # Verificar si el caso está guardado por el usuario actual
      saved = SavedCase.exists?(user_id: user_id, case_id: c.id)
      user_info = c.user.present? ? { first_name: c.user.first_name, last_name: c.user.last_name } : {}
      case_json.merge!(user_info: user_info, saved: saved)
    end
  
    render json: { info: cases_with_images, include: [:images, :documents, :audios, :videos] }
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
        documents: { only: [:id, :title, :description], methods: :document_url },
        audios: { only: [:id, :title, :url], methods: :file_url },
        videos: { only: [:id, :url, :title, :description] },
        tags: { only: [:name, :id] },
        comments: { only: [:id, :body, :created_at], include: {user: {only: [:id, :first_name, :last_name]}}}
      })

      if @case.comments_enabled?
        case_json["comments"].each do |comment_json|
          comment = @case.comments.find { |c| c.id == comment_json["id"] }
          comment_json["user_vote"] = comment.user_vote_by(@current_user)
          comment_json["upvotes_count"] = comment.upvotes_count
          comment_json["downvotes_count"] = comment.downvotes_count
        end

        user_has_commented = @case.comments.exists?(user_id: @current_user.id)
        case_json["current_user_comment_available"] = !user_has_commented
      else
        case_json["comments"] = []
        case_json["current_user_comment_available"] = false
      end
    
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
      params.require(:case).permit(:user_id,:case_id,:visibility, :comments_availability, :text, :title, :description, :body, :main_image, images_attributes: [:id, :title, :description, :_destroy, :file], documents_attributes: [:id, :title, :description, :_destroy, :file], audios_attributes: [:id, :title, :url, :description, :_destroy, :file], videos_attributes: [:id, :title, :url, :_destroy])
    end

    def fetch_average_ratings
      CaseRating.group(:case_id).average(:rating)
    end
end