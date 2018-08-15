require 'set'

class Board < ApplicationRecord
  ROWS=4
  COLS=4
  serialize :arrangement

  def generate_board
    self.arrangement = (0...ROWS).map{ (0...COLS).map { ('A'..'Z').to_a[rand(26)] }}
  end

  def find_in_board(input_text)
    return in_board(board_to_hash_map(), input_text, nil, Set.new())
  end

  private 

  def in_board(board_hash, input_text, pos, pos_list)
    if input_text.length == 0
      return true
    end
    if !board_hash.has_key?(input_text[0])
      return false
    else
      if pos == nil
        board_hash[input_text[0]].each do |position|
          pos_list.add(position)
          if in_board(board_hash, input_text[1..-1], position, pos_list)
            return true
          else
            pos_list.delete(position)
          end
        end
      else
        board_hash[input_text[0]].each do |position|
          if getNeighbors(pos, ROWS).include?(position) && !pos_list.include?(position)
            pos_list.add(position)
            if in_board(board_hash, input_text[1..-1], position, pos_list)
              return true
            else
              pos_list.delete(position)
            end
          end
        end
      end
    end
    return false
  end

  def board_to_hash_map
    hash = {}
    (0...ROWS).each do |row|
      (0...COLS).each do |col|
        if hash.has_key?(self.arrangement[row][col])
          hash[self.arrangement[row][col]].push(row*ROWS+col)
        else
          hash[self.arrangement[row][col]] = [row*ROWS+col]
        end
      end
    end
    return hash
  end

  def getNeighbors(index, size)
    rows = index / size
    cols = index % size
    neighbors = Set.new()
    (rows-1...rows+2).each do |row|
      (cols-1...cols+2).each do |col|
        if row >= 0 && row < size && col >= 0 && col < size && !(row == rows && col == cols)
          neighbors.add(row*size+col)
        end
      end
    end
    return neighbors
  end
end
