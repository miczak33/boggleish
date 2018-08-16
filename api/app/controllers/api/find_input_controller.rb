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
        isWord = make_word_lookup(params[:input_text])
      end
      render json: { found: found, isWord: isWord }
    end

    private
      # Use callbacks to share common setup or constraints between actions.
      def set_board
        @board = Board.find(params[:id])
      end

      # Only allow a trusted parameter "white list" through.
      def board_params
        params.require(:board).permit(:pretty_name)
      end

      def make_word_lookup(word)
        url = URI.parse("https://od-api.oxforddictionaries.com/api/v1/entries/en/#{word}/regions=us")
        https = Net::HTTP.new(url.host, url.port)
        https.use_ssl = true
        req = Net::HTTP::Get.new(url.request_uri)
        req['app_key'] = ENV['OXFORD_APP_KEY']
        req['app_id'] = ENV['OXFORD_APP_ID']
        res = https.request(req)
        if res.code == '200'
          return true
        end
        return false
      end
  end