class CreateDocuments < ActiveRecord::Migration[6.0]
  def change
    create_table :documents do |t|
      t.integer :project_id, :null => false, :default => ""
      t.string :name, :null => false, :default => ""
      t.string :video, :null => false, :default => ""
      t.string :thumbnail, :null => false, :default => ""
      t.timestamps
    end
  end
end
