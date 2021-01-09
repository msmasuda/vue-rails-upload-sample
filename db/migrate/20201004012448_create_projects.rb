class CreateProjects < ActiveRecord::Migration[6.0]
  def change
    create_table :projects do |t|
      t.integer :user_id, :null => false, :default => ""
      t.string :name, :null => false, :default => ""

      t.timestamps
    end
  end
end
