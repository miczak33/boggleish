
  class Api::FindInputController < ApplicationController
    before_action :set_board, only: [:show, :update, :destroy]

    # GET /boards
    def index
      @board = Board.find(params[:board_id])
      render json: { found: @board.find_in_board(params[:input_text]) }
    end

    # # GET /boards/1
    # def show
    #   render json: @board
    # end

    # # POST /boards
    # def create
    #   @board = Board.new(board_params)
    #   @board.generate_board()
    #   if @board.save
    #     render json: @board, status: :created
    #   else
    #     render json: @board.errors, status: :unprocessable_entity
    #   end
    # end

    # # PATCH/PUT /boards/1
    # def update
    #   if @board.update(board_params)
    #     render json: @board
    #   else
    #     render json: @board.errors, status: :unprocessable_entity
    #   end
    # end

    # # DELETE /boards/1
    # def destroy
    #   @board.destroy
    # end

    private
      # Use callbacks to share common setup or constraints between actions.
      def set_board
        @board = Board.find(params[:id])
      end

      # Only allow a trusted parameter "white list" through.
      def board_params
        params.require(:board).permit(:pretty_name)
      end
  end