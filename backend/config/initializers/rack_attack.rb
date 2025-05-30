class Rack::Attack
    # Use Redis as cache store
    Rack::Attack.cache.store = Redis.new(url: ENV.fetch("REDIS_URL", "redis://localhost:6379/1"))
  
    # Throttle login requests
    throttle('logins/ip', limit: 5, period: 20.seconds) do |req|
      req.path == '/login' && req.post? ? req.ip : nil
    end
  
    # Throttle tag creation requests
    throttle('tags/ip', limit: 5, period: 1.minute) do |req|
      if (req.path == '/api/v1/tags' || req.path.match(%r{/api/v1/cases/\d+/tags/add_tag})) && req.post?
        req.ip
      end
    end
  
    # Allowlist localhost (useful in development)
    safelist('allow-localhost') do |req|
      ['127.0.0.1', '::1'].include?(req.ip)
    end
  
    # Response for throttled requests
    self.throttled_response = lambda do |env|
      [429, { 'Content-Type' => 'application/json' }, [{ error: 'Rate limit exceeded. Try again later.' }.to_json]]
    end
  end
  