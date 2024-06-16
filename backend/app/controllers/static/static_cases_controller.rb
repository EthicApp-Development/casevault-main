module Static
    class StaticCasesController < ApplicationController

        include ActionView::Layouts
        include ActionController::Rendering
        include Rails.application.routes.url_helpers

        def show
            @case = Case.find(params[:id])
            render 'cases/show'
        end
    end
end
