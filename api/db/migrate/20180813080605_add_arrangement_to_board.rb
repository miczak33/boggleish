class AddArrangementToBoard < ActiveRecord::Migration[5.2]
  def change
    add_column :boards, :arrangement, :json
  end
end
