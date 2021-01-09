class Api::V1::ProjectsController < ApplicationController
    def index
        projects = Project.where(user_id: params[:user_id])
        render json: { status: 'SUCCESS', message: 'Loaded projects', data: projects }
    end

    def create
        new_project = {
            user_id: params[:user_id],
            name: params[:name]
            # name: '新しいプロジェクト'
        }
        project = Project.new(new_project)
        project.save
        render json: { status: 'SUCCESS', message: 'Saved projects', data: project }
    end

    def update
        project = Project.find(params[:id])
        project[:name] = params[:name]
        project.save
        projects = Project.where(user_id: params[:user_id])
        render json: { status: 'SUCCESS', message: 'Updated projects', data: projects }
    end

    def destroy
        id = params[:id]
        project = Project.find(id)
        user_id = project[:user_id]
        project.destroy
        projects = Project.where(user_id: user_id)
        render json: { status: 'SUCCESS', message: 'Deleted projects', data: projects }
    end
end