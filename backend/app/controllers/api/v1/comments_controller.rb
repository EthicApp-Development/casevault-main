class Api::V1::CommentsController < ApplicationController
    before_action :set_case

    # GET api/v1/cases/:case_id/comments
    def index
        @comments = @case.comments.includes(:user, :votes)
        render json: @comments.map { |comment| render_comment(comment) }, status: :ok
    end
      
    # POST api/v1/cases/:case_id/comments
    def create
        if @case.comments_disabled?
            render json: { error: 'Los comentarios se encuentran deshabilitados para este caso.' }, status: :forbidden
            return
        end

        @comment = @case.comments.build(comment_params.merge(user_id: @current_user.id))

        if @comment.save
            render json: @comment.as_json(include: { user: { only: [:id, :first_name, :last_name] } }), status: :created
        else
            render json: { errors: @comment.errors.full_messages }, status: :unprocessable_entity
        end
    end


    def destroy
        @comment = @case.comments.find(params[:id])

        if @comment.user_id == @current_user.id
            @comment.destroy
            head :no_content
        else
            render json: { error: "Solo puedes eliminar tus propios comentarios." }, status: :forbidden
        end
    end

    private

    def set_case
        @case = Case.find(params[:case_id])
    end

    def comment_params
        params.require(:comment).permit(:body)
    end

    def render_comment(comment)
        {
        id: comment.id,
        body: comment.body,
        created_at: comment.created_at,
        user: {
            id: comment.user.id,
            first_name: comment.user.first_name,
            last_name: comment.user.last_name
        },
        upvotes_count: comment.upvotes_count,
        downvotes_count: comment.downvotes_count,
        user_vote: comment.user_vote_by(@current_user)
        }
    end

    #def current_user
    # Assuming you have some auth method, otherwise adjust
    #@current_user ||= User.find_by(id: session[:user_id])
    #end
end
