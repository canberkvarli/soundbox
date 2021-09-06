class LikesController < ApplicationController
    def create
    # 
    @like = Like.new(like_params)

    debugger
    if @like.save!
      @track = Track.find(@like.track_id)
      ###
      render "api/tracks/show"
    else
      render json: @like.errors.full_message, status: 422
    end
  end

  def destroy
    @like = Like.find(params[:id])
    if @like.destroy
      render json: @like
    else
      render json: @like.errors.full_message, status: 422
    end
  end


  private
  def like_params
    params.require(:like).permit(:liker_id, :track_id)
  end
end
