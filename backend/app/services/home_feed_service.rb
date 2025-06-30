class HomeFeedService
  FETCH_LIMIT_TO = 9
  def initialize(user, cursor_score: nil, cursor_id: nil)
    @user = user
    @track_tag_searches = user.track_tag_searches
    @cursor_score = cursor_score
    @cursor_id = cursor_id
  end

  def fetch_cases
    #Score multipliers depending if tags are being tracked by the user
    tags_tracked_score, avg_ratings_score, date_score = [0.6, 0.2, 0.2]
    tags_without_tracking_score, avg_wt_ratings_score, date_wt_score = [0.2, 0.5, 0.3]
    score_tag = @track_tag_searches ? tags_tracked_score : tags_without_tracking_score
    score_ratings = @track_tag_searches ? avg_ratings_score : avg_wt_ratings_score
    score_date = @track_tag_searches ? date_score : date_wt_score
    #Get the tags depending on @track_tag_searches
    tag_ids = high_value_tags

    #for the query in sql
    tag_ids_sql = tag_ids.any? ? tag_ids.map(&:to_i).join(', ') : '-1'

    query = Case
      .includes(:user, :case_ratings, :images, :documents, :audios, :videos)
      .where("visibility = ? OR cases.user_id = ?", Case.visibilities[:public_status], @user.id)
      .left_joins(:case_ratings, :case_tags)
      .select(<<~SQL.squish)
        cases.*,
        COALESCE(AVG(case_ratings.rating), 0) AS avg_rating,
        COUNT(DISTINCT case_tags.tag_id) FILTER (WHERE case_tags.tag_id IN (#{tag_ids_sql})) AS matched_tag_count,
        (
          (COALESCE(AVG(case_ratings.rating), 0) * #{score_ratings}) +
          (COUNT(DISTINCT case_tags.tag_id) FILTER (WHERE case_tags.tag_id IN (#{tag_ids_sql})) * #{score_tag}) +
          (1.0 / (EXTRACT(EPOCH FROM NOW() - cases.created_at) + 1) * #{score_date})
        ) AS score
      SQL
      .group('cases.id')

    out_query = Case.from("(#{query.to_sql}) AS cases_with_score").select('cases_with_score.*')
    #Cursor based pagination
    if @cursor_score && @cursor_id
      out_query = out_query.where(
        '((score < ?) OR (score = ? AND cases_with_score.id < ?))',
        @cursor_score, @cursor_score, @cursor_id
      )
    end
    out_query = out_query.order('score DESC, cases_with_score.id DESC').limit(FETCH_LIMIT_TO)
    out_query
  end

  private

  def high_value_tags
    if @track_tag_searches
      @user.searched_tags.order(search_count: :desc).limit(FETCH_LIMIT_TO).pluck(:tag_id)
    else
      Tag.joins(:cases).select('tags.id, COUNT(cases.id) AS case_count').group('tags.id').order('COUNT(cases.id) DESC').limit(FETCH_LIMIT_TO).pluck(:id)
    end
  end
end