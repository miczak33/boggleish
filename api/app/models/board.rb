class Board < ApplicationRecord
  ROWS=4
  COLS=4
  serialize :arrangement
  
  def generate_board
    self.arrangement = (0...ROWS).map{ (0...COLS).map { ('A'..'Z').to_a[rand(26)] }}
  end
end
