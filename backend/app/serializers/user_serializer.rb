class UserSerializer
  include JSONAPI::Serializer
  attributes :id, :email, :first_name, :last_name, :track_tag_searches
end
