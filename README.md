# DB設計

## usersテーブル

| Column | Type | Options |
|:-----------|------------:|:------------:|
| username  | string | null: false |
| email | string | null: false, unique: true, index: true |
| password | string | null: false, unique: true, index: true |

### Association
- has_many :messages
- has_many :groups, through: :groups_users

## messagesテーブル

| Column | Type | Options |
|:-----------|------------:|:------------:|
| dody  | text |  |
| image | string |  |
| group_id | integer | null: false, foreign_key: true |
| user_id | integer | null: false, foreign_key: true |

### Association
- belongs_to :user
- belongs_to :group

## groupsテーブル

| Column | Type | Options |
|:-----------|------------:|:------------:|
| groupname  | string | null: false |
| user_id | integer | null: false, foreign_key: true, index: true |

### Association
- has_many :messages
- has_many :messages, through: :groups_users

## groups_usersテーブル

| Column | Type | Options |
|:-----------|------------:|:------------:|
| user_id  | integer | null: false, foreign_key: true  |
| group_id | integer | null: false, foreign_key: true |

### Association
- belongs_to :group
- belongs_to :user