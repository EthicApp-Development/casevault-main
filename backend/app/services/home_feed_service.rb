class HomeFeedService
  def initialize(user)
    @user = user
    @track_tag_searches = user.track_tag_searches
  end

  def fetch_cases(limit: 20, cursor: nil)
    # tag_ids = get the tags depending on @track_tag_searches
    tag_ids = high_value_tags
    #score the case raiting
    # Probably an average obtained per case using case.average_rating and multiply it with a weight
    # Stored it in a variable

    #Tags weight
    # Check the tags_id obtained and weight them depending on track_tag_searches

    #Created_at
    # Get created_at from cases using epoch in sql and devide it to obtain the weight
    # This division is needed because epoch returns the value in int:seconds

    #join or mix the above results to obtain a total score per case

    #Query the cases in the db
    
    #Define the cursor for cursor based pagination

    #Sort the case query by descending order based on the score calculated and return the case list
  end

  private

  def high_value_tags
    if @track_tag_searches
      @user.searched_tags.order(search_count: :desc).pluck(:tag_id)
    else
      Tag.joins(:cases).select('tags.id, COUNT(cases.id) AS case_count').group('tags.id').order('COUNT(cases.id) DESC').limit(10).pluck(:id, :name)
    end
  end
end