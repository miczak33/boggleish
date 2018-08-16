require 'net/http'
require 'openssl'

  class Api::FindInputController < ApplicationController
    before_action :set_board, only: [:show, :update, :destroy]

    # GET /boards
    def index
      @board = Board.find(params[:board_id])
      found = @board.find_in_board(params[:input_text])
      isWord = false
      if found
        url = URI.parse("https://od-api.oxforddictionaries.com/api/v1/entries/en/#{params[:input_text]}/regions=us")
        puts url.host
        puts url.port
        https = Net::HTTP.new(url.host, url.port)
        https.use_ssl = true
        req = Net::HTTP::Get.new(url.request_uri)
        req['app_key'] = ENV['OXFORD_APP_KEY']
        req['app_id'] = ENV['OXFORD_APP_ID']
        res = https.request(req)
        puts res
        if res.code == '200'
          isWord = true
        end
      end
      render json: { found: found, isWord: isWord }
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