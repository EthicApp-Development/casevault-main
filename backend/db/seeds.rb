# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end

require 'faker'
require 'open-uri'

if Rails.env.production?
  puts "Skipping seeds in production"
  return
end

puts "Cleaning up database..."
User.destroy_all
Channel.destroy_all
Case.destroy_all
Comment.destroy_all
Tag.destroy_all
CaseTag.destroy_all
puts "Seeding..."

# Users
30.times do
  User.create!(
    email: Faker::Internet.unique.email,
    password: "password",
    first_name: Faker::Name.first_name,
    last_name: Faker::Name.last_name,
    jti: SecureRandom.uuid
  )
end

users = User.all

# Tags
30.times do
  Tag.create!(name: Faker::Lorem.unique.word)
end

tags = Tag.all

# Channels
10.times do
  creator = users.sample
  Channel.create!(
    name: Faker::Educator.subject,
    description: Faker::Lorem.sentence,
    visibility: %w[public private].sample,
    creator_id: creator.id
  )
end

channels = Channel.all

# Channel Memberships
channels.each do |channel|
  users.sample(6).each do |user|
    ChannelMembership.create!(
      user: user,
      channel: channel,
      role: %w[member creator].sample
    )
  end
end

# Cases
40.times do
  user = users.sample
  begin
    c = Case.create!(
      title: Faker::Lorem.sentence,
      description: Faker::Lorem.paragraph,
      body: Faker::Lorem.paragraphs(number: 3).join("\n\n"),
      text: Faker::Lorem.paragraph(sentence_count: 2),
      user: user,
      visibility: rand(0..1)
    )

    puts "Created case: #{c.title}"

    # Attach main image from a random placeholder image service
    main_image_url = "https://picsum.photos/800/600?random=#{rand(1000)}"
    c.main_image.attach(
      io: URI.open(main_image_url),
      filename: "main_image_#{SecureRandom.hex(4)}.jpg",
      content_type: "image/jpeg"
    )

    # Assign random tags
    tags.sample(4).each do |tag|
      CaseTag.create!(case_id: c.id, tag_id: tag.id)
    end

    # Assign case to channel
    ChannelCase.create!(case_id: c.id, channel_id: channels.sample.id)

    # Add some comments
    users.sample(6).uniq.each do |commenter|
      Comment.create!(
        case_id: c.id,
        user_id: commenter.id,
        body: Faker::Lorem.sentence
      )
    end

    comments = c.comments

    #Add some Votes to comments
    comments.each do |comment|
      users.sample(5).uniq.each do |voter|
        Vote.create!(
          user_id: voter.id,
          comment_id: comment.id,
          value: [-1, 1].sample  # randomly upvote or downvote
        )
      end
    end

    # Add ratings to cases
    users.sample(6).uniq.each do |rater|
      CaseRating.create!(
        user_id: rater.id,
        case_id: c.id,
        rating: rand(1..5)
      )
    end
  rescue => e
    puts "❌ Failed to create case: #{e.message}"
  end
end

puts "Seeding completed."
