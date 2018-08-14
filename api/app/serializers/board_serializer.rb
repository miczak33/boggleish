class BoardSerializer < ActiveModel::Serializer
  attributes :id, :pretty_name, :arrangement
end