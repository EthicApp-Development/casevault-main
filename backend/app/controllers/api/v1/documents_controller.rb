class Api::V1::DocumentsController < ApplicationController
    before_action :set_case

    #GET /cases/:case_id/videos
    def index
      @documents = @case.documents.map do |document|
        {
          id: document.id,
          title: document.title,
          description: document.description,
          download_url: download_document(document)
        }
      end
      
      @documents = [] if @documents.empty?
    
      render json: { info: @documents, status: :success }
    end

    def download_document(document)
      url_for(document.file) if document.file.attached?
    end
    
    #POST /cases/:case_id/documents
    def create
        @document = @case.documents.build(document_params)
        if @document.save
          render json: {info: @document, url: download_document(@document), status: :created}
        else
          render json: {info: @document.errors, status: :unprocessable_entity}
        end
    end

    def destroy
      @document = @case.documents.find(params[:document_id])
    end

    private

    def set_case
        @case = Case.find(params[:case_id])
    end

    def document_params
        params.permit(:title, :description, :case_id, :file)
    end
end
