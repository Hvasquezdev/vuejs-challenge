import { uuid } from '@/utils/';

export default {
  name: 'Workshop',
  columns: [
    {
      name: 'Todo',
      tasks: [
        {
          description: '',
          id: uuid(),
          name: 'First task',
          userAssigned: null
        },
        {
          description: '',
          id: uuid(),
          name: 'Second task',
          userAssigned: null
        }
      ]
    }
  ]
};
