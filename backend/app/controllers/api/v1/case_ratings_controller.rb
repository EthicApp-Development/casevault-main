class Api::V1::CaseRatingsController < ApplicationController
  before_action :set_case

  def create_or_update
    @case_rating = CaseRating.find_or_initialize_by(user: @current_user, case: @case)
    @case_rating.rating = params[:rating].to_i

    if @case_rating.save
      render json: { message: 'Gracias por tu calificación', average_rating: @case.average_rating }, status: :ok
    else
      render json: { errors: @case_rating.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def set_case
    @case = Case.find(params[:case_id])
  end
end
