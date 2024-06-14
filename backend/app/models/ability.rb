# frozen_string_literal: true

class Ability
  include CanCan::Ability

  def initialize(user)
    user ||= User.new # Usuario invitado

    if user.admin?
      can :manage, :all
    else
      can :manage, Case, user_id: user.id # El usuario puede gestionar sus propios casos

      # El usuario puede gestionar los casos a los que tiene acceso a través de authorships
      can :manage, Case, id: user.accessible_cases.pluck(:id)
    end
  end
end
