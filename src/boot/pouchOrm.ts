import { boot } from 'quasar/wrappers';
import { IModel, PouchCollection, PouchORM } from 'pouchorm';

export interface ITask extends IModel {
  content: string;
  user_name: string;
}

export class TaskCollection extends PouchCollection<ITask> {
  async beforeInit(): Promise<void> {
    await this.addIndex(['user_name']);
  }
}

export const taskCollection: TaskCollection = new TaskCollection('db_task');

export default boot(({ app }) => {
  PouchORM.LOGGING = true;
  app.provide('taskColection', taskCollection);
});
