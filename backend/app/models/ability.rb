class Ability
    include CanCan::Ability

    def initialize(user)
        user ||= User.new

        can :manage, Case, user_id: :user.id
        
        #case_ids = Case.where(visibility: ["public", "unlisted"]).pluck(:id)
        #can :read, Case, id:case_ids

        #if user.admin?
        #    can :manage, :all
        #end
    end

end