# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.1].define(version: 2025_05_09_113541) do
  create_table "active_storage_attachments", force: :cascade do |t|
    t.string "name", null: false
    t.string "record_type", null: false
    t.bigint "record_id", null: false
    t.bigint "blob_id", null: false
    t.datetime "created_at", null: false
    t.index ["blob_id"], name: "index_active_storage_attachments_on_blob_id"
    t.index ["record_type", "record_id", "name", "blob_id"], name: "index_active_storage_attachments_uniqueness", unique: true
  end

  create_table "active_storage_blobs", force: :cascade do |t|
    t.string "key", null: false
    t.string "filename", null: false
    t.string "content_type"
    t.text "metadata"
    t.string "service_name", null: false
    t.bigint "byte_size", null: false
    t.string "checksum"
    t.datetime "created_at", null: false
    t.index ["key"], name: "index_active_storage_blobs_on_key", unique: true
  end

  create_table "active_storage_variant_records", force: :cascade do |t|
    t.bigint "blob_id", null: false
    t.string "variation_digest", null: false
    t.index ["blob_id", "variation_digest"], name: "index_active_storage_variant_records_uniqueness", unique: true
  end

  create_table "audios", force: :cascade do |t|
    t.string "title"
    t.string "url"
    t.integer "case_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["case_id"], name: "index_audios_on_case_id"
  end

  create_table "case_tags", force: :cascade do |t|
    t.integer "case_id", null: false
    t.integer "tag_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["case_id"], name: "index_case_tags_on_case_id"
    t.index ["tag_id"], name: "index_case_tags_on_tag_id"
  end

  create_table "cases", force: :cascade do |t|
    t.text "title"
    t.text "description"
    t.text "body"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "user_id"
    t.text "text"
    t.integer "visibility", default: 0
    t.index ["user_id"], name: "index_cases_on_user_id"
  end

  create_table "channel_cases", force: :cascade do |t|
    t.integer "channel_id", null: false
    t.integer "case_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["case_id"], name: "index_channel_cases_on_case_id"
    t.index ["channel_id"], name: "index_channel_cases_on_channel_id"
  end

  create_table "channel_memberships", force: :cascade do |t|
    t.integer "user_id", null: false
    t.integer "channel_id", null: false
    t.string "role"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["channel_id"], name: "index_channel_memberships_on_channel_id"
    t.index ["user_id"], name: "index_channel_memberships_on_user_id"
  end

  create_table "channels", force: :cascade do |t|
    t.string "name"
    t.text "description"
    t.string "visibility"
    t.integer "creator_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "comments", force: :cascade do |t|
    t.text "body"
    t.integer "user_id", null: false
    t.integer "case_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "votes", default: 0, null: false
    t.index ["case_id"], name: "index_comments_on_case_id"
    t.index ["user_id"], name: "index_comments_on_user_id"
  end

  create_table "documents", force: :cascade do |t|
    t.string "title"
    t.text "description"
    t.integer "case_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["case_id"], name: "index_documents_on_case_id"
  end

  create_table "images", force: :cascade do |t|
    t.string "title"
    t.text "description"
    t.integer "case_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["case_id"], name: "index_images_on_case_id"
  end

  create_table "saved_cases", force: :cascade do |t|
    t.integer "user_id", null: false
    t.integer "case_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["case_id"], name: "index_saved_cases_on_case_id"
    t.index ["user_id"], name: "index_saved_cases_on_user_id"
  end

  create_table "tags", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["name"], name: "index_tags_on_name", unique: true
  end

  create_table "users", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "jti", null: false
    t.string "first_name"
    t.string "last_name"
    t.string "provider"
    t.string "uid"
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["jti"], name: "index_users_on_jti", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

  create_table "videos", force: :cascade do |t|
    t.string "url"
    t.string "title"
    t.text "description"
    t.integer "case_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["case_id"], name: "index_videos_on_case_id"
  end

  add_foreign_key "active_storage_attachments", "active_storage_blobs", column: "blob_id"
  add_foreign_key "active_storage_variant_records", "active_storage_blobs", column: "blob_id"
  add_foreign_key "audios", "cases"
  add_foreign_key "case_tags", "cases"
  add_foreign_key "case_tags", "tags"
  add_foreign_key "cases", "users"
  add_foreign_key "channel_cases", "cases"
  add_foreign_key "channel_cases", "channels"
  add_foreign_key "channel_memberships", "channels"
  add_foreign_key "channel_memberships", "users"
  add_foreign_key "comments", "cases"
  add_foreign_key "comments", "users"
  add_foreign_key "documents", "cases"
  add_foreign_key "images", "cases"
  add_foreign_key "saved_cases", "cases"
  add_foreign_key "saved_cases", "users"
  add_foreign_key "videos", "cases"
end
