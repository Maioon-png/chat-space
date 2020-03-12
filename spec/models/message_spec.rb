require 'rails_helper'

describe Message do
  describe '#create' do

    # メッセージを保存できる場合
    context 'can save' do
      # 1.メッセージがあれば保存できる
      it "is valid with content" do
        expect(build(:message, image: nil)).to be_valid
      end

      # 2.画像があれば保存できる
      it "is valid wwith image" do
        expect(build(:message, content: nil)).to be_valid
      end

      # 3.メッセージと画像があれば保存できる
      it "is valid wwith image" do
        expect(build(:message)).to be_valid
      end
    end
    # メッセージを保存できない場合  
    context 'can not save' do
      # 4.メッセージも画像も無いと保存できない
      it "is invalid without content and image" do
        message = build(:message, content: nil, image: nil)
        message.valid?
        expect(message.errors[:content]).to include("を入力してください")
      end

      # 5.group_idが無いと保存できない
      it "is invalid without group_id" do
        message = build(:message, group_id: nil)
        message.valid?
        expect(message.errors[:group]).to include("を入力してください")
      end

      # 6.user_idが無いと保存できない
      it "is invalid without user_id" do
        message = build(:message, user_id: nil)
        message.valid?
        expect(message.errors[:user]).to include("を入力してください")
      end
    end

  end
end
