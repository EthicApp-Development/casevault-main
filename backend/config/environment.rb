# Load the Rails application.
require_relative "application"

# Initialize the Rails application.
Rails.application.initialize!
# config/environments/development.rb
Rails.application.routes.default_url_options[:host] = 'localhost:3001'
