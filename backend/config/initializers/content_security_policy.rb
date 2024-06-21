Rails.application.config.content_security_policy do |policy|
    policy.frame_ancestors :self, 'http://localhost:3001'
end

Rails.application.config.content_security_policy_nonce_generator = -> request { SecureRandom.base64(16) }
Rails.application.config.content_security_policy_nonce_directives = %w(script-src)

# Report CSP violations to a specified URI
# For example, to log violations to the Rails logger:
Rails.application.config.content_security_policy_report_only = false
