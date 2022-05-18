import { boot } from 'quasar/wrappers';
import { IModel, PouchCollection, PouchORM } from 'pouchorm';

// definition du model de donner
export interface ITask extends IModel {
  content: string;
  user_name: string;
}

// preparation du model pour faire des evantuel manipulation
export class TaskCollection extends PouchCollection<ITask> {
  async beforeInit(): Promise<void> {
    await this.addIndex(['user_name']);
  }
}

// instanciation de la collection
export const taskCollection: TaskCollection = new TaskCollection('db_task');

export default boot(({ app }) => {
  PouchORM.LOGGING = true;
  app.provide('taskColection', taskCollection);
});
