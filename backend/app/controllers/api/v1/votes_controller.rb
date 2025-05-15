class Api::V1::VotesController < ApplicationController
  before_action :set_comment

  def create
    existing_vote = @comment.votes.find_by(user: @current_user)
    vote_value = vote_params[:value].to_i
    if existing_vote
      existing_vote.update(value: vote_value)
      render json: { success: true, message: "Voto actualizado", vote: existing_vote }, status: :ok
    else
      @vote = @comment.votes.build(user: @current_user, value: vote_params[:value])

      if @vote.save
        render json: { success: true, vote: @vote }, status: :created
      else
        render json: { errors: @vote.errors.full_messages }, status: :unprocessable_entity
      end
    end
  end

  def destroy
    @vote = @comment.votes.find_by(user: @current_user)

    if @vote&.destroy
      render json: { success: true }, status: :ok
    else
      render json: { errors: ["Voto no encontrado o no se puede eliminar"] }, status: :unprocessable_entity
    end
  end

  private

  def set_comment
    @comment = Comment.find(params[:comment_id])
  end

  def vote_params
    params.require(:vote).permit(:value)
  end
end
