class Document < ApplicationRecord
  belongs_to :project
  has_many_attached :attachments
end
