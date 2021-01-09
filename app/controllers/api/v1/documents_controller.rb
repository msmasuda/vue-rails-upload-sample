class Api::V1::DocumentsController < ApplicationController
    def index
        documents = Document.where(project_id: params[:project_id])
        for document in documents do
            document[:thumbnail] = url_for(document.attachments[1])
        end
        render json: { status: 'SUCCESS', message: 'Loaded documents', data: documents }
    end

    def show
        document = Document.find(params[:id])
        document[:video] = url_for(document.attachments[0])
        render json: { status: 'SUCCESS', message: 'Loaded document', data: document }
    end

    def create
        new_document = {
            project_id: params[:project_id],
            name: params[:name]
        }
        document = Document.new(new_document)
        document.attachments.attach(params[:video])
        document.attachments.attach(params[:thumb])
        document.save
        document[:thumbnail] = url_for(document.attachments[1])
        render json: { status: 'SUCCESS', message: 'Saved documents', data: document }
    end

    def update
        document = Document.find(params[:id])
        document[:name] = params[:name]
        document.save
        documents = Document.where(project_id: params[:project_id])
        for document in documents do
            document[:thumbnail] = url_for(document.attachments[1])
        end
        render json: { status: 'SUCCESS', message: 'Updated documents', data: documents }
    end

    def destroy
        id = params[:id]
        document = Document.find(id)
        project_id = document[:project_id]
        document.destroy
        documents = Document.where(project_id: project_id)
        render json: { status: 'SUCCESS', message: 'Deleted documents', data: documents }
    end
end