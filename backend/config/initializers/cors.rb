# Be sure to restart your server when you modify this file.

# Avoid CORS issues when API is called from the frontend app.
# Handle Cross-Origin Resource Sharing (CORS) in order to accept cross-origin Ajax requests.

# Read more: https://github.com/cyu/rack-cors

Rails.application.config.middleware.insert_before 0, Rack::Cors do
  if Rails.env.production?
    allow do
      origins ENV.fetch('CORS_ORIGIN', 'https://casevault.ethicapp.info')
      resource '*',
        headers: :any,
        methods: [:get, :post, :put, :patch, :delete, :options, :head],
        expose: ['access-token', 'expiry', 'token-type', 'Authorization'],
        credentials: true
    end
  else
    allow do
      origins '*'
      resource(
        '*',
        headers: :any,
        expose: ['access-token', 'expiry', 'token-type', 'Authorization'],
        methods: [:get, :post, :put, :patch, :delete, :options, :head]
      )
    end
  end
  end
