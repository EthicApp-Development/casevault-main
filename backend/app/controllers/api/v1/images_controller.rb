
class Api::V1::ImagesController < ApplicationController
    before_action :set_image, only: %i[ show update destroy ]
  
    # GET /images
    def index
      @images = image.all
  
      render json: @images, include: [:file]
    end
  
    # GET /images/1
    def show
      render json: @image, include: [:file]
    end
  
    # POST /images
    def create
      @image = Image.new(image_params.except(:file))
      file = [:image][:file]

      if file
        @image.file.attach(file)
      end
  
      if @image.save
        render json: @image, status: :created, location: @image
      else
        render json: @image.errors, status: :unprocessable_entity
      end
    end
  
    # PATCH/PUT /images/1
    def update
      if @image.update(image_params)
        render json: @image
      else
        render json: @image.errors, status: :unprocessable_entity
      end
    end
  
    # DELETE /images/1
    def destroy
      @image.destroy!
    end
  
    private
      # Use callbacks to share common setup or constraints between actions.
      def set_image
        @image = Image.find(params[:id])
      end
  
      # Only allow a list of trusted parameters through.
      def image_params
        params.require(:image).permit(:file, :title, :description)
      end
  end